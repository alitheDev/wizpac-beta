import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import DoneRc from "./DoneRc";
import DoneDiss from "./DoneDiss";
import GetData from "../../../../API/GetData";
import DoneIc from "./DoneIc";
import DoneFc from "./DoneFc";

export default function Index(props) {
  useEffect(() => {
    GetData.DoneRc().then((res) => {
      res = res.data.data;
      props.setDoneRc(res);
    });
  }, []);

  useEffect(() => {
    GetData.DoneDissemination().then((res) => {
      res = res.data.data;
      props.setDoneDiss(res);
    });
  }, []);

  useEffect(() => {
    GetData.DoneIc().then((res) => {
      res = res.data.data;
      props.setDoneIc(res);
    });
  }, []);

  useEffect(() => {
    GetData.DoneFc().then((res) => {
      res = res.data.data;
      props.setDoneFc(res);
    });
  }, []);

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

  return (
    <div className={`${classes.root}`}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        className={`theme_text mb-4 pb-2`}
        aria-label="scrollable auto tabs example"
      >
        <Tab label="RC" {...a11yProps(0)} />
        <Tab label="Dissemination" {...a11yProps(1)} />
        <Tab label="IC" {...a11yProps(2)} />
        <Tab label="FC" {...a11yProps(3)} />
        {/* {localStorage.getItem('username') == 'Muhammad Umair Basit' || localStorage.getItem('username') == 'Adnan Dilawar' ?
                     : null} */}
      </Tabs>
      <TabPanel value={value} index={0}>
        <DoneRc
          DoneRc={props.DoneRc}
          screenWidth={props.screenWidth}
          mainTabValue={props.mainTabValue}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DoneDiss
          DoneDiss={props.DoneDiss}
          screenWidth={props.screenWidth}
          mainTabValue={props.mainTabValue}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DoneIc
          DoneIc={props.DoneIc}
          screenWidth={props.screenWidth}
          mainTabValue={props.mainTabValue}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <DoneFc
          DoneFc={props.DoneFc}
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
