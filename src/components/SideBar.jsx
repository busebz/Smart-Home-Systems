import React, { useEffect, useRef, useState } from "react";

import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  useMediaQuery,
  Slide,
} from "@mui/material";

import { NavLink } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import theme from "../theme.jsx";
import { useAuth } from "../context/authContext";

function SideBar() {
  const { logout } = useAuth();

  const colors = theme.palette;

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const sideBarRef = useRef(null);

  const toggleSideBar = () => {
    setIsSideBarOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      sideBarRef.current &&
      !sideBarRef.current.contains(event.target)
    ) {
      setIsSideBarOpen(false);
    }
  };

  useEffect(() => {
    if (isSideBarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSideBarOpen]);

  const menuItems = [
    {
      text: "Dashboard",
      path: "/dashboard",
      icon: <HomeOutlinedIcon />,
    },
    {
      text: "Devices",
      path: "/devices",
      icon: <GridViewOutlinedIcon />,
    },
    {
      text: "Users",
      path: "/users",
      icon: <PersonOutlineOutlinedIcon />,
    },
    {
      text: "Activity Logs",
      path: "/activity-logs",
      icon: <AccessTimeOutlinedIcon />,
    },
  ];

  const renderMenuItem = (item, mobile = false) => (
    <ListItem
      key={item.path}
      component={NavLink}
      to={item.path}
      onClick={() => {
        if (mobile) {
          setIsSideBarOpen(false);
        }
      }}
      sx={{
        width: "calc(100% - 16px)",

        height: mobile
          ? "44px"
          : "48px",

        margin: "4px 8px",

        padding: mobile
          ? "7px 10px"
          : "8px 12px",

        borderRadius: "8px",

        textDecoration: "none",

        color: colors.gray[100],

        transition: "background-color 0.2s ease",

        "& .MuiListItemIcon-root": {
          color: "#7aa7ff",

          minWidth: mobile
            ? "34px"
            : "39px",
        },

        "&:hover": {
          backgroundColor:
            "rgba(0, 117, 255, 0.14)",
        },

        "&.active": {
          background:
            "linear-gradient(90deg, rgba(0,117,255,0.82), rgba(0,80,190,0.4))",

          "& .MuiListItemIcon-root": {
            color: "#ffffff",
          },
        },
      }}
    >
      <ListItemIcon
        sx={{
          "& svg": {
            fontSize: mobile
              ? "21px"
              : "clamp(22px, 1.45vw, 25px)",
          },
        }}
      >
        {item.icon}
      </ListItemIcon>

      <ListItemText
        primary={
          <Typography
            sx={{
              color: colors.gray[100],

              fontSize: mobile
                ? "14px"
                : "clamp(15px, 1.08vw, 18px)",

              fontWeight: 400,

              whiteSpace: "nowrap",

              lineHeight: 1,
            }}
          >
            {item.text}
          </Typography>
        }
      />
    </ListItem>
  );

  const renderSidebarContent = (mobile = false) => (
    <>
      <Box
        sx={{
          height: mobile
            ? "60px"
            : "64px",

          display: "flex",

          alignItems: "center",

          justifyContent: "center",

          borderBottom:
            "1px solid rgba(255,255,255,0.12)",

          marginX: mobile
            ? "10px"
            : "14px",
        }}
      >
        <Typography
          sx={{
            color: colors.gray[100],

            fontSize: mobile
              ? "27px"
              : "clamp(29px, 2vw, 34px)",

            fontWeight: 500,

            lineHeight: 1,

            letterSpacing: "1px",
          }}
        >
          V
        </Typography>
      </Box>

      <List
        sx={{
          paddingTop: "8px",
          paddingBottom: "4px",
        }}
      >
        {menuItems.map((item) =>
          renderMenuItem(item, mobile)
        )}
      </List>

      <Box
        sx={{
          margin: mobile
            ? "10px 12px 0px"
            : "12px 14px 0px",

          borderTop:
            "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <Typography
          sx={{
            color: colors.gray[400],

            fontSize: mobile
              ? "11px"
              : "clamp(11px, 0.78vw, 13px)",

            marginTop: "12px",

            marginBottom: "6px",

            letterSpacing: "0.8px",

            whiteSpace: "nowrap",
          }}
        >
          ACCOUNT PAGES
        </Typography>
      </Box>

      <ListItem
        component={NavLink}
        to="/"
        onClick={() => {
          logout();

          if (mobile) {
            setIsSideBarOpen(false);
          }
        }}
        sx={{
          width: "calc(100% - 16px)",

          height: mobile
            ? "44px"
            : "48px",

          margin: "4px 8px",

          padding: mobile
            ? "7px 10px"
            : "8px 12px",

          borderRadius: "8px",

          textDecoration: "none",

          transition:
            "background-color 0.2s ease",

          "& .MuiListItemIcon-root": {
            color: "#7aa7ff",

            minWidth: mobile
              ? "34px"
              : "39px",
          },

          "&:hover": {
            backgroundColor:
              "rgba(0, 117, 255, 0.14)",
          },
        }}
      >
        <ListItemIcon>
          <LogoutOutlinedIcon
            sx={{
              fontSize: mobile
                ? "21px"
                : "clamp(22px, 1.45vw, 25px)",
            }}
          />
        </ListItemIcon>

        <ListItemText
          primary={
            <Typography
              sx={{
                color: colors.gray[100],

                fontSize: mobile
                  ? "14px"
                  : "clamp(15px, 1.08vw, 18px)",

                fontWeight: 400,

                lineHeight: 1,
              }}
            >
              Sign Out
            </Typography>
          }
        />
      </ListItem>
    </>
  );

  return (
    <>
      {!isSmallScreen && (
        <Box
          sx={{
            width: "16%",

            minWidth: "195px",

            maxWidth: "240px",

            height: "98.3vh",

            overflow: "hidden",

            borderRadius: "10px",

            margin: "5px 4px 5px",

            background: `linear-gradient(
              160deg,
              ${colors.blue[900]} 0%,
              ${colors.blue[700]} 100%
            )`,

            border:
              "1px solid rgba(0,117,255,0.15)",

            boxSizing: "border-box",
          }}
        >
          {renderSidebarContent(false)}
        </Box>
      )}

      {isSmallScreen && (
        <>
          <Box
            sx={{
              width: "42px",

              height: "42px",

              margin: "10px 0px 10px 10px",
            }}
          >
            <IconButton
              onClick={toggleSideBar}
              size="small"
            >
              <MenuIcon
                sx={{
                  color:
                    colors.gray[100],

                  fontSize: "25px",
                }}
              />
            </IconButton>
          </Box>

          {isSideBarOpen && (
            <Slide
              in={isSideBarOpen}
              direction="right"
              timeout={300}
            >
              <Box
                ref={sideBarRef}
                sx={{
                  width: "200px",

                  height: "100vh",

                  position: "fixed",

                  left: 0,

                  top: 0,

                  zIndex: 1300,

                  background: `linear-gradient(
                    160deg,
                    ${colors.blue[900]} 0%,
                    ${colors.blue[700]} 100%
                  )`,

                  boxShadow:
                    "8px 0px 25px rgba(0,0,0,0.35)",
                }}
              >
                {renderSidebarContent(true)}
              </Box>
            </Slide>
          )}
        </>
      )}
    </>
  );
}

export default SideBar;