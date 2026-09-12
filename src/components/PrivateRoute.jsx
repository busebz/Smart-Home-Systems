import React from "react";

import {
  Navigate,
} from "react-router-dom";

import {
  Box,
  CircularProgress,
} from "@mui/material";

import { useAuth } from "../context/authContext";

const PrivateRoute = ({ children }) => {
  const {
    isAuthenticated,
    authLoading,
  } = useAuth();

  if (authLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          background:
            "linear-gradient(270deg, #060f30, #0075ff, #020516)",
        }}
      >
        <CircularProgress
          sx={{
            color: "#edeeed",
          }}
        />
      </Box>
    );
  }

  return isAuthenticated
    ? children
    : <Navigate to="/" replace />;
};

export default PrivateRoute;