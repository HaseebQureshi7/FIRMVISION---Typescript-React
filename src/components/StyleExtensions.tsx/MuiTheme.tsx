import { createTheme, PaletteMode } from "@mui/material";

const MuiTheme = (themeMode: PaletteMode) =>
  createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: "#05559E",
      },
      secondary: {
        main: "#7B61FF",
      },
    },
    typography: {
      fontFamily: "Montserrat"
    }
  });

export default MuiTheme