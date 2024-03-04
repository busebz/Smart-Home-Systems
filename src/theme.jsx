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
    green: {
      900: "#094a4b",
      800: "#117566",
      700: "#077060",
      600: "#1d9b87",
      500: "#2eaf84",
      400: "#02b772",
      300: "#6be7bd",
      200: "#8bf6d6",
      100: "#b0f5e3",
    },
    gray: {
      900: "#1a1e37",
      800: "#5c6c8e",
      700: "#666666",
      600: "#696969",
      500: "#9c9c9c",
      400: "#737999",
      300: "#cfcfcf",
      200: "#e8e8e8",
      100: "#edeeed",
    },
  },
  typography: {
    fontFamily: MyFont,
    fontSize: 12,
    h1: {
      fontSize: "clamp(35px, 2.5vw, 48px)",
      color: "#edeeed",
      fontWeight: 500,
    },
    h2: {
      fontSize: "clamp(17px, 2vw, 27px)",
      color: "#edeeed",
    },
    h3: {
      fontSize: "clamp(16px, 3vw, 25px)",
      color: "#edeeed",
    },
    h4: {
      fontSize: "clamp(15px, 1.2vw, 21px)",
      color: "#edeeed",
    },
    h5: {
      fontSize: "clamp(15px, 1.2vw, 18px)",
      color: "#edeeed",
    },
    h6: {
      fontSize: "clamp(12px, 1vw, 16px)",
      color: "#edeeed", 
    },
    subtitle1: {
      fontSize: "clamp(16px, 1.4vw, 20px)",
      color: "#6a7e99",
    },
    subtitle2: { fontSize: "clamp(14px, 1.4vw, 18px)", color: "#edeeed" },
    body1: {
      fontSize: "clamp(15px, 1.2vw, 18px)",
      color: "#6a7e99",
    },
    body2: {
      fontSize: "clamp(11px, 1.2vw, 15px)",
      color: "#6a7e99",
    },
  },
});

export default theme;
