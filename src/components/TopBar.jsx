import React from "react";
import { Box, InputBase, IconButton, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";

function TopBar() {
  return (
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
              fontSize: 11,
            },
          }}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", margin: "0px 20px 0px 0px" }}>
        <IconButton>
          <PersonIcon sx={{ color: "#6a7e99", width: "80%" }} />
        </IconButton>
        <Typography
          variant="subtitle2"
          style={{cursor: "pointer" }}
        >
          Sign Out
        </Typography>
        <IconButton>
          <SettingsIcon sx={{ color: "#6a7e99", width: "80%" }} />
        </IconButton>
        <IconButton>
          <NotificationsIcon sx={{ color: "#6a7e99", width: "80%" }} />
        </IconButton>
      </Box>
    </Box>
  );
}

export default TopBar;
