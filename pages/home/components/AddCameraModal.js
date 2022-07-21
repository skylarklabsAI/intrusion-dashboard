import {
  Box,
  Typography,
  IconButton,
  InputAdornment,
  Dialog,
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Container,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useFormik } from "formik";
import { styled, alpha } from "@mui/material/styles";
import * as Yup from "yup";
import LabelIcon from "@mui/icons-material/Label";
import LinkIcon from "@mui/icons-material/Link";
import { useState } from "react";
import BoxBounding from "./BoxBounding";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import CustomOutlinedButton from "../../../components/CustomButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import useAuth from "../../../auth/authContext";
import { toast } from "react-toastify";

// const CustomInputField = styled(TextField)({
//   width: "100%",
//   marginBottom: 20,
//   "& .MuiOutlinedInput-root": {
//     "&.Mui-focused fieldset": {
//       borderColor: "#83A4D4",
//     },
//   },
// });

const CustomInputField = styled(TextField)({
  width: "100%",
  marginBottom: 5,
  background: "#132136",
  borderRadius: "9px",
  "& .MuiOutlinedInput-input": {
    color: "#6A7A93",
  },
  "& .MuiInputLabel-root": {
    color: "#6A7A93",
  },
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
  "&:hover .MuiOutlinedInput-input": {
    color: "#6A7A93",
  },
  "&:hover .MuiInputLabel-root": {
    color: "#6A7A93",
  },
  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: "9px",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
    color: "#6A7A93",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#6A7A93",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: "9px",
  },
  "& .MuiInputBase-input": {
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "17px",
    background: "#132136",
    borderRadius: "9px",
    height: "20px",
  },
  "& .MuiSelect-icon": {
    color: "#6A7A93",
  },
});

const AddCameraModal = ({ open, handleClose }) => {
  const [coords, setCoords] = useState([[0.25, 0.25, 0.75, 0.75]]);
  const [value, setValue] = useState("entry");
  const [page, setPage] = useState(0);
  const [thumbnail, setThumbnail] = useState("");
  const [camera_id, setCamera_id] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // const handleCameraPositionChange = (event) => {
  //   setValue(event.target.value);
  // };

  const { handleAddCamera, handleAddService } = useAuth();
  const validationSchema = Yup.object().shape({
    label: Yup.string().required("Label is required"),
    // description: Yup.string().required("Description is required"),
    rtsp_link: Yup.string().required("Rtsp Link is required"),
    camera_timezone: Yup.string().required("Required field"),
  });

  const formik = useFormik({
    initialValues: {
      label: "",
      description: "camera",
      rtsp_link: "",
      camera_timezone: "Asia/Kolkata",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      setIsLoading(true);
      const data = {
        ...values,
      };
      // setPage(1);
      handleAddCamera(data).then((res) => {
        if (res) {
          setIsLoading(false);
          toast.success("Camera Added...");
          setCamera_id(res["camera_id"]);
          if (!res["is_healthy"]) {
            toast.error("Camera is not working!!!");
            resetForm();
            handleClose();
          } else if (res["thumbnail"]) {
            setThumbnail(res["thumbnail"]);
            resetForm();
            setPage(1);
          } else {
            toast.error("Unable to load camera..");
            resetForm();
            handleClose();
          }
        } else {
          setIsLoading(false);
          toast.error("Failed to Add Camera...");
          resetForm();
          handleClose();
        }
      });
    },
  });

  const addService = () => {
    const config = {
      model: "pedDet_vanilla",
      region: [
        [coords[0][0], coords[0][1]],
        [coords[0][2], coords[0][3]],
      ],
    };
    setIsLoading(true);
    handleAddService(camera_id, "intrusion_detection", config).then((res) => {
      if (res) {
        toast.success("Service Added");
        handleClose();
        setPage(0);
        setCamera_id(null);
        setThumbnail("");
        setIsLoading(false);
        setCoords([[0.25, 0.25, 0.75, 0.75]]);
      } else {
        setIsLoading(false);
        toast.error("Failed to add service");
      }
    });
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        handleClose();
        formik.resetForm();
        setPage(0);
        setCamera_id(null);
        setThumbnail("");
        setIsLoading(false);
        setCoords([[0.25, 0.25, 0.75, 0.75]]);
      }}
      PaperComponent={Container}
      sx={{
        background: "rgba(9, 13, 21, 0.8)",
        borderRadius: "6px",
      }}
      PaperProps={{ maxWidth: "sm" }}
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
        {page === 0 ? (
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mx: -5,
              }}
            >
              <IconButton
                onClick={() => {
                  handleClose();
                  formik.resetForm();
                }}
              >
                <CancelIcon />
              </IconButton>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4" component="h2" mb={4}>
                Add Camera
              </Typography>
            </Box>
            <CustomInputField
              variant="outlined"
              name="label"
              placeholder="Camera Name"
              value={formik.values.label}
              onChange={formik.handleChange}
              error={formik.touched.label && Boolean(formik.errors.label)}
              helperText={formik.touched.label && formik.errors.label}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LabelIcon sx={{ color: "#6A7A93" }} />
                  </InputAdornment>
                ),
              }}
            />
            <Typography
              sx={{
                color: "rgba(93, 100, 163, 0.9)",
                fontWeight: "400",
                fontSize: "0.8rem",
              }}
              mb={2}
            >
              Name the camera based on its location, e.g Lobby Gate{" "}
            </Typography>

            <CustomInputField
              variant="outlined"
              name="rtsp_link"
              placeholder="Rtsp/Rtmp Link"
              value={formik.values.rtsp_link}
              onChange={formik.handleChange}
              error={
                formik.touched.rtsp_link && Boolean(formik.errors.rtsp_link)
              }
              helperText={formik.touched.rtsp_link && formik.errors.rtsp_link}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LinkIcon sx={{ color: "#6A7A93" }} />
                  </InputAdornment>
                ),
              }}
            />
            <Typography
              sx={{
                color: "rgba(93, 100, 163, 0.9)",
                fontWeight: "400",
                fontSize: "0.8rem",
              }}
              mb={2}
            >
              Enter RTSM/RTMP URL of your live camera feed
            </Typography>

            {/* <Box display="flex" alignItems="center">
              <PlaylistAddCheckIcon sx={{ color: "#6A7A93" }} />
              <Typography
                ml={1}
                mr={3}
                sx={{ color: "#6A7A93", fontSize: "15px", fontWeight: "400" }}
              >
                Camera deployed for
              </Typography>
              <FormControl>
                <RadioGroup
                  row
                  value={value}
                  onChange={handleCameraPositionChange}
                >
                  <FormControlLabel
                    value="entry"
                    control={<Radio />}
                    label={
                      <Typography
                        sx={{
                          color: "#6A7A93",
                          fontSize: "15px",
                          fontWeight: "400",
                        }}
                      >
                        Entry
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value="exit"
                    control={<Radio />}
                    label={
                      <Typography
                        sx={{
                          color: "#6A7A93",
                          fontSize: "15px",
                          fontWeight: "400",
                        }}
                      >
                        Exit
                      </Typography>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Typography
              sx={{
                color: "rgba(93, 100, 163, 0.9)",
                fontWeight: "400",
                fontSize: "0.8rem",
              }}
              mb={2}
            >
              Select whether this camera is at entry or exit of the location
            </Typography> */}
            <Box
              mt={4}
              mb={6}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CustomOutlinedButton
                Icon={ArrowForwardIcon}
                text="Add Camera"
                isLoading={isLoading}
              />
            </Box>
          </form>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mx: -5,
              }}
            >
              <IconButton
                onClick={() => {
                  handleClose();
                  formik.resetForm();
                }}
              >
                <CancelIcon />
              </IconButton>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4" component="h2" mb={4}>
                Mark Region
              </Typography>
            </Box>
            <Typography
              sx={{
                color: "rgba(93, 100, 163, 0.9)",
                fontWeight: "400",
                fontSize: "0.8rem",
                textAlign: "center",
              }}
              mb={2}
            >
              Select the region of interest where you want to operate our
              security solution. This will improve the precision of the solution
              and also help you focus on specific region of interes.
            </Typography>
            <BoxBounding
              coords={coords}
              coordsChange={(val) => {
                setCoords(val);
              }}
              thumbnail={thumbnail}
            />
            <Box
              mt={4}
              // mb={6}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              {/* <CustomOutlinedButton
                Icon={CloseIcon}
                text="No Region"
                onClick={() => {
                  setPage(0);
                }}
              /> */}
              <CustomOutlinedButton
                Icon={ArrowForwardIcon}
                text="Select Region"
                isLoading={isLoading}
                onClick={() => {
                  addService();
                  // setPage(0);
                }}
              />
            </Box>
          </>
        )}
      </Box>
    </Dialog>
  );
};

export default AddCameraModal;
