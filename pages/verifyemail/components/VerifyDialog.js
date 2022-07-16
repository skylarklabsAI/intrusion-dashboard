import { Dialog, Box, Container, Typography } from "@mui/material";

const VerifyDialog = ({ open = true, handleClose = () => {} }) => {
  return (
    <Dialog
      PaperComponent={Container}
      maxWidth="lg"
      sx={{
        marginTop: "90px",
        background: "rgba(9, 13, 21, 0.2)",
        borderRadius: "6px",
        zIndex: "99999",
      }}
      open={open}
      onClose={() => {
        handleClose();
      }}
      fullWidth
    >
      <Box
        sx={{
          border: "1px solid #3B4B82",
          position: "relative",
          borderRadius: "9px",
          height: "500px",
          overflow: "hidden",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          height="100%"
          justifyContent="center"
        >
          <Typography
            variant="h3"
            mx={{
              fontWeight: 500,
              letterSpacing: -2,
              fontFamily: "Segoe UI",
              background: "-webkit-linear-gradient(right, #999999, #4779D4)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign: "center",
              mb: 2,
            }}
          >
            Verify Email First!
          </Typography>
          <Typography
            marginTop={1}
            sx={{
              fontWeight: 300,
              fontSize: 17,
              lineHeight: "23px",
              textAlign: "center",
              mb: 4,
            }}
          >
            Please Check your email, if not received please check spam folder.
          </Typography>
          <Typography
            marginTop={1}
            sx={{
              fontWeight: 600,
              fontSize: 17,
              lineHeight: "23px",
              textAlign: "center",
              mb: 4,
            }}
          >
            You may close this window!!
          </Typography>
        </Box>
      </Box>
    </Dialog>
  );
};
export default VerifyDialog;
