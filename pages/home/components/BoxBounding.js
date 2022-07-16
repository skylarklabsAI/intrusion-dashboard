import React, { useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
const BoxBounding = ({ thumbnail, coords=[[0,0,1,1]], coordsChange }) => {
  const [crop, setCrop] = React.useState({
    unit: "%",
    width: (coords[0][2] - coords[0][0]) * 100,
    height: (coords[0][3] - coords[0][1]) * 100,
    x: coords[0][0] * 100,
    y: coords[0][1] * 100,
  });
  useEffect(() => {
    coordsChange([
      [
        crop.x / 100,
        crop.y / 100,
        (crop.x + crop.width) / 100,
        (crop.y + crop.height) / 100,
      ],
    ]);
  }, [crop]);
  return (
    <>
      <ReactCrop
        crop={crop}
        onChange={(crop, percentCrop) => {
          setCrop(percentCrop);
        }}
      >
        <img src={thumbnail} />
      </ReactCrop>
    </>
  );
};

export default BoxBounding;
