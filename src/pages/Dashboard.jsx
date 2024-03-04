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
} from "@mui/material";

import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import home from "../assets/home.png";
import theme from "../theme.jsx";

function Dashboard() {
  const colors = theme.palette;
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
    <Box
      sx={{
        display: "flex",
        width: "100%",
        background: `linear-gradient(270deg, ${colors.blue[700]}, ${colors.blue[500]},${colors.blue[800]})`,
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
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    width: "40%",
                    fontSize: 12,
                    color: colors.gray[800],
                    borderBottom: "2px solid #323f6a",
                  }}
                >
                  Ev Ip Adresi
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: 12,
                    color: colors.gray[800],
                    borderBottom: "2px solid #323f6a",
                  }}
                >
                  Modules
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                    fontSize: 12,
                    color: colors.gray[800],
                    borderBottom: "2px solid #323f6a",
                  }}
                >
                  Owner Name
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                    fontSize: 12,
                    color: colors.gray[800],
                    borderBottom: "2px solid #323f6a",
                  }}
                >
                  First Setup Time
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                    fontSize: 12,
                    color: colors.gray[800],
                    borderBottom: "2px solid #323f6a",
                  }}
                >
                  Phone Number
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{
                      fontSize: 12,
                      color: colors.gray[100],
                      borderBottom: "2px solid #323f6a",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img src={row.ipAddress.logo} alt="Home Logo" />
                      <div style={{ margin: "0px 10px 0px" }}>
                        {row.ipAddress.address}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: 12, borderBottom: "2px solid #323f6a" }}
                  >
                    <div>
                      <div style={{ color: colors.gray[100]}}>
                        {row.modules.total}
                      </div>
                      <div style={{ color: colors.gray[800]}}>
                        {row.modules.active}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      fontSize: 12,
                      color: colors.gray[100],
                      borderBottom: "2px solid #323f6a",
                    }}
                  >
                    {row.owner}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      fontSize: 12,
                      color: colors.gray[100],
                      borderBottom: "2px solid #323f6a",
                    }}
                  >
                    {row.setupTime}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      fontSize: 12,
                      color: colors.gray[100],
                      borderBottom: "2px solid #323f6a",
                    }}
                  >
                    {row.phoneNumber}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default Dashboard;
