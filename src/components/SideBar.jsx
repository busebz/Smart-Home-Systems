import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  useMediaQuery,
  Slide,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

import homepageicon from "../assets/homepage.png";
import build from "../assets/build.png";
import creditcard from "../assets/creditcard.png";
import user from "../assets/user.png";
import theme from "../theme.jsx";

function SideBar() {
  const colors = theme.palette;

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const sideBarRef = useRef(null);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const handleClickOutside = (event) => {
    if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
      setIsSideBarOpen(false);
    }
  };

  useEffect(() => {
    if (isSideBarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSideBarOpen]);

  return (
    <>
      {!isSmallScreen && (
        <Box
          sx={{
            width: "15%",
            height: "98.3vh",
            overflow: "hidden",
            borderRadius: "10px",
            margin: "5px 4px 5px",
            background: `linear-gradient(100deg,${colors.blue[900]},${colors.blue[700]})`,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              margin: "20px 0px 0px",
              borderBottom: `1px solid ${colors.gray[100]}`,
              paddingBottom: "10px",
              marginX: "auto",
            }}
          >
            V
          </Typography>
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              marginX: "auto",
            }}
          >
            <List>
              <ListItem
                component={Link}
                to="/"
                sx={{
                  "&:hover": {
                    backgroundColor: colors.gray[800],
                    borderRadius: "10px",
                  },
                }}
              >
                <img src={homepageicon} alt="Homepage icon" />
                <ListItemText>
                  <Typography variant="h4" sx={{ marginLeft: "8px" }}>
                    Dashboard
                  </Typography>
                </ListItemText>
              </ListItem>
              <ListItem
                component={Link}
                to="/"
                sx={{
                  "&:hover": {
                    backgroundColor: colors.gray[800],
                    borderRadius: "10px",
                  },
                }}
              >
                <img src={build} alt="Build icon" />
                <ListItemText>
                  <Typography variant="h4" sx={{ marginLeft: "8px" }}>
                    Bişi
                  </Typography>
                </ListItemText>
              </ListItem>
              <ListItem
                component={Link}
                to="/"
                sx={{
                  "&:hover": {
                    backgroundColor: colors.gray[800],
                    borderRadius: "10px",
                  },
                }}
              >
                <img src={creditcard} alt="Credit Card icon" />
                <ListItemText>
                  <Typography variant="h4" sx={{ marginLeft: "8px" }}>
                    Bişi
                  </Typography>
                </ListItemText>
              </ListItem>
              <ListItem
                component={Link}
                to="/"
                sx={{
                  "&:hover": {
                    backgroundColor: colors.gray[800],
                    borderRadius: "10px",
                  },
                }}
              >
                <img src={build} alt="Build icon" />
                <ListItemText>
                  <Typography variant="h4" sx={{ marginLeft: "8px" }}>
                    Bişi
                  </Typography>
                </ListItemText>
              </ListItem>

              <Typography
                variant="h6"
                sx={{
                  margin: "10px 15px 10px",
                }}
              >
                ACCOUNT PAGES
              </Typography>

              <ListItem
                component={Link}
                to="/"
                sx={{
                  "&:hover": {
                    backgroundColor: colors.gray[800],
                    borderRadius: "10px",
                  },
                }}
              >
                <img src={user} alt="User icon" />
                <ListItemText>
                  <Typography variant="h4" sx={{ marginLeft: "8px" }}>
                    Bişi
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>
          </Box>
        </Box>
      )}

      {isSmallScreen && (
        <>
          <Box
            sx={{ width: "0px", height: "5%", margin: "13px 0px 20px 30px" }}
          >
            <IconButton onClick={toggleSideBar}>
              <MenuIcon sx={{ color: "#848484" }} />
            </IconButton>
          </Box>
          {isSideBarOpen && (
            <Slide in={isSideBarOpen} direction="right" timeout={500}>
              <Box
                ref={sideBarRef}
                sx={{
                  width: "150px",
                  height: "98.3vh",
                  borderRadius: "10px",
                  margin: "5px 4px 5px",
                  background: `linear-gradient(100deg,${colors.blue[900]},${colors.blue[700]})`,
                  position: "fixed",
                  zIndex: 1,
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    textAlign: "center",
                    margin: "20px 0px 0px",
                    borderBottom: `1px solid ${colors.gray[100]}`,
                    paddingBottom: "10px",
                    marginX: "auto",
                  }}
                >
                  V
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    height: "100vh",
                    marginX: "auto",
                  }}
                >
                  <List>
                    <ListItem
                      component={Link}
                      to="/"
                      sx={{
                        "&:hover": {
                          backgroundColor: colors.gray[800],
                          borderRadius: "10px",
                        },
                      }}
                    >
                      <img src={homepageicon} alt="Homepage icon" />
                      <ListItemText>
                        <Typography
                          variant="h5"
                          sx={{ marginLeft: "8px", overflow: "hidden" }}
                        >
                          Dashboard
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem
                      component={Link}
                      to="/"
                      sx={{
                        "&:hover": {
                          backgroundColor: colors.gray[900],
                          borderRadius: "10px",
                        },
                      }}
                    >
                      <img src={build} alt="Homepage icon" />

                      <ListItemText>
                        <Typography variant="h5" sx={{ marginLeft: "8px" }}>
                          Bişi
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem
                      component={Link}
                      to="/"
                      sx={{
                        "&:hover": {
                          backgroundColor: colors.gray[900],
                          borderRadius: "10px",
                        },
                      }}
                    >
                      <img src={creditcard} alt="Homepage icon" />

                      <ListItemText>
                        <Typography variant="h5" sx={{ marginLeft: "8px" }}>
                          Bişi
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem
                      component={Link}
                      to="/"
                      sx={{
                        "&:hover": {
                          backgroundColor: colors.gray[900],
                          borderRadius: "10px",
                        },
                      }}
                    >
                      <img src={build} alt="Homepage icon" />
                      <ListItemText>
                        <Typography variant="h5" sx={{ marginLeft: "8px" }}>
                          Bişi
                        </Typography>
                      </ListItemText>
                    </ListItem>

                    <Typography
                      variant="h6"
                      sx={{
                        margin: "10px 15px 10px",
                      }}
                    >
                      ACCOUNT PAGES
                    </Typography>

                    <ListItem
                      component={Link}
                      to="/"
                      sx={{
                        "&:hover": {
                          backgroundColor: colors.gray[900],
                          borderRadius: "10px",
                        },
                      }}
                    >
                      <img src={user} alt="Homepage icon" />
                      <ListItemText>
                        <Typography variant="h5" sx={{ marginLeft: "8px" }}>
                          Bişi
                        </Typography>
                      </ListItemText>
                    </ListItem>
                  </List>
                </Box>
              </Box>
            </Slide>
          )}
        </>
      )}
    </>
  );
}

export default SideBar;
