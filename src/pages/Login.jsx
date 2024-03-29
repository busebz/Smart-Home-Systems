import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Switch,
  useMediaQuery,
} from "@mui/material";

import coverphoto from "../assets/coverphoto.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";
import theme from "../theme";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const colors = theme.palette;

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isLargeScreen = useMediaQuery("(min-width:1200px)");

  const [checked, setChecked] = React.useState();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://smarthomesolutionserverapi20240318030034.azurewebsites.net/api/auth/login",
        {
          emailAddress: email,
          password,
        }
      );

      if (response?.data?.isSuccess) {
        login(response?.data?.value?.accessToken);
        navigate("/dashboard");
      } else {
        setError(response?.data?.error?.description);
        window.location.reload();
      }
    } catch (error) {
      setError("Please write your email and password correctly.");
      
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: isSmallScreen ? "100%" : "100vh",
        overflow: isSmallScreen ? "" : "hidden",
        flexDirection: isSmallScreen ? "column" : "row",
        background: `linear-gradient(${colors.blue[900]},${colors.blue[900]})`,
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
          marginLeft: isSmallScreen ? "" : "60px",
          width: isLargeScreen ? "50%" : "80%",
        }}
      >
        <form
          style={{
            width: isSmallScreen ? "100%" : "50%",
            marginX: "auto",
          }}
        >
          {error && (
            <Typography
              variant="subtitle1"
              color="error"
              sx={{
                width:"400px",
                marginTop: "15px",
              }}
            >
              {error}
            </Typography>
          )}
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
            <Typography variant="subtitle1">
              Enter your email and password to sign in
            </Typography>
          </Box>
          <Box sx={{ marginY: "15px" }}>
            <Typography variant="h5">Email</Typography>
            <TextField
              label="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                width: "100%",
                marginTop: "10px",

                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                },
                "& .MuiInputLabel-root": {
                  color: colors.gray[400],
                  fontSize: "1.1rem",
                },
                "& .MuiInputBase-root": {
                  color: colors.gray[100],
                  fontSize: "1.1rem",
                },
              }}
            ></TextField>
            <Typography
              variant="h5"
              sx={{
                marginTop: "15px",
              }}
            >
              Password
            </Typography>
            <TextField
              label="Your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                width: "100%",
                marginTop: "10px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                },
                "& .MuiInputLabel-root": {
                  color: colors.gray[400],
                  fontSize: "1.1rem",
                },
                "& .MuiInputBase-root": {
                  color: colors.gray[100],
                  fontSize: "1.1rem",
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
                variant="h5"
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
            onClick={handleLogin}
            sx={{
              backgroundColor: colors.blue[500],
              width: "100%",
              marginBottom: "10px",
              borderRadius: "10px",
              fontSize: 15,
            }}
          >
            Sign in
          </Button>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              marginBottom: isSmallScreen ? "30px" : "",
            }}
          >
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
