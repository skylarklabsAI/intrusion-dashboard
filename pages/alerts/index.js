import {
  Box,
  Divider,
  Grid,
  IconButton,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import MainLayout from "../../components/layouts/MainLayout";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import moment from "moment";
import { DatePicker, TimePicker } from "@mui/lab";
import { useEffect, useState } from "react";
import CustomOutlinedButton from "../../components/CustomButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CustomDropDown from "../../components/CustomDropDown";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const recordsList = {
  1: {
    sec: 2,
    cropped: ["1a21.png", "1a22.png"],
    full: ["1a11.png", "1a12.png"],
    location: "Backyard",
    camera: "Cam HX 2",
    suspects: 2,
    replace: false,
    thumbnail_url: "/images/house_entry_thumbnail.png",
  },

  2: {
    sec: 12,
    cropped: ["2a21.png", "2a22.png"],
    full: ["2a11.png", "2a12.png"],
    location: "Parking Lot",
    camera: "Front Cam LS 1",
    suspects: 2,
    replace: false,
    thumbnail_url: "/images/parking_lot_thumbnail.png",
  },

  3: {
    sec: 24,
    cropped: ["3a21.png", "3a22.png", "3a23.png"],
    full: ["3a11.png", "3a12.png", "3a13.png"],
    location: "Campus Exit",
    camera: "Cam T 100",
    suspects: 3,
    replace: true,
    thumbnail_url: "/images/house_exit_thumbnail.png",
  },
  4: {
    sec: 24,
    cropped: ["4a21.png", "4a22.png", "4a23.png", "4a24.png", "4a25.png"],
    full: ["4a11.png", "4a12.png", "4a13.png", "4a14.png", "4a15.png"],
    location: "Complex 4 - Region 2",
    camera: "Cam G 141",
    suspects: 5,
    replace: true,
    thumbnail_url: "/images/4a_thumbnail.png",
  },
};

const CustomInputField = styled(TextField)({
  width: "150px",
  background: "#132136",
  borderRadius: "9px !important",
  border: "none !important",
  "& .MuiOutlinedInput-input": {
    color: "#6A7A93",
    borderRadius: "9px",
  },
  "& .MuiInputLabel-root": {
    color: "#6A7A93",
    borderRadius: "9px",
  },
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
    borderRadius: "9px",
  },
  "&:hover .MuiOutlinedInput-input": {
    color: "#6A7A93",
    borderRadius: "9px",
  },
  "&:hover .MuiInputLabel-root": {
    color: "#6A7A93",
    borderRadius: "9px",
  },
  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: "9px",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
    color: "#6A7A93",
    borderRadius: "9px",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#6A7A93",
    borderRadius: "9px",
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

const AlertsPage = () => {
  const [alertsData, setAlertsData] = useState(recordsList);
  const [selectedAlert, setSelectedAlert] = useState(1);
  return (
    <Box
      sx={{
        bgcolor: "#040D18",
        width: "100%",
        minHeight: "calc( 100vh - 90px)",
      }}
    >
      <Grid container sx={{ height: "calc( 100vh - 90px)" }}>
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          sx={{
            height: "calc( 100vh - 90px)",
            borderRight: 1,
            borderColor: "rgba(57, 76, 104, 0.5)",
          }}
        >
          <ListWrapper
            alertsData={alertsData}
            setSelectedAlert={setSelectedAlert}
            selectedAlert={selectedAlert}
          />
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          sx={{
            height: "calc( 100vh - 90px)",
          }}
        >
          <DetailWrapper
            alertsData={alertsData}
            selectedAlert={selectedAlert}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

AlertsPage.Layout = MainLayout;

export default AlertsPage;

const DetailWrapper = ({ alertsData, selectedAlert }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    setIndex(0);
  }, [selectedAlert]);
  return (
    <Box sx={{ maxHeight: "calc( 100vh - 90px)", overflowY: "scroll" }}>
      <Box m={2}>
        <Typography
          mb={1}
          sx={{ color: "#EDEDED", fontWeight: "500" }}
          variant="h5"
        >
          Alert Details
        </Typography>
        <FullImageCard
          index={index}
          setIndex={setIndex}
          alertsData={alertsData}
          selectedAlert={selectedAlert}
        />
      </Box>
      <Divider />
      <Box display="flex">
        <Box m={2} width="100%">
          <Box
            display="flex"
            justifyContent="space-between"
            mb={1}
            sx={{ color: "#EDEDED" }}
          >
            <Typography
              sx={{ color: "#EDEDED", fontWeight: "500" }}
              variant="h6"
            >
              Intruders Captured
            </Typography>
            <Typography>
              {alertsData &&
                alertsData[selectedAlert] &&
                alertsData[selectedAlert]["suspects"]}
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {alertsData &&
              alertsData[selectedAlert] &&
              alertsData[selectedAlert]["cropped"].map((url, pos) => {
                return (
                  <IntrudersCard
                    url={url}
                    key={url}
                    isSelected={pos === index}
                    onClick={() => {
                      setIndex(pos);
                    }}
                  />
                );
              })}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

const FullImageCard = ({ alertsData, selectedAlert, index, setIndex }) => {
  return (
    <Box position="relative">
      <img
        src={
          alertsData &&
          alertsData[selectedAlert] &&
          alertsData[selectedAlert]["full"][index]
        }
        width="100%"
        style={{ marginBottom: "-5px", borderRadius: "9px" }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          borderRadius: "9px",
          background:
            "linear-gradient(0deg, rgba(18, 23, 69, 0.75) 0%, rgba(36, 36, 36, 0.22) 40.41%, rgba(142, 142, 142, 0) 77.6%)",
        }}
      />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        sx={{
          position: "absolute",
          bottom: 5,
          left: 0,
        }}
      >
        <IconButton
          onClick={() => {
            setIndex(index - 1);
          }}
          disabled={index === 0}
          sx={{ ml: 1 }}
        >
          <ArrowBackIosIcon sx={{ fontSize: "18px" }} />
        </IconButton>
        <Typography>
          {index + 1} /{" "}
          {alertsData &&
            alertsData[selectedAlert] &&
            alertsData[selectedAlert]["cropped"].length}
        </Typography>
        <IconButton
          sx={{ mr: 1 }}
          onClick={() => {
            setIndex((index + 1) % alertsData[selectedAlert]["cropped"].length);
          }}
        >
          <ArrowForwardIosIcon sx={{ fontSize: "18px" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

const IntrudersCard = ({ url, isSelected, onClick = () => {} }) => {
  return (
    <Grid item xs={12} md={6} lg={3}>
      <Box
        onClick={onClick}
        position="relative"
        width="100%"
        height="300px"
        borderRadius="5px"
        sx={{
          overflow: "hidden",
          border: isSelected ? "3px solid #1170FF" : "none",
          cursor: "pointer",
        }}
      >
        <img src={url} width="100%" />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            background:
              "linear-gradient(0deg, #613131 0%, rgba(36, 36, 36, 0.22) 21.82%, rgba(72, 72, 72, 0) 52.94%, rgba(142, 142, 142, 0) 77.6%)",
          }}
        />
        <Box
          width="100%"
          sx={{
            position: "absolute",
            bottom: 5,
            left: 0,
          }}
        >
          <Typography
            mr={2}
            sx={{
              textAlign: "right",
              color: "white",
              fontSize: "12px",
              lineHeight: "13px",
              fontWeight: "400",
            }}
          >
            {/* 10:15 PM */}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

const ListWrapper = ({ alertsData, setSelectedAlert, selectedAlert }) => {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [menuList, setMenuList] = useState({ all: "All Cameras" });
  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };
  return (
    <Box>
      <Box display="flex" flexWrap="wrap" alignItems="center" m={2}>
        <Box mr={2}>
          <CustomDatePicker
            label="Date - From"
            value={from}
            setValue={setFrom}
          />
        </Box>
        <Box m={2} ml={0}>
          <CustomDatePicker label="Date - To" value={to} setValue={setTo} />
        </Box>
        <Tooltip title="Disabled">
          <Box m={2} ml={0}>
            <CustomDropDown
              Icon={LocationOnIcon}
              value={selectedLocation}
              handleChange={handleLocationChange}
              menuList={menuList}
              disabled
            />
          </Box>
        </Tooltip>
        <Box flex={1} />
        <CustomOutlinedButton
          text="Filter"
          size="small"
          StartIcon={FilterListIcon}
          sx={{ fontWeight: "400" }}
          disabled
        />
      </Box>
      <Divider />
      <Grid
        container
        spacing={2}
        p={2}
        sx={{ maxHeight: "calc( 100vh - 180px)", overflowY: "scroll" }}
      >
        {Object.keys(alertsData).map((key) => {
          return (
            <AlertCard
              key={key}
              isSelected={key === selectedAlert}
              data={alertsData[key]}
              onClick={() => {
                setSelectedAlert(key);
              }}
            />
          );
        })}
      </Grid>
    </Box>
  );
};

const AlertCard = ({ isSelected, data, onClick = () => {} }) => {
  return (
    <Grid
      item
      xs={12}
      md={12}
      lg={6}
      sx={{ cursor: "pointer" }}
      onClick={onClick}
    >
      <Box
        width="100%"
        position="relative"
        sx={{
          border: isSelected ? "3px solid #1170FF" : "none",
          borderRadius: "9px",
          overflow: "hidden",
        }}
      >
        <img
          src={data && data["thumbnail_url"]}
          width="100%"
          style={{ marginBottom: "-5px" }}
        />
        <Box
          position="absolute"
          height="100%"
          width="100%"
          top="0px"
          sx={{
            background:
              "linear-gradient(0deg, rgba(18, 23, 69, 0.75) 0%, rgba(36, 36, 36, 0.22) 40.41%, rgba(142, 142, 142, 0) 77.6%)",
          }}
        />
        <Box
          position="absolute"
          height="100%"
          width="100%"
          top="0px"
          sx={{
            background:
              "linear-gradient(180deg, rgba(18, 23, 69, 0.75) 0%, rgba(36, 36, 36, 0.22) 40.41%, rgba(142, 142, 142, 0) 77.6%)",
          }}
        />
        <Box
          position="absolute"
          width="100%"
          bottom="10px"
          display="flex"
          justifyContent="space-between"
        >
          <Typography ml={1} variant="body2">
            {data && data["location"]}
          </Typography>
          <Typography mr={1} variant="body2">
            Suspects: {data && data["suspects"]}
          </Typography>
        </Box>
        <Box position="absolute" width="100%" top="10px">
          <Typography ml={1} variant="body2">
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

const CustomDatePicker = ({ label, value, setValue }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        label={label}
        disabled
        maxDate={moment()}
        value={value}
        inputFormat="DD MMM YYYY"
        sx={{ borderRadius: "9px !important" }}
        onChange={(newValue) => {
          // console.log(newValue);
          setValue(newValue);
        }}
        renderInput={(params) => (
          <Tooltip title="Disabled">
            <CustomInputField {...params} helperText={null} size="small" />
          </Tooltip>
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
