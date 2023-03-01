import React, { useState, useEffect } from "react";
import GetData from "../API/GetData";
import SideBar from "./Atoms/SideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Routs/Home/index";
import Ratings from "./Routs/Ratings";
import Research from "./Routs/Research";
import BusinessDevelopment from "./Routs/BusinessDevelopment";
import InputData from "./Routs/InputData";
import OpinionDetails from "./Routs/OpinionDetails/index";
import ClientInfo from "./Routs/ClientInfo";
import Opinion from "./Routs/Opinion";
import SearchOpinion from "./Routs/SearchOpinion";
import Reports from "./Routs/Reports";
import PacVis from "./Routs/PacVis";
import {
  Route,
  Routes,
  Navigate,
  useLocation,
  useParams,
} from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { height } from "@mui/system";
import opinion_data from "./Data/opinion_data.json";
import outstanding_data from "./Data/outstanding_data.json";
import Form from "./Routs/Forms/Form";
import ReportsTableComponent from "./Routs/Reports/ReportsTableComponent";
// const opinion_data = require("./Data/opinion_data.json");
// const outstanding_data = require("./Data/outstanding_data.json");

const useStyles = makeStyles((theme) => ({
  containerWidth: {
    width: `calc(100% - 240px)`,
    marginTop: "142px",
  },
  containerWidthResponsive: {
    width: `calc(100% - 240px)`,
    marginTop: "53px",
  },
  otherRoutsWidth: {
    width: `calc(100% - 240px)`,
    marginTop: "53px",
  },
  otherRoutsWidthResponsive: {
    width: `calc(100% - 240px)`,
    marginTop: "53px",
  },
}));
function Dashboard() {
  const [open, setOpen] = useState(false);
  const [isResponsive, setisResponsive] = useState(true);
  const [compliance, setcompliance] = useState(false);
  const [OutstandingDataArray, setOutstandingDataArray] =
    useState(outstanding_data);
  const [InProcessDataArray, setInProcessDataArray] =
    useState(outstanding_data);
  const [UnFinishedDataArray, setUnFinishedDataArray] =
    useState(outstanding_data);
  const [InHandBookDataArray, setInHandBookDataArray] = useState(opinion_data);
  const [GoneBookDataArray, setGoneBookDataArray] = useState(outstanding_data);
  const [InitialDataArray, setInitialDataArray] = useState(outstanding_data);
  const [InCobDataArray, setInCobDataArray] = useState(outstanding_data);
  const [InMNADataArray, setInMNADataArray] = useState(outstanding_data);
  const [InICUDataArray, setICUDataArray] = useState(outstanding_data);
  const [InRIPDataArray, setRIPDataArray] = useState(outstanding_data);
  const [WithdrawDataArray, setWithdrawDataArray] = useState(outstanding_data);
  const [SectorDataArray, setSectorDataArray] = useState(outstanding_data);
  const [B_DDataArray, setB_DDataArray] = useState(outstanding_data);
  const [InstDataArray, setInstDataArray] = useState(outstanding_data);
  const [InstPDataArray, setInstPDataArray] = useState(outstanding_data);
  const [AddressBookDataArray, setAddressBookDataArray] =
    useState(outstanding_data);
  const [PvtRatingsDataArray, setPvtRatingsDataArray] =
    useState(outstanding_data);
  const [PolicyDataArray, setPolicyDataArray] = useState(outstanding_data);
  const [OtherCRADataArray, setOtherCRADataArray] = useState(outstanding_data);
  const [DeadlineRcArray, setDeadlineRcArray] = useState(outstanding_data);
  const [DeadlineDissArray, setDeadlineDissArray] = useState(outstanding_data);
  const [DeadlineIcArray, setDeadlineIcArray] = useState(outstanding_data);
  const [DeadlineFcArray, setDeadlineFcArray] = useState(outstanding_data);
  const [DoneRcArray, setDoneRcArray] = useState(outstanding_data);
  const [DoneDissArray, setDoneDissArray] = useState(outstanding_data);
  const [DoneIcArray, setDoneIcArray] = useState(outstanding_data);
  const [DoneFcArray, setDoneFcArray] = useState(outstanding_data);
  const [GroupArray, setGroupArray] = useState([]);
  const [ClientArray, setClientArray] = useState([]);
  const [OpinionArray, setOpinionArray] = useState([]);
  const [GoneGroupArray, setGoneGroupArray] = useState([]);
  const [GoneClientArray, setGoneClientArray] = useState([]);
  const [GoneOpinionArray, setGoneOpinionArray] = useState([]);
  const [Groupcount, setGroupCount] = useState(0);
  const [Clientcount, setClientCount] = useState(0);
  const [Opinioncount, setOpinionCount] = useState(0);
  const [counts, setcount] = useState(0);
  const [goneGroupcount, setgoneGroupCount] = useState(0);
  const [goneClientcount, setgoneClientCount] = useState(0);
  const [goneOpinioncount, setgoneOpinionCount] = useState(0);
  const [gonecounts, setgonecount] = useState(0);
  const [isGridsTab, setisGridsTab] = useState(true);
  const [isRatingDep, setisRatingDep] = useState(false);
  const [isResearchDep, setisResearchDep] = useState(false);
  const [isBusinessDep, setisBusinessDep] = useState(false);
  const depName = localStorage.getItem("depName");
  const location = useLocation();
  const [Opinions, setOpinions] = useState([]);

  for (let i in outstanding_data) {
    outstanding_data[i].user_id1 = localStorage.getItem("userID");
    outstanding_data[i].user_id2 = localStorage.getItem("userID");
    outstanding_data[i].user_id3 = localStorage.getItem("userID");
    outstanding_data[i].lead_rc_id = localStorage.getItem("userID");
  }

  useEffect(() => {
    GetData.OutstandingData().then((res) => {
      res = res.data.data;
      setOutstandingDataArray(res);
    });
  }, []);

  // console.log(
  //   res.filter((element) => {
  //     return element.name !== null;
  //   }),
  //   "names"
  // )
  useEffect(() => {
    GetData.GetOpinion().then((res) => {
      res = res.data;
      var data = res.filter((element) => {
        return element.name !== null;
      });
      setOpinions(
        data.map((res) => ({
          Opinion: res.name,
          OpinionId: res.id,
        }))
      );
    });
  }, []);

  useEffect(() => {
    console.log(location.pathname, "tabb");
    if (
      location.pathname == "/pacra-wide" ||
      location.pathname == "/Ratings" ||
      location.pathname == "/Research"
    ) {
      setisGridsTab(false);
    } else setisGridsTab(true);
  }, [location]);

  useEffect(() => {
    if (Number(depName) == 9) {
      setisRatingDep(true);
    }
  }, [isRatingDep]);

  useEffect(() => {
    if (Number(depName) == 16) {
      setisResearchDep(true);
    }
  }, [isResearchDep]);

  useEffect(() => {
    if (Number(depName) == 4) {
      setisBusinessDep(true);
    }
  }, [isBusinessDep]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  function useWindowSize() {
    const [size, setsize] = useState([window.innerWidth]);
    useEffect(() => {
      const handleResize = () => {
        setsize([window.innerWidth]);
      };
      window.addEventListener("resize", handleResize);
    }, []);
    return size;
  }
  const [screenWidth] = useWindowSize();

  useEffect(() => {
    const screenWidth = window.screen.width;
    if (screenWidth < 770) {
      setisResponsive(false);
    }
  }, []);

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  useEffect(() => {
    var userType = localStorage.getItem("depName");

    if (userType == 15) {
      setcompliance(true);
    }
  }, []);

  return (
    <>
      <div style={{ display: "flex" }}>
        <SideBar
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
          open={open}
          Opinions={Opinions}
        />
        <div
          className={`${
            !isGridsTab
              ? screenWidth > 770
                ? classes.containerWidth
                : classes.containerWidthResponsive
              : screenWidth > 770
              ? classes.otherRoutsWidth
              : classes.otherRoutsWidthResponsive
          }`}
          style={{ flexGrow: 1 }}
        >
          <Routes>
            <Route
              path="/pacra-wide"
              replace
              element={
                <Home
                  open={open}
                  screenWidth={screenWidth}
                  compliance={compliance}
                  DeadlineRc={DeadlineRcArray}
                  setDeadlineRc={setDeadlineRcArray}
                  DeadlineDiss={DeadlineDissArray}
                  setDeadlineDiss={setDeadlineDissArray}
                  DeadlineIc={DeadlineIcArray}
                  setDeadlineIc={setDeadlineIcArray}
                  DeadlineFc={DeadlineFcArray}
                  setDeadlineFc={setDeadlineFcArray}
                  DoneRc={DoneRcArray}
                  setDoneRc={setDoneRcArray}
                  DoneDiss={DoneDissArray}
                  setDoneDiss={setDoneDissArray}
                  DoneIc={DoneIcArray}
                  setDoneIc={setDoneIcArray}
                  DoneFc={DoneFcArray}
                  setDoneFc={setDoneFcArray}
                  UnFinishedDataArray={UnFinishedDataArray}
                  setUnFinishedDataArray={setUnFinishedDataArray}
                  OutstandingDataArray={OutstandingDataArray}
                  // setOutstandingDataArray={setOutstandingDataArray}
                  InProcessDataArray={InProcessDataArray}
                  setInProcessDataArray={setInProcessDataArray}
                  InitialDataArray={InitialDataArray}
                  setInitialDataArray={setInitialDataArray}
                  InMNADataArray={InMNADataArray}
                  setInMNADataArray={setInMNADataArray}
                  InCobDataArray={InCobDataArray}
                  setInCobDataArray={setInCobDataArray}
                  InICUDataArray={InICUDataArray}
                  setICUDataArray={setICUDataArray}
                  WithdrawDataArray={WithdrawDataArray}
                  setWithdrawDataArray={setWithdrawDataArray}
                  InRIPDataArray={InRIPDataArray}
                  setInRIPDataArray={setRIPDataArray}
                  SectorDataArray={SectorDataArray}
                  setSectorDataArray={setSectorDataArray}
                  InstDataArray={InstDataArray}
                  setInstDataArray={setInstDataArray}
                  InstPDataArray={InstPDataArray}
                  setInstPDataArray={setInstPDataArray}
                  PvtRatingsDataArray={PvtRatingsDataArray}
                  setPvtRatingsDataArray={setPvtRatingsDataArray}
                  PolicyDataArray={PolicyDataArray}
                  setPolicyDataArray={setPolicyDataArray}
                  OtherCRADataArray={OtherCRADataArray}
                  setOtherCRADataArray={setOtherCRADataArray}
                  InHandBookDataArray={InHandBookDataArray}
                  setInHandBookDataArray={setInHandBookDataArray}
                  GoneBookDataArray={GoneBookDataArray}
                  setGoneBookDataArray={setGoneBookDataArray}
                  AddressBookDataArray={AddressBookDataArray}
                  setAddressBookDataArray={setAddressBookDataArray}
                  counts={counts}
                  setcount={setcount}
                  Opinioncount={Opinioncount}
                  setOpinionCount={setOpinionCount}
                  Groupcount={Groupcount}
                  setGroupcount={setGroupCount}
                  Clientcount={Clientcount}
                  setClientcount={setClientCount}
                  gonecounts={gonecounts}
                  setgonecount={setgonecount}
                  goneGroupcount={goneGroupcount}
                  setgoneGroupCount={setgoneGroupCount}
                  goneClientcount={goneClientcount}
                  setgoneClientCount={setgoneClientCount}
                  goneOpinioncount={goneOpinioncount}
                  setgoneOpinionCount={setgoneOpinionCount}
                  GoneGroupArray={GoneGroupArray}
                  GoneClientArray={GoneClientArray}
                  GoneOpinionArray={GoneOpinionArray}
                  setGoneGroupArray={setGoneGroupArray}
                  setGoneClientArray={setGoneClientArray}
                  setGoneOpinionArray={setGoneOpinionArray}
                  GroupArray={GroupArray}
                  ClientArray={ClientArray}
                  OpinionArray={OpinionArray}
                  setGroupArray={setGroupArray}
                  setClientArray={setClientArray}
                  setOpinionArray={setOpinionArray}
                />
              }
            />
            {isRatingDep ? (
              <Route
                path="/Ratings"
                element={
                  <Ratings
                    open={open}
                    screenWidth={screenWidth}
                    compliance={compliance}
                    DeadlineRc={DeadlineRcArray}
                    setDeadlineRc={setDeadlineRcArray}
                    DeadlineDiss={DeadlineDissArray}
                    setDeadlineDiss={setDeadlineDissArray}
                    DeadlineIc={DeadlineIcArray}
                    setDeadlineIc={setDeadlineIcArray}
                    DeadlineFc={DeadlineFcArray}
                    setDeadlineFc={setDeadlineFcArray}
                    DoneRc={DoneRcArray}
                    setDoneRc={setDoneRcArray}
                    DoneDiss={DoneDissArray}
                    setDoneDiss={setDoneDissArray}
                    DoneIc={DoneIcArray}
                    setDoneIc={setDoneIcArray}
                    DoneFc={DoneFcArray}
                    setDoneFc={setDoneFcArray}
                    UnFinishedDataArray={UnFinishedDataArray}
                    setUnFinishedDataArray={setUnFinishedDataArray}
                    InProcessDataArray={InProcessDataArray}
                    setInProcessDataArray={setInProcessDataArray}
                    OutstandingDataArray={OutstandingDataArray}
                    // setOutstandingDataArray={setOutstandingDataArray}
                    InitialDataArray={InitialDataArray}
                    setInitialDataArray={setInitialDataArray}
                    InMNADataArray={InMNADataArray}
                    setInMNADataArray={setInMNADataArray}
                    InCobDataArray={InCobDataArray}
                    setInCobDataArray={setInCobDataArray}
                    InICUDataArray={InICUDataArray}
                    setICUDataArray={setICUDataArray}
                    WithdrawDataArray={WithdrawDataArray}
                    setWithdrawDataArray={setWithdrawDataArray}
                    InRIPDataArray={InRIPDataArray}
                    setInRIPDataArray={setRIPDataArray}
                    InstDataArray={InstDataArray}
                    setInstDataArray={setInstDataArray}
                    InstPDataArray={InstPDataArray}
                    setInstPDataArray={setInstPDataArray}
                    PvtRatingsDataArray={PvtRatingsDataArray}
                    setPvtRatingsDataArray={setPvtRatingsDataArray}
                  />
                }
              />
            ) : null}
            {isResearchDep ? (
              <Route
                path="/Research"
                element={
                  <Research
                    open={open}
                    screenWidth={screenWidth}
                    SectorDataArray={SectorDataArray}
                    setSectorDataArray={setSectorDataArray}
                  />
                }
              />
            ) : null}
            {isBusinessDep ? (
              <Route
                path="/Business"
                element={
                  <BusinessDevelopment
                    open={open}
                    screenWidth={screenWidth}
                    B_DDataArray={B_DDataArray}
                    setB_DDataArray={setB_DDataArray}
                  />
                }
              />
            ) : null}
            <Route
              path="/OpinionDetails/:clientId"
              element={
                <OpinionDetails
                  open={open}
                  screenWidth={screenWidth}
                  Opinions={Opinions}
                />
              }
            />
            <Route
              path="/FC/:id/:client_id/:og_rating_id"
              element={
                <Form
                  open={open}
                  screenWidth={screenWidth}
                  Opinions={Opinions}
                />
              }
            />
            <Route
              path="/Search"
              element={
                <SearchOpinion
                  open={open}
                  screenWidth={screenWidth}
                  Opinions={Opinions}
                />
              }
            />
            <Route
              path="/Reports"
              element={
                <Reports
                  open={open}
                  screenWidth={screenWidth}
                  SectorDataArray={SectorDataArray}
                  setSectorDataArray={setSectorDataArray}
                />
              }
            />
            <Route
              path="/Reports/:id"
              element={
                <ReportsTableComponent
                  open={open}
                  screenWidth={screenWidth}
                  Opinions={Opinions}
                />
              }
            />
            <Route
              path="/PacVis"
              element={
                <PacVis
                  open={open}
                  screenWidth={screenWidth}
                  SectorDataArray={SectorDataArray}
                  setSectorDataArray={setSectorDataArray}
                />
              }
            />
            <Route
              path="/ClientInfo"
              element={
                <ClientInfo
                  open={open}
                  screenWidth={screenWidth}
                  Opinions={Opinions}
                />
              }
            />
            {/* <Route path="/Opinion" element={<Opinion
              open={open}
              screenWidth={screenWidth}
              Opinions={Opinions}
            />} /> */}

            {/* <Route path="/InputData" element={<InputData />} /> */}
            <Route
              path="*"
              element={
                depName == 9 ? (
                  <Navigate to="/Ratings" replace />
                ) : depName == 16 ? (
                  <Navigate to="/Research" replace />
                ) : depName == 4 ? (
                  <Navigate to="/Business" replace />
                ) : (
                  <Navigate to="/pacra-wide" replace />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
