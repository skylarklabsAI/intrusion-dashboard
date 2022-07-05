import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { Box } from "@mui/material";
import React from "react";

const CustomDropDown = ({ label, value, handleChange, menuList = [], Icon=React.Fragment, disabled=false}) => {
  return (
    <FormControl sx={{ width: "100%", border: "none" }} size="small">
      {/* <InputLabel id={label} sx={{ color: "rgba(106, 122, 147, 1)" }}>
        {label}
      </InputLabel> */}
      <Select
        disabled={disabled}
        labelId={label}
        id={label}
        value={value}
        // label={label}
        variant="outlined"
        //   disableUnderline
        sx={{
          color: "rgba(106, 122, 147, 1)",
          width: "100%",
          height:"37px",
          // minWidth: "200px",
          background: "#132136",
          borderRadius:"9px",
          border: "none !important",
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none !important",
            borderRadius: "5px 5px 0 0",
          },
        }}
        onChange={handleChange}
        renderValue={(value, name) => {
          return (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Icon />
              {menuList[value]}
            </Box>
          );
        }}
      >
      
        {Object.keys(menuList).map((menu) => {
          return (
            <MenuItem key={menu} value={menu}>
              {menuList[menu]}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default CustomDropDown;
