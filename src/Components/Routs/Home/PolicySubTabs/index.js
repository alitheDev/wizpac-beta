import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Policy from "./Policy";
import OtherCRA from "./OtherCRA";
import GetData from "../../../../API/GetData";

export default function Index(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [subTabbar, setsubTabbar] = React.useState(false);

    useEffect(() => {
        GetData.Policy().then((res) => {
            res = res.data.data;
            for (let i in res) {
                // res[i].sNo = Number(i) + 1;
                res[i].due_date = res[i].due_date.date;
                if (res[i].category_title == null) {
                    res[i].name = res[i].category_name;
                } else {
                    res[i].name = res[i].category_title;
                }
                var arr1 = [];
                var arr2 = [];
                for (let j in res[i].applicability) {
                    arr1.push(res[i].applicability[j].title);
                }
                res[i].setapplicability = arr1;
                for (let j in res[i].law) {
                    arr2.push(res[i].law[j].title);
                }
                res[i].setlaw = arr2;
            }

            res.sort((a, b) => {
                var dateA = new Date(a.effective_date).getTime();
                var dateB = new Date(b.effective_date).getTime();
                return dateA < dateB ? 1 : -1; // ? -1 : 1 for ascending/increasing order
            });

            for (let i in res) {
                if (res[i].doc_type === "Guidance") {
                    res[i].doc_type = "Guidelines";
                }
            }
            props.setPolicy(res);
        });
    }, []);

    useEffect(() => {
        GetData.OtherCRA().then((res) => {
            res = res.data.data;
            props.setOtherCRA(res);
        });
    }, []);

    const hideSubTabBar = () => {
        setsubTabbar(!subTabbar)
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
        // setValue(event.target.newValue);
    };

    return (
        <div className={`${classes.root}`}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                className={`theme_text mb-4 pb-2`}
                aria-label="scrollable auto tabs example"
            >
                <Tab label="Policy" {...a11yProps(0)} />
                <Tab label="Other CRA" {...a11yProps(1)} />
                {/* <Tab label="Policy" {...a11yProps(2)} /> */}
            </Tabs>
            <TabPanel value={value} index={0}>
                <Policy
                    Policy={props.Policy}
                    screenWidth={props.screenWidth}
                    compliance={props.compliance}
                    mainTabValue={props.mainTabValue}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <OtherCRA
                    OtherCRA={props.OtherCRA}
                    screenWidth={props.screenWidth}
                    mainTabValue={props.mainTabValue}
                />
            </TabPanel>
            {/* <TabPanel value={value} index={2}>
                <Policy
                    Policy={props.Policy}
                    screenWidth={props.screenWidth}
                    mainTabValue={props.mainTabValue}
                />
            </TabPanel> */}
        </div >
    );
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
            className={`card ${props.screenWidth > 770 ? "mt-4" : "negative_margin"}`}
        >
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        "aria-controls": `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    topMargin: {
        top: "50px",
    },
    leftMargin: {
        width: `calc(100% - ${240}px)`,
    },
    left: {
        width: `calc(100% - ${74}px)`,
    },
    responsiveLeft: {
        width: "100%",
    },
    topAbsolute: {
        top: "4px",
    },
}));
