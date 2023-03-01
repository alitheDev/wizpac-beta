import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import InHandBook from './InHandBook'
import GoneBook from "./Gone Book";
import AddressBook from "./AddressBook";
import GetData from "../../../../API/GetData";

export default function Index(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [subTabbar, setsubTabbar] = React.useState(false);
  const [state16, setstate16] = React.useState(0)

  useEffect(() => {
    GetData.InHandBook().then((res) => {
      res = res.data.data;
      var arr = [];
      for (let i in res) {
        if (res[i].stage) {
          arr.push(res[i]);
        }
      }
      props.setcount(arr.length);

      props.setInHandBook(arr);
      var GroupNameArray = [];
      var ClientNameArray = [];
      var OpinionNameArray = [];
      for (let i in arr) {
        if (arr[i].GroupName && arr[i].GroupName !== "0") {
          GroupNameArray.push(arr[i].GroupName);
        }
        if (arr[i].ClientName) {
          ClientNameArray.push(arr[i].ClientName);
        }

        if (arr[i].OpinionName) {
          OpinionNameArray.push(arr[i].OpinionName);
        }
      }

      var grouparray = [];
      var groupcount = 0;
      var clientarray = [];
      var clientcount = 0;
      // eslint-disable-next-line
      var opinionarray = [];
      var opinioncount = 0;
      GroupNameArray.forEach(function (i) {
        grouparray[i] = (grouparray[i] || 0) + 1;
      });
      ClientNameArray.forEach(function (i) {
        clientarray[i] = (clientarray[i] || 0) + 1;
      });

      // eslint-disable-next-line
      for (let i in grouparray) {
        groupcount++;
      }
      // eslint-disable-next-line
      for (let i in clientarray) {
        clientcount++;
      }
      // eslint-disable-next-line
      for (let i in OpinionNameArray) {
        opinioncount++;
      }
      props.setGroupcount(groupcount);
      props.setClientcount(clientcount);
      props.setOpinionCount(opinioncount);
    });
  }, []);

  useEffect(() => {
    GetData.GoneBook().then((res) => {
      res = res.data.data;
      var arr = [];
      for (let i in res) {
        if (res[i].stage) {
          arr.push(res[i]);
        }
      }
      props.setgonecount(arr.length);
      props.setGoneBook(arr);
      var GroupNameArray = [];
      var ClientNameArray = [];
      var OpinionNameArray = [];
      for (let i in arr) {
        if (arr[i].GroupName && arr[i].GroupName !== "0") {
          GroupNameArray.push(arr[i].GroupName);
        }
        if (arr[i].ClientName) {
          ClientNameArray.push(arr[i].ClientName);
        }

        if (arr[i].OpinionName) {
          OpinionNameArray.push(arr[i].OpinionName);
        }
      }

      var grouparray = [];
      var groupcount = 0;
      var clientarray = [];
      var clientcount = 0;
      var opinioncount = 0;
      GroupNameArray.forEach(function (i) {
        grouparray[i] = (grouparray[i] || 0) + 1;
      });
      ClientNameArray.forEach(function (i) {
        clientarray[i] = (clientarray[i] || 0) + 1;
      });

      // eslint-disable-next-line
      for (let i in grouparray) {
        groupcount++;
      }
      // eslint-disable-next-line
      for (let i in clientarray) {
        clientcount++;
      }
      // eslint-disable-next-line
      for (let i in OpinionNameArray) {
        opinioncount++;
      }
      props.setgoneGroupCount(groupcount);
      props.setgoneClientCount(clientcount);
      props.setgoneOpinionCount(opinioncount);
    });
  }, []);

  
  useEffect(() => {
    GetData.AddressBook().then((res) => {
      res = res.data.data;
      props.setAddressBook(res);
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
        <Tab label="In-Hand Book" {...a11yProps(0)} />
        <Tab label="Gone Book" onClick={() => { setstate16(1) }} {...a11yProps(1)} />
        <Tab label="ADDRESS Book" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <InHandBook
          state={props.state}
          count={props.count}
          Groupcount={props.Groupcount}
          Clientcount={props.Clientcount}
          OpinionCount={props.OpinionCount}
          InHandBook={props.InHandBook}
          GroupArray={props.GroupArray}
          ClientArray={props.ClientArray}
          OpinionArray={props.OpinionArray}
          setGroupArray={props.setGroupArray}
          setClientArray={props.setClientArray}
          setOpinionArray={props.setOpinionArray}
          screenWidth={props.screenWidth}
          mainTabValue={props.mainTabValue}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <GoneBook
          stating={state16}
          handleRfreshTab={props.handleRfreshTab}
          count={props.gonecounts}
          Groupcount={props.goneGroupcount}
          Clientcount={props.goneClientcount}
          OpinionCount={props.goneOpinionCount}
          GoneBook={props.GoneBook}
          GroupArray={props.GroupArray}
          ClientArray={props.ClientArray}
          OpinionArray={props.OpinionArray}
          setGroupArray={props.setGroupArray}
          setClientArray={props.setClientArray}
          setOpinionArray={props.setOpinionArray}
          screenWidth={props.screenWidth}
          mainTabValue={props.mainTabValue}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AddressBook
          AddressBook={props.AddressBook}
          screenWidth={props.screenWidth}
          mainTabValue={props.mainTabValue}
          subTabValue={value}
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
