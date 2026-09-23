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
  useMediaQuery,
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

const API_BASE_URL = "https://smarthomesystemsapi.onrender.com/api/smarthome";
const RECENT_ACTIVITY_LIMIT = 5;

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

function Dashboard() {
  const colors = theme.palette;

  const isSmallScreen = useMediaQuery("(max-width:600px)");

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
          axios.get(`${API_BASE_URL}/smarthomeusers`, { headers }),
          axios.get(`${API_BASE_URL}/activitylogs`, { headers }),
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

  const dashboardStats = useMemo(() => {
    const owners = new Set();
    let totalModules = 0;
    let onlineHomes = 0;

    dashboardData.forEach((item) => {
      totalModules += Number(item.totalModuleCount || 0);

      const ownerName = item.ownerName?.trim();
      if (ownerName) {
        owners.add(ownerName);
      }

      if (Number(item.activeModuleCount || 0) > 0) {
        onlineHomes += 1;
      }
    });

    const totalHomes = dashboardData.length;

    return {
      totalHomes,
      totalModules,
      totalUsers: owners.size,
      onlineHomes,
      offlineHomes: totalHomes - onlineHomes,
    };
  }, [dashboardData]);

  const recentActivities = activityLogs.slice(0, RECENT_ACTIVITY_LIMIT);

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

          height: {
            xs: "82px",
            sm: "clamp(82px, 8.8vh, 100px)",
          },

          px: "clamp(14px, 1.15vw, 20px)",
          py: "10px",

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

          gap: "12px",

          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            minWidth: 0,
            flex: 1,

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              color: "#8ca0c2",

              fontSize:
                "clamp(12px, 0.88vw, 14px)",

              fontWeight: 500,

              lineHeight: 1,

              marginBottom: "5px",

              whiteSpace: "nowrap",
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              color: colors.gray[100],

              fontSize:
                "clamp(25px, 1.8vw, 30px)",

              fontWeight: 600,

              lineHeight: 1,

              marginBottom: "5px",
            }}
          >
            {value}
          </Typography>

          <Typography
            sx={{
              color: "#8393ad",

              fontSize:
                "clamp(11px, 0.78vw, 13px)",

              lineHeight: 1,

              whiteSpace: "nowrap",

              overflow: "hidden",

              textOverflow: "ellipsis",
            }}
          >
            {subtitle}
          </Typography>
        </Box>

        <Box
          sx={{
            width:
              "clamp(38px, 2.65vw, 46px)",

            height:
              "clamp(38px, 2.65vw, 46px)",

            minWidth:
              "clamp(38px, 2.65vw, 46px)",

            flexShrink: 0,

            borderRadius: "9px",

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
          height: "100vh",

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

  if (isSmallScreen) {
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

          overflowX: "hidden",
        }}
      >
        <SideBar />

        <Box
          sx={{
            width: "100%",

            maxWidth: "440px",

            mx: "auto",

            px: "14px",

            pb: "25px",

            boxSizing: "border-box",
          }}
        >
          <TopBar />

          <Box
            sx={{
              marginTop: "4px",

              marginBottom: "10px",
            }}
          >
            <Typography
              sx={{
                color: colors.gray[100],

                fontSize: "24px",

                fontWeight: 600,

                lineHeight: 1.05,
              }}
            >
              Dashboard
            </Typography>

            <Typography
              sx={{
                color: "#9aabc6",

                fontSize: "13px",

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

              gridTemplateColumns: "1fr",

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
              marginBottom: "8px",
            }}
          >
            <Typography
              sx={{
                color: colors.gray[100],

                fontSize: "18px",

                fontWeight: 600,

                marginBottom: "7px",
              }}
            >
              Active Homes
            </Typography>

            {dashboardData.length === 0 ? (
              <Paper
                elevation={0}
                sx={{
                  padding: "25px 15px",

                  borderRadius: "10px",

                  textAlign: "center",

                  background: `linear-gradient(
                    220deg,
                    ${colors.blue[700]},
                    ${colors.blue[600]},
                    ${colors.blue[700]}
                  )`,

                  border:
                    "1px solid rgba(255,255,255,0.08)",
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
              </Paper>
            ) : (
              <Box
                sx={{
                  display: "grid",

                  gridTemplateColumns: "1fr",

                  gap: "8px",
                }}
              >
                {dashboardData.map(
                  (row, index) => (
                    <Paper
                      key={
                        row._id ||
                        `${row.homeIpAddress}-${index}`
                      }
                      elevation={0}
                      sx={{
                        width: "100%",

                        padding: "8px 12px",

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
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",

                          alignItems: "center",

                          padding: "8px 2px",

                          borderBottom:
                            "1px solid rgba(255,255,255,0.07)",
                        }}
                      >
                        <Typography
                          sx={{
                            width: "37%",

                            flexShrink: 0,

                            color: "#8295b5",

                            fontSize: "12px",

                            fontWeight: 600,
                          }}
                        >
                          Home IP Address:
                        </Typography>

                        <Box
                          sx={{
                            flex: 1,

                            minWidth: 0,

                            display: "flex",

                            alignItems: "center",

                            gap: "6px",
                          }}
                        >
                          <Box
                            sx={{
                              width: "27px",

                              height: "27px",

                              minWidth: "27px",

                              borderRadius: "6px",

                              backgroundColor:
                                "rgba(0,117,255,0.16)",

                              display: "flex",

                              alignItems: "center",

                              justifyContent: "center",

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

                              fontSize: "13px",

                              overflowWrap:
                                "anywhere",
                            }}
                          >
                            {row.homeIpAddress ||
                              "-"}
                          </Typography>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",

                          alignItems: "center",

                          padding: "8px 2px",

                          borderBottom:
                            "1px solid rgba(255,255,255,0.07)",
                        }}
                      >
                        <Typography
                          sx={{
                            width: "37%",

                            flexShrink: 0,

                            color: "#8295b5",

                            fontSize: "12px",

                            fontWeight: 600,
                          }}
                        >
                          Modules:
                        </Typography>

                        <Box>
                          <Typography
                            sx={{
                              color:
                                colors.gray[100],

                              fontSize: "13px",
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
                            }}
                          >
                            Active:{" "}
                            {row.activeModuleCount ??
                              0}
                          </Typography>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",

                          alignItems: "center",

                          padding: "8px 2px",

                          borderBottom:
                            "1px solid rgba(255,255,255,0.07)",
                        }}
                      >
                        <Typography
                          sx={{
                            width: "37%",

                            flexShrink: 0,

                            color: "#8295b5",

                            fontSize: "12px",

                            fontWeight: 600,
                          }}
                        >
                          Owner Name:
                        </Typography>

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

                            "&:hover": {
                              backgroundColor:
                                "rgba(2,183,114,0.24)",
                            },
                          }}
                        >
                          {row.ownerName || "-"}
                        </Button>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",

                          alignItems: "center",

                          padding: "8px 2px",

                          borderBottom:
                            "1px solid rgba(255,255,255,0.07)",
                        }}
                      >
                        <Typography
                          sx={{
                            width: "37%",

                            flexShrink: 0,

                            color: "#8295b5",

                            fontSize: "12px",

                            fontWeight: 600,
                          }}
                        >
                          Setup Time:
                        </Typography>

                        <Typography
                          sx={{
                            color:
                              colors.gray[100],

                            fontSize: "13px",
                          }}
                        >
                          {convertDateFormat(
                            row.setupCompletedAt
                          )}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",

                          alignItems: "center",

                          padding: "8px 2px",
                        }}
                      >
                        <Typography
                          sx={{
                            width: "37%",

                            flexShrink: 0,

                            color: "#8295b5",

                            fontSize: "12px",

                            fontWeight: 600,
                          }}
                        >
                          Phone Number:
                        </Typography>

                        <Typography
                          sx={{
                            color:
                              colors.gray[100],

                            fontSize: "13px",

                            overflowWrap:
                              "anywhere",
                          }}
                        >
                          {row.phoneNumber || "-"}
                        </Typography>
                      </Box>
                    </Paper>
                  )
                )}
              </Box>
            )}
          </Box>

          <Paper
            elevation={0}
            sx={{
              width: "100%",

              minHeight: "166px",

              padding: "11px 14px",

              marginBottom: "8px",

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
                display: "flex",

                alignItems: "center",

                justifyContent: "center",

                gap: "25px",

                paddingTop: "14px",
              }}
            >
              <Box
                sx={{
                  width: "72px",

                  height: "72px",

                  minWidth: "72px",

                  borderRadius: "50%",

                  background:
                    dashboardStats.totalHomes ===
                    0
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

                      backgroundColor: "#596985",
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
              width: "100%",

              minHeight: "186px",

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

                        justifyContent: "center",

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

                          overflowWrap:
                            "anywhere",
                        }}
                      >
                        {activity.eventType}
                      </Typography>

                      <Typography
                        sx={{
                          color: "#9aabc6",

                          fontSize: "12px",

                          marginTop: "1px",

                          overflowWrap:
                            "anywhere",
                        }}
                      >
                        {activity.description}
                      </Typography>

                      <Typography
                        sx={{
                          color: "#7184a5",

                          fontSize: "11px",

                          marginTop: "2px",

                          overflowWrap:
                            "anywhere",
                        }}
                      >
                        {activity.user || "System"} •{" "}
                        {convertDateTime(
                          activity.createdAt
                        )}
                      </Typography>
                    </Box>
                  </Box>
                )
              )
            )}
          </Paper>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",

        width: "100%",

        height: "100vh",

        maxHeight: "100vh",

        background: `linear-gradient(
          270deg,
          ${colors.blue[700]},
          ${colors.blue[500]},
          ${colors.blue[800]}
        )`,

        overflow: "hidden",
      }}
    >
      <SideBar />

      <Box
        sx={{
          flex: 1,

          minWidth: 0,

          width: "auto",

          height: "100vh",

          maxHeight: "100vh",

          boxSizing: "border-box",

          px: {
            sm: "12px",
            md: "14px",
          },

          pt: "4px",

          pb: "32px",

          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "100%",

            height: "100%",

            boxSizing: "border-box",

            display: "flex",

            flexDirection: "column",

            minHeight: 0,

            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              flexShrink: 0,
            }}
          >
            <TopBar />
          </Box>

          <Box
            sx={{
              marginTop: "3px",

              marginBottom: "6px",

              flexShrink: 0,
            }}
          >
            <Typography
              sx={{
                color: colors.gray[100],

                fontSize: {
                  sm: "26px",
                  md: "clamp(27px, 1.9vw, 32px)",
                },

                fontWeight: 600,

                lineHeight: 1.02,
              }}
            >
              Dashboard
            </Typography>

            <Typography
              sx={{
                color: "#9aabc6",

                fontSize:
                  "clamp(13px, 0.95vw, 15px)",

                marginTop: "2px",
              }}
            >
              Welcome back! Here's an overview of your smart homes.
            </Typography>
          </Box>

          {error && (
            <Paper
              elevation={0}
              sx={{
                padding: "7px 10px",

                marginBottom: "6px",

                borderRadius: "7px",

                backgroundColor:
                  "rgba(255,80,80,0.15)",

                border:
                  "1px solid rgba(255,80,80,0.25)",

                flexShrink: 0,
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
                sm: "1fr",
                md: "minmax(0, 2.3fr) minmax(230px, 0.7fr)",
              },

              gap: "8px",

              marginBottom: "7px",

              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                width: "100%",

                minWidth: 0,

                display: "grid",

                gridTemplateColumns: {
                  sm: "repeat(3, minmax(0, 1fr))",
                },

                gap: "8px",
              }}
            >
              <StatCard
                title="TOTAL HOMES"
                value={dashboardStats.totalHomes}
                subtitle="Registered smart homes"
                icon={
                  <HomeOutlinedIcon
                    sx={{
                      fontSize:
                        "clamp(21px, 1.5vw, 25px)",
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
                      fontSize:
                        "clamp(21px, 1.5vw, 25px)",
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
                      fontSize:
                        "clamp(21px, 1.5vw, 25px)",
                    }}
                  />
                }
              />
            </Box>

            <StatCard
              title="ONLINE HOMES"
              value={dashboardStats.onlineHomes}
              subtitle="Currently active"
              icon={
                <WifiOutlinedIcon
                  sx={{
                    fontSize:
                      "clamp(21px, 1.5vw, 25px)",
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
                sm: "minmax(0, 1fr)",
                md: "minmax(0, 2.3fr) minmax(230px, 0.7fr)",
              },

              gap: "8px",

              boxSizing: "border-box",

              flex: 1,

              minHeight: 0,

              overflow: "hidden",
            }}
          >
            <Paper
              elevation={0}
              sx={{
                width: "100%",

                minWidth: 0,

                height: "100%",

                minHeight: 0,

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
                  padding: "10px 14px 7px",

                  borderBottom:
                    "1px solid rgba(255,255,255,0.05)",

                  flexShrink: 0,
                }}
              >
                <Typography
                  sx={{
                    color: colors.gray[100],

                    fontSize:
                      "clamp(18px, 1.3vw, 21px)",

                    fontWeight: 600,

                    lineHeight: 1.1,
                  }}
                >
                  Active Homes
                </Typography>

                <Typography
                  sx={{
                    color: "#8192af",

                    fontSize:
                      "clamp(12px, 0.9vw, 15px)",

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

                    minHeight: 0,

                    display: "flex",

                    alignItems: "center",

                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#8192af",

                      fontSize:
                        "clamp(14px, 1vw, 17px)",
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
                              padding:
                                "clamp(8px, 0.8vh, 11px) 12px",

                              backgroundColor:
                                colors.blue[700],

                              borderBottom:
                                "1px solid #323f6a",
                            }}
                          >
                            <Typography
                              sx={{
                                color: "#8295b5",

                                fontSize:
                                  "clamp(13px, 1vw, 16px)",

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
                                padding:
                                  "clamp(8px, 1vh, 13px) 12px",

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
                                    width:
                                      "clamp(28px, 2.2vw, 36px)",

                                    height:
                                      "clamp(28px, 2.2vw, 36px)",

                                    minWidth:
                                      "clamp(28px, 2.2vw, 36px)",

                                    borderRadius: "7px",

                                    backgroundColor:
                                      "rgba(0,117,255,0.16)",

                                    display: "flex",

                                    alignItems: "center",

                                    justifyContent: "center",

                                    color:
                                      colors.blue[500],
                                  }}
                                >
                                  <HomeOutlinedIcon
                                    sx={{
                                      fontSize:
                                        "clamp(17px, 1.4vw, 22px)",
                                    }}
                                  />
                                </Box>

                                <Typography
                                  sx={{
                                    color:
                                      colors.gray[100],

                                    fontSize:
                                      "clamp(14px, 1.05vw, 17px)",

                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {row.homeIpAddress}
                                </Typography>
                              </Box>
                            </TableCell>

                            <TableCell
                              sx={{
                                padding:
                                  "clamp(8px, 1vh, 13px) 12px",

                                borderBottom:
                                  "1px solid #263760",
                              }}
                            >
                              <Typography
                                sx={{
                                  color:
                                    colors.gray[100],

                                  fontSize:
                                    "clamp(14px, 1.05vw, 17px)",
                                }}
                              >
                                Total:{" "}
                                {row.totalModuleCount ?? 0}
                              </Typography>

                              <Typography
                                sx={{
                                  color:
                                    colors.green[300],

                                  fontSize:
                                    "clamp(12px, 0.9vw, 15px)",

                                  marginTop: "1px",
                                }}
                              >
                                Active:{" "}
                                {row.activeModuleCount ?? 0}
                              </Typography>
                            </TableCell>

                            <TableCell
                              sx={{
                                padding:
                                  "clamp(8px, 1vh, 13px) 12px",

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

                                  fontSize:
                                    "clamp(12px, 0.9vw, 15px)",

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
                                padding:
                                  "clamp(8px, 1vh, 13px) 12px",

                                borderBottom:
                                  "1px solid #263760",
                              }}
                            >
                              <Typography
                                sx={{
                                  color:
                                    colors.gray[100],

                                  fontSize:
                                    "clamp(14px, 1.05vw, 17px)",

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
                                padding:
                                  "clamp(8px, 1vh, 13px) 12px",

                                borderBottom:
                                  "1px solid #263760",
                              }}
                            >
                              <Typography
                                sx={{
                                  color:
                                    colors.gray[100],

                                  fontSize:
                                    "clamp(14px, 1.05vw, 17px)",

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

                height: "100%",

                minHeight: 0,

                display: "grid",

                gridTemplateColumns: {
                  sm: "repeat(2, minmax(0, 1fr))",
                  md: "1fr",
                },

                gridTemplateRows: {
                  md: "45% minmax(0, 55%)",
                },

                gap: "8px",

                overflow: "hidden",
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  height: "100%",

                  minHeight: 0,

                  padding: "10px 14px",

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

                    fontSize:
                      "clamp(17px, 1.25vw, 21px)",

                    fontWeight: 600,

                    lineHeight: 1.1,
                  }}
                >
                  Home Status
                </Typography>

                <Typography
                  sx={{
                    color: "#8192af",

                    fontSize:
                      "clamp(12px, 0.9vw, 15px)",

                    marginTop: "2px",
                  }}
                >
                  Current system availability
                </Typography>

                <Box
                  sx={{
                    flex: 1,

                    minHeight: 0,

                    display: "flex",

                    alignItems: "center",

                    justifyContent: "center",

                    gap:
                      "clamp(18px, 2vw, 28px)",
                  }}
                >
                  <Box
                    sx={{
                      width:
                        "clamp(68px, 5.5vw, 92px)",

                      height:
                        "clamp(68px, 5.5vw, 92px)",

                      minWidth:
                        "clamp(68px, 5.5vw, 92px)",

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

                        width: "71%",

                        height: "71%",

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

                          fontSize:
                            "clamp(19px, 1.5vw, 25px)",

                          fontWeight: 600,

                          lineHeight: 1,
                        }}
                      >
                        {onlinePercentage}%
                      </Typography>

                      <Typography
                        sx={{
                          color: "#8192af",

                          fontSize:
                            "clamp(11px, 0.8vw, 14px)",

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

                          fontSize:
                            "clamp(12px, 0.9vw, 15px)",
                        }}
                      >
                        Online
                      </Typography>

                      <Typography
                        sx={{
                          color:
                            colors.gray[100],

                          fontSize:
                            "clamp(14px, 1vw, 17px)",

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

                          fontSize:
                            "clamp(12px, 0.9vw, 15px)",
                        }}
                      >
                        Offline
                      </Typography>

                      <Typography
                        sx={{
                          color:
                            colors.gray[100],

                          fontSize:
                            "clamp(14px, 1vw, 17px)",

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
                  height: "100%",

                  minHeight: 0,

                  padding: "10px 14px",

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

                    fontSize:
                      "clamp(17px, 1.25vw, 21px)",

                    fontWeight: 600,

                    lineHeight: 1.1,
                  }}
                >
                  Recent Activity
                </Typography>

                <Typography
                  sx={{
                    color: "#8192af",

                    fontSize:
                      "clamp(12px, 0.9vw, 15px)",

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

                        fontSize:
                          "clamp(13px, 0.9vw, 15px)",
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

                            padding:
                              "clamp(5px, 0.7vh, 8px) 0",

                            borderBottom:
                              "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          <Box
                            sx={{
                              width:
                                "clamp(28px, 2vw, 34px)",

                              height:
                                "clamp(28px, 2vw, 34px)",

                              minWidth:
                                "clamp(28px, 2vw, 34px)",

                              borderRadius:
                                "6px",

                              backgroundColor:
                                "rgba(0,117,255,0.15)",

                              display: "flex",

                              alignItems:
                                "center",

                              justifyContent:
                                "center",

                              color:
                                colors.blue[500],
                            }}
                          >
                            <AccessTimeOutlinedIcon
                              sx={{
                                fontSize:
                                  "clamp(16px, 1.2vw, 20px)",
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

                                fontSize:
                                  "clamp(13px, 0.95vw, 16px)",

                                fontWeight:
                                  600,

                                whiteSpace:
                                  "nowrap",

                                overflow:
                                  "hidden",

                                textOverflow:
                                  "ellipsis",
                              }}
                            >
                              {activity.eventType}
                            </Typography>

                            <Typography
                              sx={{
                                color:
                                  "#9aabc6",

                                fontSize:
                                  "clamp(12px, 0.85vw, 15px)",

                                marginTop:
                                  "1px",

                                whiteSpace:
                                  "nowrap",

                                overflow:
                                  "hidden",

                                textOverflow:
                                  "ellipsis",
                              }}
                            >
                              {activity.description}
                            </Typography>

                            <Typography
                              sx={{
                                color:
                                  "#7184a5",

                                fontSize:
                                  "clamp(11px, 0.78vw, 13px)",

                                marginTop:
                                  "2px",

                                whiteSpace:
                                  "nowrap",

                                overflow:
                                  "hidden",

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