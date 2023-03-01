import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Withdraw from "./Withdraw";
import InRIP from "./In-Rip";
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
    GetData.Withdraw().then((res) => {
      res = res.data.data;
      props.setWithdraw(res);
    });
  }, []);

  
  useEffect(() => {
    GetData.InRIP().then((res) => {
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
            // eslint-disable-next-line
            let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
          }
          if (res[i].ppl_date !== null && res[i].rc_meeting_date !== null) {
            res[i].stage = "PPL";
            res[i].stage_date = res[i].ppl_date;
            let date1 = new Date();
            let date2 = new Date(res[i].ppl_date);
            let Difference_In_Time = date1.getTime() - date2.getTime();
            // eslint-disable-next-line
            let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
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
            // eslint-disable-next-line
            let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
          }
          if (
            res[i].ppl_date == null &&
            res[i].rc_meeting_date == null &&
            res[i].Initiation == null
          ) {
            res[i].stage = "Not Captured";
            res[i].stage_date = null;
          }
        };
        stage();
      }
      props.setInRIP(res);
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
                    label="Withdraw"
                    {...a11yProps(0)}
                />
                <Tab
                    label="IN-RIP"
                    {...a11yProps(1)}
                />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Withdraw
                    screenWidth={props.screenWidth}
                    Withdraw={props.Withdraw}
                    mainTabValue={props.mainTabValue}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <InRIP
                    screenWidth={props.screenWidth}
                    InRIP={props.InRIP}
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
