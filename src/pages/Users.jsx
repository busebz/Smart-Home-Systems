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
} from "@mui/material";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import axios from "axios";

import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import theme from "../theme.jsx";
import { useAuth } from "../context/authContext.jsx";

const API_URL =
  "https://smarthomesystemsapi.onrender.com/api/smarthome/smarthomeusers";

const TABLE_HEADERS = ["Name", "Email", "Role", "Status"];

const tableCellStyle = {
  padding: "clamp(10px, 1.15vh, 14px) 14px",
  borderBottom: "1px solid rgba(61,87,135,0.45)",
};

const getInitials = (name) => {
  if (!name) {
    return "U";
  }

  const parts = name.trim().split(" ").filter(Boolean);

  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

function Users() {
  const colors = theme.palette;
  const { token, logout } = useAuth();

  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(response.data || []);
      } catch (error) {
        console.error("Users load error:", error);

        if (
          error.response?.status === 401 ||
          error.response?.status === 403
        ) {
          logout();
          return;
        }

        setError("Users could not be loaded.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token, logout]);

  const filteredUsers = useMemo(() => {
    const searchValue = searchText.toLowerCase().trim();

    return users.filter((user) => {
      const matchesSearch =
        !searchValue ||
        user.ownerName?.toLowerCase().includes(searchValue) ||
        user.email?.toLowerCase().includes(searchValue);

      const matchesRole =
        roleFilter === "All" || user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, searchText, roleFilter]);

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      height: "44px",
      color: colors.gray[100],
      fontSize: "clamp(14px, 1vw, 17px)",
      backgroundColor: "rgba(2,5,22,0.35)",
      borderRadius: "8px",

      "& fieldset": {
        borderColor: "rgba(0,117,255,0.45)",
      },

      "&:hover fieldset": {
        borderColor: colors.blue[500],
      },

      "&.Mui-focused fieldset": {
        borderColor: colors.blue[500],
      },
    },
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
              Users
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
              Manage system users
            </Typography>
          </Box>

          {error && (
            <Paper
              elevation={0}
              sx={{
                padding: "8px 10px",
                marginBottom: "8px",
                borderRadius: "7px",

                backgroundColor: "rgba(255,80,80,0.15)",
                border: "1px solid rgba(255,80,80,0.25)",

                flexShrink: 0,
              }}
            >
              <Typography
                sx={{
                  color: "#ffb1b1",
                  fontSize: "clamp(14px, 0.95vw, 16px)",
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

              flex: 1,
              minHeight: 0,
              height: "auto",

              borderRadius: "10px",
              boxSizing: "border-box",

              display: "flex",
              flexDirection: "column",

              overflow: "hidden",

              background: `linear-gradient(
                220deg,
                ${colors.blue[700]},
                ${colors.blue[600]},
                ${colors.blue[700]}
              )`,

              border: "1px solid rgba(255,255,255,0.08)",
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
                  sm: "minmax(0, 1fr) 200px",
                },

                gap: "10px",

                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <TextField
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search users..."
                size="small"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlinedIcon
                        sx={{
                          color: "#7fa0d5",
                          fontSize: "clamp(21px, 1.4vw, 24px)",
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  ...inputStyle,

                  "& input::placeholder": {
                    color: "#8ea1bf",
                    opacity: 1,
                  },
                }}
              />

              <TextField
                select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                size="small"
                label="Role"
                sx={{
                  ...inputStyle,

                  "& .MuiInputLabel-root": {
                    color: "#8ea1bf",
                    fontSize: "clamp(13px, 0.9vw, 15px)",
                  },

                  "& .MuiInputLabel-root.Mui-focused": {
                    color: colors.blue[500],
                  },

                  "& .MuiSvgIcon-root": {
                    color: "#8ea1bf",
                  },
                }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="User">User</MenuItem>
              </TextField>
            </Box>

            <TableContainer
              sx={{
                flex: 1,
                minHeight: 0,

                width: "100%",

                overflowX: "auto",
                overflowY: "auto",

                scrollbarWidth: "thin",

                "&::-webkit-scrollbar": {
                  width: "6px",
                  height: "5px",
                },

                "&::-webkit-scrollbar-thumb": {
                  background: "rgba(122,167,255,0.28)",
                  borderRadius: "10px",
                },
              }}
            >
              <Table
                stickyHeader
                size="small"
                sx={{
                  minWidth: "650px",
                  width: "100%",
                }}
              >
                <TableHead>
                  <TableRow>
                    {TABLE_HEADERS.map((title) => (
                      <TableCell
                        key={title}
                        sx={{
                          padding: "clamp(10px, 1vh, 13px) 14px",

                          backgroundColor: "rgba(5,34,94,0.95)",

                          borderBottom:
                            "1px solid rgba(255,255,255,0.05)",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#9aacC8",
                            fontSize: "clamp(14px, 1vw, 17px)",
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
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        sx={{
                          borderBottom: "none",
                          padding: "40px 20px",
                          textAlign: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#8294b1",
                            fontSize: "clamp(14px, 1vw, 17px)",
                          }}
                        >
                          No users found.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user, index) => (
                      <TableRow
                        key={user._id || `${user.email}-${index}`}
                        sx={{
                          "&:hover": {
                            backgroundColor: "rgba(255,255,255,0.025)",
                          },
                        }}
                      >
                        <TableCell sx={tableCellStyle}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "clamp(10px, 0.8vw, 13px)",
                            }}
                          >
                            <Box
                              sx={{
                                width: "clamp(38px, 2.6vw, 46px)",
                                height: "clamp(38px, 2.6vw, 46px)",
                                minWidth: "clamp(38px, 2.6vw, 46px)",

                                borderRadius: "50%",

                                backgroundColor: "rgba(0,117,255,0.75)",

                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "#ffffff",
                                  fontSize: "clamp(13px, 0.9vw, 15px)",
                                  fontWeight: 600,
                                }}
                              >
                                {getInitials(user.ownerName)}
                              </Typography>
                            </Box>

                            <Typography
                              sx={{
                                color: colors.gray[100],
                                fontSize: "clamp(15px, 1.05vw, 18px)",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {user.ownerName}
                            </Typography>
                          </Box>
                        </TableCell>

                        <TableCell sx={tableCellStyle}>
                          <Typography
                            sx={{
                              color: colors.gray[100],
                              fontSize: "clamp(14px, 1vw, 17px)",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {user.email || "-"}
                          </Typography>
                        </TableCell>

                        <TableCell sx={tableCellStyle}>
                          <Box
                            sx={{
                              width: "fit-content",
                              minWidth: "70px",

                              padding:
                                "clamp(4px, 0.35vw, 6px) clamp(10px, 0.7vw, 13px)",

                              borderRadius: "6px",
                              textAlign: "center",

                              backgroundColor:
                                user.role === "Admin"
                                  ? "rgba(0,117,255,0.55)"
                                  : "rgba(30,91,167,0.55)",
                            }}
                          >
                            <Typography
                              sx={{
                                color: "#ffffff",
                                fontSize: "clamp(13px, 0.9vw, 15px)",
                                fontWeight: 500,
                              }}
                            >
                              {user.role || "User"}
                            </Typography>
                          </Box>
                        </TableCell>

                        <TableCell sx={tableCellStyle}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "clamp(7px, 0.55vw, 9px)",
                            }}
                          >
                            <Box
                              sx={{
                                width: "clamp(9px, 0.65vw, 11px)",
                                height: "clamp(9px, 0.65vw, 11px)",
                                minWidth: "clamp(9px, 0.65vw, 11px)",

                                borderRadius: "50%",

                                backgroundColor:
                                  user.status === "Inactive"
                                    ? "#ff5050"
                                    : colors.green[400],
                              }}
                            />

                            <Typography
                              sx={{
                                color:
                                  user.status === "Inactive"
                                    ? "#ff6262"
                                    : colors.green[300],

                                fontSize: "clamp(14px, 1vw, 17px)",
                                fontWeight: 500,
                              }}
                            >
                              {user.status || "Active"}
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <Box
              sx={{
                flexShrink: 0,
                padding: "10px 14px",
                borderTop: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <Typography
                sx={{
                  color: "#8ea0bd",
                  fontSize: "clamp(13px, 0.9vw, 15px)",
                }}
              >
                Showing {filteredUsers.length} of {users.length} users
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

export default Users;