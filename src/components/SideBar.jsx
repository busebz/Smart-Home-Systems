import { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Icon,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import homepageicon from "../assets/homepage.png";
import build from "../assets/build.png";
import creditcard from "../assets/creditcard.png";
import user from "../assets/user.png";

import theme from "../theme.jsx";

function SideBar() {
  const colors = theme.palette;

  return (
    <Box
      sx={{
        width: "15%",
        height: "98.3vh",
        overflow: "hidden",
        borderRadius: "10px",
        margin: "5px 4px 5px",
        background: `linear-gradient(100deg,${colors.blue[900]},${colors.blue[700]})`,
      }}
    >
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          margin: "20px 0px 0px",
          borderBottom: `1px solid ${colors.gray[100]}`,
          paddingBottom: "10px",
          width: "90%",
          marginX: "auto",
        }}
      >
        V
      </Typography>
      <Box sx={{ width: "90%", height: "100vh", marginX: "auto" }}>
        <List>
          <ListItem
            component={Link}
            to="/"
            sx={{
              width: "100%",
              "&:hover": {
                backgroundColor: colors.gray[800],
                borderRadius: "10px",
              },
            }}
          >
            <img src={homepageicon} alt="Homepage icon" />
            <ListItemText
              primary="Dashboard"
              primaryTypographyProps={{
                variant: "subtitle1",
                sx: { marginLeft: "8px" },
              }}
            />
          </ListItem>
          <ListItem
            component={Link}
            to="/"
            sx={{
              width: "100%",
              "&:hover": {
                backgroundColor: colors.gray[900],
                borderRadius: "10px",
              },
            }}
          >
            <img src={build} alt="Homepage icon" />
            <ListItemText
              primary="Bişi"
              primaryTypographyProps={{
                variant: "subtitle1",
                sx: { marginLeft: "8px" },
              }}
            />
          </ListItem>
          <ListItem
            component={Link}
            to="/"
            sx={{
              width: "100%",
              "&:hover": {
                backgroundColor: colors.gray[900],
                borderRadius: "10px",
              },
            }}
          >
            <img src={creditcard} alt="Homepage icon" />
            <ListItemText
              primary="Bişi"
              primaryTypographyProps={{
                variant: "subtitle1",
                sx: { marginLeft: "8px" },
              }}
            />
          </ListItem>
          <ListItem
            component={Link}
            to="/"
            sx={{
              width: "100%",
              "&:hover": {
                backgroundColor: colors.gray[900],
                borderRadius: "10px",
              },
            }}
          >
            <img src={build} alt="Homepage icon" />
            <ListItemText
              primary="Bişi"
              primaryTypographyProps={{
                variant: "subtitle1",
                sx: { marginLeft: "8px" },
              }}
            />
          </ListItem>
          <Typography
            sx={{
              color: colors.gray[100],
              fontSize: 11,
              margin: "10px 15px 10px",
            }}
          >
            ACCOUNT PAGES
          </Typography>
          <ListItem
            component={Link}
            to="/"
            sx={{
              width: "100%",
              "&:hover": {
                backgroundColor: colors.gray[900],
                borderRadius: "10px",
              },
            }}
          >
            <img src={user} alt="Homepage icon" />
            <ListItemText
              primary="Sign Out"
              primaryTypographyProps={{
                variant: "subtitle1",
                sx: { marginLeft: "8px" },
              }}
            />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}

export default SideBar;
