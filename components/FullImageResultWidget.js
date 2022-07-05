import { Box, Typography } from "@mui/material";

const FullImageResultWidget = ({ image_url, date, time, plate }) => {
  return (
    <Box
      flex={1}
      position="relative"
      sx={{
        "@media (max-width: 600px)": {
          display: "none",
        },
      }}
    >
      <img src={image_url} height="100%" width="100%" />
      <FullImageWidgetBox
        sx={{
          background:
            "linear-gradient(180deg, #000000 0%, rgba(36, 36, 36, 0.22) 21.82%, rgba(72, 72, 72, 0) 52.94%, rgba(142, 142, 142, 0) 77.6%);",
        }}
      />
      <FullImageWidgetBox
        sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}
      >
        <FullImageWidgetText text={date} sx={{ ml: 2 }} />
        <FullImageWidgetText text={plate} />
        <FullImageWidgetText text={time} sx={{ mr: 2 }} />
      </FullImageWidgetBox>
    </Box>
  );
};

const FullImageWidgetBox = ({ children, sx = {} }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

const FullImageWidgetText = ({ text, sx = {} }) => {
  return (
    <Typography
      sx={{
        color: "white",
        fontSize: "12px",
        lineHeight: "13px",
        fontWeight: "400",
        ...sx,
      }}
    >
      {text}
    </Typography>
  );
};

export default FullImageResultWidget;
