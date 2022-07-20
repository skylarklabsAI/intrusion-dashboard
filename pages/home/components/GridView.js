import {
  Box,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  Typography,
  TextField,
  FormControlLabel,
  Divider,
  Button,
} from "@mui/material";
// import findFactor from "helpers/helper";
// import MainLayout from "layouts/MainLayout";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import WindowIcon from "@mui/icons-material/Window";
import GridOnIcon from "@mui/icons-material/GridOn";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import DrawerButton from "./DrawerButton";

import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
// import TextField from '@mui/material/TextField';
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import findFactor from "../../../components/helpers/helper";
import useAuth from "../../../auth/authContext";
import MuiNextLink from "../../../components/MuiNextLink";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const Player =
  //   global?.window &&
  dynamic(() => import("../../../components/Player"), { ssr: false });

const CustomAutocomplete = styled(Autocomplete)({
  "& .MuiAutocomplete-tag": {
    color: "white !important",
  },

  "& .MuiChip-root   ": {
    color: "white !important",
  },
  "& .MuiButtonBase-root": {
    color: "white !important",
  },
  "& .MuiChip-deleteIcon:hover": {
    color: "white !important",
  },
  "& .MuiChip-deleteIcon": {
    color: "white !important",
  },
  "& .MuiSvgIcon-root": {
    color: "white !important",
  },
  "& .MuiSvgIcon-root:hover": {
    color: "white !important",
  },
  "& .Mui-disabled": {
    color: "rgba(255, 255, 255, 0.6) !important",
    borderColor: "white !important",
  },
});

const CustomInputField = styled(TextField)({
  "& .MuiOutlinedInput-input": {
    color: "rgba(255, 255, 255, 0.6)",
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.6)",
  },
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 255, 255, 0.6)",
  },
  "&:hover .MuiOutlinedInput-input": {
    color: "rgba(255, 255, 255, 0.8)",
  },
  "&:hover .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.8)",
  },
  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 255, 255, 0.8)",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
    color: "rgba(255, 255, 255, 0.8)",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "rgba(255, 255, 255, 0.8)",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 255, 255, 0.8)",
  },
  "& .MuiInputBase-input": {
    fontSize: 16,
    color: "rgba(255, 255, 255, 1)",
  },
  "& .MuiSelect-icon": {
    color: "white",
  },
});

const GridView = ({ setIsGridView }) => {
  const { fetch_cameras, cameraList } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const aspectRatio = 1280 / 720;
  const boxRef = useRef();
  const [showAllCameras, setShowAllCameras] = useState(true);
  const [factor, setFactor] = useState(0);
  const [camCount, setCamCount] = useState(0);
  const [totalCam, setTotalCam] = useState(0);
  const [list, setList] = useState([]);
  const [allCameras, setAllCameras] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch_cameras();
  }, []);

  useEffect(() => {
    const temp = [];
    cameraList.map((value) => {
      if (value.is_processing && value.stream_url) {
        temp.push([value.stream_url, value.camera_id, value.label]);
      }
    });
    // temp = [
    //   [
    //     "http://13.234.7.128/d0e20252-17da-411d-a4ea-3b4fe95a6df7/stream/stream.m3u8",
    //     "1",
    //     "cam-1",
    //   ],
    // ];
    console.log(temp);
    if (temp.length > 4) {
      setCamCount(4);
    } else {
      setCamCount(temp.length);
    }
    setList(temp);
    setAllCameras(temp);
    setTotalCam(temp.length);
    setPage(0);
  }, [cameraList]);

  function handleResize() {
    const res = findFactor(
      1280, // stream width
      720, // stream height
      camCount,
      boxRef.current.clientWidth, // width of box
      window.innerHeight - 170 // height(window) - height(navbar)
    );
    console.log(res);
    setFactor(res);
  }

  useEffect(() => {
    handleResize();
    // removing listener
    window.onresize = {};
    // adding event listener
    var doit;
    window.onresize = function () {
      clearTimeout(doit);
      doit = setTimeout(handleResize, 100);
    };
    return () => {
      window.onresize = {};
    };
  }, [camCount]);

  return (
    <>
      <Box sx={{ m: 2 }} position="relative">
        <DrawerButton
          onClick={() => {
            setDrawerOpen(true);
          }}
        />
        <Box display="flex" alignItems="center">
          <Button
            sx={{ textTransform: "none" }}
            onClick={() => {
              setIsGridView(false);
            }}
          >
            <ArrowBackIcon />
            <Typography sx={{ fontSize: "14px" }} ml={1}>
              Back
            </Typography>
          </Button>
          <Divider
            orientation="vertical"
            sx={{ mr: 1, ml: 1, height: "40px" }}
            flexItem
          />
          <Typography
            ml={1}
            variant="h6"
            sx={{ color: "#EDEDED", fontWeight: "600" }}
          >
            Grid View
          </Typography>
        </Box>
        <Box
          ref={boxRef}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            // background: "#172436",
            //   background: "#00000022",
            // background:"red",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "20px",
            // borderRadius: "0.25rem",
            minHeight: "calc(100vh - 160px)",
          }}
        >
          {list.map(([url, camId, camName], index) => {
            if (index >= page * camCount && index < (page + 1) * camCount)
              return (
                <div
                  key={camId}
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignContent: "center",
                  }}
                >
                  {/* <MuiNextLink href={`/live/${camId}`}> */}
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      width:
                        window.innerWidth < 960
                          ? window.innerWidth < 600
                            ? "45vw"
                            : "45vw"
                          : aspectRatio * factor,
                      height: window.innerWidth < 600 ? "auto" : factor,
                      padding: 5,
                      cursor: "pointer",
                      // borderRadius: 50,
                    }}
                  >
                    <Player
                      url={url}
                      // width="100%"
                      // max-height="175px"
                      // height="100%"
                      controls={false}
                    />
                  </div>
                  {/* </MuiNextLink> */}
                </div>
              );
          })}
        </Box>
        <Drawer
          anchor={"right"}
          open={drawerOpen}
          onClose={() => {
            setDrawerOpen(false);
          }}
        >
          <Box
            sx={{
              background: "#05101F",
              width: "350px",
              minHeight: "100vh",
              overflowY: "scroll",
              pt: "100px",
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "white", textAlign: "center", mt: 1 }}
              mb={2}
            >
              Choose Camera View
            </Typography>
            <Box
              sx={{
                color: "white",
                display: "flex",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              <LayoutBox
                title="One Camera"
                Icon={CropSquareIcon}
                onClick={() => {
                  setCamCount(1);
                  setPage(0);
                }}
                isActive={camCount === 1}
              />
              <LayoutBox
                title="Four Cameras"
                Icon={WindowIcon}
                onClick={() => {
                  setCamCount(4);
                  setPage(0);
                }}
                isActive={camCount === 4}
              />
              <LayoutBox
                title="Nine Cameras"
                Icon={GridOnIcon}
                onClick={() => {
                  setCamCount(9);
                  setPage(0);
                }}
                isActive={camCount === 9}
              />
            </Box>
            <Typography
              variant="subtitle2"
              sx={{ color: "white", textAlign: "center", mt: 1 }}
              mb={2}
            >
              Or
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <FormControl sx={{ width: "80%" }}>
                <CustomInputField
                  select
                  value={camCount}
                  label="Choose Manually"
                  onChange={(e) => {
                    setCamCount(e.target.value);
                    setPage(0);
                  }}
                >
                  <MenuItem value={1}>One</MenuItem>
                  <MenuItem value={2}>Two</MenuItem>
                  <MenuItem value={3}>Three</MenuItem>
                  <MenuItem value={4}>Four</MenuItem>
                  <MenuItem value={5}>Five</MenuItem>
                  <MenuItem value={6}>Six</MenuItem>
                  <MenuItem value={7}>Seven</MenuItem>
                  <MenuItem value={8}>Eight</MenuItem>
                  <MenuItem value={9}>Nine</MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                </CustomInputField>
              </FormControl>
            </Box>
            <Typography sx={{ color: "white" }} mt={2} mx={2}>
              Select Cameras
            </Typography>
            <FormControlLabel
              sx={{ color: "white", m: 2 }}
              control={
                <Checkbox
                  defaultChecked={showAllCameras}
                  onChange={(e, value) => {
                    setShowAllCameras(value);
                    if (value === true) {
                      setList(allCameras);
                      setPage(0);
                    } else {
                      setList([]);
                      setPage(0);
                    }
                  }}
                />
              }
              label="Show All Cameras"
            />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CustomAutocomplete
                limitTags={5}
                multiple
                disabled={showAllCameras}
                id="checkboxes-tags-demo"
                options={allCameras}
                value={showAllCameras ? [] : list}
                onChange={(event, value) => {
                  setList(value);
                  setPage(0);
                }}
                disableCloseOnSelect
                getOptionLabel={(option) => option[2]}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option[2]}
                  </li>
                )}
                style={{ width: "80%" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose Cameras"
                    placeholder="Search Camera"
                    sx={{
                      "& .MuiOutlinedInput-input": {
                        color: "rgba(255, 255, 255, 0.6)",
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255, 255, 255, 0.6)",
                      },
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "rgba(255, 255, 255, 0.6)",
                        },
                      "&:hover .MuiOutlinedInput-input": {
                        color: "rgba(255, 255, 255, 0.8)",
                      },
                      "&:hover .MuiInputLabel-root": {
                        color: "rgba(255, 255, 255, 0.8)",
                      },
                      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "rgba(255, 255, 255, 0.8)",
                        },
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input":
                        {
                          color: "rgba(255, 255, 255, 0.8)",
                        },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "rgba(255, 255, 255, 0.8)",
                      },
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "rgba(255, 255, 255, 0.8)",
                        },
                      "& .MuiInputBase-input": {
                        fontSize: 16,
                        color: "rgba(255, 255, 255, 1)",
                      },
                      "& .MuiSelect-icon": {
                        color: "white",
                      },
                    }}
                  />
                )}
              />
            </Box>
          </Box>
        </Drawer>
        <Box
          sx={{
            display: "flex",
            width: "200px",
            color: "white",
            justifyContent: "space-between",
            alignItems: "center",
            position: "absolute",
            right: "10px",
            bottom: "10px",
            background: "#163069",
            p: 0.6,
            borderRadius: "10px",
          }}
        >
          <IconButton
            disabled={page === 0}
            onClick={(e) => {
              setPage(page - 1);
            }}
            sx={{ color: "white" }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography>
            {` ${page + 1} / ${Math.ceil(list.length / camCount)}`}
          </Typography>
          <IconButton
            sx={{ color: "white" }}
            disabled={page === Math.ceil(list.length / camCount) - 1}
            onClick={(e) => {
              setPage(page + 1);
            }}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

const LayoutBox = ({ title, Icon, onClick, isActive }) => {
  return (
    <>
      <Tooltip title={title} arrow>
        <Box
          onClick={onClick}
          sx={{
            background: isActive ? "#464966" : "#1E1F29",
            borderRadius: "10px",
          }}
        >
          <IconButton>
            <Icon sx={{ fontSize: "26px", color: "white" }} />
          </IconButton>
        </Box>
      </Tooltip>
    </>
  );
};

export default GridView;
