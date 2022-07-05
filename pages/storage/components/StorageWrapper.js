import {
  Box,
  Divider,
  Grid,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import moment from "moment";
import { DatePicker, TimePicker } from "@mui/lab";
import { useState } from "react";
import CustomOutlinedButton from "../../../components/CustomButton";
import FilterListIcon from "@mui/icons-material/FilterList";

const CustomInputField = styled(TextField)({
  width: "200px",
  background: "#132136",
  borderRadius: "9px",
  "& .MuiOutlinedInput-input": {
    color: "#6A7A93",
  },
  "& .MuiInputLabel-root": {
    color: "#6A7A93",
  },
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
  "&:hover .MuiOutlinedInput-input": {
    color: "#6A7A93",
  },
  "&:hover .MuiInputLabel-root": {
    color: "#6A7A93",
  },
  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: "9px",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
    color: "#6A7A93",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#6A7A93",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: "9px",
  },
  "& .MuiInputBase-input": {
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "17px",
    background: "#132136",
    borderRadius: "9px",
    height: "20px",
  },
  "& .MuiSelect-icon": {
    color: "white",
  },
});

const StorageWrapper = () => {
  const [date, setDate] = useState(null);
  const [hour, setHour] = useState(null);
  return (
    <Box>
      <Box display="flex" alignItems="center" m={2}>
        <CustomDatePicker label="Select Date" value={date} setValue={setDate} />
        <Box mx={2} />
        <CustomHourPicker label="Hour" value={hour} setValue={setHour} />
        <Box mx={2} />
        <CustomOutlinedButton
          text="filter"
          size="small"
          StartIcon={FilterListIcon}
        />
      </Box>
      <Divider />
      <Box sx={{ maxHeight: "calc( 100vh - 165px)", overflowY: "scroll" }}>
        <HourlyVideoContainer />
        <HourlyVideoContainer />
        <HourlyVideoContainer />
        <HourlyVideoContainer />
      </Box>
    </Box>
  );
};

export default StorageWrapper;

const HourlyVideoContainer = () => {
  return (
    <>
      <Box m={1} mx={2}>
        <Typography
          sx={{ fontWeight: "400", fontSize: "17px", color: "white" }}
        >
          Hour: 8 AM
        </Typography>
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          <Grid item xs={12} sm={6} lg={3}>
            <VideoThumbnail />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <VideoThumbnail />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <VideoThumbnail />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <VideoThumbnail />
          </Grid>
        </Grid>
      </Box>
      <Divider />
    </>
  );
};

const VideoThumbnail = () => {
  return (
    <Box position="relative" width="100%">
      <img src="images/thumbnail.png" width="100%" />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          background:
            "linear-gradient(180deg, #000000 0%, rgba(36, 36, 36, 0.22) 21.82%, rgba(72, 72, 72, 0) 52.94%, rgba(142, 142, 142, 0) 77.6%);",
        }}
      />
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          position: "absolute",
          top: 5,
          left: 0,
          height: "100%",
          width: "100%",
        }}
      >
        <Typography
          ml={2}
          sx={{
            color: "white",
            fontSize: "12px",
            lineHeight: "13px",
            fontWeight: "400",
          }}
        >
          12-08-22
        </Typography>
        <Typography
          mr={2}
          sx={{
            color: "white",
            fontSize: "12px",
            lineHeight: "13px",
            fontWeight: "400",
          }}
        >
          10:15 PM
        </Typography>
      </Box>
    </Box>
  );
};

const CustomDatePicker = ({ label, value, setValue }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        label={label}
        maxDate={moment()}
        value={value}
        inputFormat="DD MMM YYYY"
        onChange={(newValue) => {
          // console.log(newValue);
          setValue(newValue);
        }}
        renderInput={(params) => (
          <CustomInputField {...params} helperText={null} size="small" />
        )}
      />
    </LocalizationProvider>
  );
};

const CustomHourPicker = ({ label, value, setValue }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <TimePicker
        label={label}
        maxDate={moment()}
        value={value}
        inputFormat="HH"
        views={["hours"]}
        onChange={(newValue) => {
          // console.log(newValue);
          setValue(newValue);
        }}
        renderInput={(params) => (
          <CustomInputField {...params} helperText={null} size="small" />
        )}
      />
    </LocalizationProvider>
  );
};
