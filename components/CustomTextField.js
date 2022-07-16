import { InputAdornment, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomInputField = styled(TextField)({
  width: "100%",
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
    color: "white",
  },
});

const CustomField = ({
  name = "",
  variant = "outlined",
  placeholder = "",
  value = "",
  onChange = {},
  error = {},
  helperText = {},
  StartIcon,
}) => {
  return (
    <CustomInputField
      variant={variant}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      // InputProps={{
      //   startAdornment: (
      //     <InputAdornment position="start">
      //       <StartIcon />
      //     </InputAdornment>
      //   ),
      // }}
    />
  );
};

export default CustomField;
