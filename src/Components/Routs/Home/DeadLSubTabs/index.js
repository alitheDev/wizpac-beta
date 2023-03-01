import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import DoneDeadline from "../DoneSubTabs/DoneRc";
import DeadlineRc from "./DeadlineRc";
import DeadlineDiss from "./DeadlineDiss";
import DeadlineIc from "./DeadlineIc";
import DeadlineFc from "./DeadlineFc";
import UnFinished from "./UnFinished";
import GetData from "../../../../API/GetData";

export default function Index(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [subTabbar, setsubTabbar] = React.useState(false);

  const hideSubTabBar = () => {
    setsubTabbar(!subTabbar);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // setValue(event.target.newValue);
  };

  useEffect(() => {
    GetData.UnFinished().then((res) => {
      res = res.data.data;
      for (let i in res) {
        const date = () => {
          let date1 = new Date();
          let date2 = new Date(res[i].Notification);
          let Difference_In_Time = date1.getTime() - date2.getTime();
          let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
          res[i].daysNl = Math.floor(Difference_In_Days);
        };
        date();
        props.setUnFinished(res);
      }
    });
  }, []);

  useEffect(() => {
    GetData.DeadlineRc().then((res) => {
      res = res.data.data;
      for (let i in res) {
        if (res[i].days_to_rc === "") {
          res[i].days_to_rc = 100000;
        }
        if (res[i].days_to_mm === "") {
          res[i].days_to_mm = 10000;
        }
      }
      res.sort((a, b) => a.days_to_rc - b.days_to_rc);
      for (let i in res) {
        res[i].sNo = Number(i) + 1;
      }
      props.setDeadlineRc(res);
    });
  }, []);
  
  useEffect(() => {
    GetData.DeadlineDissemination().then((res) => {
      res = res.data.data;
      for (let i in res) {
        if (res[i].days_to_rc === "") {
          res[i].days_to_rc = 100000;
        }
        if (res[i].days_to_mm === "") {
          res[i].days_to_mm = 10000;
        }
      }
      res.sort((a, b) => a.days_to_rc - b.days_to_rc);
      for (let i in res) {
        res[i].sNo = Number(i) + 1;
      }
      props.setDeadlineDiss(res);
    });
  }, []);
  
    useEffect(() => {
      GetData.DeadlineIc().then((res) => {
        res = res.data.data;
        for (let i in res) {
          if (res[i].days_to_rc === "") {
            res[i].days_to_rc = 100000;
          }
          if (res[i].days_to_mm === "") {
            res[i].days_to_mm = 10000;
          }
        }
        res.sort((a, b) => a.days_to_rc - b.days_to_rc);
        for (let i in res) {
          res[i].sNo = Number(i) + 1;
        }
        props.setDeadlineIc(res);
      });
    }, []);
  
    useEffect(() => {
      GetData.DeadlineFc().then((res) => {
        res = res.data.data;
        for (let i in res) {
          if (res[i].days_to_rc === "") {
            res[i].days_to_rc = 100000;
          }
          if (res[i].days_to_mm === "") {
            res[i].days_to_mm = 10000;
          }
        }
        res.sort((a, b) => a.days_to_rc - b.days_to_rc);
        for (let i in res) {
          res[i].sNo = Number(i) + 1;
        }
        props.setDeadlineFc(res);
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
        <Tab label="UNFINISHED" {...a11yProps(0)} />
        <Tab label="RC" {...a11yProps(1)} />
        <Tab label="Dissemination" {...a11yProps(2)} />
        <Tab label="IC" {...a11yProps(3)} />
        <Tab label="FC" {...a11yProps(4)} />
        {/* {localStorage.getItem('username') == 'Muhammad Umair Basit' || localStorage.getItem('username') == 'Adnan Dilawar' ? <Tab label="Dissemination" {...a11yProps(2)} /> : null} */}
      </Tabs>
      <TabPanel value={value} index={0}>
        <UnFinished
          UnFinished={props.UnFinished}
          screenWidth={props.screenWidth}
          mainTabValue={props.mainTabValue}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DeadlineRc
          DeadlineRc={props.DeadlineRc}
          screenWidth={props.screenWidth}
          mainTabValue={props.mainTabValue}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DeadlineDiss
          DeadlineDiss={props.DeadlineDiss}
          screenWidth={props.screenWidth}
          mainTabValue={props.mainTabValue}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <DeadlineIc
          DeadlineIc={props.DeadlineIc}
          screenWidth={props.screenWidth}
          mainTabValue={props.mainTabValue}
        />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <DeadlineFc
          DeadlineFc={props.DeadlineFc}
          screenWidth={props.screenWidth}
          mainTabValue={props.mainTabValue}
        />
      </TabPanel>
    </div>
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
