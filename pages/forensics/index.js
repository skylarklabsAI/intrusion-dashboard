import * as React from "react";
import Box from "@mui/material/Box";
import { Divider, Grid, TextField, Typography } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SearchResultCard from "./components/SearchResultCard";
import SearchResultTable from "./components/SearchResultTable";
import SearchContainer from "./components/SearchContainer";
import MainLayout from "../../components/layouts/MainLayout";

const ForensicScreen = () => {
  const [vehicleRecords, setVehicleRecords] = React.useState([]);
  const [vehicleRecordsCount, setVehicleRecordsCount] = React.useState(0);
  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{
        bgcolor: "#040D18",
        width: "100%",
        minHeight: "calc( 100vh - 90px)",
      }}
    >
      <Grid
        container
        sx={{ height: "calc( 100vh - 90px)", maxWidth: "125rem" }}
        justifyContent="center"
      >
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            height: "calc( 100vh - 90px)",
            overflowY: "scroll",
            borderRight: 1,
            borderColor: "rgba(57, 76, 104, 0.5)",
          }}
        >
          <Box display="flex" alignItems="center" m={2}>
            <SearchRoundedIcon />
            <Typography
              ml={1}
              sx={{ color: "#EDEDED", fontWeight: "500", fontSize: "22px" }}
            >
              Search Vehicle
            </Typography>
            <Box flex={1} />
          </Box>
          <SearchContainer
            setVehicleRecords={setVehicleRecords}
            setVehicleRecordsCount={setVehicleRecordsCount}
          />

          <Divider />
          <Box display="flex" alignItems="center" m={2}>
            <AssessmentIcon />
            <Typography
              ml={1}
              sx={{ color: "#EDEDED", fontWeight: "500", fontSize: "22px" }}
            >
              Forensics Analytics
            </Typography>
          </Box>
          <SearchResultTable vehicleRecordsCount={vehicleRecordsCount} />
        </Grid>
        <Grid
          item
          xs={12}
          md={7}
          sx={{
            height: "calc( 100vh - 90px)",
            overflowY: "scroll",
            bgcolor: "#040D18",
          }}
        >
          {vehicleRecords.map((obj) => {
            return <SearchResultCard key={obj["id"]} vehicleRecord={obj} />;
          })}
        </Grid>
      </Grid>
    </Box>
  );
};

ForensicScreen.Layout = MainLayout;

export default ForensicScreen;
