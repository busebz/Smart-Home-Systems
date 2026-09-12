import React, { useEffect, useMemo, useState } from "react";

import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
} from "@mui/material";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MemoryOutlinedIcon from "@mui/icons-material/MemoryOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

import axios from "axios";

import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import theme from "../theme.jsx";

import { useAuth } from "../context/authContext.jsx";

function Dashboard() {
  const colors = theme.palette;

  const { token, logout } = useAuth();

  const [dashboardData, setDashboardData] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [homesResponse, activityResponse] = await Promise.all([
          axios.get(
            "https://smarthomesystemsapi.onrender.com/api/smarthome/smarthomeusers",
            { headers }
          ),
          axios.get(
            "https://smarthomesystemsapi.onrender.com/api/smarthome/activitylogs",
            { headers }
          ),
        ]);

        setDashboardData(homesResponse.data || []);
        setActivityLogs(activityResponse.data || []);
      } catch (error) {
        console.error("Dashboard data error:", error);

        if (
          error.response?.status === 401 ||
          error.response?.status === 403
        ) {
          logout();
          return;
        }

        setError("Dashboard data could not be loaded.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchDashboardData();
    }
  }, [token, logout]);

  const convertDateFormat = (dateString) => {
    if (!dateString) {
      return "-";
    }

    return new Date(dateString).toLocaleDateString("en-GB");
  };

  const convertDateTime = (dateString) => {
    if (!dateString) {
      return "-";
    }

    return new Date(dateString).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const dashboardStats = useMemo(() => {
    const totalHomes = dashboardData.length;

    const totalModules = dashboardData.reduce(
      (total, item) =>
        total + Number(item.totalModuleCount || 0),
      0
    );

    const owners = new Set(
      dashboardData
        .map((item) => item.ownerName?.trim())
        .filter(Boolean)
    );

    const totalUsers = owners.size;

    const onlineHomes = dashboardData.filter(
      (item) =>
        Number(item.activeModuleCount || 0) > 0
    ).length;

    return {
      totalHomes,
      totalModules,
      totalUsers,
      onlineHomes,
      offlineHomes: totalHomes - onlineHomes,
    };
  }, [dashboardData]);

  const recentActivities = useMemo(() => {
    return activityLogs.slice(0, 5);
  }, [activityLogs]);

  const onlinePercentage =
    dashboardStats.totalHomes > 0
      ? Math.round(
          (dashboardStats.onlineHomes /
            dashboardStats.totalHomes) *
            100
        )
      : 0;

  const StatCard = ({
    title,
    value,
    subtitle,
    icon,
  }) => {
    return (
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          minWidth: 0,

          height: "82px",

          padding: "10px 15px",

          boxSizing: "border-box",

          borderRadius: "10px",

          background: `linear-gradient(
            145deg,
            ${colors.blue[700]},
            ${colors.blue[600]}
          )`,

          border:
            "1px solid rgba(255,255,255,0.08)",

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            minWidth: 0,
          }}
        >
          <Typography
            sx={{
              color: "#8ca0c2",
              fontSize: "13px",
              fontWeight: 500,
              lineHeight: 1.1,
              marginBottom: "2px",
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              color: colors.gray[100],
              fontSize: "27px",
              fontWeight: 600,
              lineHeight: 1,
            }}
          >
            {value}
          </Typography>

          <Typography
            sx={{
              color: "#8393ad",
              fontSize: "12px",
              marginTop: "3px",
              lineHeight: 1,
            }}
          >
            {subtitle}
          </Typography>
        </Box>

        <Box
          sx={{
            width: "38px",
            height: "38px",
            minWidth: "38px",

            borderRadius: "8px",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            backgroundColor:
              "rgba(0,117,255,0.18)",

            color: colors.blue[500],
          }}
        >
          {icon}
        </Box>
      </Paper>
    );
  };

  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",

          background: `linear-gradient(
            270deg,
            ${colors.blue[700]},
            ${colors.blue[500]},
            ${colors.blue[800]}
          )`,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress
          sx={{
            color: colors.gray[100],
          }}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: {
          xs: "block",
          sm: "flex",
        },

        width: "100%",
        minHeight: "100vh",

        background: `linear-gradient(
          270deg,
          ${colors.blue[700]},
          ${colors.blue[500]},
          ${colors.blue[800]}
        )`,

        overflowX: "hidden",
      }}
    >
      <SideBar />

      <Box
        sx={{
          flex: {
            xs: "none",
            sm: 1,
          },

          minWidth: 0,

          width: {
            xs: "100%",
            sm: "auto",
          },

          boxSizing: "border-box",

          px: {
            xs: "14px",
            sm: "12px",
            md: "14px",
          },

          pt: "6px",
          pb: "20px",
        }}
      >
        <Box
          sx={{
            width: "100%",

            maxWidth: {
              xs: "440px",
              sm: "100%",
            },

            mx: "auto",

            boxSizing: "border-box",
          }}
        >
          <TopBar />

          <Box
            sx={{
              marginTop: "6px",
              marginBottom: "8px",
            }}
          >
            <Typography
              sx={{
                color: colors.gray[100],

                fontSize: {
                  xs: "24px",
                  sm: "26px",
                  md: "28px",
                },

                fontWeight: 600,
                lineHeight: 1.05,
              }}
            >
              Dashboard
            </Typography>

            <Typography
              sx={{
                color: "#9aabc6",

                fontSize: {
                  xs: "13px",
                  sm: "14px",
                },

                marginTop: "3px",
              }}
            >
              Welcome back! Here's an overview of your smart homes.
            </Typography>
          </Box>

          {error && (
            <Paper
              elevation={0}
              sx={{
                padding: "8px 10px",

                marginBottom: "8px",

                borderRadius: "7px",

                backgroundColor:
                  "rgba(255,80,80,0.15)",

                border:
                  "1px solid rgba(255,80,80,0.25)",
              }}
            >
              <Typography
                sx={{
                  color: "#ffb1b1",
                  fontSize: "13px",
                }}
              >
                {error}
              </Typography>
            </Paper>
          )}

          <Box
            sx={{
              width: "100%",

              display: "grid",

              gridTemplateColumns: {
                xs: "minmax(0, 1fr)",
                sm: "repeat(2, minmax(0, 1fr))",
                lg: "repeat(4, minmax(0, 1fr))",
              },

              gap: "8px",

              marginBottom: "8px",
            }}
          >
            <StatCard
              title="TOTAL HOMES"
              value={dashboardStats.totalHomes}
              subtitle="Registered smart homes"
              icon={
                <HomeOutlinedIcon
                  sx={{
                    fontSize: "22px",
                  }}
                />
              }
            />

            <StatCard
              title="TOTAL MODULES"
              value={dashboardStats.totalModules}
              subtitle="Connected modules"
              icon={
                <MemoryOutlinedIcon
                  sx={{
                    fontSize: "22px",
                  }}
                />
              }
            />

            <StatCard
              title="TOTAL USERS"
              value={dashboardStats.totalUsers}
              subtitle="Registered owners"
              icon={
                <PeopleOutlineOutlinedIcon
                  sx={{
                    fontSize: "22px",
                  }}
                />
              }
            />

            <StatCard
              title="ONLINE HOMES"
              value={dashboardStats.onlineHomes}
              subtitle="Currently active"
              icon={
                <WifiOutlinedIcon
                  sx={{
                    fontSize: "22px",
                  }}
                />
              }
            />
          </Box>

          <Box
            sx={{
              width: "100%",

              display: "grid",

              gridTemplateColumns: {
                xs: "minmax(0, 1fr)",
                md: "minmax(0, 2.3fr) minmax(230px, 0.7fr)",
              },

              gap: "8px",

              boxSizing: "border-box",
            }}
          >
            <Paper
              elevation={0}
              sx={{
                width: "100%",
                minWidth: 0,

                height: {
                  xs: "340px",
                  sm: "350px",
                  md: "360px",
                },

                borderRadius: "10px",

                boxSizing: "border-box",

                background: `linear-gradient(
                  220deg,
                  ${colors.blue[700]},
                  ${colors.blue[600]},
                  ${colors.blue[700]}
                )`,

                border:
                  "1px solid rgba(255,255,255,0.08)",

                display: "flex",
                flexDirection: "column",

                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  padding: "11px 14px 8px",

                  borderBottom:
                    "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <Typography
                  sx={{
                    color: colors.gray[100],
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                >
                  Active Homes
                </Typography>

                <Typography
                  sx={{
                    color: "#8192af",
                    fontSize: "13px",
                    marginTop: "2px",
                  }}
                >
                  Smart homes registered in the system
                </Typography>
              </Box>

              {dashboardData.length === 0 ? (
                <Box
                  sx={{
                    flex: 1,

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#8192af",
                      fontSize: "14px",
                    }}
                  >
                    No smart homes found.
                  </Typography>
                </Box>
              ) : (
                <TableContainer
                  sx={{
                    flex: 1,
                    minHeight: 0,

                    width: "100%",

                    overflowX: "auto",
                    overflowY: "auto",

                    "&::-webkit-scrollbar": {
                      width: "5px",
                      height: "5px",
                    },

                    "&::-webkit-scrollbar-thumb": {
                      background:
                        "rgba(122,167,255,0.28)",
                      borderRadius: "10px",
                    },
                  }}
                >
                  <Table
                    stickyHeader
                    size="small"
                    sx={{
                      minWidth: "680px",
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        {[
                          "Home IP Address",
                          "Modules",
                          "Owner",
                          "Setup Time",
                          "Phone Number",
                        ].map((title) => (
                          <TableCell
                            key={title}
                            sx={{
                              padding: "8px 12px",

                              backgroundColor:
                                colors.blue[700],

                              borderBottom:
                                "1px solid #323f6a",
                            }}
                          >
                            <Typography
                              sx={{
                                color: "#8295b5",

                                fontSize: "13px",

                                fontWeight: 600,

                                whiteSpace: "nowrap",
                              }}
                            >
                              {title}
                            </Typography>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {dashboardData.map(
                        (row, index) => (
                          <TableRow
                            key={
                              row._id ||
                              `${row.homeIpAddress}-${index}`
                            }
                            sx={{
                              "&:hover": {
                                backgroundColor:
                                  "rgba(255,255,255,0.025)",
                              },
                            }}
                          >
                            <TableCell
                              sx={{
                                padding: "8px 12px",

                                borderBottom:
                                  "1px solid #263760",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                }}
                              >
                                <Box
                                  sx={{
                                    width: "28px",
                                    height: "28px",
                                    minWidth: "28px",

                                    borderRadius: "7px",

                                    backgroundColor:
                                      "rgba(0,117,255,0.16)",

                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent:
                                      "center",

                                    color:
                                      colors.blue[500],
                                  }}
                                >
                                  <HomeOutlinedIcon
                                    sx={{
                                      fontSize: "17px",
                                    }}
                                  />
                                </Box>

                                <Typography
                                  sx={{
                                    color:
                                      colors.gray[100],

                                    fontSize: "14px",

                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {row.homeIpAddress}
                                </Typography>
                              </Box>
                            </TableCell>

                            <TableCell
                              sx={{
                                padding: "8px 12px",

                                borderBottom:
                                  "1px solid #263760",
                              }}
                            >
                              <Typography
                                sx={{
                                  color:
                                    colors.gray[100],

                                  fontSize: "14px",
                                }}
                              >
                                Total:{" "}
                                {row.totalModuleCount ??
                                  0}
                              </Typography>

                              <Typography
                                sx={{
                                  color:
                                    colors.green[300],

                                  fontSize: "12px",

                                  marginTop: "1px",
                                }}
                              >
                                Active:{" "}
                                {row.activeModuleCount ??
                                  0}
                              </Typography>
                            </TableCell>

                            <TableCell
                              sx={{
                                padding: "8px 12px",

                                borderBottom:
                                  "1px solid #263760",
                              }}
                            >
                              <Button
                                disableElevation
                                sx={{
                                  minWidth: 0,

                                  padding: "3px 8px",

                                  borderRadius: "5px",

                                  backgroundColor:
                                    "rgba(2,183,114,0.18)",

                                  color:
                                    colors.green[300],

                                  fontSize: "12px",

                                  textTransform: "none",

                                  whiteSpace: "nowrap",

                                  "&:hover": {
                                    backgroundColor:
                                      "rgba(2,183,114,0.24)",
                                  },
                                }}
                              >
                                {row.ownerName}
                              </Button>
                            </TableCell>

                            <TableCell
                              sx={{
                                padding: "8px 12px",

                                borderBottom:
                                  "1px solid #263760",
                              }}
                            >
                              <Typography
                                sx={{
                                  color:
                                    colors.gray[100],

                                  fontSize: "14px",

                                  whiteSpace: "nowrap",
                                }}
                              >
                                {convertDateFormat(
                                  row.setupCompletedAt
                                )}
                              </Typography>
                            </TableCell>

                            <TableCell
                              sx={{
                                padding: "8px 12px",

                                borderBottom:
                                  "1px solid #263760",
                              }}
                            >
                              <Typography
                                sx={{
                                  color:
                                    colors.gray[100],

                                  fontSize: "14px",

                                  whiteSpace: "nowrap",
                                }}
                              >
                                {row.phoneNumber}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>

            <Box
              sx={{
                width: "100%",
                minWidth: 0,

                display: "grid",

                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, minmax(0, 1fr))",
                  md: "1fr",
                },

                gridTemplateRows: {
                  md: "166px 186px",
                },

                gap: "8px",
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  height: {
                    xs: "166px",
                    sm: "180px",
                    md: "166px",
                  },

                  padding: "11px 14px",

                  boxSizing: "border-box",

                  borderRadius: "10px",

                  background: `linear-gradient(
                    220deg,
                    ${colors.blue[700]},
                    ${colors.blue[600]},
                    ${colors.blue[700]}
                  )`,

                  border:
                    "1px solid rgba(255,255,255,0.08)",

                  display: "flex",
                  flexDirection: "column",

                  overflow: "hidden",
                }}
              >
                <Typography
                  sx={{
                    color: colors.gray[100],
                    fontSize: "17px",
                    fontWeight: 600,
                    lineHeight: 1.1,
                  }}
                >
                  Home Status
                </Typography>

                <Typography
                  sx={{
                    color: "#8192af",
                    fontSize: "12px",
                    marginTop: "2px",
                  }}
                >
                  Current system availability
                </Typography>

                <Box
                  sx={{
                    flex: 1,

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    gap: "25px",
                  }}
                >
                  <Box
                    sx={{
                      width: "72px",
                      height: "72px",
                      minWidth: "72px",

                      borderRadius: "50%",

                      background:
                        dashboardStats.totalHomes === 0
                          ? "#263760"
                          : `conic-gradient(
                              ${colors.blue[500]} 0% ${onlinePercentage}%,
                              #263760 ${onlinePercentage}% 100%
                            )`,

                      position: "relative",

                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",

                      "&::after": {
                        content: '""',

                        position: "absolute",

                        width: "51px",
                        height: "51px",

                        borderRadius: "50%",

                        backgroundColor:
                          colors.blue[700],
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        zIndex: 1,
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          color:
                            colors.gray[100],

                          fontSize: "19px",

                          fontWeight: 600,

                          lineHeight: 1,
                        }}
                      >
                        {onlinePercentage}%
                      </Typography>

                      <Typography
                        sx={{
                          color: "#8192af",
                          fontSize: "11px",
                          marginTop: "2px",
                        }}
                      >
                        Online
                      </Typography>
                    </Box>
                  </Box>

                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",

                        gap: "6px",

                        marginBottom: "9px",
                      }}
                    >
                      <Box
                        sx={{
                          width: "7px",
                          height: "7px",

                          borderRadius: "50%",

                          backgroundColor:
                            colors.blue[500],
                        }}
                      />

                      <Typography
                        sx={{
                          color: "#8798b5",
                          fontSize: "12px",
                        }}
                      >
                        Online
                      </Typography>

                      <Typography
                        sx={{
                          color:
                            colors.gray[100],

                          fontSize: "14px",

                          fontWeight: 600,
                        }}
                      >
                        {dashboardStats.onlineHomes}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",

                        gap: "6px",
                      }}
                    >
                      <Box
                        sx={{
                          width: "7px",
                          height: "7px",

                          borderRadius: "50%",

                          backgroundColor:
                            "#596985",
                        }}
                      />

                      <Typography
                        sx={{
                          color: "#8798b5",
                          fontSize: "12px",
                        }}
                      >
                        Offline
                      </Typography>

                      <Typography
                        sx={{
                          color:
                            colors.gray[100],

                          fontSize: "14px",

                          fontWeight: 600,
                        }}
                      >
                        {dashboardStats.offlineHomes}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  height: {
                    xs: "186px",
                    sm: "180px",
                    md: "186px",
                  },

                  padding: "11px 14px",

                  boxSizing: "border-box",

                  borderRadius: "10px",

                  background: `linear-gradient(
                    220deg,
                    ${colors.blue[700]},
                    ${colors.blue[600]},
                    ${colors.blue[700]}
                  )`,

                  border:
                    "1px solid rgba(255,255,255,0.08)",

                  display: "flex",
                  flexDirection: "column",

                  overflow: "hidden",
                }}
              >
                <Typography
                  sx={{
                    color: colors.gray[100],
                    fontSize: "17px",
                    fontWeight: 600,
                    lineHeight: 1.1,
                  }}
                >
                  Recent Activity
                </Typography>

                <Typography
                  sx={{
                    color: "#8192af",
                    fontSize: "12px",

                    marginTop: "2px",
                    marginBottom: "5px",
                  }}
                >
                  Latest system activity
                </Typography>

                <Box
                  sx={{
                    flex: 1,
                    minHeight: 0,

                    overflowY: "auto",
                    overflowX: "hidden",

                    "&::-webkit-scrollbar": {
                      width: "4px",
                    },

                    "&::-webkit-scrollbar-thumb": {
                      background:
                        "rgba(122,167,255,0.28)",

                      borderRadius: "10px",
                    },
                  }}
                >
                  {recentActivities.length === 0 ? (
                    <Typography
                      sx={{
                        color: "#8192af",
                        fontSize: "13px",
                      }}
                    >
                      No recent activity.
                    </Typography>
                  ) : (
                    recentActivities.map(
                      (activity) => (
                        <Box
                          key={activity._id}
                          sx={{
                            width: "100%",

                            display: "flex",

                            gap: "8px",

                            padding: "6px 0",

                            borderBottom:
                              "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          <Box
                            sx={{
                              width: "28px",
                              height: "28px",
                              minWidth: "28px",

                              borderRadius: "6px",

                              backgroundColor:
                                "rgba(0,117,255,0.15)",

                              display: "flex",
                              alignItems: "center",
                              justifyContent:
                                "center",

                              color:
                                colors.blue[500],
                            }}
                          >
                            <AccessTimeOutlinedIcon
                              sx={{
                                fontSize: "16px",
                              }}
                            />
                          </Box>

                          <Box
                            sx={{
                              flex: 1,
                              minWidth: 0,
                            }}
                          >
                            <Typography
                              sx={{
                                color:
                                  colors.gray[100],

                                fontSize: "13px",

                                fontWeight: 600,

                                whiteSpace: "nowrap",

                                overflow: "hidden",

                                textOverflow:
                                  "ellipsis",
                              }}
                            >
                              {activity.eventType}
                            </Typography>

                            <Typography
                              sx={{
                                color: "#9aabc6",

                                fontSize: "12px",

                                marginTop: "1px",

                                whiteSpace: "nowrap",

                                overflow: "hidden",

                                textOverflow:
                                  "ellipsis",
                              }}
                            >
                              {activity.description}
                            </Typography>

                            <Typography
                              sx={{
                                color: "#7184a5",

                                fontSize: "11px",

                                marginTop: "2px",

                                whiteSpace: "nowrap",

                                overflow: "hidden",

                                textOverflow:
                                  "ellipsis",
                              }}
                            >
                              {activity.user ||
                                "System"}{" "}
                              •{" "}
                              {convertDateTime(
                                activity.createdAt
                              )}
                            </Typography>
                          </Box>
                        </Box>
                      )
                    )
                  )}
                </Box>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;