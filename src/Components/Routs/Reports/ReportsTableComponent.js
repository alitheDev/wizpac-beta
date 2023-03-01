import * as React from "react";
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import Box from "@mui/material/Box";
// import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
// import { Link } from "react-router-dom";
import { Autocomplete, Box, Stack, TextField } from "@mui/material";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
// import ReportsTables from "./ReportsTables";
import { Fab } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { CalendarMonth } from "@mui/icons-material";
import { useState, useEffect } from "react";
import Undertaking from "./undertaking";
import DetailofRatingCommite from "./DetailofRatingCommite";
import RatingMovement from "./RatingMovement";
import RatingmoventIGF from "./RatingmoventIGF";
import NewRatings from "./NewRatings";
import Movementmorethanone from "./movementmorethanone";
import DirectorsDetails from "./directorsDetails";
import SponsorshipDetails from "./sponsorshipDetails";
import CriteriaGroupDetails from "./criteriaGroupDetails";
import AnalystRotation from "./analystRotation";
import TeamRotation from "./teamRotation";
import LeadRcRotation from "./leadRcRotation";
import RatingUpgradeDowngrade from "./ratingUpgradeDowngrade";
import MonitoringSurveillance from "./monitoringSurveillance";
import Updatingofmethodologies from "./updatingofmethodologies";
import RatingsBetweenTwoDates from "./ratingsBetweenTwoDates";
import OutstandingOnSpecificDate from "./outstandingOnSpecificDate";
import ToBeReviewedRatings from "./toBeReviewedRatings";
import SwitchRating from "./switchRating";
import PvtRatings from "./PvtRatings";
import NewRatingAgreements from "./newRatingAgreements.js";
import RatingWd from "./RatingWd";
import IndicativeRating from "./indicativeRating";
import HrHirings from "./hrHirings";
import OperationalDetails from "./OperationalDetails";
import RcDetails from "./rcDetails";
import RcOverdue from "./rcOverdue";
import SectorStudies from "./sectorStudies";

export default function ReportsTableComponent(props) {
  const GridHeadings = [
    {
      name: "RC Data",
      link: "RCData",
      id: "1",
    },
    {
      name: "Between two Dates",
      link: "BetweentwoDates",
      id: "2",
    },
    {
      name: "Outstanding on specific Date",
      link: "OutstandingonspecificDate",
      id: "3",
    },
    {
      name: "VIS Outstanding on specific Date",
      link: "VISOutstandingonspecificDate",
      id: "4",
    },
    {
      name: "Undertakings",
      link: "Undertakings",
      id: "5",
    },
    {
      name: "Sponsors Details",
      link: "SponsorsDetails",
      id: "6",
    },
    {
      name: "Directors Details",
      link: "DirectorsDetails",
      id: "7",
    },
    {
      name: "Criteria Group Details",
      link: "CriteriaGroupDetails",
      id: "8",
    },
    {
      name: "Detail of Rating Commitee of CRA",
      link: "DetailofRatingCommiteeofCRA",
      id: "9",
    },
    {
      name: "New Credit Ratings Assigned",
      link: "NewCreditRatingsAssigned",
      id: "10",
    },
    {
      name: "Movement of Each Credit Ratings",
      link: "MovementofEachCreditRatings",
      id: "11",
    },
    {
      name: "Rating movement assessment Grade",
      link: "RatingmovementassessmentGrade",
      id: "12",
    },
    {
      name: "List of default",
      link: "Listofdefault",
      id: "13",
    },
    {
      name: "Unsolicited rating",
      link: "Unsolicitedrating",
      id: "14",
    },
    {
      name: "updating of methodologies",
      link: "updatingofmethodologies",
      id: "15",
    },
    {
      name: "monitoring/surveillance",
      link: "monitoringsurveillance",
      id: "16",
    },
    {
      name: "Due to be reviewed ratings",
      link: "Duetobereviewedratings",
      id: "17",
    },
    {
      name: "ratings Downgrade/upgrade",
      link: "ratingsDowngradeupgrade",
      id: "18",
    },
    {
      name: "switch ratings",
      link: "switchratings",
      id: "19",
    },
    {
      name: "pvt ratings",
      link: "pvtratings",
      id: "20",
    },
    {
      name: "new rating agreements",
      link: "newratingagreements",
      id: "21",
    },
    {
      name: "rating withdrawn",
      link: "ratingwithdrawn",
      id: "22",
    },
    {
      name: "indicative ratings",
      link: "indicativeratings",
      id: "23",
    },
    {
      name: "new hiring HR",
      link: "newhiringHR",
      id: "24",
    },
    {
      name: "operation details",
      link: "operationdetails",
      id: "25",
    },
    {
      name: "rc details",
      link: "rcdetails",
      id: "26",
    },
    {
      name: "rc overdue",
      link: "rcoverdue",
      id: "27",
    },
    {
      link: "SECP pack",
      name: "SECPpack",
      id: "28",
    },
    {
      name: "Trainings Conducted",
      link: "TrainingsConducted",
      id: "29",
    },
    {
      name: "Consultancies Provided",
      link: "ConsultanciesProvided",
      id: "30",
    },
    {
      name: "Lead RC Rotation",
      link: "LeadRCRotation",
      id: "31",
    },
    {
      name: "Complaints Handled",
      link: "ComplaintsHandled",
      id: "32",
    },
    {
      name: "Software / System Changes",
      link: "SoftwareSystemChanges",
      id: "33",
    },
    {
      name: "Variation in Fee",
      link: "VariationinFee",
      id: "34",
    },
    {
      name: "Industry Specific Studies",
      link: "IndustrySpecificStudies",
      id: "35",
    },
    {
      name: "Analyst Rotation",
      link: "AnalystRotation",
      id: "36",
    },
    {
      name: "Team Rotation",
      link: "TeamRotation",
      id: "37",
    },
    {
      name: "Lead RC Rotation",
      link: "LeadRCRotation",
      id: "38",
    },
    {
      name: "Rating Movement more than One Notch",
      link: "MovementMoreThanOneNotch",
      id: "39",
    },
  ];
  const location = useLocation();

  return (
    <div className="h-100">
      <div>
        {location.pathname.includes("Undertakings") && <Undertaking />}
        {location.pathname.includes("DetailofRatingCommiteeofCRA") && 
          <DetailofRatingCommite /> }
        {location.pathname.includes("MovementofEachCreditRatings") && 
          <RatingMovement />}
        {location.pathname.includes("ratingmoventinvestmentgradeform") && 
          <RatingmoventIGF />}
        {location.pathname.includes("NewCreditRatingsAssigned") && 
          <NewRatings />}
        {location.pathname.includes("DirectorsDetails") &&  <DirectorsDetails />}
        {location.pathname.includes("SponsorsDetails") && <SponsorshipDetails />}
        {location.pathname.includes("CriteriaGroupDetails") && <CriteriaGroupDetails />}
        {location.pathname.includes("AnalystRotation") && <AnalystRotation />}
        {location.pathname.includes("TeamRotation") && <TeamRotation />}
        {location.pathname.includes("LeadRCRotation") && <LeadRcRotation />}
        {location.pathname.includes("MovementMoreThanOneNotch") && <Movementmorethanone />}
        {location.pathname.includes("ratingsDowngradeupgrade") && <RatingUpgradeDowngrade />}
        {location.pathname.includes("monitoringsurveillance") && <MonitoringSurveillance />}
        {location.pathname.includes("updatingofmethodologies") && <Updatingofmethodologies />}
        {location.pathname.includes("BetweentwoDates") && <RatingsBetweenTwoDates />}
        {location.pathname.includes("OutstandingonspecificDate") && <OutstandingOnSpecificDate />}
        {location.pathname.includes("Duetobereviewedratings") && <ToBeReviewedRatings />}
        {location.pathname.includes("switchratings") && <SwitchRating />}
        {location.pathname.includes("pvtratings") && <PvtRatings />}
        {location.pathname.includes("newratingagreements") && <NewRatingAgreements />}
        {location.pathname.includes("ratingwithdrawn") && <RatingWd />}
        {location.pathname.includes("indicativeratings") && <IndicativeRating />}
        {location.pathname.includes("newhiringHR") && <HrHirings />}
        {location.pathname.includes("operationdetails") && <OperationalDetails />}
        {location.pathname.includes("rcdetails") && <RcDetails />}
        {location.pathname.includes("rcoverdue") && <RcOverdue />}
        {location.pathname.includes("IndustrySpecificStudies") && <SectorStudies />}

        {/* <ReportsTables reportToOpen={reportToOpen} /> */}
      </div>
    </div>
  );
}

// <Box className={`p-1 mt-1 my-md-0 text-end text-md-center`}>
//   <>
//     <Fab
//       color="transparent"
//       aria-label="Date"
//       variant="extended"
//       className=" mb-1"
//     >
//       <CalendarMonth className="theme_text" />
//       <div className={`p-1 d-inline-flex`}>
//         <div className="m-1">
//           {/* <p className="theme_text me-1 my-auto"> From </p> */}
//           <input
//             type="date"
//             id="startDate"
//             //   onChange={(e) => setStartDate(e.target.value)}
//             className="px-1 btn_theme"
//             style={props.screenWidth < 400 ? { width: 125 } : null}
//           />
//         </div>
//         <div className="m-1">
//           {/* <p className="theme_text me-1 my-auto"> To </p> */}
//           <input
//             type="date"
//             id="endDate"
//             //   onChange={(e) => setEndDate(e.target.value)}
//             className="px-1 btn_theme"
//             style={props.screenWidth < 400 ? { width: 125 } : null}
//           />
//         </div>
//       </div>
//     </Fab>
//   </>
//   <Fab
//     color="neutral"
//     aria-label="edit"
//     variant="extended"
//     className="ms-2  mb-1"
//   >
//     <Autocomplete
//       id="val"
//       freeSolo
//       // autoSelect
//       // disableClearable
//       options={GridHeadings}
//       className="p-2"
//       getOptionLabel={(option) => option.name}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           // label="search reports here"
//           // defaultValue={(reportToOpen) => reportToOpen.name}
//           // hiddenLabel
//           // variant="outlined"
//           size="small"
//           style={{
//             width: "275px",
//             background: "#ffff",
//             //   height: "25px",
//           }}
//         />
//       )}
//       onChange={handleSearch}
//     />
//     <Search className="theme_text" />
//   </Fab>
// </Box>

{
  /* <div className="row container my-3">
<div className="col-md-4 p-3">
<TextField
    type="date"
    id="startDate"
    //   onChange={(e) => setStartDate(e.target.value)}
    className="btn_theme mx-3"
    variant="outlined"
    />
    <TextField
      type="date"
      id="endDate"
      //   onChange={(e) => setEndDate(e.target.value)}
      className="btn_theme mx-3"
      variant="outlined"
    />
    </div>
  <div className="col-md-4 p-3">
    <Autocomplete
    id="val"
      freeSolo
      autoSelect
      disableClearable
      options={GridHeadings}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
          <TextField
          {...params}
          label="Search for Reports"
          variant="outlined"
          />
          )}
          onChange={handleSearch}
          />
          </div>
</div> */
}

// const Item = styled(Paper)(({ theme }) => ({
//   ...theme.typography.body2,
//   textAlign: "center",
//   color: theme.palette.text.secondary,
//   height: 60,
//   lineHeight: "60px",
// }));

// const lightTheme = createTheme({ palette: { mode: "light" } });
