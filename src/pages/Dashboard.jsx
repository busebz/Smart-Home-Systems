import React, { useEffect, useState } from "react";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  useMediaQuery,
  Grid,
} from "@mui/material";

import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import home from "../assets/home.png";
import theme from "../theme.jsx";

import { useAuth } from "../context/authContext.jsx";
import axios from "axios";



function Dashboard() {

  const colors = theme.palette;

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const { token, logout } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(
          "https://smarthomesolutionserverapi20240318030034.azurewebsites.net/api/home/get",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDashboardData(response?.data?.value);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          logout();
        }
      }
    };

    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  function convertDateFormat(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  return (
    <>
      {!isSmallScreen && (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            background: `linear-gradient(270deg, ${colors.blue[700]}, ${colors.blue[500]},${colors.blue[800]})`,
            height: "100vh",
          }}
        >
          <SideBar />
          <Box sx={{ width: "84%", padding: "5px 10px 0px" }}>
            <TopBar />
            <TableContainer
              component={Paper}
              sx={{
                width: "100%",
                height: "77vh",
                margin: "15px 0px 0px",
                borderRadius: "10px",
                background: `linear-gradient(220deg, ${colors.blue[700]}, ${colors.blue[600]},${colors.blue[700]})`,
              }}
            >
              <Typography variant="h2" sx={{ padding: "20px 15px 5px" }}>
                Active Homes
              </Typography>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        width: "45%",
                        borderBottom: "2px solid #323f6a",
                      }}
                    >
                      <Typography variant="h6" sx={{ color: "#6a7e99" }}>
                        Home Ip Address
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: "2px solid #323f6a",
                        minWidth:"60px"
                      }}
                    >
                      <Typography variant="h6" sx={{ color: "#6a7e99" }}>
                        Modules
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        borderBottom: "2px solid #323f6a",
                        
                      }}
                    >
                      <Typography variant="h6" sx={{ color: "#6a7e99" }}>
                        Owner Name
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        borderBottom: "2px solid #323f6a",
                       
                      }}
                    >
                      <Typography variant="h6" sx={{ color: "#6a7e99" }}>
                        Setup Time
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        borderBottom: "2px solid #323f6a",
                      
                      }}
                    >
                      <Typography variant="h6" sx={{ color: "#6a7e99" }}>
                        Phone Number
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dashboardData &&
                    dashboardData.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          sx={{
                            borderBottom: "2px solid #323f6a",
                            
                          }}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center"}}
                          >
                            <img src={home} alt="Home Logo" />
                            <Typography
                              variant="h5"
                              sx={{ margin: "0px 8px 0px" }}
                            >
                              {row.serverHardwareId}
                            </Typography>
                          </div>
                        </TableCell>
                        <TableCell
                          sx={{
                            borderBottom: "2px solid #323f6a",
                            
                          }}
                        >
                          <div>
                            <Typography variant="h5">
                              Total: {row.totalModuleCount}
                            </Typography>
                            <Typography variant="body1">
                              Active: {row.activeModuleCount}
                            </Typography>
                          </div>
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            color: colors.gray[100],
                            borderBottom: "2px solid #323f6a",
                          }}
                        >
                          <Button
                            variant={index % 2 === 0 ? "contained" : "outlined"}
                            sx={{
                              color: colors.gray[100],
                              borderColor: colors.gray[100],
                              boxShadow: "none",
                              height: "25px",
                              backgroundColor:
                                index % 2 === 0
                                  ? colors.green[400]
                                  : "transparent",
                              borderRadius: "5px",
                              fontSize: "1.03rem",
                              textTransform: "capitalize",
                              "&:hover": {
                                backgroundColor:
                                  index % 2 === 0
                                    ? colors.green[600]
                                    : "transparent",
                                borderColor: colors.gray[400],
                              },
                            }}
                          >
                            {row.ownerName}
                          </Button>
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            borderBottom: "2px solid #323f6a",
                          }}
                        >
                          <Typography variant="h5">
                            {convertDateFormat(row.setupCompletedAt)}
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            borderBottom: "2px solid #323f6a",
                            minWidth: "100px",
                          }}
                        >
                          <Typography variant="h5">
                            {row.auhtorizedMobileNumber}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      )}
      {isSmallScreen && (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            background: `linear-gradient(270deg, ${colors.blue[700]}, ${colors.blue[500]},${colors.blue[800]})`,
          }}
        >
          <SideBar />
          <Box
            sx={{
              width: "84%",
              padding: "5px 10px 0px",
              margin: "0px 45px 30px 10px",
            }}
          >
            <TopBar />
            <Typography variant="h2" sx={{ margin: "0px 10px 20px" }}>
              Active Homes
            </Typography>
            <Grid container spacing={1} alignItems="center">
              {dashboardData &&
                dashboardData.map((row, index) => (
                  <Grid item xs={12} key={index}>
                    <Paper
                      elevation={3}
                      sx={{
                        padding: 2,
                        borderRadius: 2,
                        background: `linear-gradient(220deg, ${colors.blue[700]}, ${colors.blue[600]},${colors.blue[700]})`,

                        "& .box-item": {
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          borderBottom: "2px solid #323f6a",
                          padding: "8px 6px 5px",
                        },
                      }}
                    >
                      <Box className="box-item">
                        <Typography
                          variant="h6"
                          sx={{ color: "#6a7e99", width: "45%" }}
                        >
                          Home Ip Address:
                        </Typography>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "80%",
                          }}
                        >
                          <img
                            src={home}
                            alt="Home Logo"
                            style={{ width: "20px", height: "20px" }}
                          />
                          <Typography
                            sx={{
                              margin: "0px 3px 0px",
                              fontSize: "13px",
                              color: "#edeeed",
                            }}
                          >
                            {row.serverHardwareId}
                          </Typography>
                        </div>
                      </Box>
                      <Box className="box-item">
                        <Typography
                          variant="h6"
                          sx={{ color: "#6a7e99", width: "35%" }}
                        >
                          Modules:
                        </Typography>
                        <div>
                          <Typography variant="h5">
                            Total: {row.totalModuleCount}
                          </Typography>
                          <Typography variant="body1">
                            Active: {row.activeModuleCount}
                          </Typography>
                        </div>
                      </Box>
                      <Box className="box-item">
                        <Typography
                          variant="h6"
                          sx={{ color: "#6a7e99", width: "35%" }}
                        >
                          Owner Name:
                        </Typography>
                        <Button
                          variant={index % 2 === 0 ? "contained" : "outlined"}
                          sx={{
                            color: colors.gray[100],
                            borderColor: colors.gray[100],
                            boxShadow: "none",
                            height: "20px",
                            backgroundColor:
                              index % 2 === 0
                                ? colors.green[400]
                                : "transparent",
                            borderRadius: "5px",
                            fontSize: "1rem",
                            textTransform: "capitalize",
                            "&:hover": {
                              backgroundColor:
                                index % 2 === 0
                                  ? colors.green[600]
                                  : "transparent",
                              borderColor: colors.gray[400],
                            },
                          }}
                        >
                          {row.ownerName}
                        </Button>
                      </Box>
                      <Box className="box-item">
                        <Typography
                          variant="h6"
                          sx={{ color: "#6a7e99", width: "35%" }}
                        >
                          Setup Time:
                        </Typography>
                        <Typography variant="h5">
                          {convertDateFormat(row.setupCompletedAt)}
                        </Typography>
                      </Box>
                      <Box className="box-item">
                        <Typography
                          variant="h6"
                          sx={{ color: "#6a7e99", width: "35%" }}
                        >
                          Phone Number:
                        </Typography>
                        <Typography variant="h5" sx={{ width: "55%" }}>
                          {row.auhtorizedMobileNumber}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Box>
      )}
    </>
  );
}

export default Dashboard;
