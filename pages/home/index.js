import * as React from "react";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
  Slide,
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
import useAuth, { ProtectRoute } from "../../auth/authContext";
import AddCameraModal from "./components/AddCameraModal";
import dynamic from "next/dynamic";
const Player =
  // global?.window &&
  dynamic(() => import("../../components/Player"), { ssr: false });

const locations = {
  // 1: {
  //   name: "Parking Lot",
  //   cameras: [
  //     {
  //       camera_id: 1,
  //       name: "Front Cam LS 1",
  //       url: "/2a.mp4",
  //       thumbnail_url: "/images/parking_lot_thumbnail.png",
  //     },
  //   ],
  // },
  // 2: {
  //   name: "Backyard",
  //   cameras: [
  //     {
  //       camera_id: 2,
  //       name: "Cam HX 2",
  //       url: "/1a.mp4",
  //       thumbnail_url: "/images/house_entry_thumbnail.png",
  //     },
  //   ],
  // },
  // 3: {
  //   name: "Campus Exit",
  //   cameras: [
  //     {
  //       camera_id: 3,
  //       name: "Cam T 100",
  //       url: "/3a.mp4",
  //       thumbnail_url: "/images/house_exit_thumbnail.png",
  //     },
  //   ],
  // },
  // 4: {
  //   name: "Complex 4 - Region 2",
  //   cameras: [
  //     {
  //       camera_id: 4,
  //       name: "Cam G 141",
  //       url: "/4a.mp4",
  //       thumbnail_url: "/images/4a_thumbnail.png",
  //     },
  //   ],
  // },
};

const cameraList = [
  // {
  //   camera_id: 1,
  //   name: "Front Cam LS 1",
  //   url: "/2a.mp4",
  //   thumbnail_url: "/images/parking_lot_thumbnail.png",
  // },
  // {
  //   camera_id: 2,
  //   name: "Cam HX 2",
  //   url: "/1a.mp4",
  //   thumbnail_url: "/images/house_entry_thumbnail.png",
  // },
  // {
  //   camera_id: 3,
  //   name: "Cam T 100",
  //   url: "/3a.mp4",
  //   thumbnail_url: "/images/house_exit_thumbnail.png",
  // },
  // {
  //   camera_id: 4,
  //   name: "Cam G 141",
  //   url: "/4a.mp4",
  //   thumbnail_url: "/images/4a_thumbnail.png",
  // },
];

const HomeScreen = () => {
  const [selectedLocation, setSelectedLocation] = React.useState("all");
  const [selectedCamera, setSelectedCamera] = React.useState(null);
  const [records, setRecords] = React.useState([]);
  const [openAlertDialog, setOpenAlertDialog] = React.useState(false);
  const [alertData, setAlertData] = React.useState({});
  const [waiting, setWaiting] = React.useState(false);
  const { fetch_cameras, cameraList, fetch_notifications } = useAuth();

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  React.useEffect(() => {
    fetch_cameras();
  }, []);

  let alertsinterval;

  const handleFetchNotifications = () => {
    fetch_notifications("?limit=40")
      .then((res) => {
        console.log(res.data);
        setRecords(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    if (!selectedCamera) return;
    handleFetchNotifications();
    alertsinterval = setInterval(() => {
      handleFetchNotifications();
    }, 5000);
    return () => {
      clearInterval(alertsinterval);
    };
  }, [selectedCamera]);

  React.useEffect(() => {
    if (cameraList.length !== 0) {
      setSelectedCamera(cameraList[0]);
    }
  }, [cameraList]);

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
          xl={9}
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
            cameraList={cameraList}
          />
        </Grid>
        <Grid item xs={12} md={4} xl={3}>
          <RecordsWrapper
            records={records}
            setRecords={setRecords}
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

const ProtectedHomeScreen = ProtectRoute(HomeScreen);
ProtectedHomeScreen.Layout = MainLayout;
export default ProtectedHomeScreen;

const RecordsWrapper = ({
  records,
  openAlertDialog,
  setOpenAlertDialog,
  alertData,
  setAlertData,
  setRecords,
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
        setRecords={setRecords}
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
  setRecords,
}) => {
  const { notification_resolve, notification_unresolve } = useAuth();
  return (
    <Box>
      <AlertDialog
        open={openAlertDialog}
        handleClose={() => {
          setOpenAlertDialog(false);
        }}
        alertData={alertData}
        onResponding={() => {
          notification_resolve(alertData["id"])
            .then((res) => {
              console.log(res);
              const tempList = records.map((item) => {
                if (item["id"] === alertData["id"]) {
                  item["isresolved"] = true;
                }
                return item;
              });
              setRecords(tempList);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
        onRevert={() => {
          notification_unresolve(alertData["id"])
            .then((res) => {
              console.log(res);
              const tempList = records.map((item) => {
                if (item["id"] === alertData["id"]) {
                  item["isresolved"] = false;
                }
                return item;
              });
              console.log(tempList);
              setRecords(tempList);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
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
        width="100%"
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
                console.log("hello");
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
  cameraList,
}) => {
  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };
  const [menuList, setMenuList] = React.useState({});
  const [openAddCameraModal, setOpenAddCameraModal] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const temp = { all: "All Cameras" };

    // const flag = true;
    // Object.keys(locations).map((id) => {
    //   temp[id] = locations[id]["name"];
    //   // if (flag && locations[id]["cameras"].length) {
    //   //   setSelectedCamera(locations[id]["cameras"][0]);
    //   //   flag = false;
    //   // }
    // });
    setMenuList(temp);
  }, []);
  return (
    <Box>
      <Box
        sx={{
          height: open ? "calc( 100vh - 350px)" : "calc( 100vh - 160px)",
          // height: "calc( 100vh - 350px)",
          // "@media (max-height: 650px)": {
          //   height: "calc( 100vh - 250px)",
          // },
          // "@media (max-height: 450px)": {
          //   height: "calc( 100vh - 200px)",
          // },
        }}
        m={1}
      >
        <Box display="flex" alignItems="center">
          <AddCameraModal
            open={openAddCameraModal}
            handleClose={() => {
              setOpenAddCameraModal(false);
            }}
          />
          <VideocamIcon />
          <Typography
            ml={1}
            variant="h6"
            sx={{ color: "#EDEDED", fontWeight: "600" }}
          >
            {selectedCamera ? selectedCamera["label"] : "Camera Name"}
          </Typography>
        </Box>
        {/* live player */}
        <Box
          my={1}
          // width="100%"
          height="calc( 100% - 45px)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ overflow: "hidden" }}
        >
          {selectedCamera && selectedCamera["stream_url"] ? (
            <Player
              url={selectedCamera["stream_url"]}
              key={selectedCamera["stream_url"]}
            />
          ) : (
            <Box></Box>
          )}
        </Box>
      </Box>
      <Divider />
      {open ? (
        <div
          onMouseLeave={() => {
            setOpen(false);
          }}
        >
          <Slide direction="up" in={open} mountOnEnter unmountOnExit>
            <Box
              sx={{
                height: "225px",

                // transitionTimingFunction: "linear;",
                // transition: "height 2s;",
                // "@media (max-height: 650px)": {
                //   height: "125px",
                // },
                // "@media (max-height: 50px)": {
                //   height: "125px",
                // },
              }}
              m={1}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
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
                  <IconButton
                    sx={{ ml: 1 }}
                    onClick={() => {
                      setOpenAddCameraModal(true);
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>

              <CameraSlider
                locations={locations}
                selectedLocation={selectedLocation}
                selectedCamera={selectedCamera}
                setSelectedCamera={setSelectedCamera}
                cameraList={cameraList}
              />
            </Box>
          </Slide>
        </div>
      ) : (
        <div
          onMouseEnter={() => {
            setOpen(true);
          }}
        >
          {/* <Slide direction="up" in={true} mountOnEnter unmountOnExit> */}
          <Box
            sx={{
              height: "35px",

              // transitionTimingFunction: "linear;",
              // transition: "height 2s;",
              // "@media (max-height: 650px)": {
              //   height: "125px",
              // },
              // "@media (max-height: 50px)": {
              //   height: "125px",
              // },
            }}
            m={1}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
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
                <IconButton
                  sx={{ ml: 1 }}
                  onClick={() => {
                    setOpenAddCameraModal(true);
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
          {/* </Slide> */}
        </div>
      )}
    </Box>
  );
};
