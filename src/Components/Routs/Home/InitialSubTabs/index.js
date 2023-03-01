import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Initial from "./Initial";
import InMNA from "./InMNA";
import InCob from "./In-Cob";
import InICU from "./In-ICU";
import GetData from "../../../../API/GetData";

export default function Index(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [subTabbar, setsubTabbar] = React.useState(false);

    useEffect(() => {
        GetData.Initial().then((res) => {
            res = res.data.data;
            for (let i in res) {
                const date = () => {
                    var date1 = new Date();
                    var date2 = new Date(res[i].Initiationdays);
                    var Difference_In_Time = date1.getTime() - date2.getTime();
                    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                    res[i].initaldays = Math.floor(Difference_In_Days);
                };
                date();
                const stage = () => {
                    if (res[i].ppl_date == null && res[i].rc_meeting_date !== null) {
                        res[i].stage = "RC";
                        res[i].stage_date = res[i].rc_meeting_date;
                        var date1 = new Date();
                        var date2 = new Date(res[i].rc_meeting_date);
                        var Difference_In_Time = date1.getTime() - date2.getTime();
                        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                        res[i].stagedays = Math.floor(Difference_In_Days);
                    }
                    if (res[i].ppl_date !== null && res[i].rc_meeting_date == null) {
                        res[i].stage = "PPL";
                        res[i].stage_date = res[i].ppl_date;
                        let date1 = new Date();
                        let date2 = new Date(res[i].ppl_date);
                        let Difference_In_Time = date1.getTime() - date2.getTime();
                        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                        res[i].stagedays = Math.floor(Difference_In_Days);
                    }
                    if (res[i].ppl_date !== null && res[i].rc_meeting_date !== null) {
                        res[i].stage = "PPL";
                        res[i].stage_date = res[i].ppl_date;
                        let date1 = new Date();
                        let date2 = new Date(res[i].ppl_date);
                        let Difference_In_Time = date1.getTime() - date2.getTime();
                        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                        res[i].stagedays = Math.floor(Difference_In_Days);
                    }
                    if (
                        res[i].ppl_date == null &&
                        res[i].rc_meeting_date == null &&
                        res[i].Initiation !== null
                    ) {
                        res[i].stage = "Initiation";
                        res[i].stage_date = res[i].Initiation;
                        let date1 = new Date();
                        let date2 = new Date(res[i].Initiation);
                        let Difference_In_Time = date1.getTime() - date2.getTime();
                        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                        res[i].stagedays = Math.floor(Difference_In_Days);
                    }
                    if (
                        res[i].ppl_date == null &&
                        res[i].rc_meeting_date == null &&
                        res[i].Initiation == null
                    ) {
                        res[i].stage = "Not Captured";
                        res[i].stage_date = null;
                        res[i].stagedays = null;
                    }
                };
                stage();
            }
            props.setInitial(res);
        });
    }, []);

    useEffect(() => {
        GetData.InMNA().then((res) => {
            res = res.data.data.mna;
            for (let i in res) {
                if (!res[i].managerName) {
                    res[i].managerName = "UnAssigned";
                }
                if (!res[i].pacraAnalyst) {
                    res[i].pacraAnalyst = "UnAssigned";
                }
                const date = () => {
                    let date1 = new Date();
                    let date2 = new Date(res[i].mandate_receive_days);
                    let Difference_In_Time = date1.getTime() - date2.getTime();
                    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                    res[i].days = Math.floor(Difference_In_Days);
                };
                date();
            }
            // eslint-disable-next-line
            if (res.length == 0) {
                props.setMNA(['harry']);
            }
            else {
                props.setMNA(res);
            }

        });
    }, []);

    useEffect(() => {
        GetData.InCob().then((res) => {
            res = res.data.data;
            props.setInCob(res);
        });
    }, []);

    useEffect(() => {
        GetData.InICU().then((res) => {
            res = res.data.data;
            for (let i in res) {
                const stage = () => {
                    if (res[i].ppl_date == null && res[i].rc_meeting_date !== null) {
                        res[i].stage = "RC";
                        res[i].stage_date = res[i].rc_meeting_date;
                        let date1 = new Date();
                        let date2 = new Date(res[i].rc_meeting_date);
                        let Difference_In_Time = date1.getTime() - date2.getTime();
                        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                        res[i].stagedays = Math.floor(Difference_In_Days);
                    }
                    if (res[i].ppl_date !== null && res[i].rc_meeting_date == null) {
                        res[i].stage = "PPL";
                        res[i].stage_date = res[i].ppl_date;
                        let date1 = new Date();
                        let date2 = new Date(res[i].ppl_date);
                        let Difference_In_Time = date1.getTime() - date2.getTime();
                        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                        res[i].stagedays = Math.floor(Difference_In_Days);
                    }
                    if (res[i].ppl_date !== null && res[i].rc_meeting_date !== null) {
                        res[i].stage = "PPL";
                        res[i].stage_date = res[i].ppl_date;
                        let date1 = new Date();
                        let date2 = new Date(res[i].ppl_date);
                        let Difference_In_Time = date1.getTime() - date2.getTime();
                        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                        res[i].stagedays = Math.floor(Difference_In_Days);
                    }
                    if (
                        res[i].ppl_date == null &&
                        res[i].rc_meeting_date == null &&
                        res[i].Initiation !== null
                    ) {
                        res[i].stage = "Initiation";
                        res[i].stage_date = res[i].Initiation;
                        let date1 = new Date();
                        let date2 = new Date(res[i].Initiation);
                        let Difference_In_Time = date1.getTime() - date2.getTime();
                        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                        res[i].stagedays = Math.floor(Difference_In_Days);
                    }
                    if (
                        res[i].ppl_date == null &&
                        res[i].rc_meeting_date == null &&
                        res[i].Initiation == null
                    ) {
                        res[i].stage = "Not Captured";
                        res[i].stage_date = null;
                        res[i].stagedays = null;
                    }
                };
                stage();
            }
            props.setInICU(res);
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
                <Tab
                    label="Initial-ip"
                    {...a11yProps(0)}
                />
                <Tab
                    label="In-MNA"
                    {...a11yProps(1)}
                />
                <Tab
                    label="In-COB"
                    {...a11yProps(2)}
                />
                <Tab
                    label="IN-ICU"
                    {...a11yProps(3)}
                />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Initial
                    Initial={props.Initial}
                    screenWidth={props.screenWidth}
                    mainTabValue={props.mainTabValue}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <InMNA
                    MNA={props.MNA}
                    screenWidth={props.screenWidth}
                    mainTabValue={props.mainTabValue}
                />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <InCob
                    InCob={props.InCob}
                    screenWidth={props.screenWidth}
                    mainTabValue={props.mainTabValue}
                />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <InICU
                    InICU={props.InICU}
                    screenWidth={props.screenWidth}
                    mainTabValue={props.mainTabValue}
                />
            </TabPanel>
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
