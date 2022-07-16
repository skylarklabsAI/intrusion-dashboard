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
  Modal,
  Tooltip,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useFormik } from "formik";
import { styled, alpha } from "@mui/material/styles";
import * as Yup from "yup";
import LabelIcon from "@mui/icons-material/Label";
import LinkIcon from "@mui/icons-material/Link";
import { useEffect, useState } from "react";
import BoxBounding from "./BoxBounding";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import CustomOutlinedButton from "../../../components/CustomButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import useAuth from "../../../auth/authContext";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
LoadingOverlay.propTypes = undefined;

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

const EditCameraModal = ({ open, handleClose, id }) => {
  const [coords, setCoords] = useState([[0.25, 0.25, 0.75, 0.75]]);
  const [page, setPage] = useState(0);
  const [thumbnail, setThumbnail] = useState("");
  const [camera_id, setCamera_id] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const {
    fetch_camera_services,
    fetch_camera_by_id,
    handleUpdateCamera,
    handleAddService,
  } = useAuth();

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    fetch_camera_by_id(id)
      .then((res) => {
        setThumbnail(res.data["thumbnail"]);
        formik.setFieldValue("label", res.data["label"]);
        formik.setFieldValue("rtsp_link", res.data["rtsp_link"]);
        setLoading(false);
        fetch_camera_services(id)
          .then((res) => {
            console.log(res.data);
            if (res.data["intrusion_detection"]) {
              const region = res.data["intrusion_detection"]["args"]["region"];
              setCoords([
                [region[0][0], region[0][1], region[1][0], region[1][1]],
              ]);
              setRefresh(!refresh);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Failed to fetch Camera Details");
        handleClose();
        console.log(err);
      });
  }, [open]);

  const validationSchema = Yup.object().shape({
    label: Yup.string().required("Label is required"),
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
      handleUpdateCamera(id, data).then((res) => {
        if (res) {
          toast.success("Camera Updated...");
          updateService(id);
        } else {
          setIsLoading(false);
          toast.error("Failed to Update Camera...");
          updateService(id);
        }
      });
    },
  });

  const updateService = (id) => {
    const config = {
      model: "pedDet_vanilla",
      region: [
        [coords[0][0], coords[0][1]],
        [coords[0][2], coords[0][3]],
      ],
    };
    handleAddService(id, "intrusion_detection", config).then((res) => {
      if (res) {
        toast.success("Service Updated");
        handleClose();
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Failed to Update service");
      }
    });
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        handleClose();
        formik.resetForm();
      }}
      PaperComponent={Container}
      sx={{
        background: "rgba(9, 13, 21, 0.8)",
        borderRadius: "6px",
      }}
      PaperProps={{ maxWidth: "sm" }}
    >
      <LoadingOverlay
        active={loading}
        spinner
        text="Fetching Camera Details...."
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
                Update Camera
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
            <Tooltip title="Non Editable">
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
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <LinkIcon sx={{ color: "#6A7A93" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Tooltip>
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography variant="h5" component="h4" mb={2}>
                Mark Region
              </Typography>
            </Box>

            <BoxBounding
              key={refresh}
              coords={coords}
              coordsChange={(val) => {
                setCoords(val);
              }}
              thumbnail={thumbnail}
            />
            <Box
              mt={4}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <CustomOutlinedButton
                Icon={ArrowForwardIcon}
                text="Update Camera"
                isLoading={isLoading}
              />
            </Box>
          </form>
        </Box>
      </LoadingOverlay>
    </Dialog>
  );
};

export default EditCameraModal;
