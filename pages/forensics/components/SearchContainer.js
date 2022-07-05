import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Button, Grid, TextField } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import moment from "moment";
import { DateTimePicker } from "@mui/lab";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

const CustomInputField = styled(TextField)({
  width: "100%",
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

const SearchContainer = ({ setVehicleRecords, setVehicleRecordsCount }) => {
  const [from, setFrom] = React.useState(null);
  const [to, setTo] = React.useState(null);
  const [speeding, setSpeeding] = React.useState("");
  const [color, setColor] = React.useState("");
  const [camera, setCamera] = React.useState("");
  const [type, setType] = React.useState("");
  const [plate, setPlate] = React.useState("");

  let api = axios.create({
    baseURL: "http://3.235.51.26:8000",
    headers: { "Content-Type": "application/json" },
  });

  const handleSpeedingChange = (event) => {
    setSpeeding(event.target.value);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleCameraChange = (event) => {
    setCamera(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleSearch = () => {
    console.log(moment(from).toISOString());
    const url = "/app/plate/?limit=40";
    if (color !== "") url += `&color=${color}`;
    if (type !== "") url += `&type=${type}`;
    if (plate !== "") url += `&number_plate=${plate}`;
    if (from !== null) url += `&start_time=${moment(from).toISOString()}`;
    if (to !== null) url += `&end_time=${moment(to).toISOString()}`;
    api
      .get(url)
      .then((res) => {
        console.log(res.data);
        setVehicleRecords(res.data.results);
        setVehicleRecordsCount(res.data.count);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  React.useEffect(() => {
    handleSearch();
  }, []);

  return (
    <Box>
      <Grid container spacing={2} px={2} py={1}>
        <Grid item xs={12} sm={6}>
          <CustomDatePicker
            label="Arrived - From"
            value={from}
            setValue={setFrom}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomDatePicker label="Arrived - To" value={to} setValue={setTo} />
        </Grid>
      </Grid>
      <Grid container spacing={2} px={2} py={1}>
        <Grid item xs={12} sm={6}>
          <CustomDropDown
            label="Camera"
            value={camera}
            handleChange={handleCameraChange}
            menuList={[{ name: "Main Road", value: "12345" }]}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomDropDown
            label="Gender"
            value={speeding}
            handleChange={handleSpeedingChange}
            menuList={[
              { name: "Yes", value: "Yes" },
              { name: "No", value: "No" },
            ]}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} px={2} py={1}>
        <Grid item xs={12} sm={6}>
          <CustomDropDown
            label="Unknown"
            value={color}
            handleChange={handleColorChange}
            menuList={[
              { name: "Red", value: "red" },
              { name: "Blue", value: "blue" },
              { name: "Yellow", value: "yellow" },
              { name: "White", value: "white" },
              { name: "Black", value: "black" },
              { name: "Silver", value: "silver" },
              { name: "Green", value: "green" },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomInputField
            label="Name"
            size="small"
            variant="outlined"
            value={plate}
            onChange={(e) => {
              setPlate(e.target.value);
            }}
          />
          {/* <CustomDropDown
            label="Type"
            value={type}
            handleChange={handleTypeChange}
            menuList={[
              { name: "Sedan", value: "Sedan" },
              { name: "Bus", value: "Bus" },
              { name: "Motorcycle", value: "Motorcycle" },
              { name: "Pickup Truck", value: "Pickup Truck" },
              { name: "Big Truck/Truck", value: "Truck" },
              { name: "Sport Utility Vehicle (SUV)", value: "SUV" },
              { name: "Van", value: "Van" },
              // { name: "Bicycle", value: "bicycle" },
              // { name: "Bus", value: "bus" },
              // { name: "Van", value: "van" },
            ]}
          /> */}
        </Grid>
      </Grid>
      <Grid container spacing={2} px={2} py={1}>
        <Grid item xs={12} sm={6}>
          <CustomInputField
            label="Age"
            size="small"
            variant="outlined"
            value={plate}
            onChange={(e) => {
              setPlate(e.target.value);
            }}
          />
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="center" mb={2} py={1}>
        <Button
          sx={{
            width: "90%",
            background: "#29198C",
            borderRadius: "30px",
            textTransform: "none",
          }}
          onClick={() => {
            handleSearch();
          }}
        >
          Perform Forensics Search
        </Button>
      </Box>
    </Box>
  );
};

const CustomDropDown = ({ label, value, handleChange, menuList = [] }) => {
  return (
    <FormControl sx={{ width: "100%", border: "none" }} size="small">
      <InputLabel id={label} sx={{ color: "rgba(106, 122, 147, 1)" }}>
        {label}
      </InputLabel>
      <Select
        labelId={label}
        id={label}
        value={value}
        label={label}
        sx={{
          color: "rgba(106, 122, 147, 1)",
          width: "100%",
          background: "#132136",
          border: "none !important",
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none !important",
            borderRadius: "5px 5px 0 0",
          },
        }}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {menuList.map((menu) => {
          return (
            <MenuItem key={menu["value"]} value={menu["value"]}>
              {menu["name"]}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const CustomDatePicker = ({ label, value, setValue }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DateTimePicker
        label={label}
        maxDate={moment()}
        value={value}
        inputFormat="DD MMM YYYY HH:MM"
        onChange={(newValue) => {
          console.log(newValue);
          setValue(newValue);
        }}
        renderInput={(params) => (
          <CustomInputField {...params} helperText={null} size="small" />
        )}
      />
    </LocalizationProvider>
  );
};

export default SearchContainer;
