import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  ListItemIcon,
} from "@mui/material";
import {
  AccountCircle,
  Home,
  Work,
  Help,
  ExitToApp,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const OrgBar = () => {
  const authState = useSelector((state) => {
    return state.organisationauth.authState;
  });

  const navigate = useNavigate();
  const [orgLog, setOrgLog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (authState !== null) {
      setOrgLog(true);
    }
  }, [authState]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/organisation/login')
    console.log("Logout clicked");
    handleMenuClose();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "#f3f2ee",
        boxShadow: "none",
        width: "100%",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            color: "black",
            fontFamily: "fantasy",
            fontSize: "2rem",
          }}
          textAlign={"left"}
        >
          JOBCY
        </Typography>
        {orgLog ? (
          <>
            <Box sx={{ marginRight: "16px" }}>
              <Typography
                variant="subtitle1"
                color="black"
                sx={{ fontFamily: "fantasy" }}
              >
                Hello {authState.orgName} !
              </Typography>
            </Box>
            <IconButton
              color="black"
              onClick={handleMenuOpen}
              sx={{ border: "0.5px solid black" }}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              PaperProps={{
                style: {
                  background: "transparent",
                  border: "0.3px solid grey",
                  marginTop: "3rem",
                  width: "10rem",
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  navigate("/organisation/dashboard");
                  handleMenuClose(); // Close the menu after navigation
                }}
              >
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                Home
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/organisation/jobposts");
                  handleMenuClose(); // Close the menu after navigation
                }}
              >
                <ListItemIcon>
                  <Work />
                </ListItemIcon>
                Post a Job
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/organisation/jobs");
                  handleMenuClose(); // Close the menu after navigation
                }}
              >
                <ListItemIcon>
                  <Work />
                </ListItemIcon>
                Jobs
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <Help />
                </ListItemIcon>
                Help
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <ExitToApp sx={{ color: "red" }} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <IconButton color="inherit" aria-label="user">
              <AccountCircle />
            </IconButton>
            <Typography variant="subtitle1">User login</Typography>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default OrgBar;
