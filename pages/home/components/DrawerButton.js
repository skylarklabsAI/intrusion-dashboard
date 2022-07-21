import { Box } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
const DrawerButton = ({ onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        position: "absolute",
        right: "10px",
        background: "#163069",
        width: "50px",
        height: "40px",
        mr: -3,
        pl: 1,
        borderRadius: "20px 0px 0px 20px",
        zIndex: 1000,
        cursor: "pointer",
        "&:hover": {
          width: "60px",
        },
      }}
    >
      <GridViewIcon sx={{ color: "white" }} />
    </Box>
  );
};
export default DrawerButton;
