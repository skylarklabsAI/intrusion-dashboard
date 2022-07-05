import ReactPlayer from "react-player";
import React, { createRef, useEffect, useState } from "react";

const recordsList = {
  1: [
    {
      sec: 8,
      cropped: ["1a21.png"],
      full: ["1a11.png"],
      location: "Backyard",
      camera: "Cam HX 2",
      suspects: 1,
      replace: false,
    },
    {
      sec: 12,
      cropped: ["1a21.png", "1a22.png"],
      full: ["1a11.png", "1a12.png"],
      location: "Backyard",
      camera: "Cam HX 2",
      suspects: 2,
      replace: true,
    },
  ],
  2: [
    {
      sec: 15,
      cropped: ["2a21.png"],
      full: ["2a11.png"],
      location: "Parking Lot",
      camera: "Front Cam LS 1",
      suspects: 1,
      replace: false,
    },
    {
      sec: 23,
      cropped: ["2a21.png", "2a22.png"],
      full: ["2a11.png", "2a12.png"],
      location: "Parking Lot",
      camera: "Front Cam LS 1",
      suspects: 2,
      replace: true,
    },
  ],
  3: [
    {
      sec: 20,
      cropped: ["3a21.png"],
      full: ["3a11.png"],
      location: "Campus Exit",
      camera: "Cam T 100",
      suspects: 1,
      replace: false,
    },
    {
      sec: 23,
      cropped: ["3a21.png", "3a22.png"],
      full: ["3a11.png", "3a12.png"],
      location: "Campus Exit",
      camera: "Cam T 100",
      suspects: 2,
      replace: true,
    },
    {
      sec: 24,
      cropped: ["3a21.png", "3a22.png", "3a23.png"],
      full: ["3a11.png", "3a12.png", "3a13.png"],
      location: "Campus Exit",
      camera: "Cam T 100",
      suspects: 3,
      replace: true,
    },
  ],
  4: [
    {
      sec: 40,
      cropped: ["4a21.png"],
      full: ["4a11.png"],
      location: "Complex 4 - Region 2",
      camera: "Cam G 141",
      suspects: 1,
      replace: false,
    },
    {
      sec: 49,
      cropped: ["4a21.png", "4a22.png"],
      full: ["4a11.png", "4a12.png"],
      location: "Complex 4 - Region 2",
      camera: "Cam G 141",
      suspects: 2,
      replace: true,
    },
    {
      sec: 56,
      cropped: ["4a21.png", "4a22.png", "4a23.png"],
      full: ["4a11.png", "4a12.png", "4a13.png"],
      location: "Complex 4 - Region 2",
      camera: "Cam G 141",
      suspects: 3,
      replace: true,
    },
    {
      sec: 61,
      cropped: ["4a21.png", "4a22.png", "4a23.png", "4a24.png"],
      full: ["4a11.png", "4a12.png", "4a13.png", "4a14.png"],
      location: "Complex 4 - Region 2",
      camera: "Cam G 141",
      suspects: 4,
      replace: true,
    },
    {
      sec: 62,
      cropped: ["4a21.png", "4a22.png", "4a23.png", "4a24.png", "4a25.png"],
      full: ["4a11.png", "4a12.png", "4a13.png", "4a14.png", "4a15.png"],
      location: "Complex 4 - Region 2",
      camera: "Cam G 141",
      suspects: 5,
      replace: true,
    },
  ],
};
const DummyPlayer = ({
  url,
  records,
  setRecords,
  selectedCamera,
  openAlertDialog,
  setOpenAlertDialog,
  alertData,
  setAlertData,
}) => {
  const videoRef = createRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCamera]);

  const handleOnProgress = (e) => {
    // console.log(parseInt(e.playedSeconds));
    const temp = {};
    if (
      recordsList[selectedCamera["camera_id"]][
        currentIndex % recordsList[selectedCamera["camera_id"]].length
      ]["sec"] === parseInt(e.playedSeconds)
    ) {
      // console.log("helloooo");
      temp = {
        time: new Date(),
        ...recordsList[selectedCamera["camera_id"]][
          currentIndex % recordsList[selectedCamera["camera_id"]].length
        ],
      };
      setAlertData(temp);
      setOpenAlertDialog(true);
      if (
        recordsList[selectedCamera["camera_id"]][
          currentIndex % recordsList[selectedCamera["camera_id"]].length
        ]["replace"]
      ) {
        setRecords([temp, ...records.slice(1)]);
      } else {
        setRecords([temp, ...records]);
      }
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <ReactPlayer
      width="100%"
      height="100%"
      // height={"500px"}
      ref={videoRef}
      url={url}
      playing={true}
      loop={true}
      muted={true}
      progressInterval={1000}
      // light={true}
      onProgress={(e) => handleOnProgress(e)}
    />
  );
};

export default DummyPlayer;
