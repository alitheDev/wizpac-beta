import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Outstanding from "./Outstanding";
import InProcess from "./InProcess";
import GetData from "../../../API/GetData";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Fab } from "@mui/material";
import { Popover } from "@material-ui/core";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import SubTabs from "./SubTabs";
import PolicySubTabs from "./PolicySubTabs";
import InitialSubTabs from "./InitialSubTabs";
import WithdrawSubTabs from "./WithdrawSubTabs";
import DeadLSubTabs from "./DeadLSubTabs";
import DoneSubTabs from "./DoneSubTabs";
import InstrumentSubTabs from "./InstrumentSubTabs";
import Sector from "./Sector";
import PvtRatings from "./PvtRatings";

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
          className={` ${classes.topMargin} ${props.open
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
            <Tab
              label="Outstanding"
              {...a11yProps(0)}
            />
            <Tab
              label="In-Process"
              {...a11yProps(1)}
            />
            <Tab label="Done"
              {...a11yProps(2)}
            />
            <Tab label="Deadline"
              {...a11yProps(3)}
            />
            <Tab
              label="Initial"
              {...a11yProps(4)}
            />
            <Tab
              label="Withdraw"
              {...a11yProps(5)}
            />
            <Tab
              label="Sector"
              {...a11yProps(6)}
            />
            <Tab
              label="Inst"
              {...a11yProps(7)}
            />
            <Tab
              label="Pvt Ratings"
              {...a11yProps(8)}
            />
            <Tab
              label="Policy"
              {...a11yProps(9)}
            />
            <Tab
              label="Opinion-Data"
              {...a11yProps(10)}
            />
          </Tabs>
        </AppBar>
      ) : (
        <PopupState
          variant="popover"
          popupId="demo-popup-popover"
          className={`height_TabsBar ${classes.topMargin} ${props.open ? classes.leftMargin : classes.responsiveLeft
            }`}
        >
          {(popupState) => (
            <>
              <Fab
                color="transparent"
                aria-label="edit"
                variant="extended"
                className={`ms-2 fabCustom ${(value === 2 && classes.topAbsoluteSubTabs) ||
                  (value === 3 && classes.topAbsoluteSubTabs) ||
                  (value === 4 && classes.topAbsoluteSubTabs) ||
                  (value === 5 && classes.topAbsoluteSubTabs) ||
                  (value === 7 && classes.topAbsoluteSubTabs) ||
                  (value === 9 && classes.topAbsoluteSubTabs) ||
                  (value === 10 && classes.topAbsoluteSubTabs) ||
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
                    label="Outstanding"
                    {...a11yProps(0)}
                  />
                  <Tab
                    onClick={() => {
                      popupState.close();
                    }}
                    label="In-Process"
                    {...a11yProps(1)}
                  />
                  <Tab
                    onClick={popupState.close}
                    label="Done"
                    {...a11yProps(2)} />
                  <Tab
                    onClick={popupState.close}
                    label="Deadline"
                    {...a11yProps(3)} />
                  <Tab
                    onClick={() => {
                      popupState.close();
                    }}
                    label="Initial"
                    {...a11yProps(4)}
                  />
                  <Tab
                    onClick={() => {
                      popupState.close();
                    }}
                    label="Withdraw"
                    {...a11yProps(5)}
                  />
                  <Tab
                    onClick={() => {
                      popupState.close();
                    }}
                    label="Sector"
                    {...a11yProps(6)}
                  />
                  <Tab
                    onClick={() => {
                      popupState.close();
                    }}
                    label="Inst"
                    {...a11yProps(7)}
                  />
                  <Tab
                    onClick={() => {
                      popupState.close();
                    }}
                    label="Pvt Ratings"
                    {...a11yProps(8)}
                  />
                  <Tab
                    onClick={() => {
                      popupState.close();
                    }}
                    label="Policy"
                    {...a11yProps(9)}
                  />
                  <Tab
                    onClick={() => {
                      popupState.close();
                    }}
                    label="Opinion-Data"
                    {...a11yProps(10)}
                  />
                </Tabs>
              </Popover>
            </>
          )}
        </PopupState>
      )}
      {/* <div className='container'> */}
      <TabPanel value={value} index={0}>
        <Outstanding
          // stating={state1}
          state={state}
          Outstanding={props.OutstandingDataArray}
          // setOutstanding={props.setOutstandingDataArray}
          screenWidth={props.screenWidth}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <InProcess
          // stating={state2}
          setInProcess={props.setInProcessDataArray}
          InProcess={props.InProcessDataArray}
          screenWidth={props.screenWidth}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DoneSubTabs
          state={state}
          screenWidth={props.screenWidth}
          DoneRc={props.DoneRc}
          setDoneRc={props.setDoneRc}
          DoneDiss={props.DoneDiss}
          setDoneDiss={props.setDoneDiss}
          DoneIc={props.DoneIc}
          setDoneIc={props.setDoneIc}
          DoneFc={props.DoneFc}
          setDoneFc={props.setDoneFc}
          mainTabValue={value}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <DeadLSubTabs
          state={state}
          screenWidth={props.screenWidth}
          DeadlineRc={props.DeadlineRc}
          setDeadlineRc={props.setDeadlineRc}
          DeadlineDiss={props.DeadlineDiss}
          setDeadlineDiss={props.setDeadlineDiss}
          DeadlineIc={props.DeadlineIc}
          setDeadlineIc={props.setDeadlineIc}
          DeadlineFc={props.DeadlineFc}
          setDeadlineFc={props.setDeadlineFc}
          // OutstandingDead={props.OTDLineArray}
          UnFinished={props.UnFinishedDataArray}
          setUnFinished={props.setUnFinishedDataArray}
          mainTabValue={value}
        />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <InitialSubTabs
          state={state}
          screenWidth={props.screenWidth}
          Initial={props.InitialDataArray}
          setInitial={props.setInitialDataArray}
          MNA={props.InMNADataArray}
          setMNA={props.setInMNADataArray}
          InCob={props.InCobDataArray}
          setInCob={props.setInCobDataArray}
          InICU={props.InICUDataArray}
          setInICU={props.setICUDataArray}
          mainTabValue={value}
        />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <WithdrawSubTabs
          screenWidth={props.screenWidth}
          Withdraw={props.WithdrawDataArray}
          setWithdraw={props.setWithdrawDataArray}
          InRIP={props.InRIPDataArray}
          setInRIP={props.setInRIPDataArray}
          mainTabValue={value}
        />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <Sector
          Sector={props.SectorDataArray}
          setSector={props.setSectorDataArray}
          // stating={state10}
          screenWidth={props.screenWidth}
        />
      </TabPanel>
      <TabPanel value={value} index={7}>
        <InstrumentSubTabs
          Inst={props.InstDataArray}
          setInst={props.setInstDataArray}
          InstP={props.InstPDataArray}
          setInstP={props.setInstPDataArray}
          screenWidth={props.screenWidth}
          mainTabValue={value}
        />
      </TabPanel>
      <TabPanel value={value} index={8}>
        <PvtRatings
          // stating={state14}
          mainTabValue={value}
          PvtRatings={props.PvtRatingsDataArray}
          setPvtRatings={props.setPvtRatingsDataArray}
          screenWidth={props.screenWidth}
        />
      </TabPanel>
      <TabPanel value={value} index={9}>
        <PolicySubTabs
          screenWidth={props.screenWidth}
          compliance={props.compliance}
          Policy={props.PolicyDataArray}
          setPolicy={props.setPolicyDataArray}
          OtherCRA={props.OtherCRADataArray}
          setOtherCRA={props.setOtherCRADataArray}
          mainTabValue={value}
        />
      </TabPanel>
      <TabPanel value={value} index={10}>
        <SubTabs
          state={state}
          counts={props.counts}
          setcount={props.setcount}
          InHandBook={props.InHandBookDataArray}
          setInHandBook={props.setInHandBookDataArray}
          GoneBook={props.GoneBookDataArray}
          setGoneBook={props.setGoneBookDataArray}
          AddressBook={props.AddressBookDataArray}
          setAddressBook={props.setAddressBookDataArray}
          OpinionCount={props.OpinionCount}
          setOpinionCount={props.setOpinionCount}
          Groupcount={props.Groupcount}
          setGroupcount={props.setGroupcount}
          Clientcount={props.Clientcount}
          setClientcount={props.setClientcount}
          gonecounts={props.gonecounts}
          setgonecount={props.setgonecount}
          goneClientcount={props.goneClientcount}
          setgoneClientCount={props.setgoneClientCount}
          goneGroupcount={props.goneGroupcount}
          setgoneGroupCount={props.setgoneGroupCount}
          goneOpinionCount={props.goneOpinionCount}
          setgoneOpinionCount={props.setgoneOpinionCount}
          GoneGroupArray={props.GoneGroupArray}
          setGoneGroupArray={props.setGoneGroupArray}
          GoneClientArray={props.GoneClientArray}
          setGoneClientArray={props.setGoneClientArray}
          GoneOpinionArray={props.GoneOpinionArray}
          setGoneOpinionArray={props.setGoneOpinionArray}
          GroupArray={props.GroupArray}
          ClientArray={props.ClientArray}
          OpinionArray={props.OpinionArray}
          setGroupArray={props.setGroupArray}
          setClientArray={props.setClientArray}
          setOpinionArray={props.setOpinionArray}
          screenWidth={props.screenWidth}
          subTab={true}
          hideSubTabBar={props.hideSubTabBar}
          mainTabValue={value}
        />
      </TabPanel>
      {/* </div> */}
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
