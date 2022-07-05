import { Box, Divider, Typography } from "@mui/material";
import FullImageResultWidget from "../../../components/FullImageResultWidget";
import moment from "moment";
import CustomMatchBar from "../../../components/CustomMatchBar";
const SearchResultCard = ({ vehicleRecord }) => {
  return (
    <Box
      m={1}
      display="flex"
      // flexWrap="wrap"
      height="250px"
      sx={{
        border: " 1px solid rgba(57, 76, 104, 0.88)",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <Box>
      <FullImageResultWidget
        image_url="images/fullimg.png"
        date={vehicleRecord && moment(vehicleRecord["date"]).format("DD-MM-YYYY")}
        time={vehicleRecord && moment(vehicleRecord["first_seen"]).format("HH:mm")}
        // plate={vehicleRecord && vehicleRecord["plate"]}
        />
        </Box>
      <Box p={1} maxWidth="300px" display="flex" flexDirection="column" alignItems="center" justifyContent="space-between">
        <Box display="flex" justifyContent="center" gap="10px">
          <img src="images/priya-1.png" height="100px" width="120px" />
          <img src="images/priya-2.png" height="100px" width="120px" />
        </Box>
        <CustomMatchBar
              percentage={94}
              text="Priya - 94%"
              width="100%"
              height="25px"
              textSx={{ fontSize: "10px" }}
        />
        <CustomMatchBar
              percentage={30}
              text="Anjali - 30%"
              width="100%"
              height="25px"
              textSx={{ fontSize: "10px" }}
        />
        <CustomMatchBar
              percentage={5}
              text="Payal - 5%"
              width="100%"
              height="25px"
              textSx={{ fontSize: "10px" }}
            />
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box
        minWidth="200px"
        flex={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <TableCell name={"Camera"} value={"Main Road"} />
        <Divider />
        <TableCell
          name={"Date"}
          value={
            vehicleRecord && moment(vehicleRecord["date"]).format("DD-MM-YYYY")
          }
        />
        <Divider />
        <TableCell
          name={"Arrived at"}
          value={
            vehicleRecord && moment(vehicleRecord["first_seen"]).format("HH:mm")
          }
        />
        <Divider />
        <TableCell
          name={"Type"}
          value={vehicleRecord && vehicleRecord["kind"]}
        />
        <Divider />
        <TableCell
          name={"Color"}
          value={vehicleRecord && vehicleRecord["color"]}
        />
        <Divider />
        <TableCell
          name={"Plate"}
          value={vehicleRecord && vehicleRecord["plate"]}
        />
      </Box>
    </Box>
  );
};

const TableCell = ({ name, value }) => {
  return (
    <Typography
      m={1}
      sx={{ fontSize: "14px", fontWeight: "400", color: "#ffffff" }}
    >
      <span style={{ color: "#7A8DBE" }}>{name} :</span> {value}
    </Typography>
  );
};

export default SearchResultCard;
