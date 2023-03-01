import React, { useState } from "react";
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import Box from "@mui/material/Box";
// import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
// import { Link } from "react-router-dom";
import {
  Autocomplete,
  Box,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "@material-ui/core";
export default function Index() {
  const GridHeadings = [
    {
      name: "RC Data",
      link: "RCData",
      dateModel: "none",
      id: "1",
    },
    {
      name: "Between two Dates",
      link: "BetweentwoDates",
      dateModel: "double",
      id: "2",
    },
    {
      name: "Outstanding on specific Date",
      link: "OutstandingonspecificDate",
      dateModel: "single",
      id: "3",
    },
    {
      name: "VIS Outstanding on specific Date",
      link: "VISOutstandingonspecificDate",
      dateModel: "single",
      id: "4",
    },
    {
      name: "Undertakings",
      link: "Undertakings",
      dateModel: "none",
      id: "5",
    },
    {
      name: "Sponsors Details",
      link: "SponsorsDetails",
      dateModel: "none",
      id: "6",
    },
    {
      name: "Directors Details",
      link: "DirectorsDetails",
      dateModel: "none",
      id: "7",
    },
    {
      name: "Criteria Group Details",
      link: "CriteriaGroupDetails",
      dateModel: "none",
      id: "8",
    },
    {
      name: "Detail of Rating Commitee of CRA",
      link: "DetailofRatingCommiteeofCRA",
      dateModel: "none",
      id: "9",
    },
    {
      name: "New Credit Ratings Assigned",
      link: "NewCreditRatingsAssigned",
      dateModel: "double",
      id: "10",
    },
    {
      name: "Movement of Each Credit Ratings",
      link: "MovementofEachCreditRatings",
      dateModel: "double",
      id: "11",
    },
    {
      name: "Rating movement Investment Grade",
      link: "ratingmoventinvestmentgradeform",
      dateModel: "double",
      id: "12",
    },
    {
      name: "List of default",
      link: "Listofdefault",
      dateModel: "none",
      id: "13",
    },
    {
      name: "Unsolicited rating",
      link: "Unsolicitedrating",
      dateModel: "double",
      id: "14",
    },
    {
      name: "updating of methodologies",
      link: "updatingofmethodologies",
      dateModel: "double",
      id: "15",
    },
    {
      name: "monitoring/surveillance",
      link: "monitoringsurveillance",
      dateModel: "double",
      id: "16",
    },
    {
      name: "Due to be reviewed ratings",
      link: "Duetobereviewedratings",
      dateModel: "double",
      id: "17",
    },
    {
      name: "ratings Downgrade/upgrade",
      link: "ratingsDowngradeupgrade",
      dateModel: "double",
      id: "18",
    },
    {
      name: "switch ratings",
      link: "switchratings",
      dateModel: "double",
      id: "19",
    },
    {
      name: "pvt ratings",
      link: "pvtratings",
      dateModel: "double",
      id: "20",
    },
    {
      name: "new rating agreements",
      link: "newratingagreements",
      dateModel: "double",
      id: "21",
    },
    {
      name: "rating withdrawn",
      link: "ratingwithdrawn",
      dateModel: "double",
      id: "22",
    },
    {
      name: "indicative ratings",
      link: "indicativeratings",
      dateModel: "double",
      id: "23",
    },
    {
      name: "new hiring HR",
      link: "newhiringHR",
      dateModel: "double",
      id: "24",
    },
    {
      name: "operation details",
      link: "operationdetails",
      dateModel: "double",
      id: "25",
    },
    {
      name: "rc details",
      link: "rcdetails",
      dateModel: "double",
      id: "26",
    },
    {
      name: "rc overdue",
      link: "rcoverdue",
      dateModel: "double",
      id: "27",
    },
    {
      link: "SECP pack",
      dateModel: "none",
      name: "SECPpack",
      id: "28",
    },
    {
      name: "Trainings Conducted",
      link: "TrainingsConducted",
      dateModel: "none",
      id: "29",
    },
    {
      name: "Consultancies Provided",
      link: "ConsultanciesProvided",
      dateModel: "none",
      id: "30",
    },
    {
      name: "Lead RC Rotation",
      link: "LeadRCRotation",
      dateModel: "none",
      id: "31",
    },
    {
      name: "Complaints Handled",
      link: "ComplaintsHandled",
      dateModel: "none",
      id: "32",
    },
    {
      name: "Software / System Changes",
      link: "SoftwareSystemChanges",
      dateModel: "none",
      id: "33",
    },
    {
      name: "Variation in Fee",
      link: "VariationinFee",
      dateModel: "none",
      id: "34",
    },
    {
      name: "Industry Specific Studies",
      link: "IndustrySpecificStudies",
      dateModel: "double",
      id: "35",
    },
    {
      name: "Analyst Rotation",
      link: "AnalystRotation",
      dateModel: "none",
      id: "36",
    },
    {
      name: "Team Rotation",
      link: "TeamRotation",
      dateModel: "none",
      id: "37",
    },
    {
      name: "Lead RC Rotation",
      link: "LeadRCRotation",
      dateModel: "none",
      id: "38",
    },
    {
      name: "Rating Movement more than One Notch",
      link: "MovementMoreThanOneNotch",
      dateModel: "double",
      id: "39",
    },
  ];
  const [sendingReq, setsendingReq] = useState(false);
  const [open, setOpen] = useState(false);
  const [sindleDateFilter, setsindleDateFilter] = useState(false);
  const [searchedLink, setsearchedLink] = useState();
  const [searchedName, setsearchedName] = useState();
  const [StartDate, setStartDate] = useState();
  const [EndDate, setEndDate] = useState();
  const [value, setValue] = React.useState([null, null]);
  const history = useNavigate();

  const style = {
    position: "absolute",
    top: "35%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleSearch = (event, newValue) => {
    setsendingReq(true);
    event.preventDefault();
    if (newValue !== null) {
      if (newValue.dateModel === "none") {
        history(`/Reports/${newValue.link}`);
      } else {
        setOpen(true);
        setsearchedName(newValue.name);
        setsearchedLink(newValue.link);
        if (newValue.dateModel === "single") setsindleDateFilter(true);
        else setsindleDateFilter(false);
      }
    }
  };

  const onSubmit = () => {
    setsendingReq(true);
    if (StartDate !== null && EndDate !== null) {
      history(`/Reports/${searchedLink}`);
    }
  };

  return (
    <>
      <div className="col-md-4 mx-auto mt-2 vh-100">
        <Stack>
          <Autocomplete
            id="val"
            freeSolo
            disableClearable
            options={GridHeadings}
            getOptionLabel={(option) => `${option.id}:  ${option.name}`}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search for Reports"
                variant="outlined"
              />
            )}
            onChange={handleSearch}
          />
        </Stack>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="col-md-8 mx-auto"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Select Date Range for
          </Typography>
          <Typography className="text-warning" variant="h5">
            {searchedName}
          </Typography>
          <Box className="row">
            <TextField
              type="date"
              id="startDate"
              onChange={(e) =>
                localStorage.setItem("reportsfirstDate", e.target.value)
              }
              className="btn_theme my-1"
              variant="outlined"
            />
            {sindleDateFilter ? null : (
              <TextField
                type="date"
                id="endDate"
                onChange={(e) =>
                  localStorage.setItem("reportslastDate", e.target.value)
                }
                className="btn_theme my-1"
                variant="outlined"
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="btn_theme my-1"
              onClick={onSubmit}
            >
              Search
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

// return (
//   <Grid container spacing={2}>
//     {[lightTheme].map((theme, index) => (
//       <Grid item xs={12} key={index}>
//         <ThemeProvider theme={theme}>
//           <Box
//             sx={{
//               p: 2,
//               bgcolor: "background.default",
//               display: "grid",
//               gridTemplateColumns: { md: "1fr 1fr" },
//               gap: 2,
//             }}
//           >
//             {GridHeadings.map((each) => (
//               <Link to={each.link}>
//                 <Item key={each} each={each}>
//                   {each.name}
//                 </Item>
//               </Link>
//             ))}
//           </Box>
//         </ThemeProvider>
//       </Grid>
//     ))}
//   </Grid>
