import React, { useEffect, useMemo, useState } from "react";

import {
  Box,
  Typography,
  Paper,
  TextField,
  MenuItem,
  CircularProgress,
  InputAdornment,
  Pagination,
} from "@mui/material";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import PowerOutlinedIcon from "@mui/icons-material/PowerOutlined";
import DevicesOtherOutlinedIcon from "@mui/icons-material/DevicesOtherOutlined";

import axios from "axios";

import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import theme from "../theme.jsx";

import { useAuth } from "../context/authContext.jsx";

function Devices() {
  const colors = theme.palette;

  const { token, logout } = useAuth();

  const [devices, setDevices] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [homeFilter, setHomeFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);

  const devicesPerPage = 5;

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          "https://smarthomesystemsapi.onrender.com/api/smarthome/devices",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDevices(response.data || []);
      } catch (error) {
        console.error("Devices error:", error);

        if (
          error.response?.status === 401 ||
          error.response?.status === 403
        ) {
          logout();
          return;
        }

        setError("Devices could not be loaded.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchDevices();
    }
  }, [token, logout]);

  const homes = useMemo(() => {
    return [
      "All",
      ...new Set(
        devices
          .map((device) => device.homeIpAddress)
          .filter(Boolean)
      ),
    ];
  }, [devices]);

  const deviceTypes = useMemo(() => {
    return [
      "All",
      ...new Set(
        devices
          .map((device) => device.deviceType)
          .filter(Boolean)
      ),
    ];
  }, [devices]);

  const filteredDevices = useMemo(() => {
    return devices.filter((device) => {
      const searchValue = searchText.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        device.deviceName
          ?.toLowerCase()
          .includes(searchValue) ||
        device.deviceCode
          ?.toLowerCase()
          .includes(searchValue) ||
        device.deviceType
          ?.toLowerCase()
          .includes(searchValue) ||
        device.homeIpAddress
          ?.toLowerCase()
          .includes(searchValue);

      const matchesHome =
        homeFilter === "All" ||
        device.homeIpAddress === homeFilter;

      const matchesType =
        typeFilter === "All" ||
        device.deviceType === typeFilter;

      const matchesStatus =
        statusFilter === "All" ||
        device.status === statusFilter;

      return (
        matchesSearch &&
        matchesHome &&
        matchesType &&
        matchesStatus
      );
    });
  }, [
    devices,
    searchText,
    homeFilter,
    typeFilter,
    statusFilter,
  ]);

  useEffect(() => {
    setPage(1);
  }, [
    searchText,
    homeFilter,
    typeFilter,
    statusFilter,
  ]);

  const pageCount = Math.ceil(
    filteredDevices.length / devicesPerPage
  );

  const paginatedDevices = useMemo(() => {
    const startIndex =
      (page - 1) * devicesPerPage;

    const endIndex =
      startIndex + devicesPerPage;

    return filteredDevices.slice(
      startIndex,
      endIndex
    );
  }, [filteredDevices, page]);

  const formatDateTime = (dateString) => {
    if (!dateString) {
      return "-";
    }

    return new Date(dateString).toLocaleString(
      "en-GB",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  const getDeviceIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "light":
        return <LightbulbOutlinedIcon />;

      case "sensor":
        return <DeviceThermostatOutlinedIcon />;

      case "lock":
        return <LockOutlinedIcon />;

      case "camera":
        return <VideocamOutlinedIcon />;

      case "plug":
        return <PowerOutlinedIcon />;

      default:
        return <DevicesOtherOutlinedIcon />;
    }
  };

  const getTypeStyle = (type) => {
    switch (type?.toLowerCase()) {
      case "light":
        return {
          background: "rgba(0,117,255,0.28)",
          color: "#9bc8ff",
        };

      case "sensor":
        return {
          background: "rgba(105,79,255,0.30)",
          color: "#c5b8ff",
        };

      case "lock":
        return {
          background: "rgba(0,117,255,0.25)",
          color: "#9bc8ff",
        };

      case "camera":
        return {
          background: "rgba(0,190,210,0.28)",
          color: "#8ef3ff",
        };

      case "plug":
        return {
          background: "rgba(108,79,255,0.30)",
          color: "#c6b8ff",
        };

      default:
        return {
          background: "rgba(255,255,255,0.08)",
          color: colors.gray[100],
        };
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          overflow: "hidden",

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
          flex: {
            xs: "none",
            sm: 1,
          },

          minWidth: 0,

          width: {
            xs: "100%",
            sm: "auto",
          },

          height: "100vh",
          maxHeight: "100vh",

          boxSizing: "border-box",

          px: {
            xs: "14px",
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

            maxWidth: {
              xs: "440px",
              sm: "100%",
            },

            height: "100%",

            mx: "auto",

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
                  xs: "25px",
                  sm: "27px",
                  md: "clamp(28px, 2vw, 34px)",
                },

                fontWeight: 600,
                lineHeight: 1.02,
              }}
            >
              Devices
            </Typography>

            <Typography
              sx={{
                color: "#9aabc6",

                fontSize: {
                  xs: "14px",
                  sm: "clamp(14px, 1vw, 16px)",
                },

                marginTop: "3px",
              }}
            >
              View and manage all devices in your smart homes.
            </Typography>
          </Box>

          <Paper
            elevation={0}
            sx={{
              width: "100%",

              flex: 1,
              minHeight: 0,
              height: "auto",

              borderRadius: "11px",

              boxSizing: "border-box",

              display: "flex",
              flexDirection: "column",

              background: `linear-gradient(
                220deg,
                ${colors.blue[700]},
                ${colors.blue[600]},
                ${colors.blue[700]}
              )`,

              border:
                "1px solid rgba(255,255,255,0.08)",

              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                padding: {
                  xs: "11px 12px",
                  sm: "11px 14px",
                  md: "12px 16px",
                },

                flexShrink: 0,

                display: "grid",

                gridTemplateColumns: {
                  xs: "minmax(0, 1fr)",
                  sm: "repeat(2, minmax(0, 1fr))",
                  md: "1.5fr repeat(3, minmax(130px, 0.8fr))",
                },

                gap: "9px",

                alignItems: "end",

                borderBottom:
                  "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <TextField
                value={searchText}
                onChange={(e) =>
                  setSearchText(e.target.value)
                }
                placeholder="Search devices..."
                size="small"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlinedIcon
                        sx={{
                          color: "#86a6d8",
                          fontSize:
                            "clamp(21px, 1.4vw, 24px)",
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  gridColumn: {
                    xs: "1",
                    sm: "1 / -1",
                    md: "auto",
                  },

                  "& .MuiOutlinedInput-root": {
                    color: colors.gray[100],

                    fontSize:
                      "clamp(14px, 1vw, 17px)",

                    backgroundColor:
                      "rgba(2,5,22,0.28)",

                    borderRadius: "8px",

                    "& fieldset": {
                      borderColor:
                        "rgba(0,117,255,0.45)",
                    },

                    "&:hover fieldset": {
                      borderColor:
                        "rgba(0,117,255,0.75)",
                    },

                    "&.Mui-focused fieldset": {
                      borderColor:
                        colors.blue[500],
                    },
                  },

                  "& input": {
                    paddingTop: "10px",
                    paddingBottom: "10px",
                  },

                  "& input::placeholder": {
                    color: "#8da0c2",
                    opacity: 1,
                  },
                }}
              />

              <FilterBox label="Home">
                <TextField
                  select
                  value={homeFilter}
                  onChange={(e) =>
                    setHomeFilter(e.target.value)
                  }
                  size="small"
                  fullWidth
                  sx={filterStyle}
                >
                  {homes.map((home) => (
                    <MenuItem
                      key={home}
                      value={home}
                    >
                      {home}
                    </MenuItem>
                  ))}
                </TextField>
              </FilterBox>

              <FilterBox label="Device Type">
                <TextField
                  select
                  value={typeFilter}
                  onChange={(e) =>
                    setTypeFilter(e.target.value)
                  }
                  size="small"
                  fullWidth
                  sx={filterStyle}
                >
                  {deviceTypes.map((type) => (
                    <MenuItem
                      key={type}
                      value={type}
                    >
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              </FilterBox>

              <FilterBox label="Status">
                <TextField
                  select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value)
                  }
                  size="small"
                  fullWidth
                  sx={filterStyle}
                >
                  <MenuItem value="All">
                    All
                  </MenuItem>

                  <MenuItem value="Online">
                    Online
                  </MenuItem>

                  <MenuItem value="Offline">
                    Offline
                  </MenuItem>
                </TextField>
              </FilterBox>
            </Box>

            {error && (
              <Box
                sx={{
                  padding: "8px 16px 0",
                  flexShrink: 0,
                }}
              >
                <Typography
                  sx={{
                    color: "#ff9d9d",
                    fontSize:
                      "clamp(14px, 0.95vw, 16px)",
                  }}
                >
                  {error}
                </Typography>
              </Box>
            )}

            <Box
              sx={{
                flex: 1,
                minHeight: 0,

                margin: {
                  xs: "8px 12px",
                  sm: "8px 14px",
                  md: "8px 16px",
                },

                borderRadius: "9px",

                border:
                  "1px solid rgba(255,255,255,0.05)",

                overflowY: "auto",
                overflowX: "hidden",

                scrollbarWidth: "thin",

                "&::-webkit-scrollbar": {
                  width: "7px",
                },

                "&::-webkit-scrollbar-track": {
                  background:
                    "rgba(2,5,22,0.25)",
                },

                "&::-webkit-scrollbar-thumb": {
                  background:
                    "rgba(122,167,255,0.55)",

                  borderRadius: "8px",
                },
              }}
            >
              <Box
                sx={{
                  display: {
                    xs: "none",
                    md: "grid",
                  },

                  width: "100%",
                  boxSizing: "border-box",

                  gridTemplateColumns:
                    "2fr 1.25fr 1fr 1fr 1.35fr",

                  gap: "8px",

                  alignItems: "center",

                  padding:
                    "clamp(11px, 1.2vh, 15px) 14px",

                  position: "sticky",
                  top: 0,
                  zIndex: 2,

                  backgroundColor: "#071743",

                  borderBottom:
                    "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {[
                  "Device",
                  "Home",
                  "Type",
                  "Status",
                  "Last Seen",
                ].map((title) => (
                  <Typography
                    key={title}
                    sx={{
                      color: "#b2c1d9",

                      fontSize:
                        "clamp(14px, 1vw, 17px)",

                      fontWeight: 600,
                    }}
                  >
                    {title}
                  </Typography>
                ))}
              </Box>

              {filteredDevices.length === 0 ? (
                <Box
                  sx={{
                    padding: "35px 16px",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#8192af",

                      fontSize:
                        "clamp(14px, 1vw, 17px)",
                    }}
                  >
                    No devices found.
                  </Typography>
                </Box>
              ) : (
                paginatedDevices.map((device) => (
                  <Box
                    key={device._id}
                    sx={{
                      display: {
                        xs: "block",
                        md: "grid",
                      },

                      width: "100%",
                      boxSizing: "border-box",

                      gridTemplateColumns:
                        "2fr 1.25fr 1fr 1fr 1.35fr",

                      gap: {
                        md: "8px",
                      },

                      alignItems: "center",

                      padding: {
                        xs: "12px 14px",
                        sm: "13px 15px",
                        md: "clamp(11px, 1.25vh, 15px) 14px",
                      },

                      borderBottom:
                        "1px solid rgba(255,255,255,0.06)",

                      "&:last-child": {
                        borderBottom: "none",
                      },

                      "&:hover": {
                        backgroundColor:
                          "rgba(255,255,255,0.025)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",

                        gap:
                          "clamp(9px, 0.8vw, 12px)",

                        minWidth: 0,
                      }}
                    >
                      <Box
                        sx={{
                          width:
                            "clamp(40px, 2.8vw, 48px)",

                          height:
                            "clamp(40px, 2.8vw, 48px)",

                          minWidth:
                            "clamp(40px, 2.8vw, 48px)",

                          borderRadius: "8px",

                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",

                          background:
                            "linear-gradient(145deg, rgba(0,117,255,0.45), rgba(48,73,190,0.40))",

                          color: "#b8d7ff",

                          "& svg": {
                            fontSize:
                              "clamp(22px, 1.5vw, 27px)",
                          },
                        }}
                      >
                        {getDeviceIcon(
                          device.deviceType
                        )}
                      </Box>

                      <Box
                        sx={{
                          minWidth: 0,
                        }}
                      >
                        <Typography
                          sx={{
                            color:
                              colors.gray[100],

                            fontSize:
                              "clamp(15px, 1.05vw, 18px)",

                            fontWeight: 500,

                            overflow: "hidden",
                            textOverflow:
                              "ellipsis",

                            whiteSpace: {
                              xs: "normal",
                              md: "nowrap",
                            },
                          }}
                        >
                          {device.deviceName}
                        </Typography>

                        <Typography
                          sx={{
                            color: "#8496b8",

                            fontSize:
                              "clamp(13px, 0.9vw, 15px)",

                            marginTop: "2px",
                          }}
                        >
                          {device.deviceCode}
                        </Typography>
                      </Box>
                    </Box>

                    <ResponsiveValue
                      label="Home"
                      value={
                        device.homeIpAddress || "-"
                      }
                    />

                    <Box
                      sx={{
                        marginTop: {
                          xs: "9px",
                          md: 0,
                        },
                      }}
                    >
                      <MobileLabel>
                        Type
                      </MobileLabel>

                      <Box
                        component="span"
                        sx={{
                          display: "inline-block",

                          padding:
                            "clamp(4px, 0.4vw, 6px) clamp(9px, 0.7vw, 12px)",

                          borderRadius: "7px",

                          fontSize:
                            "clamp(13px, 0.9vw, 15px)",

                          fontWeight: 500,

                          ...getTypeStyle(
                            device.deviceType
                          ),
                        }}
                      >
                        {device.deviceType}
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        marginTop: {
                          xs: "9px",
                          md: 0,
                        },
                      }}
                    >
                      <MobileLabel>
                        Status
                      </MobileLabel>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",

                          gap:
                            "clamp(7px, 0.55vw, 9px)",
                        }}
                      >
                        <Box
                          sx={{
                            width:
                              "clamp(9px, 0.65vw, 11px)",

                            height:
                              "clamp(9px, 0.65vw, 11px)",

                            minWidth:
                              "clamp(9px, 0.65vw, 11px)",

                            borderRadius: "50%",

                            backgroundColor:
                              device.status ===
                              "Online"
                                ? "#12d39a"
                                : "#ff6060",
                          }}
                        />

                        <Typography
                          sx={{
                            color:
                              device.status ===
                              "Online"
                                ? "#12d39a"
                                : "#ff6060",

                            fontSize:
                              "clamp(14px, 1vw, 17px)",

                            fontWeight: 500,
                          }}
                        >
                          {device.status}
                        </Typography>
                      </Box>
                    </Box>

                    <ResponsiveValue
                      label="Last Seen"
                      value={formatDateTime(
                        device.lastSeen
                      )}
                    />
                  </Box>
                ))
              )}
            </Box>

            <Box
              sx={{
                flexShrink: 0,

                padding: {
                  xs: "6px 12px 10px",
                  sm: "6px 14px 10px",
                  md: "6px 16px 10px",
                },

                display: "flex",

                alignItems: {
                  xs: "flex-start",
                  sm: "center",
                },

                justifyContent: "space-between",

                gap: "8px",

                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
              }}
            >
              <Typography
                sx={{
                  color: "#94a6c4",

                  fontSize:
                    "clamp(13px, 0.9vw, 15px)",
                }}
              >
                Showing {paginatedDevices.length} of{" "}
                {filteredDevices.length} devices
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

                      minWidth: "32px",
                      height: "32px",

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

const filterStyle = {
  "& .MuiOutlinedInput-root": {
    color: "#edeeed",

    fontSize:
      "clamp(14px, 1vw, 17px)",

    backgroundColor:
      "rgba(2,5,22,0.28)",

    borderRadius: "8px",

    "& fieldset": {
      borderColor:
        "rgba(0,117,255,0.45)",
    },

    "&:hover fieldset": {
      borderColor:
        "rgba(0,117,255,0.75)",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#0075ff",
    },
  },

  "& .MuiSelect-select": {
    paddingTop: "10px",
    paddingBottom: "10px",
  },

  "& .MuiSvgIcon-root": {
    color: "#9ab8e7",
  },
};

function FilterBox({ label, children }) {
  return (
    <Box
      sx={{
        minWidth: 0,
      }}
    >
      <Typography
        sx={{
          color: "#aebcd3",

          fontSize:
            "clamp(13px, 0.9vw, 15px)",

          fontWeight: 500,

          marginBottom: "4px",
        }}
      >
        {label}
      </Typography>

      {children}
    </Box>
  );
}

function MobileLabel({ children }) {
  return (
    <Typography
      sx={{
        display: {
          xs: "block",
          md: "none",
        },

        color: "#7184a5",

        fontSize: "13px",

        marginBottom: "3px",
      }}
    >
      {children}
    </Typography>
  );
}

function ResponsiveValue({
  label,
  value,
}) {
  return (
    <Box
      sx={{
        minWidth: 0,

        marginTop: {
          xs: "9px",
          md: 0,
        },
      }}
    >
      <MobileLabel>
        {label}
      </MobileLabel>

      <Typography
        sx={{
          color: "#d8dfec",

          fontSize:
            "clamp(14px, 1vw, 17px)",

          fontWeight: 400,

          overflow: "hidden",
          textOverflow: "ellipsis",

          whiteSpace: {
            xs: "normal",
            md: "nowrap",
          },
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

export default Devices;