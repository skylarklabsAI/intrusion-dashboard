import {
  Box,
  Container,
  Dialog,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import BlockIcon from "@mui/icons-material/Block";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useState } from "react";
import CustomOutlinedButton from "../../../components/CustomButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import moment from "moment";
import useAuth from "../../../auth/authContext";
import LoadingOverlay from "react-loading-overlay";

const AlertDialog = ({
  open,
  handleClose,
  alertData,
  onResponding = () => {},
  onRevert = () => {},
}) => {
  const [index, setIndex] = useState(0);
  const [completeAlertData, setCompleteAlertData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { fetch_detailed_notification } = useAuth();
  useEffect(() => {
    setLoading(true);
    fetch_detailed_notification(alertData["id"])
      .then((res) => {
        console.log(res);
        setCompleteAlertData(res.data);
        setLoading(false);
        setIndex(0);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [alertData]);
  return (
    <Dialog
      PaperComponent={Container}
      maxWidth="lg"
      sx={{
        background: "rgba(9, 13, 21, 0.8)",
        borderRadius: "6px",
      }}
      open={open}
      onClose={() => {
        handleClose();
      }}
      fullWidth
    >
      <LoadingOverlay spinner active={loading} text="fetching alert...">
        <Box
          sx={{
            background: "#040D18dd",
            border: "2px solid #3B4B82",
            position: "relative",
            borderRadius: "9px",
            p: 4,
            px: 8,
          }}
        >
          <Box position="absolute" top="10px" right="10px">
            <IconButton
              onClick={() => {
                handleClose();
              }}
            >
              <CancelIcon sx={{ color: "#46567E" }} />
            </IconButton>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mb={1.5}
          >
            <BlockIcon />
            <Typography
              ml={1.5}
              sx={{ color: "#EDEDED", fontSize: "25px", fontWeight: "500" }}
            >
              Intrusion Alert
            </Typography>
          </Box>
          <Grid container spacing={1} wrap="wrap-reverse">
            <Grid item xs={12} md={5}>
              <Box
                display="flex"
                sx={{
                  border: "1px solid rgba(57, 76, 104, 0.5)",
                  borderRadius: "9px",
                  p: 2,
                }}
              >
                <Box mx={2} width="100%">
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    mb={2}
                    sx={{ color: "#EDEDED" }}
                  >
                    <Typography>Intruders Captured</Typography>
                    <Typography>
                      {alertData && alertData["suspects"]}
                    </Typography>
                  </Box>
                  <Grid
                    container
                    spacing={1}
                    mt={1}
                    sx={{ height: "450px", overflowY: "scroll", pr: 1 }}
                  >
                    {completeAlertData &&
                      completeAlertData["notification_images"] &&
                      completeAlertData["notification_images"].map(
                        (data, pos) => {
                          return (
                            <IntrudersCard
                              url={data["cropped_image"]}
                              alertData={data}
                              key={data["cropped_image"]}
                              isSelected={index === pos}
                              onClick={() => {
                                setIndex(pos);
                              }}
                            />
                          );
                        }
                      )}
                  </Grid>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <Box mx={2} width="100%" mt={6}>
                {/* <Box display="flex" mb={1} sx={{ color: "#EDEDED" }}>
                <Typography>Full View</Typography>
              </Box> */}
                {completeAlertData && (
                  <FullImageCard
                    alertData={completeAlertData}
                    index={index}
                    setIndex={setIndex}
                  />
                )}
                <Box
                  mt={3}
                  display="flex"
                  width="100%"
                  alignItems="center"
                  justifyContent="space-around"
                >
                  {completeAlertData &&
                  completeAlertData["isresolved"] === true ? (
                    <CustomOutlinedButton
                      text="Mark As Not Resolved"
                      StartIcon={CancelIcon}
                      sx={{ fontWeight: "400", background: "#202F46" }}
                      onClick={() => {
                        onRevert();
                        handleClose();
                      }}
                    />
                  ) : (
                    <CustomOutlinedButton
                      text="Mark As Resolved"
                      StartIcon={CheckCircleIcon}
                      sx={{ fontWeight: "400", background: "#2EAB60" }}
                      onClick={() => {
                        onResponding();
                        handleClose();
                      }}
                    />
                  )}

                  <CustomOutlinedButton
                    text={
                      completeAlertData && completeAlertData["resolved"]
                        ? "Close"
                        : "Respond Later"
                    }
                    sx={{
                      fontWeight: "400",
                      background:
                        completeAlertData && completeAlertData["resolved"]
                          ? "#202F46"
                          : "#D33A3A",
                      borderTop: "1.5px solid #3C5170",
                      width: "200px",
                    }}
                    onClick={() => {
                      handleClose();
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </LoadingOverlay>
    </Dialog>
  );
};

export default AlertDialog;

const IntrudersCard = ({ url, alertData, isSelected, onClick = () => {} }) => {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Box
        onClick={onClick}
        position="relative"
        width="100%"
        height="300px"
        borderRadius="6px"
        sx={{
          overflow: "hidden",
          border: isSelected ? "3px solid #1170FF" : "none",
          cursor: "pointer",
        }}
      >
        <img
          src={url}
          width="100%"
          height="100%"
          style={{ objectFit: "fill" }}
        />
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
            bottom: 10,
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
            {moment(alertData["created_on"]).hour() +
              ":" +
              moment(alertData["created_on"]).minutes() +
              ":" +
              moment(alertData["created_on"]).seconds()}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

const FullImageCard = ({ alertData, index, setIndex }) => {
  return (
    <Box position="relative">
      <img
        src={
          alertData &&
          alertData["notification_images"] &&
          alertData["notification_images"][index] &&
          alertData["notification_images"][index]["original_image"]
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
          overflow: "hidden",
          background:
            "linear-gradient(180deg, rgba(18, 23, 69, 0.75) 0%, rgba(36, 36, 36, 0.22) 40.41%, rgba(142, 142, 142, 0) 77.6%)",
        }}
      />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        sx={{
          position: "absolute",
          top: 5,
          left: 0,
        }}
      >
        <Typography ml={2}>{alertData && alertData["camera_label"]}</Typography>
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          borderRadius: "9px",
          overflow: "hidden",
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
          sx={{ ml: 2 }}
          onClick={() => {
            setIndex(index - 1);
          }}
          disabled={index === 0}
        >
          <ArrowBackIosIcon sx={{ fontSize: "18px" }} />
        </IconButton>
        <Typography>
          {index + 1} / {alertData["notification_images"].length}
        </Typography>
        <IconButton
          sx={{ mr: 2 }}
          onClick={() => {
            setIndex((index + 1) % alertData["notification_images"].length);
          }}
        >
          <ArrowForwardIosIcon sx={{ fontSize: "18px" }} />
        </IconButton>
      </Box>
    </Box>
  );
};
