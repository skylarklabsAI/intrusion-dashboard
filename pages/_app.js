import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../styles/createEmotionCache";
import React from "react";
import "/styles/globals.css";
import theme from "../styles/theme";
import { AuthProvider } from "../auth/authContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AppBar,
  Box,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const [date, setDate] = React.useState(new Date());

  React.useEffect(() => {
    setInterval(() => {
      setDate(new Date());
    }, 30000);
  }, []);
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const Layout = Component.Layout || React.Fragment;
  const [isMobielView, setIsMobileView] = React.useState(false);

  const isSmallerScreen = useMediaQuery(theme.breakpoints.down("md"));
  React.useEffect(() => {
    if (isSmallerScreen) {
      setIsMobileView(true);
    } else {
      setIsMobileView(false);
    }
  }, [isSmallerScreen]);

  if (isMobielView) {
    return (
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Dashboard</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
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
                      width: "50px",
                      borderRadius: "50%",
                      background: "#25293B",
                      zIndex: "9999",
                    }}
                  >
                    <img
                      src="images/logo_short_dark.png"
                      width="30px"
                      height="30px"
                    />
                  </Box>
                  <Stack ml={2}>
                    <Typography
                      mb={1}
                      sx={{
                        fontWeight: "600",
                        fontSize: "1.45rem",
                        lineHeight: "25px",
                        color: "#FFFFFF",
                      }}
                    >
                      Intelligent Intrusion Detection System
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "500",
                        fontSize: "0.75rem",
                        lineHeight: "15px",
                        color: "#FFFFFF",
                      }}
                    >
                      {date.toLocaleDateString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        // second: "numeric"
                      })}
                    </Typography>
                  </Stack>
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
                background: "url(images/bg-1.png)",
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
                backdropFilter: "blur(11px)",
              }}
            />
            <Box
              p={2}
              width="100%"
              height="100%"
              display="flex"
              justifyContent="center"
              flexDirection="column"
            >
              <Typography variant="h3" sx={{ color: "white", zIndex: "99999" }}>
                Thanks for visiting Skylarklabs{" "}
                <span style={{ color: "#6D7DB8" }}>
                  Intelligent Intrusion Detection Dashboard
                </span>
              </Typography>
              <Typography
                mt={3}
                variant="h3"
                sx={{ color: "white", zIndex: "99999" }}
              >
                For better experiance of the features and analytics we provide
                please switch to desktop
              </Typography>
            </Box>
          </Box>
        </ThemeProvider>
        <ToastContainer />
      </CacheProvider>
    );
  }

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Dashboard</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </ThemeProvider>
      <ToastContainer />
    </CacheProvider>
  );
}

// import '../styles/globals.css'

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp
