import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Home from './Home';
import Details from './Details';
import History from './History';
import PSX from './PSX';
import GetData from '../../../API/GetData';
import { useParams } from 'react-router-dom';
import Typewriter from "typewriter-effect";
import { Skeleton } from '@mui/material';

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const [title, settitle] = useState('')
    const { clientId } = useParams();
    const [sendingReq, setsendingReq] = useState(false)
    const [state, setstate] = useState([])


    useEffect(() => {
        getTitle()
    }, [clientId])

    const getTitle = async () => {
        setsendingReq(true)
        const res = GetData.OpinionTitle(clientId)
        const resp = await res
        setsendingReq(false)
        if (resp && resp.data[0] == null) {
            settitle(null);
        }
        else {
            settitle(resp.data[0].name);
        }
    }


    return (
        <>
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
                {...other}
                className='card_heading_main'
            >
                {value === index && (
                    <Box>
                        <div className='d-md-inline-flex w-100 pb-2'>
                            <h2 className='mb-0 fw-bold'>
                                {sendingReq ? <Skeleton width={400} height={60} /> :
                                    title && <Typewriter
                                        onInit={(typewriter) => {
                                            typewriter
                                                .typeString(title)
                                                .start();
                                        }}
                                    />
                                }
                            </h2>
                            {value == 0 ? <p className='ms-3 mb-0'>{sendingReq ? <Skeleton width={150} height={30} /> :
                                title == '' ?
                                    <span className='text-danger'>(Invalid Opinion ID)</span>
                                    :
                                    <Typewriter
                                        onInit={(typewriter) => {
                                            typewriter
                                                .pauseFor(4000)
                                                .typeString('(Rating Mandate)')
                                                .start();
                                        }}
                                    />
                            }</p> : null}
                        </div>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        </>
    );
}

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function index(props) {
    const [value, setValue] = useState(0);
    const [sendingReq, setsendingReq] = useState(false);
    const [opinionsData, setopinionsData] = useState([]);
    const [DetailsTblOne, setDetailsTblOne] = useState([]);
    const [DetailsGroupTable, setDetailsGroupTable] = useState([]);
    const [DetailsGroupTitle, setDetailsGroupTitle] = useState();
    const { clientId } = useParams();
    const [historyData, sethistoryData] = useState([]);


    useEffect(() => {
        OpinionDetailsData()
        OpinionDetailsTblOne()
        OpinionDetailsTblTwo()
        HistoryTableData()
    }, [clientId])

    const HistoryTableData = async () => {
        setsendingReq(true);
        const res = GetData.getHistory(clientId);
        const resp = await res;
        const Data = resp.data;
        for (let i in Data) {
            Data[i].sNo = Number(i) + 1;
        }
        let temparray = []
        for (let i in Data) {
            temparray.push(Data[i])
        }
        setsendingReq(false)
        sethistoryData(temparray);
    };

    const OpinionDetailsData = async () => {
        setsendingReq(true)
        const res = GetData.OpinionDetailsApi(clientId)
        const resp = await res
        const Data = resp.data
        console.log(Data, 'smd')
        setsendingReq(false)
        setopinionsData(Data)
    }
    console.log(opinionsData, 'smd')

    const OpinionDetailsTblOne = async () => {
        setsendingReq(true)
        const res = GetData.OpinionDetailsTblOneApi(clientId)
        const resp = await res
        const Data = resp && resp.data.filter(element => {
            return element !== null;
        })
        for (let i in Data) {
            Data[i].CRA = 'PACRA';
            Data[i].sNo = Number(i) + 1;
        }
        setsendingReq(false)
        setDetailsTblOne(Data)
    }

    const OpinionDetailsTblTwo = async () => {
        setsendingReq(true)
        const res = GetData.GroupDetailsTable(clientId)
        const resp = await res
        const groupTitle = resp && resp.data[0].group
        const Data = resp && resp.data[1].filter(element => {
            return element !== null;
        })
        for (let i in Data) {
            Data[i].CRA = 'PACRA'
            Data[i].sNo = Number(i) + 1
        }
        setsendingReq(false)
        setDetailsGroupTable(Data)
        setDetailsGroupTitle(groupTitle)
    }


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    return (
        <Box
            sx={{ bgcolor: 'background.paper' }}
        >
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                className="theme_text"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                <Tab style={{ maxWidth: "120px" }} label="Home" {...a11yProps(0)} />
                <Tab style={{ maxWidth: "120px" }} label="Details" {...a11yProps(1)} />
                <Tab style={{ maxWidth: "120px" }} label="History" {...a11yProps(2)} />
                {/* <Tab style={{ maxWidth: "120px" }} label="PSX" {...a11yProps(3)} /> */}
                {/* <Tab style={{ maxWidth: "120px" }} label="Data" {...a11yProps(4)} /> */}
            </Tabs>
            <TabPanel value={value} index={0}>
                <Home
                    opinionsData={opinionsData}
                    screenWidth={props.screenWidth}
                    open={props.open}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Details
                    screenWidth={props.screenWidth}
                    opinionsData={opinionsData}
                    DetailsTblOne={DetailsTblOne}
                    DetailsGroupTable={DetailsGroupTable}
                    groupTitle={DetailsGroupTitle}
                    Opinions={props.Opinions}
                    clientId={clientId} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <History
                    historyData={historyData}
                    screenWidth={props.screenWidth}
                    open={props.open}
                    clientId={clientId} />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <PSX />
            </TabPanel>
            {/* <TabPanel value={value} index={4}>
                <Data />
            </TabPanel> */}
        </Box>
    );
}