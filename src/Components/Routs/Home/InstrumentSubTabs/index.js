import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Inst from "./Inst";
import InstP from "./Inst-P";
import GetData from "../../../../API/GetData";

export default function Index(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [subTabbar, setsubTabbar] = React.useState(false);

    const hideSubTabBar = () => {
        setsubTabbar(!subTabbar)
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
        // setValue(event.target.newValue);
    };

    useEffect(() => {
        GetData.Inst().then((res) => {
            res = res.data.data;
            props.setInst(res);
        });
    }, []);

    useEffect(() => {
        GetData.InstP().then((res) => {
            res = res.data.data;
            props.setInstP(res);
        });
    }, []);

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
                    label="INST"
                    {...a11yProps(0)}
                />
                <Tab
                    label="INST-P"
                    {...a11yProps(1)}
                />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Inst
                    screenWidth={props.screenWidth}
                    Inst={props.Inst}
                    mainTabValue={props.mainTabValue}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <InstP
                    screenWidth={props.screenWidth}
                    InstP={props.InstP}
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
