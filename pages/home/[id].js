import * as React from "react";
import { useRouter } from "next/router";
import { Box, Button, Grid, Typography, Divider } from "@mui/material";
import MainLayout from "../../components/layouts/MainLayout";
import MuiNextLink from "../../components/MuiNextLink";
import VideocamIcon from "@mui/icons-material/Videocam";
import GroupIcon from "@mui/icons-material/Group";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AlertDialog from "./components/AlertDialog";
import DetailCard from "./components/DetailCard";
import useAuth, { ProtectRoute } from "../../auth/authContext";
import dynamic from "next/dynamic";
import LoadingOverlay from "react-loading-overlay";
const Player = dynamic(() => import("../../components/Player"), { ssr: false });

const HomeLiveScreen = () => {
  const [selectedCamera, setSelectedCamera] = React.useState(null);
  const [records, setRecords] = React.useState([]);
  const [openAlertDialog, setOpenAlertDialog] = React.useState(false);
  const [alertData, setAlertData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const { fetch_notifications, fetch_camera_by_id } = useAuth();

  const router = useRouter();
  const { id } = router.query;

  React.useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch_camera_by_id(id)
      .then((res) => {
        setSelectedCamera(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id]);

  let alertsinterval;

  const handleFetchNotifications = (id) => {
    fetch_notifications(`?limit=40&camera_id=${id}`)
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
    handleFetchNotifications(selectedCamera["camera_id"]);
    alertsinterval = setInterval(() => {
      handleFetchNotifications(selectedCamera["camera_id"]);
    }, 5000);
    return () => {
      clearInterval(alertsinterval);
    };
  }, [selectedCamera]);

  return (
    <LoadingOverlay spinner active={loading} text="Loading Camera...">
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
            {selectedCamera && <LiveWrapper selectedCamera={selectedCamera} />}
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
    </LoadingOverlay>
  );
};

const ProtectedHomeLiveScreen = ProtectRoute(HomeLiveScreen);
ProtectedHomeLiveScreen.Layout = MainLayout;
export default ProtectedHomeLiveScreen;

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
    </Box>
  );
};

const LiveWrapper = ({ selectedCamera }) => {
  return (
    <Box
      sx={{
        height: "calc( 100vh - 160px)",
      }}
      m={1}
    >
      <Box display="flex" alignItems="center">
        <MuiNextLink href="/home">
          <Button sx={{ textTransform: "none" }}>
            <ArrowBackIcon />
            <Typography sx={{ fontSize: "14px" }} ml={1}>
              Back
            </Typography>
          </Button>
        </MuiNextLink>
        <Divider
          orientation="vertical"
          sx={{ mr: 1, ml: 1, height: "40px" }}
          flexItem
        />
        <VideocamIcon />
        <Typography
          ml={1}
          variant="h6"
          sx={{ color: "#EDEDED", fontWeight: "600" }}
        >
          {selectedCamera ? selectedCamera["label"] : "Camera Name"}
        </Typography>
        <Box flex={1} />
      </Box>
      <Box
        my={1}
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
          <Box>
            <LoadingOverlay spinner active={true} text="Loading Camera...">
              <Box height="100%" width="100%"></Box>
            </LoadingOverlay>
            )
          </Box>
        )}
      </Box>
    </Box>
  );
};
