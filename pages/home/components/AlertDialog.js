import { Box, Dialog, Grid, IconButton, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import BlockIcon from "@mui/icons-material/Block";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useState } from "react";

const AlertDialog = ({ open, handleClose, alertData }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    setIndex(0);
  }, [alertData]);
  return (
    <Dialog
      maxWidth="lg"
      sx={{
        background: "rgba(9, 13, 21, 0.7)",
      }}
      open={open}
      onClose={() => {
        handleClose();
      }}
      fullWidth
    >
      <Box
        sx={{
          background: "rgba(5, 16, 31, 0.8)",
          border: "2px solid #FF2950",
          position: "relative",

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
            <CancelIcon />
          </IconButton>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          mb={1.5}
        >
          <BlockIcon />
          <Typography ml={1.5} sx={{ color: "#EDEDED", fontSize: "25px" }}>
            Intrusion Alert
          </Typography>
        </Box>
        <Grid container spacing={1} wrap="wrap-reverse">
          <Grid item xs={12} md={5}>
            <Box display="flex">
              <Box mx={2} width="100%">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  mb={1}
                  sx={{ color: "#EDEDED" }}
                >
                  <Typography>Intruders Captured</Typography>
                  <Typography>{alertData && alertData["suspects"]}</Typography>
                </Box>
                <Grid
                  container
                  spacing={2}
                  sx={{ height: "450px", overflowY: "scroll" }}
                >
                  {alertData &&
                    alertData["cropped"] &&
                    alertData["cropped"].map((url, pos) => {
                      return <IntrudersCard url={url} alertData={alertData} key={url} isSelected={index===pos} onClick={()=>{setIndex(pos)}} />;
                    })}
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box mx={2} width="100%">
              <Box display="flex" mb={1} sx={{ color: "#EDEDED" }}>
                <Typography>Full View</Typography>
              </Box>
              <FullImageCard
                alertData={alertData}
                index={index}
                setIndex={setIndex}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

export default AlertDialog;

const IntrudersCard = ({ url, alertData, isSelected, onClick=()=>{} }) => {
  return (
    <Grid item xs={12} md={6}>
      <Box
        onClick={onClick}
        position="relative"
        width="100%"
        height="300px"
        borderRadius="5px"
        sx={{ overflow: "hidden",border: isSelected ? "3px solid #1170FF" : "none",
        cursor:"pointer" }}
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
            {alertData["time"].getHours() +
              ":" +
              alertData["time"].getMinutes()}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

const FullImageCard = ({ alertData, index, setIndex }) => {
  return (
    <Box position="relative">
      <img src={alertData["full"][index]} width="100%" />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
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
        >
          <ArrowBackIosIcon />
        </IconButton>
        <Typography>
          {index + 1} / {alertData["full"].length}
        </Typography>
        <IconButton
          onClick={() => {
            setIndex((index + 1) % alertData["full"].length);
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
