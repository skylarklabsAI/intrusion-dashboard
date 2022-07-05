import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { deepPurple, amber } from "@mui/material/colors";

// Create a theme instance.
let theme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: [
      // "Raleway",
      // "Open Sans",
      "Rubik",
      "Inter",
      "Nunito",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

theme = responsiveFontSizes(theme);

export default theme;
