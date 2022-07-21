import { Box, Button } from "@mui/material";
import { useEffect, useRef, useContext, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";

import CameraCard from "./CameraCard";
import useAuth from "../../../auth/authContext";

const CameraSlider = ({
  locations,
  selectedLocation,
  selectedCamera,
  setSelectedCamera,
}) => {
  const { cameraList } = useAuth();
  function LeftArrow() {
    const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

    return (
      <Button disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
        <ArrowBackIosIcon />
      </Button>
    );
  }

  function RightArrow() {
    const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

    return (
      <Button disabled={isLastItemVisible} onClick={() => scrollNext()}>
        <ArrowForwardIosIcon />
      </Button>
    );
  }
  const apiRef = useRef();
  const [components, setComponents] = useState([]);
  useEffect(() => {
    console.log(cameraList);
    // console.log(selectedCamera);
    apiRef.current?.scrollToItem?.(
      apiRef.current?.getItemElementById(
        selectedCamera && selectedCamera["camera_id"]
      )
    );
  }, [selectedCamera]);

  useEffect(() => {
    const temp = [];
    cameraList.map((camera_obj) => {
      // console.log(camera_obj);
      temp.push(
        <Box
          sx={{
            m: 2,
            mb: 0.5,
            boxShadow: 10,
            width: "270px",
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
          selected={selectedCamera}
        >
          <CameraCard
            camera_id={camera_obj["camera_id"]}
            thumbnail={camera_obj["thumbnail"]}
            label={camera_obj["label"]}
            // location={locations[location]["name"]}
            is_processing={camera_obj["is_processing"]}
            height="150px"
            onClick={() => {
              setSelectedCamera(camera_obj);
            }}
          />
        </Box>
      );
    });
    setComponents(temp);
  }, [selectedLocation, selectedCamera, cameraList]);

  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} apiRef={apiRef}>
      {components.map((component) => {
        return component;
      })}
    </ScrollMenu>
  );
};

export default CameraSlider;
