import { Box, Divider, Typography } from "@mui/material";

const SearchResultTable = ({ vehicleRecordsCount }) => {
  return (
    <Box
      m={2}
      sx={{
        border: "1px solid rgba(57, 76, 104, 0.8)",
        borderRadius: "10px",
      }}
    >
      <TableRow name="Total forensics results" value={vehicleRecordsCount} />
      <Divider />
      <TableRow name="Total camera results" value="1" />
      <Divider />
      <TableRow name="Genders" value="Male, Female" />
      <Divider />
      <TableRow name="Unknown Indivuduals" value="3" />
    </Box>
  );
};

const TableRow = ({ name, value }) => {
  return (
    <Box display="flex" alignItems="center">
      <Typography sx={{ flex: 1, m: 1 }}>{name}</Typography>
      <Divider orientation="vertical" flexItem />
      <Typography sx={{ flex: 1, textAlign: "center", m: 1 }}>
        {value}
      </Typography>
    </Box>
  );
};

export default SearchResultTable;
