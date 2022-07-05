import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  ListSubheader,
  Paper,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import InsightsIcon from "@mui/icons-material/Insights";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import EdgesensorHighIcon from "@mui/icons-material/EdgesensorHigh";
import SettingsIcon from "@mui/icons-material/Settings";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";
import { useRouter } from "next/router";
import MuiNextLink from "../MuiNextLink";
import useAuth from "../../auth/authContext";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import GroupsIcon from "@mui/icons-material/Groups";
import FaceIcon from "@mui/icons-material/Face";
import Image from "next/image";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import FullscreenExitRoundedIcon from "@mui/icons-material/FullscreenExitRounded";
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const drawerWidth = 70;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    // marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    width: `calc(100%)`,
    height: "90px",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    // width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    background: "#040D18",
    borderRight: "1px solid rgba(57, 76, 104, 0.23)",
    ...(!open && {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: 0,
    }),
  },
}));

const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MainLayout = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const [path, setPath] = React.useState("");
  const [date, setDate] = React.useState(new Date());
  const theme = useTheme();
  const { asPath } = useRouter();
  const handle = useFullScreenHandle();
  const [isFullScreen, setIsFullScreen] = React.useState(false);

  React.useEffect(() => {
    setInterval(() => {
      setDate(new Date());
    }, 30000);
  }, []);

  React.useEffect(() => {
    console.log(asPath.split("/"));
    const temp = asPath.split("/");
    setPath(temp[1]);
  }, [asPath]);

  const isSmallerScreen = useMediaQuery(theme.breakpoints.down("md"));
  React.useEffect(() => {
    if (isSmallerScreen) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isSmallerScreen]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <FullScreen handle={handle}>
        <Box sx={{ display: "flex" }}>
          <AppBar
            position="absolute"
            open={open}
            sx={{
              bgcolor: "#040D18",
              borderBottom: "1px solid rgba(57, 76, 104, 0.23)",
              // boxShadow: 0,
              // height: "45px",
            }}
          >
            <Toolbar
              sx={{
                "&.MuiToolbar-root": {
                  height: "90px",
                  p: 0,
                  bgcolor: "#040D18",
                },
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  position: "relative",
                }}
              >
                {/* <img
                src="/images/top_design.png"
                height="100%"
                style={{ position: "absolute", top: "0px" }}
              /> */}
                <img
                  src="/images/top_gradient.png"
                  height="120%"
                  style={{ position: "absolute", top: "0px", left: "0px" }}
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    // justifyContent: "center",
                  }}
                >
                  <Box
                    ml={4}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "50px",
                      width: "50px",
                      borderRadius: "50%",
                      background: "#25293B",
                      zIndex: "9999",
                    }}
                  >
                    <img
                      src="images/logo_short_dark.png"
                      width="30px"
                      height="30px"
                    />
                  </Box>
                  <Stack ml={2}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: "600",
                        fontSize: "1.45rem",
                        lineHeight: "35px",
                        color: "#FFFFFF",
                      }}
                    >
                      Intelligent Intrusion Detection System
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "500",
                        fontSize: "0.75rem",
                        lineHeight: "15px",
                        color: "#FFFFFF",
                      }}
                    >
                      {date.toLocaleDateString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        // second: "numeric"
                      })}
                    </Typography>
                  </Stack>
                  <Box flex={1} />
                  {!isFullScreen ? (
                    <IconButton
                      sx={{ mr: 2 }}
                      onClick={() => {
                        if (!document.fullscreenElement) {
                          document.body.webkitRequestFullscreen();
                        } else {
                          if (document.exitFullscreen) {
                            document.exitFullscreen();
                          }
                        }
                        
                        setIsFullScreen(true);
                      }}
                    >
                      <FullscreenOutlinedIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      sx={{ mr: 2 }}
                      onClick={() => {
                        if (!document.fullscreenElement) {
                          document.body.webkitRequestFullscreen();
                        } else {
                          if (document.exitFullscreen) {
                            document.exitFullscreen();
                          }
                        }
                        setIsFullScreen(false);
                      }}
                    >
                      <FullscreenExitRoundedIcon />
                    </IconButton>
                  )}
                </Box>
              </Box>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                height: "calc( 100vh )",
                // width:"70px"
              }}
            >
              <CustomListIconWrapper
                isSelected={path === "home" || path == ""}
                selectedIcon={<HomeOutlinedIcon sx={{ mb: -0.5 }} />}
                icon={<HomeIcon sx={{ mb: -0.5 }} />}
                label="Home"
                href="/home"
              />

              <CustomListIconWrapper
                isSelected={path === "storage"}
                selectedIcon={<StorageRoundedIcon sx={{ mb: -1 }} />}
                icon={<StorageRoundedIcon sx={{ mb: -1 }} />}
                label="Storage"
                href="/storage"
                disabled
              />

              {/* <CustomListIconWrapper
                isSelected={path === "databases"}
                selectedIcon={<ManageAccountsIcon sx={{ mb: -1 }} />}
                icon={<ManageAccountsIcon sx={{ mb: -1 }} />}
                label="Databases"
                href="/databases"
              /> */}
              <CustomListIconWrapper
                isSelected={path === "alerts"}
                selectedIcon={<CampaignRoundedIcon sx={{ mb: -1 }} />}
                icon={<CampaignRoundedIcon sx={{ mb: -1 }} />}
                label="Alerts"
                href="/alerts"
              />

              {/* <CustomListIconWrapper
                isSelected={path === "forensics"}
                selectedIcon={<SearchRoundedIcon sx={{ mb: -1 }} />}
                icon={<SearchRoundedIcon sx={{ mb: -1 }} />}
                label="Forensics"
                href="/forensics"
              /> */}

              {/* <MuiNextLink href="/alerts">
                <CustomListItem
                  isSelected={path === "alerts"}
                  selectedIcon={<EdgesensorHighIcon sx={{ mb: -1 }} />}
                  icon={<EdgesensorHighIcon sx={{ mb: -1 }} />}
                  label="Alerts"
                />
              </MuiNextLink> */}
            </Box>
            {/* <DrawerFooter /> */}
          </Drawer>
          <Box
            sx={{
              // background: "#F5F5F5",
              width: "100%",
              overflowY: "scroll",
              height: "100vh",
              paddingTop: "90px",
            }}
          >
            {children}
          </Box>
        </Box>
      </FullScreen>
    </>
  );
};

const CustomListIconWrapper = ({
  isSelected,
  selectedIcon,
  icon,
  label,
  href = "",
  disabled = false,
}) => {
  if (disabled)
    return (
      <CustomListItem
        isSelected={isSelected}
        selectedIcon={selectedIcon}
        icon={icon}
        label={label}
        disabled
      />
    );
  return (
    <MuiNextLink href={href}>
      <CustomListItem
        isSelected={isSelected}
        selectedIcon={selectedIcon}
        icon={icon}
        label={label}
      />
    </MuiNextLink>
  );
};

const CustomListItem = ({
  isSelected,
  selectedIcon,
  icon,
  label,
  disabled = false,
}) => {
  return (
    <Tooltip title={label} placement="right">
      <Box
        sx={{
          cursor: "pointer",
          display: "flex",
          height: "38px",
          alignItems: "center",
          color: disabled ? "#6A7A9366" : isSelected ? "#ffffff" : "#6A7A93",
          fontSize: "16px",
          px: 1,
          my: 1,
        }}
      >
        {disabled ? (
          <Box
            sx={{
              px: 1.5,
              py: 1.5,
            }}
          >
            {selectedIcon}
          </Box>
        ) : isSelected ? (
          <Box
            sx={{
              border: "0.6px solid rgba(57, 76, 104, 0.25)",
              px: 1.5,
              py: 1.5,
              borderRadius: "8px",
              background: "#29198C",
              borderTop: "1px solid #648DC9",
              // background: "#F8F8F8",
              // boxShadow: 10,
              filter: "drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.13))",
            }}
          >
            {selectedIcon}
          </Box>
        ) : (
          <Box
            sx={{
              px: 1.5,
              py: 1.5,
              "&:hover": {
                border: "0.6px solid rgba(57, 76, 104, 0.25)",
                px: 1.5,
                py: 1.5,
                borderRadius: "8px",
                background: "#29198C",
                color: "white",
                // boxShadow: 10,
                filter: "drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.13))",
              },
            }}
          >
            {selectedIcon}
          </Box>
        )}
      </Box>
    </Tooltip>
  );
};

const DrawerFooter = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "10px",
        width: drawerWidth,
        marginTop: 1,
        background: "#F4F4F4",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 1,
        }}
      >
        <MuiNextLink href="/admin">
          <Tooltip title={"Admin Controls"} placement="right">
            <IconButton sx={{ color: "white" }}>
              <AdminPanelSettingsIcon sx={{ color: "#8ED483" }} />
            </IconButton>
          </Tooltip>
        </MuiNextLink>
      </Box>
    </Box>
  );
};
export default MainLayout;
