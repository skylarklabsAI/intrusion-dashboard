import * as React from "react";
import { Box, Stack, Typography } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import moment from "moment";

const DetailCard = ({ record, onClick = () => {} }) => {
  return (
    <Box
      flex={1}
      m={1.5}
      onClick={onClick}
      sx={{
        minWidth: "350px",
        background: "#0F1726",
        borderTop: "1px solid #2D405B",
        borderRadius: "6px",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        height: "130px",
        cursor: "pointer",

        "@media (max-width: 1350px)": {
          // flexDirection: "column",
          height: "130px",
          minWidth: "90%",
        },
        "@media (max-width: 950px)": {
          flexDirection: "column",
          height: "100%",
          minWidth: "90%",
        },
      }}
      position="relative"
    >
      <Box
        mr={2}
        height="100%"
        width="100%"
        position="relative"
        sx={{
          "@media (max-width: 1350px)": {
            width: "50%",
          },
        }}
      >
        <img
          src={record && record["notification_images"] && record["notification_images"][0] && record["notification_images"][0]["original_image"]}
          // src="/images/thumbnail.png"
          height="100%"
          width="100%"
          alt="person"
        />
      </Box>
      <Box
        display="flex"
        width="100%"
        sx={{
          "@media (max-width: 1350px)": {
            paddingLeft: "10px",
            width: "50%",
            flexDirection: "column",
          },
          "@media (max-width: 950px)": {
            width: "100%",
            flexDirection: "column",
          },
        }}
      >
        <Stack sx={{ flex: 1 }}>
          <Field title="Location" subtitle={"Region - 1"} />
          <Field
            title="Camera"
            subtitle={record && record["camera"] ? record["camera"] : "-"}
          />
          <Field
            title="Time"
            subtitle={
              record && record["created_on"]
                ? moment(record["created_on"]).hour() +
                  ":" +
                  moment(record["created_on"]).minute()
                : "-"
            }
          />
          <Field
            title="Suspects"
            subtitle={record && record["notification_images"].length}
          />
        </Stack>
      </Box>
      {/* <Box sx={{ position: "absolute", bottom: "10px", right: "10px" }}>
        <ArrowRightAltIcon
          sx={{
            fontSize: "20px",
          }}
        />
      </Box> */}
      <Box sx={{ position: "absolute", bottom: "10px", right: "10px" }}>
        <FiberManualRecordIcon
          sx={{
            fontSize: "20px",
            color: record && record["isresolved"] ? "#49FF71" : "#FF2950",
          }}
        />
      </Box>
    </Box>
  );
};

const Field = ({ title, subtitle }) => {
  return (
    <Typography
      mb={0.5}
      sx={{ fontSize: "14px", fontWeight: "400", color: "#ffffff" }}
    >
      <span style={{ color: "#7A8DBE" }}>{title}:</span> {subtitle}
    </Typography>
  );
};

export default DetailCard;
