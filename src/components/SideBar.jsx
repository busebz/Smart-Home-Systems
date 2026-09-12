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
        height: mobile ? "42px" : "44px",

        margin: "4px 8px",

        padding: mobile
          ? "6px 10px"
          : "7px 11px",

        borderRadius: "8px",

        textDecoration: "none",

        color: colors.gray[100],

        transition: "background-color 0.2s ease",

        "& .MuiListItemIcon-root": {
          color: "#7aa7ff",
          minWidth: mobile ? "31px" : "34px",
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
              ? "19px"
              : "20px",
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
                ? "13px"
                : "clamp(13px, 1vw, 16px)",

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
      {/* LOGO */}

      <Box
        sx={{
          height: mobile
            ? "58px"
            : "62px",

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
              ? "24px"
              : "27px",

            fontWeight: 500,

            lineHeight: 1,

            letterSpacing: "1px",
          }}
        >
          V
        </Typography>
      </Box>

      {/* MAIN MENU */}

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

      {/* ACCOUNT */}

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

            fontSize: "10px",

            marginTop: "12px",

            marginBottom: "5px",

            letterSpacing: "0.7px",

            whiteSpace: "nowrap",
          }}
        >
          ACCOUNT PAGES
        </Typography>
      </Box>

      {/* SIGN OUT */}

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
            ? "42px"
            : "44px",

          margin: "4px 8px",

          padding: mobile
            ? "6px 10px"
            : "7px 11px",

          borderRadius: "8px",

          textDecoration: "none",

          transition:
            "background-color 0.2s ease",

          "& .MuiListItemIcon-root": {
            color: "#7aa7ff",

            minWidth: mobile
              ? "31px"
              : "34px",
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
                ? "19px"
                : "20px",
            }}
          />
        </ListItemIcon>

        <ListItemText
          primary={
            <Typography
              sx={{
                color: colors.gray[100],

                fontSize: mobile
                  ? "13px"
                  : "clamp(13px, 1vw, 16px)",

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
      {/* DESKTOP */}

      {!isSmallScreen && (
        <Box
          sx={{
            width: "15%",

            minWidth: "180px",

            maxWidth: "220px",

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

      {/* MOBILE */}

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