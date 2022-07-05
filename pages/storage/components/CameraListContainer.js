import * as React from "react";
import Box from "@mui/material/Box";
import { Stack, Typography } from "@mui/material";
import LinkedCameraRoundedIcon from "@mui/icons-material/LinkedCameraRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CameraCard from "./CameraCard";
import CustomDropDown from "../../../components/CustomDropDown";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const locations = {
  1: {
    name: "Lobby Area",
    cameras: [
      {
        camera_id: 1,
        name: "Lobby Entry - 1",
        url: "https://media.istockphoto.com/photos/hotel-reception-lobby-picture-id1292354654?b=1&k=20&m=1292354654&s=170667a&w=0&h=QQElFZr3JeHrxvznzA7suqNo2OGiPVQXJFzZ4A3G3wg=",
      },
      {
        camera_id: 2,
        name: "Lobby Entry - 2",
        url: "https://images.unsplash.com/photo-1583953458882-302655b5c376?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bG9iYnl8ZW58MHx8MHx8&w=1000&q=80",
      },
      {
        camera_id: 3,
        name: "Lobby Exit - 1",
        url: "https://media.istockphoto.com/photos/luxury-hotel-lobby-with-smart-robots-working-as-a-receptionist-and-picture-id1298838328?b=1&k=20&m=1298838328&s=170667a&w=0&h=AkVWfkqsvZfQAfQZkNdPfO69rMHFqh78ZrSEujr20Yg=",
      },
      {
        camera_id: 4,
        name: "Lobby Exit - 2",
        url: "https://images.unsplash.com/photo-1631195092568-a1030d926fd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bG9iYnl8ZW58MHx8MHx8&w=1000&q=80",
      },
    ],
  },
  2: {
    name: "Server Room",
    cameras: [
      {
        camera_id: 5,
        name: "Server Room Entry - 1",
        url: "https://c4.wallpaperflare.com/wallpaper/1001/284/24/operating-systems-architecture-lights-room-wallpaper-thumb.jpg",
      },
      {
        camera_id: 6,
        name: "Server Room Entry - 2",
        url: "https://cdn.wallpapersafari.com/46/0/RsnB7O.png",
      },
      {
        camera_id: 7,
        name: "Server Room Exit - 1",
        url: "https://cdn.wallpapersafari.com/10/19/F6q3lz.jpg",
      },
    ],
  },
};

const CameraListContainer = () => {
  const [selectedLocation, setSelectedLocation] = React.useState("all");
  const [selectedCamera, setSelectedCamera] = React.useState(null);
  const [menuList, setMenuList] = React.useState({});
  const [components, setComponents] = React.useState([]);
  React.useEffect(() => {
    const temp = { all: "All Cameras" };
    const flag = true;
    Object.keys(locations).map((id) => {
      temp[id] = locations[id]["name"];
      if (flag && locations[id]["cameras"].length) {
        setSelectedCamera(locations[id]["cameras"][0]);
        flag = false;
      }
    });
    setMenuList(temp);
  }, []);

  React.useEffect(() => {
    const temp = [];
    Object.keys(locations).map((location) => {
      if (selectedLocation === "all" || selectedLocation === location) {
        locations[location]["cameras"].map((camera_obj) => {
          console.log(camera_obj);
          temp.push(
            <Box
              m={1.5}
              sx={{
                borderRadius: "10px",
                cursor: "pointer",
                border:
                  selectedCamera &&
                  selectedCamera["camera_id"] === camera_obj["camera_id"]
                    ? "5px solid rgba(92, 157, 255, 1)"
                    : "none",
              }}
              itemId={camera_obj["camera_id"]}
              key={camera_obj["camera_id"]}
            >
              <CameraCard
                thumbnail={camera_obj["url"]}
                label={camera_obj["name"]}
                height="150px"
                onClick={() => {
                  setSelectedCamera(camera_obj);
                }}
              />
            </Box>
          );
        });
      }
    });
    setComponents(temp);
  }, [selectedLocation, selectedCamera]);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };
  return (
    <Stack position="relative" height="100%">
      <Box display="flex" alignItems="center" m={1}>
        <LinkedCameraRoundedIcon />
        <Typography ml={1} sx={{ color: "#EDEDED" }}>
          Cameras
        </Typography>
      </Box>
      <Box sx={{ maxHeight: "calc( 100vh - 160px)", overflowY: "scroll" }}>
        {components.map((component) => {
          return component;
        })}
      </Box>
      <Box position="absolute" bottom="10px" width="100%" p={2}>
        <CustomDropDown
          Icon={LocationOnIcon}
          value={selectedLocation}
          handleChange={handleLocationChange}
          menuList={menuList}
        />
      </Box>
    </Stack>
  );
};

export default CameraListContainer;
