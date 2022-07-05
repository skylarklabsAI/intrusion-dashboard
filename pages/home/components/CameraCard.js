import { Box, Divider, IconButton, Typography } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

const CameraCard = ({
  thumbnail,
  label,
  location = "",
  // camera_obj = { thumbnail: "", label: "" },
  onClick = {},
  height = "100px",
}) => {
  return (
    <Box
      // m={1.5}
      onClick={onClick}
      sx={{
        border: "1px solid rgba(40, 59, 87, 1)",
        position: "relative",
        borderRadius: "6px",
        overflow: "hidden",
        cursor: "pointer",
        height: { height },
      }}
    >
      <img
        src={
          // "http://localhost:3000/video_feed"
          // camera_obj["thumbnail"] ??
          thumbnail ?? "https://i.ytimg.com/vi/w6geNk3QnBQ/maxresdefault.jpg"
        }
        style={{ objectFit: "contain" }}
        height="auto"
        width="100%"
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          background:
            "linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0.83) 19.8%, rgba(36, 36, 36, 0.22) 40.01%, rgba(72, 72, 72, 0) 52.94%, rgba(142, 142, 142, 0) 77.6%)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          height: "35px",
          width: "100%",
          borderTop: "1px solid rgba(81, 99, 116, 1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          ml={1}
          sx={{
            flex: 1,
            color: "white",
            fontSize: "12px",
            lineHeight: "13px",
            fontWeight: "400",
          }}
        >
          {label}
        </Typography>
        <Typography
          mr={1}
          sx={{
            flex: 1,
            color: "white",
            fontSize: "12px",
            lineHeight: "13px",
            fontWeight: "400",
            textAlign: "right",
          }}
        >
          {location}
        </Typography>
      </Box>
    </Box>
  );
};

export default CameraCard;
