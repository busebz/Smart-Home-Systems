import React from "react";

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

function Dashboard() {
  const colors = theme.palette;

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const rows = [
    {
      ipAddress: { logo: home, address: "216.123.546.879" },
      modules: { total: "Total:20", active: "Active:14" },
      owner: "Damla",
      setupTime: "14/06/2021",
      phoneNumber: "+90 543 618 92 70",
    },
    {
      ipAddress: { logo: home, address: "216.123.546.879" },
      modules: { total: "Total:20", active: "Active:14" },
      owner: "Damla",
      setupTime: "14/06/2021",
      phoneNumber: "+90 543 618 92 70",
    },
    {
      ipAddress: { logo: home, address: "216.123.546.879" },
      modules: { total: "Total:20", active: "Active:14" },
      owner: "Damla",
      setupTime: "14/06/2021",
      phoneNumber: "+90 543 618 92 70",
    },
  ];

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
                Aktif Evler
              </Typography>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        width: "40%",
                        borderBottom: "2px solid #323f6a",
                      }}
                    >
                      <Typography variant="h6" sx={{ color: "#6a7e99" }}>
                        Ev Ip Adresi
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: "2px solid #323f6a",
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
                  {rows.map((row, index) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        sx={{
                          borderBottom: "2px solid #323f6a",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img src={row.ipAddress.logo} alt="Home Logo" />
                          <Typography
                            variant="h5"
                            sx={{ margin: "0px 8px 0px" }}
                          >
                            {row.ipAddress.address}
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
                            {row.modules.total}
                          </Typography>
                          <Typography variant="body1">
                            {row.modules.active}
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
                          {row.owner}
                        </Button>
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          borderBottom: "2px solid #323f6a",
                        }}
                      >
                        <Typography variant="h5">{row.setupTime}</Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          borderBottom: "2px solid #323f6a",
                          minWidth: "100px",
                        }}
                      >
                        <Typography variant="h5">{row.phoneNumber}</Typography>
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
              Aktif Evler
            </Typography>
            <Grid container spacing={1} alignItems="center">
              {rows.map((row, index) => (
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
                        Ev Ip Adresi:
                      </Typography>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width:"80%"
                        }}
                      >
                        <img
                          src={row.ipAddress.logo}
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
                          {row.ipAddress.address}
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
                          {row.modules.total}
                        </Typography>
                        <Typography variant="body1">
                          {row.modules.active}
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
                            index % 2 === 0 ? colors.green[400] : "transparent",
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
                        {row.owner}
                      </Button>
                    </Box>
                    <Box className="box-item">
                      <Typography
                        variant="h6"
                        sx={{ color: "#6a7e99", width: "35%" }}
                      >
                        Setup Time:
                      </Typography>
                      <Typography variant="h5">{row.setupTime}</Typography>
                    </Box>
                    <Box className="box-item">
                      <Typography
                        variant="h6"
                        sx={{ color: "#6a7e99", width: "35%" }}
                      >
                        Phone Number:
                      </Typography>
                      <Typography variant="h5" sx={{ width: "55%" }}>
                        {row.phoneNumber}
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
