import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Fab } from "@mui/material";
import { Popover } from "@material-ui/core";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import Sector from "../Home/Sector";

export default function Index(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  // eslint-disable-next-line
  const [state, setstate] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      {props.screenWidth > 770 ? (
        <AppBar
          position="fixed"
          className={` ${classes.topMargin} ${
            props.open
              ? classes.leftMargin
              : props.screenWidth < 700
              ? classes.responsiveLeft
              : classes.left
          }`}
          color="default"
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
            <Tab label="Sector" {...a11yProps(0)} />
          </Tabs>
        </AppBar>
      ) : (
        <PopupState
          variant="popover"
          popupId="demo-popup-popover"
          className={`height_TabsBar ${classes.topMargin} ${
            props.open ? classes.leftMargin : classes.responsiveLeft
          }`}
        >
          {(popupState) => (
            <>
              <Fab
                color="transparent"
                aria-label="edit"
                variant="extended"
                className={`ms-2 fabCustom ${
                  (value === 8 && classes.topAbsoluteSubTabs) ||
                  (value === 2 && classes.topAbsoluteSubTabs) ||
                  (value === 3 && classes.topAbsoluteSubTabs) ||
                  (value === 4 && classes.topAbsoluteSubTabs) ||
                  (value === 5 && classes.topAbsoluteSubTabs) ||
                  (value === 6 && classes.topAbsoluteSubTabs) ||
                  classes.topAbsolute
                }`}
              >
                <MoreVertIcon {...bindTrigger(popupState)} />
              </Fab>
              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  orientation="vertical"
                  indicatorColor="primary"
                  className="theme_text"
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                >
                  <Tab
                    onClick={() => {
                      popupState.close();
                    }}
                    label="Sector"
                    {...a11yProps(0)}
                  />
                </Tabs>
              </Popover>
            </>
          )}
        </PopupState>
      )}
      <TabPanel value={value} index={0}>
        <Sector
          state={state}
          Sector={props.SectorDataArray}
          setSector={props.setSectorDataArray}
          screenWidth={props.screenWidth}
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
  topAbsoluteSubTabs: {
    top: "45px",
  },
}));
