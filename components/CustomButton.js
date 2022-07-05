import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";

const CustomOutlinedButton = ({
  Icon,
  StartIcon,
  text,
  isLoading = false,
  loadingPosition = "end",
  sx = {},
  size = "large",
  disabled = false,
  onClick = ()=>{}
}) => {
  return (
    <LoadingButton
      // variant="outlined"
      size={size}
      onClick={onClick}
      type="submit"
      loading={isLoading}
      loadingPosition={loadingPosition}
      sx={{
        textTransform: "none",
        background: "#1B198C",
        borderTop: "1.5px solid #647BCA",
        borderRadius: "100px",
        height: "40px",
        px: 3,
        color: "#ffffff",
        fontWeight: "600",
        fontSize: "15px",
        lineHeight: "18px",
        "&:hover": {
          boxShadow: 10,
          background: "#1B198C99",
        },
        ...sx,
      }}
      startIcon={StartIcon ? <StartIcon /> : <></>}
      endIcon={Icon ? <Icon /> : <></>}
      disabled={disabled}
    >
      {text}
    </LoadingButton>
  );
};

export default CustomOutlinedButton;
