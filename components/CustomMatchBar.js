import { Box, Typography } from "@mui/material";

const CustomMatchBar = ({
  percentage,
  text,
  height = "30px",
  width = "250px",
  sx = {},
  textSx = {},
}) => {
  return (
    <Box
      width={width}
      height={height}
      bgcolor="#1A2B4F"
      borderRadius="10px"
      position="relative"
      overflow="hidden"
      sx={{ ...sx }}
    >
      <Box
        position="absolute"
        top="0px"
        width={`${percentage}%`}
        bgcolor={`rgba(68, 255, 98, ${percentage / 100 + 0.1})`}
        height={height}
      />
      <Box
        height="100%"
        display="flex"
        justifyContent="start"
        alignItems="center"
      >
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: "18px",
            ml: 2,
            zIndex: 1,
            ...textSx,
          }}
        >
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

export default CustomMatchBar;
