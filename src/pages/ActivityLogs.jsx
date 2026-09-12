import React, { useEffect, useMemo, useState } from "react";

import {
  Box,
  Typography,
  Paper,
  TextField,
  MenuItem,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Pagination,
} from "@mui/material";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

import axios from "axios";

import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import theme from "../theme.jsx";

import { useAuth } from "../context/authContext.jsx";

function ActivityLogs() {
  const colors = theme.palette;

  const { token, logout } = useAuth();

  const [activityLogs, setActivityLogs] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [eventTypeFilter, setEventTypeFilter] = useState("All");
  const [userFilter, setUserFilter] = useState("All");
  const [homeFilter, setHomeFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);

  const logsPerPage = 5;

  useEffect(() => {
    const fetchActivityLogs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          "https://smarthomesystemsapi.onrender.com/api/smarthome/activitylogs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setActivityLogs(response.data || []);
      } catch (error) {
        console.error("Activity logs load error:", error);

        if (
          error.response?.status === 401 ||
          error.response?.status === 403
        ) {
          logout();
          return;
        }

        setError("Activity logs could not be loaded.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchActivityLogs();
    }
  }, [token, logout]);

  const eventTypes = useMemo(() => {
    return [
      ...new Set(
        activityLogs
          .map((item) => item.eventType)
          .filter(Boolean)
      ),
    ];
  }, [activityLogs]);

  const users = useMemo(() => {
    return [
      ...new Set(
        activityLogs
          .map((item) => item.user)
          .filter(Boolean)
      ),
    ];
  }, [activityLogs]);

  const homes = useMemo(() => {
    return [
      ...new Set(
        activityLogs
          .map((item) => item.homeIpAddress)
          .filter(Boolean)
      ),
    ];
  }, [activityLogs]);

  const filteredLogs = useMemo(() => {
    return activityLogs.filter((log) => {
      const searchValue = searchText
        .toLowerCase()
        .trim();

      const matchesSearch =
        !searchValue ||
        log.eventType
          ?.toLowerCase()
          .includes(searchValue) ||
        log.description
          ?.toLowerCase()
          .includes(searchValue) ||
        log.user
          ?.toLowerCase()
          .includes(searchValue) ||
        log.homeIpAddress
          ?.toLowerCase()
          .includes(searchValue);

      const matchesEventType =
        eventTypeFilter === "All" ||
        log.eventType === eventTypeFilter;

      const matchesUser =
        userFilter === "All" ||
        log.user === userFilter;

      const matchesHome =
        homeFilter === "All" ||
        log.homeIpAddress === homeFilter;

      let matchesDate = true;

      if (dateFilter && log.createdAt) {
        const logDate = new Date(log.createdAt)
          .toISOString()
          .split("T")[0];

        matchesDate = logDate === dateFilter;
      }

      return (
        matchesSearch &&
        matchesEventType &&
        matchesUser &&
        matchesHome &&
        matchesDate
      );
    });
  }, [
    activityLogs,
    searchText,
    eventTypeFilter,
    userFilter,
    homeFilter,
    dateFilter,
  ]);

  useEffect(() => {
    setPage(1);
  }, [
    searchText,
    eventTypeFilter,
    userFilter,
    homeFilter,
    dateFilter,
  ]);

  const pageCount = Math.ceil(
    filteredLogs.length / logsPerPage
  );

  const paginatedLogs = useMemo(() => {
    const startIndex =
      (page - 1) * logsPerPage;

    const endIndex =
      startIndex + logsPerPage;

    return filteredLogs.slice(
      startIndex,
      endIndex
    );
  }, [filteredLogs, page]);

  const formatDateTime = (dateString) => {
    if (!dateString) {
      return "-";
    }

    return new Date(dateString).toLocaleString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  const getEventColor = (eventType) => {
    const value =
      eventType?.toLowerCase() || "";

    if (value.includes("login")) {
      return {
        background:
          "rgba(0,117,255,0.18)",
        color: "#71aaff",
      };
    }

    if (
      value.includes("error") ||
      value.includes("failed") ||
      value.includes("delete")
    ) {
      return {
        background:
          "rgba(255,70,70,0.14)",
        color: "#ff7373",
      };
    }

    if (
      value.includes("created") ||
      value.includes("added") ||
      value.includes("online")
    ) {
      return {
        background:
          "rgba(2,183,114,0.15)",
        color: colors.green[300],
      };
    }

    return {
      background:
        "rgba(122,140,180,0.15)",
      color: "#9cafcf",
    };
  };

  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      height: "42px",

      color: colors.gray[100],

      fontSize: "14px",

      backgroundColor:
        "rgba(2,5,22,0.35)",

      borderRadius: "8px",

      "& fieldset": {
        borderColor:
          "rgba(0,117,255,0.45)",
      },

      "&:hover fieldset": {
        borderColor:
          colors.blue[500],
      },

      "&.Mui-focused fieldset": {
        borderColor:
          colors.blue[500],
      },
    },

    "& .MuiInputLabel-root": {
      color: "#8ea1bf",
      fontSize: "14px",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: colors.blue[500],
    },

    "& .MuiSvgIcon-root": {
      color: "#8ea1bf",
    },

    "& input": {
      fontSize: "14px",
    },

    "& input::placeholder": {
      color: "#8ea1bf",
      opacity: 1,
    },
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
                  xs: "25px",
                  sm: "27px",
                  md: "29px",
                },

                fontWeight: 600,
                lineHeight: 1.05,
              }}
            >
              Activity Logs
            </Typography>

            <Typography
              sx={{
                color: "#9aabc6",

                fontSize: {
                  xs: "14px",
                  sm: "15px",
                },

                marginTop: "3px",
              }}
            >
              Track all system activities and events
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
                  fontSize: "14px",
                }}
              >
                {error}
              </Typography>
            </Paper>
          )}

          <Paper
            elevation={0}
            sx={{
              width: "100%",

              borderRadius: "10px",

              overflow: "hidden",

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
                padding: "12px 14px",

                display: "grid",

                gridTemplateColumns: {
                  xs: "minmax(0, 1fr)",
                  sm: "repeat(2, minmax(0, 1fr))",
                  lg: "1.5fr repeat(4, minmax(130px, 0.7fr))",
                },

                gap: "9px",

                borderBottom:
                  "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <TextField
                value={searchText}
                onChange={(e) =>
                  setSearchText(e.target.value)
                }
                placeholder="Search activity logs..."
                size="small"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlinedIcon
                        sx={{
                          color: "#7fa0d5",
                          fontSize: "21px",
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  ...textFieldStyle,

                  gridColumn: {
                    xs: "auto",
                    sm: "1 / -1",
                    lg: "auto",
                  },
                }}
              />

              <TextField
                select
                value={homeFilter}
                onChange={(e) =>
                  setHomeFilter(e.target.value)
                }
                label="Home"
                size="small"
                sx={textFieldStyle}
              >
                <MenuItem value="All">
                  All
                </MenuItem>

                {homes.map((home) => (
                  <MenuItem
                    key={home}
                    value={home}
                  >
                    {home}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                value={userFilter}
                onChange={(e) =>
                  setUserFilter(e.target.value)
                }
                label="User"
                size="small"
                sx={textFieldStyle}
              >
                <MenuItem value="All">
                  All
                </MenuItem>

                {users.map((user) => (
                  <MenuItem
                    key={user}
                    value={user}
                  >
                    {user}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                value={eventTypeFilter}
                onChange={(e) =>
                  setEventTypeFilter(
                    e.target.value
                  )
                }
                label="Event Type"
                size="small"
                sx={textFieldStyle}
              >
                <MenuItem value="All">
                  All
                </MenuItem>

                {eventTypes.map(
                  (eventType) => (
                    <MenuItem
                      key={eventType}
                      value={eventType}
                    >
                      {eventType}
                    </MenuItem>
                  )
                )}
              </TextField>

              <TextField
                type="date"
                value={dateFilter}
                onChange={(e) =>
                  setDateFilter(e.target.value)
                }
                size="small"
                sx={{
                  ...textFieldStyle,

                  "& input": {
                    color: colors.gray[100],
                    fontSize: "14px",
                  },

                  "& input::-webkit-calendar-picker-indicator":
                    {
                      filter: "invert(1)",
                      opacity: 0.6,
                    },
                }}
              />
            </Box>

            <TableContainer
              sx={{
                width: "100%",

                overflowX: "auto",

                "&::-webkit-scrollbar": {
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
                size="small"
                sx={{
                  minWidth: "920px",
                }}
              >
                <TableHead>
                  <TableRow>
                    {[
                      "Date & Time",
                      "Event Type",
                      "Description",
                      "User",
                      "Home",
                    ].map((title) => (
                      <TableCell
                        key={title}
                        sx={{
                          padding: "9px 14px",

                          backgroundColor:
                            "rgba(5,34,94,0.72)",

                          borderBottom:
                            "1px solid rgba(255,255,255,0.05)",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#9aacc8",

                            fontSize: "14px",
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
                  {filteredLogs.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        sx={{
                          padding: "42px 20px",

                          textAlign: "center",

                          borderBottom: "none",
                        }}
                      >
                        <AccessTimeOutlinedIcon
                          sx={{
                            color: "#59729c",
                            fontSize: "32px",
                            marginBottom: "5px",
                          }}
                        />

                        <Typography
                          sx={{
                            color: "#8294b1",
                            fontSize: "15px",
                          }}
                        >
                          No activity logs found.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedLogs.map(
                      (log, index) => {
                        const eventStyle =
                          getEventColor(
                            log.eventType
                          );

                        return (
                          <TableRow
                            key={
                              log._id ||
                              `${log.createdAt}-${index}`
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
                                  "9px 14px",

                                borderBottom:
                                  "1px solid rgba(61,87,135,0.45)",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems:
                                    "center",
                                  gap: "7px",
                                }}
                              >
                                <AccessTimeOutlinedIcon
                                  sx={{
                                    color:
                                      "#7693bd",

                                    fontSize:
                                      "18px",
                                  }}
                                />

                                <Typography
                                  sx={{
                                    color:
                                      colors.gray[100],

                                    fontSize:
                                      "14px",

                                    whiteSpace:
                                      "nowrap",
                                  }}
                                >
                                  {formatDateTime(
                                    log.createdAt
                                  )}
                                </Typography>
                              </Box>
                            </TableCell>

                            <TableCell
                              sx={{
                                padding:
                                  "9px 14px",

                                borderBottom:
                                  "1px solid rgba(61,87,135,0.45)",
                              }}
                            >
                              <Box
                                sx={{
                                  width:
                                    "fit-content",

                                  padding:
                                    "4px 9px",

                                  borderRadius:
                                    "6px",

                                  backgroundColor:
                                    eventStyle.background,
                                }}
                              >
                                <Typography
                                  sx={{
                                    color:
                                      eventStyle.color,

                                    fontSize:
                                      "13px",

                                    whiteSpace:
                                      "nowrap",
                                  }}
                                >
                                  {log.eventType ||
                                    "-"}
                                </Typography>
                              </Box>
                            </TableCell>

                            <TableCell
                              sx={{
                                padding:
                                  "9px 14px",

                                borderBottom:
                                  "1px solid rgba(61,87,135,0.45)",

                                maxWidth:
                                  "380px",
                              }}
                            >
                              <Typography
                                sx={{
                                  color:
                                    colors.gray[100],

                                  fontSize:
                                    "14px",

                                  overflow:
                                    "hidden",

                                  textOverflow:
                                    "ellipsis",

                                  whiteSpace:
                                    "nowrap",
                                }}
                              >
                                {log.description ||
                                  "-"}
                              </Typography>
                            </TableCell>

                            <TableCell
                              sx={{
                                padding:
                                  "9px 14px",

                                borderBottom:
                                  "1px solid rgba(61,87,135,0.45)",
                              }}
                            >
                              <Typography
                                sx={{
                                  color:
                                    "#a5b4cd",

                                  fontSize:
                                    "14px",

                                  whiteSpace:
                                    "nowrap",
                                }}
                              >
                                {log.user ||
                                  "System"}
                              </Typography>
                            </TableCell>

                            <TableCell
                              sx={{
                                padding:
                                  "9px 14px",

                                borderBottom:
                                  "1px solid rgba(61,87,135,0.45)",
                              }}
                            >
                              <Typography
                                sx={{
                                  color:
                                    "#a5b4cd",

                                  fontSize:
                                    "14px",

                                  whiteSpace:
                                    "nowrap",
                                }}
                              >
                                {log.homeIpAddress ||
                                  "-"}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        );
                      }
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <Box
              sx={{
                padding: "10px 14px",

                borderTop:
                  "1px solid rgba(255,255,255,0.05)",

                display: "flex",

                alignItems: {
                  xs: "flex-start",
                  sm: "center",
                },

                justifyContent: "space-between",

                gap: "10px",

                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
              }}
            >
              <Typography
                sx={{
                  color: "#8ea0bd",
                  fontSize: "13px",
                }}
              >
                Showing {paginatedLogs.length} of{" "}
                {filteredLogs.length} activity logs
              </Typography>

              {pageCount > 1 && (
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={(event, value) =>
                    setPage(value)
                  }
                  shape="rounded"
                  size="small"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      color: "#b5c6e3",

                      borderRadius: "6px",

                      minWidth: "30px",
                      height: "30px",

                      margin: "0 1px",

                      fontSize: "14px",

                      backgroundColor:
                        "rgba(0,117,255,0.08)",

                      "&:hover": {
                        backgroundColor:
                          "rgba(0,117,255,0.18)",
                      },
                    },

                    "& .Mui-selected": {
                      color:
                        "#ffffff !important",

                      backgroundColor:
                        `${colors.blue[500]} !important`,
                    },
                  }}
                />
              )}
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

export default ActivityLogs;