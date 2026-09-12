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

        const response = await axios.get(
          "https://smarthomesystemsapi.onrender.com/api/smarthome/smarthomeusers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
    return users.filter((user) => {
      const searchValue = searchText.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        user.ownerName
          ?.toLowerCase()
          .includes(searchValue) ||
        user.email
          ?.toLowerCase()
          .includes(searchValue);

      const matchesRole =
        roleFilter === "All" ||
        user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, searchText, roleFilter]);

  const getInitials = (name) => {
    if (!name) {
      return "U";
    }

    const parts = name
      .trim()
      .split(" ")
      .filter(Boolean);

    if (parts.length === 1) {
      return parts[0]
        .substring(0, 2)
        .toUpperCase();
    }

    return (
      parts[0][0] +
      parts[parts.length - 1][0]
    ).toUpperCase();
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

          pt: "6px",
          pb: "10px",

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
              marginTop: "6px",
              marginBottom: "8px",
              flexShrink: 0,
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
              Users
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

          <Paper
            elevation={0}
            sx={{
              width: "100%",

              height: {
                xs: "calc(100vh - 120px)",
                sm: "530px",
                md: "530px",
                lg: "450px",
              },

              minHeight: 0,
              flexShrink: 0,

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

              border:
                "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Box
              sx={{
                padding: "12px 14px",

                flexShrink: 0,

                display: "grid",

                gridTemplateColumns: {
                  xs: "minmax(0, 1fr)",
                  sm: "minmax(0, 1fr) 180px",
                },

                gap: "10px",

                borderBottom:
                  "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <TextField
                value={searchText}
                onChange={(e) =>
                  setSearchText(e.target.value)
                }
                placeholder="Search users..."
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
                  "& .MuiOutlinedInput-root": {
                    height: "42px",

                    color: colors.gray[100],

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

                  "& input::placeholder": {
                    color: "#8ea1bf",
                    opacity: 1,
                  },
                }}
              />

              <TextField
                select
                value={roleFilter}
                onChange={(e) =>
                  setRoleFilter(e.target.value)
                }
                size="small"
                label="Role"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "42px",

                    color: colors.gray[100],

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
                  },

                  "& .MuiInputLabel-root.Mui-focused": {
                    color: colors.blue[500],
                  },

                  "& .MuiSvgIcon-root": {
                    color: "#8ea1bf",
                  },
                }}
              >
                <MenuItem value="All">
                  All
                </MenuItem>

                <MenuItem value="Admin">
                  Admin
                </MenuItem>

                <MenuItem value="User">
                  User
                </MenuItem>
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
                  minWidth: "650px",
                  width: "100%",
                }}
              >
                <TableHead>
                  <TableRow>
                    {[
                      "Name",
                      "Email",
                      "Role",
                      "Status",
                    ].map((title) => (
                      <TableCell
                        key={title}
                        sx={{
                          padding: "9px 14px",

                          backgroundColor:
                            "rgba(5,34,94,0.95)",

                          borderBottom:
                            "1px solid rgba(255,255,255,0.05)",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#9aacC8",

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
                            fontSize: "14px",
                          }}
                        >
                          No users found.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map(
                      (user, index) => (
                        <TableRow
                          key={
                            user._id ||
                            `${user.email}-${index}`
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
                              padding: "8px 14px",

                              borderBottom:
                                "1px solid rgba(61,87,135,0.45)",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              <Box
                                sx={{
                                  width: "34px",
                                  height: "34px",
                                  minWidth: "34px",

                                  borderRadius: "50%",

                                  backgroundColor:
                                    "rgba(0,117,255,0.75)",

                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Typography
                                  sx={{
                                    color: "#ffffff",
                                    fontSize: "12px",
                                    fontWeight: 600,
                                  }}
                                >
                                  {getInitials(
                                    user.ownerName
                                  )}
                                </Typography>
                              </Box>

                              <Typography
                                sx={{
                                  color:
                                    colors.gray[100],

                                  fontSize: "14px",

                                  whiteSpace: "nowrap",
                                }}
                              >
                                {user.ownerName}
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell
                            sx={{
                              padding: "8px 14px",

                              borderBottom:
                                "1px solid rgba(61,87,135,0.45)",
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
                              {user.email || "-"}
                            </Typography>
                          </TableCell>

                          <TableCell
                            sx={{
                              padding: "8px 14px",

                              borderBottom:
                                "1px solid rgba(61,87,135,0.45)",
                            }}
                          >
                            <Box
                              sx={{
                                width: "fit-content",

                                minWidth: "62px",

                                padding: "3px 10px",

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
                                  fontSize: "12px",
                                }}
                              >
                                {user.role || "User"}
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell
                            sx={{
                              padding: "8px 14px",

                              borderBottom:
                                "1px solid rgba(61,87,135,0.45)",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",

                                gap: "7px",
                              }}
                            >
                              <Box
                                sx={{
                                  width: "8px",
                                  height: "8px",

                                  borderRadius: "50%",

                                  backgroundColor:
                                    user.status ===
                                    "Inactive"
                                      ? "#ff5050"
                                      : colors.green[400],
                                }}
                              />

                              <Typography
                                sx={{
                                  color:
                                    user.status ===
                                    "Inactive"
                                      ? "#ff6262"
                                      : colors.green[300],

                                  fontSize: "13px",
                                }}
                              >
                                {user.status ||
                                  "Active"}
                              </Typography>
                            </Box>
                          </TableCell>
                        </TableRow>
                      )
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <Box
              sx={{
                flexShrink: 0,

                padding: "10px 14px",

                borderTop:
                  "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <Typography
                sx={{
                  color: "#8ea0bd",
                  fontSize: "12px",
                }}
              >
                Showing {filteredUsers.length} of{" "}
                {users.length} users
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

export default Users;