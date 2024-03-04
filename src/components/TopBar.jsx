import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  InputBase,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";

function TopBar() {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const searchRef = useRef(null);

  const toggleSearchBar = () => {
    setIsSearchBarOpen(!isSearchBarOpen);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsSearchBarOpen(false);
    }
  };

  useEffect(() => {
    if (isSearchBarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchBarOpen]);

  return (
    <>
      {!isSmallScreen && (
        <Box
          sx={{
            width: "100%",
            height: "10vh",
            display: "flex",
            alignItems: "center",
            backgroundColor: "transparent",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "15%",
              height: "5vh",
              backgroundColor: "#0f1535",
              borderRadius: "10px",
              minWidth: "80px",
            }}
          >
            <IconButton type="button">
              <SearchIcon sx={{ color: "#192c4d", width: "80%" }} />
            </IconButton>

            <InputBase
              placeholder="Type here..."
              sx={{
                "&.MuiInputBase-root": {
                  color: "#edeeed",
                  fontSize: "0.7rem",
                },
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton>
              <PersonIcon sx={{ color: "#6a7e99", width: "20%" }} />
              <Typography variant="h6" sx={{ color: "#6a7e99" }}>
                Sign Out
              </Typography>
            </IconButton>
            <IconButton>
              <SettingsIcon sx={{ color: "#6a7e99", width: "80%" }} />
            </IconButton>
            <IconButton>
              <NotificationsIcon sx={{ color: "#6a7e99", width: "80%" }} />
            </IconButton>
          </Box>
        </Box>
      )}
      {isSmallScreen && (
        <Box
          sx={{
            width: "100%",
            height: "10vh",
            display: "flex",
            alignItems: "center",
            backgroundColor: "transparent",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "5vh",
              borderRadius: "10px",
            }}
          ></Box>
          {!isSearchBarOpen && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton type="button" onClick={toggleSearchBar}>
                <SearchIcon sx={{ color: "#6a7e99", width: "100%" }} />
              </IconButton>
              <IconButton>
                <PersonIcon sx={{ color: "#6a7e99", width: "100%" }} />
              </IconButton>
              <IconButton>
                <SettingsIcon sx={{ color: "#6a7e99", width: "100%" }} />
              </IconButton>
              <IconButton>
                <NotificationsIcon sx={{ color: "#6a7e99", width: "100%" }} />
              </IconButton>
            </Box>
          )}
          {isSearchBarOpen && (
            <Box
              ref={searchRef}
              sx={{
                display: "flex",
                alignItems: "center",
                width: "90%",
                height: "5vh",
                backgroundColor: "#0f1535",
                borderRadius: "10px",
              }}
            >
              <IconButton type="button">
                <SearchIcon sx={{ color: "#848484", width: "80%" }} />
              </IconButton>

              <InputBase
                placeholder="Type here..."
                sx={{
                  "&.MuiInputBase-root": {
                    color: "#edeeed",
                    fontSize: "0.7rem",
                  },
                }}
              />
            </Box>
          )}
        </Box>
      )}
    </>
  );
}
export default TopBar;

