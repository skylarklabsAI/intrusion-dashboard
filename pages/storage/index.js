import { Box, Grid } from "@mui/material";
import MainLayout from "../../components/layouts/MainLayout";
import CameraListContainer from "./components/CameraListContainer";
import StorageWrapper from "./components/StorageWrapper";
const StoragePage = () => {
  return (
    <Box
      sx={{
        bgcolor: "#040D18",
        width: "100%",
        minHeight: "calc( 100vh - 90px)",
      }}
    >
      <Grid container sx={{ height: "calc( 100vh - 90px)" }}>
        <Grid
          item
          xs={3}
          sm={2}
          sx={{
            height: "calc( 100vh - 90px)",
            borderRight: 1,
            borderColor: "rgba(57, 76, 104, 0.5)",
          }}
        >
          <CameraListContainer />
        </Grid>
        <Grid item xs={9} sm={10} sx={{ height: "calc( 100vh - 90px)" }}>
          <StorageWrapper />
        </Grid>
      </Grid>
    </Box>
  );
};

StoragePage.Layout = MainLayout;
export default StoragePage;
