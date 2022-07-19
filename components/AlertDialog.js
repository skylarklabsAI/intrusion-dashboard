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
import CustomOutlinedButton from "./CustomButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import useAuth from "../auth/authContext";

const AlertDialog = ({ open, handleClose, alertData = { image: "[]" } }) => {
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState([]);
  const { notification_resolve } = useAuth();
  useEffect(() => {
    setIndex(0);
    console.log(alertData);
    console.log(JSON.parse(alertData["image"]));
    setImages(JSON.parse(alertData["image"]));
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
                  <Typography>{images.length}</Typography>
                </Box>
                <Grid
                  container
                  spacing={1}
                  mt={1}
                  sx={{ height: "450px", overflowY: "scroll", pr: 1 }}
                >
                  {images.map((url, pos) => {
                    return (
                      <IntrudersCard
                        url={url[1]}
                        alertData={alertData}
                        key={url}
                        isSelected={index === pos}
                        onClick={() => {
                          setIndex(pos);
                        }}
                      />
                    );
                  })}
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box mx={2} width="100%" mt={6}>
              {/* <Box display="flex" mb={1} sx={{ color: "#EDEDED" }}>
                <Typography>Full View</Typography>
              </Box> */}
              <FullImageCard
                alertData={alertData}
                index={index}
                setIndex={setIndex}
                images={images}
              />
              <Box
                mt={3}
                display="flex"
                width="100%"
                alignItems="center"
                justifyContent="space-around"
              >
                <CustomOutlinedButton
                  text="Responded"
                  StartIcon={CheckCircleIcon}
                  sx={{ fontWeight: "400" }}
                  onClick={() => {
                    notification_resolve(alertData["id"])
                      .then((res) => {
                        console.log(res);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                    handleClose();
                  }}
                />
                <CustomOutlinedButton
                  text="Respond Later"
                  sx={{
                    fontWeight: "400",
                    background: "#202F46",
                    borderTop: "1.5px solid #3C5170",
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
            {/* {alertData["time"].getHours() +
              ":" +
              alertData["time"].getMinutes() +
              ":" +
              alertData["time"].getSeconds()} */}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

const FullImageCard = ({ alertData, index, setIndex, images }) => {
  return (
    <Box position="relative">
      <img
        src={images[index][0]}
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
          {index + 1} / {images.length}
        </Typography>
        <IconButton
          sx={{ mr: 2 }}
          onClick={() => {
            setIndex((index + 1) % images.length);
          }}
        >
          <ArrowForwardIosIcon sx={{ fontSize: "18px" }} />
        </IconButton>
      </Box>
    </Box>
  );
};
