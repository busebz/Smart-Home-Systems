import { createTheme } from "@mui/material/styles";
import MyFont from "./assets/fonts/Vegur-Regular.otf";

const theme = createTheme({
  palette: {
    blue: {
      900: "#0e1238",
      800: "#020516",
      700: "#060f30",
      600: "#05225e",
      500: "#0075ff",
    },
    gray: {
      900: "#1a1e37",
      800: "#5c6c8e",
      700: "#666666",
      600: "#696969",
      500: "#9c9c9c",
      400: "#b5b5b5",
      300: "#cfcfcf",
      200: "#e8e8e8",
      100: "#edeeed",
    },
    green: {},
  },
  typography: {
    fontFamily: MyFont,
    fontSize: 12,
    h1: {
      fontSize: 23,
      color: "#edeeed",
      fontWeight: 500,
    },
    h2: {
      fontSize: 15,
      color: "#edeeed",
    },
    subtitle1: {
      fontSize: 12,
      color: "#edeeed",
    },
    subtitle2: {
      fontSize: 11,
      color: "#6a7e99",
    },
  },
});

export default theme;
