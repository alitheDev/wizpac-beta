import { Autocomplete, Box, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GetData from "../../../API/GetData";

export default function index(props) {
  const [sendingReq, setsendingReq] = useState(false);
  const [errorMessage, seterrorMessage] = useState(false);
  const history = useNavigate();

  const handleSearch = (event, newValue) => {
    setsendingReq(true);
    event.preventDefault();
    if (newValue !== null) {
      history(`/OpinionDetails/${newValue.OpinionId}`);
    }
  };

  return (
    <div className="col-md-6 mx-auto mt-5 vh-100">
      <div className="searchCard p-3 mt-5">
        <Stack>
          <Autocomplete
            id="val"
            freeSolo
            disableClearable
            options={props.Opinions}
            getOptionLabel={(option) =>
              `${option.Opinion} --
                ${option.OpinionId}`
            }
            renderOption={(props, option) => (
                <Box
                    component='li'
                    {...props}
                >
                    {option.Opinion}
                </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Opinion"
                variant="outlined"
              />
            )}
            onChange={handleSearch}
          />
        </Stack>
      </div>
    </div>
  );
}
