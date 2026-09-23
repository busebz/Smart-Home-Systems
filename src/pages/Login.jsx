import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Switch,
  useMediaQuery,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import coverphoto from "../assets/coverphoto.png";
import { useAuth } from "../context/authContext.jsx";
import theme from "../theme";

const API_URL =
  "https://smarthomesystemsapi.onrender.com/api/auth/login";

function Login() {
  const colors = theme.palette;
  const navigate = useNavigate();
  const { login } = useAuth();

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isLargeScreen = useMediaQuery("(min-width:1200px)");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checked, setChecked] = useState(false);

  const textFieldStyle = {
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
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(API_URL, {
        email,
        password,
      });

      if (response?.data?.isSuccess) {
        const accessToken = response?.data?.value?.accessToken;

        login(accessToken);
        navigate("/dashboard");
        return;
      }

      setError(
        response?.data?.error?.description ||
          "Please write your email and password correctly."
      );
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
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
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
          onSubmit={handleLogin}
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
                width: "400px",
                marginTop: "15px",
              }}
            >
              {error}
            </Typography>
          )}

          <Box sx={{ marginY: "30px" }}>
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
              sx={textFieldStyle}
            />

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
              sx={textFieldStyle}
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Switch
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                color="primary"
                sx={{
                  "& .MuiSwitch-thumb": {
                    width: 15,
                    height: 15,
                    backgroundColor: "#edeeed",
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
                sx={{
                  margin: "4px -6px 0px",
                }}
              >
                Remember me
              </Typography>
            </Box>
          </Box>

          <Button
            type="submit"
            variant="contained"
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
            <span style={{ color: colors.gray[100] }}> Sign up? </span>
            Sorry you can't:'(
          </Typography>
        </form>
      </Box>
    </Box>
  );
}

export default Login;