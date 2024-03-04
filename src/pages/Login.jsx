import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Switch,
  useMediaQuery,
} from "@mui/material";

import coverphoto from "../assets/coverphoto.png";

import theme from "../theme"

function Login() {
  const colors = theme.palette;

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [checked, setChecked] = React.useState();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        overflow: isSmallScreen ? "" : "hidden",
        flexDirection: isSmallScreen ? "column" : "row",
        background: `linear-gradient(${colors.blue[900]},${colors.blue[900]})`
      }}
    >
      <Box
        flex="0 0 50%"
        sx={{
          width: "80%",
          marginTop: isSmallScreen ? "60px " : "",
        }}
      >
        <img
          src={coverphoto}
          alt="cover_photo"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>
      <Box
        flex="0 0 50%"
        sx={{
          width: "100%",
          marginLeft: isSmallScreen ? "50%" : "60px",
        }}
      >
        <form style={{ width: "40%" }}>
          <Box
            sx={{
              marginY: "30px",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                marginBottom: "4px",
              }}
            >
              Nice to see you, sir!
            </Typography>
            <Typography variant="subtitle2">
              Enter your email and password to sign in
            </Typography>
          </Box>
          <Box sx={{ marginY: "15px" }}>
            <Typography variant="subtitle1">Email</Typography>
            <TextField
              label="Your email address"
              size="small"
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                },
                "& .MuiInputLabel-root": {
                  color: "#737999",
                  fontSize: 11,
                },
              }}
            ></TextField>
            <Typography
              variant="subtitle1"
              sx={{
                marginTop: "15px",
              }}
            >
              Password
            </Typography>
            <TextField
              label="Your password"
              size="small"
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                },
                "& .MuiInputLabel-root": {
                  color: "#737999",
                  fontSize: 11,
                },
              }}
            ></TextField>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Switch
                checked={checked}
                color="primary"
                sx={{
                  "& .MuiSwitch-thumb": {
                    width: 15,
                    height: 15,
                    backgroundColor: checked ? "#edeeed" : "#edeeed",
                    marginTop: "5.5px",
                  },
                  "& .MuiSwitch-track": {
                    borderRadius: 20,
                    height: 20,
                    width: 80,
                  },
                }}
              />
              <Typography
                variant="subtitle1"
                style={{
                  margin: "4px -6px 0px",
                }}
              >
                Remember me
              </Typography>
            </div>
          </Box>
          <Button
            variant="contained"
            color= {colors.blue[300]}
            sx={{
              width: "100%",
              marginBottom: "10px",
              borderRadius: "10px",
              fontSize: 10,
            }}
          >
            Sign in
          </Button>
          <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
            Don't have an account?
            <span style={{ color: colors.gray[100] }}> Sign up? </span>Sorry you
            can't:'(
          </Typography>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
