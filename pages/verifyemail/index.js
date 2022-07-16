import { Box } from "@mui/material";
import { useEffect } from "react";
import useAuth from "../../auth/authContext";
import VerifyDialog from "./components/VerifyDialog";

const VerifyPage = () => {
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      window.location.pathname = "/";
    }
  }, [user]);
  return (
    <Box
      height="100vh"
      width="100vw"
      position="relative"
      sx={{ overflow: "hidden", bgcolor: "#040D18" }}
    >
      <Box
        position="absolute"
        height="90px"
        width="100%"
        sx={{
          bgcolor: "#040D18",
          borderBottom: "1px solid rgba(57, 76, 104, 0.23)",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "100%",
            position: "relative",
          }}
        >
          <img
            src="/images/top_gradient.png"
            height="100%"
            style={{ position: "absolute", top: "0px", left: "0px" }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Box
              ml={4}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "50px",
                // width: "50px",
                // borderRadius: "50%",
                // background: "#25293B",
                zIndex: "999999",
              }}
            >
              <img
                src="images/logo_with_subtitle.png"
                width="330px"
                height="40px"
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        zIndex="99999"
        position="absolute"
        top="90px"
        width="100%"
        height="100%"
        sx={{
          background: "url(images/full_bg.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
        }}
      />
      <Box
        zIndex="99999"
        top="90px"
        position="absolute"
        width="100%"
        height="100%"
        sx={{
          background: "rgba(17, 17, 37, 0.8)",
          //   backdropFilter: "blur(6px)",
        }}
      />
      <Box
        zIndex="99999"
        top="90px"
        position="absolute"
        width="100%"
        height="100%"
      >
        <VerifyDialog />
      </Box>
      <Box zIndex="99999" position="absolute" bottom="-10px" right="0px">
        <img src="images/bottom_gradient.png" height="100%" />
      </Box>
    </Box>
  );
};
export default VerifyPage;
