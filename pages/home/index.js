import * as React from "react";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import MainLayout from "../../components/layouts/MainLayout";
import VideocamIcon from "@mui/icons-material/Videocam";
import LinkedCameraIcon from "@mui/icons-material/LinkedCamera";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CustomDropDown from "../../components/CustomDropDown";
import AddIcon from "@mui/icons-material/Add";
import CameraSlider from "./components/CameraSlider";
import GroupIcon from "@mui/icons-material/Group";
import AlertDialog from "./components/AlertDialog";
import DetailCard from "./components/DetailCard";
import DummyPlayer from "../../components/DummyPlayer";

const locations = {
  1: {
    name: "Parking Lot",
    cameras: [
      {
        camera_id: 1,
        name: "Front Cam LS 1",
        url: "/2a.mp4",
        thumbnail_url: "/images/parking_lot_thumbnail.png",
      },
    ],
  },
  2: {
    name: "Backyard",
    cameras: [
      {
        camera_id: 2,
        name: "Cam HX 2",
        url: "/1a.mp4",
        thumbnail_url: "/images/house_entry_thumbnail.png",
      },
    ],
  },
  3: {
    name: "Campus Exit",
    cameras: [
      {
        camera_id: 3,
        name: "Cam T 100",
        url: "/3a.mp4",
        thumbnail_url: "/images/house_exit_thumbnail.png",
      },
    ],
  },
  4: {
    name: "Complex 4 - Region 2",
    cameras: [
      {
        camera_id: 4,
        name: "Cam G 141",
        url: "/4a.mp4",
        thumbnail_url: "/images/4a_thumbnail.png",
      },
    ],
  },
};

const cameraList = [
  {
    camera_id: 1,
    name: "Front Cam LS 1",
    url: "/2a.mp4",
    thumbnail_url: "/images/parking_lot_thumbnail.png",
  },
  {
    camera_id: 2,
    name: "Cam HX 2",
    url: "/1a.mp4",
    thumbnail_url: "/images/house_entry_thumbnail.png",
  },
  {
    camera_id: 3,
    name: "Cam T 100",
    url: "/3a.mp4",
    thumbnail_url: "/images/house_exit_thumbnail.png",
  },
  {
    camera_id: 4,
    name: "Cam G 141",
    url: "/4a.mp4",
    thumbnail_url: "/images/4a_thumbnail.png",
  },
];

const recordList = [
  // {
  //   location: "Lobby",
  //   camera: "Lobby Cam 3",
  //   time: "11:20 PM",
  //   suspects: 2,
  //   image_url: "images/thumbnail.png",
  // },
];

const HomeScreen = () => {
  const [selectedLocation, setSelectedLocation] = React.useState("all");
  const [selectedCamera, setSelectedCamera] = React.useState(cameraList[0]);
  const [records, setRecords] = React.useState([]);
  const [openAlertDialog, setOpenAlertDialog] = React.useState(false);
  const [alertData, setAlertData] = React.useState({});
  const [waiting, setWaiting] = React.useState(false);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const playNext = () => {
    console.log("start");
    if (openAlertDialog === true) {
      setWaiting(true);
      return;
    }
    setSelectedCamera(cameraList[selectedCamera["camera_id"] % 4]);
    console.log("done");
  };

  React.useEffect(() => {
    if (!openAlertDialog && waiting) {
      sleep(1000).then(() => {
        setSelectedCamera(cameraList[selectedCamera["camera_id"] % 4]);
        setWaiting(false);
      });
    }
  }, [openAlertDialog]);

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
          xs={12}
          md={8}
          sx={{
            borderRight: 1,
            borderColor: "rgba(57, 76, 104, 0.5)",
          }}
        >
          <LiveWrapper
            locations={locations}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            selectedCamera={selectedCamera}
            setSelectedCamera={setSelectedCamera}
            records={records}
            setRecords={setRecords}
            openAlertDialog={openAlertDialog}
            setOpenAlertDialog={setOpenAlertDialog}
            alertData={alertData}
            setAlertData={setAlertData}
            playNext={playNext}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <RecordsWrapper
            records={records}
            openAlertDialog={openAlertDialog}
            setOpenAlertDialog={setOpenAlertDialog}
            alertData={alertData}
            setAlertData={setAlertData}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

HomeScreen.Layout = MainLayout;
export default HomeScreen;

const RecordsWrapper = ({
  records,
  openAlertDialog,
  setOpenAlertDialog,
  alertData,
  setAlertData,
}) => {
  return (
    <Box>
      <RecordContainer
        label="Intrusion Alerts"
        records={records}
        Icon={GroupIcon}
        openAlertDialog={openAlertDialog}
        setOpenAlertDialog={setOpenAlertDialog}
        alertData={alertData}
        setAlertData={setAlertData}
      />
    </Box>
  );
};

const RecordContainer = ({
  label,
  records,
  Icon = React.Fragment,
  openAlertDialog,
  setOpenAlertDialog,
  alertData,
  setAlertData,
}) => {
  return (
    <Box>
      <AlertDialog
        open={openAlertDialog}
        handleClose={() => {
          setOpenAlertDialog(false);
        }}
        alertData={alertData}
      />
      <Box display="flex" alignItems="center" m={1}>
        <Icon />
        <Typography
          variant="h6"
          ml={1}
          sx={{ color: "#EDEDED", fontWeight: "600" }}
        >
          {label}
        </Typography>
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        maxHeight={"calc( 100vh - 140px )"}
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ overflowY: "scroll" }}
        mb={1}
      >
        {records.map((obj, val) => {
          return (
            <DetailCard
              key={val}
              record={obj}
              onClick={() => {
                setAlertData(obj);
                setOpenAlertDialog(true);
              }}
            />
          );
        })}
      </Box>
      {/* <Divider /> */}
    </Box>
  );
};

const LiveWrapper = ({
  locations,
  selectedLocation,
  setSelectedLocation,
  selectedCamera,
  setSelectedCamera,
  records,
  setRecords,
  openAlertDialog,
  setOpenAlertDialog,
  alertData,
  setAlertData,
  playNext,
}) => {
  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };
  const [menuList, setMenuList] = React.useState({});
  React.useEffect(() => {
    const temp = { all: "All Cameras" };
    // const flag = true;
    Object.keys(locations).map((id) => {
      temp[id] = locations[id]["name"];
      // if (flag && locations[id]["cameras"].length) {
      //   setSelectedCamera(locations[id]["cameras"][0]);
      //   flag = false;
      // }
    });
    setMenuList(temp);
  }, []);
  return (
    <Box>
      <Box sx={{ height: "calc( 100vh - 350px)" }} m={1}>
        <Box display="flex" alignItems="center">
          <VideocamIcon />
          <Typography
            ml={1}
            variant="h6"
            sx={{ color: "#EDEDED", fontWeight: "600" }}
          >
            {selectedCamera ? selectedCamera["name"] : "Camera Name"}
          </Typography>
        </Box>
        {/* live player */}
        <Box
          my={1}
          width="100%"
          height="calc( 100% - 45px)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ overflow: "hidden" }}
        >
          <DummyPlayer
            url={selectedCamera && selectedCamera["url"]}
            records={records}
            setRecords={setRecords}
            selectedCamera={selectedCamera}
            openAlertDialog={openAlertDialog}
            setOpenAlertDialog={setOpenAlertDialog}
            alertData={alertData}
            setAlertData={setAlertData}
            playNext={playNext}
          />
        </Box>
      </Box>
      <Divider />
      <Box sx={{ height: "225px" }} m={1}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex">
            <LinkedCameraIcon />{" "}
            <Typography
              ml={1}
              variant="h5"
              sx={{ color: "#EDEDED", fontWeight: "600" }}
            >
              Cameras
            </Typography>
          </Box>
          <Box display="flex">
            <CustomDropDown
              Icon={LocationOnIcon}
              value={selectedLocation}
              handleChange={handleLocationChange}
              menuList={menuList}
            />
            <IconButton sx={{ ml: 1 }}>
              <AddIcon />
            </IconButton>
          </Box>
        </Box>
        <CameraSlider
          locations={locations}
          selectedLocation={selectedLocation}
          selectedCamera={selectedCamera}
          setSelectedCamera={setSelectedCamera}
        />
      </Box>
    </Box>
  );
};
