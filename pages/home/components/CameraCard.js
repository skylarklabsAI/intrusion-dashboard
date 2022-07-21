import {
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import useAuth from "../../../auth/authContext";
import DeleteIcon from "@mui/icons-material/Delete";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteCameraModal from "./DeleteCameraModal";
import EditIcon from "@mui/icons-material/Edit";
import EditCameraModal from "./EditCameraModal";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const CameraCard = ({
  thumbnail,
  label,
  camera_id = "",
  location = "",
  is_processing = false,
  // camera_obj = { thumbnail: "", label: "" },
  onClick = {},
  height = "100px",
}) => {
  const { handleDeleteCamera } = useAuth();
  const [openDeleteCameraModal, setOpenDeleteCameraModal] =
    React.useState(false);
  const [openEditCameraModal, setOpenEditCameraModal] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(null);
  const open = Boolean(openMenu);
  const handleClick = (event) => {
    setOpenMenu(event.currentTarget);
  };
  const handleClose = () => {
    setOpenMenu(null);
  };
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
          top: 10,
          right: 10,
          height: "30px",
          width: "30px",
          borderRadius: "50%",
          backgroundColor: is_processing ?"#87ED8C99" : "#D33A3A99",
            // "radial-gradient( #ffffff, #5ADF49D4 , #61F78242 );",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FiberManualRecordIcon
          sx={{ color: is_processing ? "#21FF2C" : "#D33A3A" }}
        />
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "103%",
          width: "100%",
          background:
            "linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0.83) 19.8%, rgba(36, 36, 36, 0.22) 40.01%, rgba(72, 72, 72, 0) 52.94%, rgba(142, 142, 142, 0) 77.6%)",
        }}
      />

      <DeleteCameraModal
        open={openDeleteCameraModal}
        handleClose={() => {
          setOpenDeleteCameraModal(false);
        }}
        id={camera_id}
      />
      <EditCameraModal
        open={openEditCameraModal}
        handleClose={() => {
          setOpenEditCameraModal(false);
        }}
        id={camera_id}
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
        <Box>
          <IconButton
            onClick={(e) => {
              // handleDeleteCamera(camera_id);
              // onClick = { handleClick };
              handleClick(e);
            }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
          <Menu anchorEl={openMenu} open={open} onClose={handleClose}>
            <MenuItem
              onClick={() => {
                setOpenEditCameraModal(true);
              }}
            >
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                setOpenDeleteCameraModal(true);
              }}
            >
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
        {/* <Typography
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
        </Typography> */}
      </Box>
    </Box>
  );
};

export default CameraCard;
