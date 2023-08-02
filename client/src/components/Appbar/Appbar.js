import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Stack,
  Typography,
  TextField,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import {
  AccountCircle,
  Group,
  Work,
  Chat,
  Notifications,
  Search,
  Business,
  WorkOutline,
  Home,
  Menu as MenuIcon,
  Logout,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import UserNotification from "../Notifications/UserNotification";
import Badge from "@mui/material/Badge";


const Navbar = () => {
  const authState = useSelector((state) => {
    return state.auth.authState;
  });

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const [profilePicture, setProfilePicture] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openNotify, setopenNotify] = useState(false);

  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("authorization.user");
  };

  useEffect(() => {
    if (authState && authState.profPic) {
      setProfilePicture(authState.profPic);
    }
  }, [authState]);

  const loggedIn = localStorage.getItem("user");

  const adminLoggedIn = localStorage.getItem("admin");

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  const handleNotify = () => {
    setopenNotify(true);
  };

  const handleCloseNotify = () => {
    setopenNotify(false);
  };

  if (!loggedIn) {
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
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{ color: "black", fontFamily: "fantasy", fontSize: "2rem" }}
          >
            JOBCY
          </Typography>
          <Stack direction="row" spacing={3}>
            <IconButton
              color="inherit"
              style={{ color: "#ff6e14" }}
              onClick={() => navigate("/organisation/login")}
            >
              <Business />
            </IconButton>
            <IconButton color="inherit" style={{ color: "#ff6e14" }}>
              <WorkOutline />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
    );
  } else if (loggedIn) {
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
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
         
          <Typography
            sx={{ color: "black", fontFamily: "fantasy", fontSize: "2rem" }}
          >
            JOBCY
          </Typography>
          <Box
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleMenuOpen}
              style={{ color: "#ff6e14" }}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
              PaperProps={{
                style: {
                  background: "transparent",
                  color: "#ff6e4",
                },
              }}
            >
              <MenuItem onClick={() => navigate("/posts")}>
                <Home />
                <Typography variant="inherit" sx={{ ml: 1 }}>
                  Home
                </Typography>
              </MenuItem>
              <MenuItem onClick={()=> navigate("/friends")}>
                <Group />
                <Typography variant="inherit" sx={{ ml: 1 }}>
                  Groups
                </Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate("/jobs")}>
                <Work />
                <Typography variant="inherit" sx={{ ml: 1 }}>
                  Jobs
                </Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate("/chats")}>
                <Chat />
                <Typography variant="inherit" sx={{ ml: 1 }}>
                  Chat
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Notifications />
                <Typography variant="inherit" sx={{ ml: 1 }}>
                  Notifications
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            <TextField
              id="search-bar"
              variant="outlined"
              size="small"
              placeholder="Search"
              sx={{ width: "20rem", marginRight: "35rem" }}
              InputProps={{
                endAdornment: (
                  <IconButton color="inherit" edge="end">
                    <Search />
                  </IconButton>
                ),
              }}
            />
            {/* Icons and Avatar on the right side */}
            <Stack direction="row" spacing={3}>
              <IconButton
                color="inherit"
                style={{ color: "#ff6e14" }}
                onClick={() => navigate("/posts")}
              >
                <Home />
              </IconButton>
              <IconButton
                color="inherit"
                style={{ color: "#ff6e14" }}
                onClick={() => navigate("/friends")}
              >
                <Group />
              </IconButton>
              <IconButton
                color="inherit"
                style={{ color: "#ff6e14" }}
                onClick={() => navigate("/jobs")}
              >
                <Work />
              </IconButton>
              <IconButton
                color="inherit"
                style={{ color: "#ff6e14" }}
                onClick={() => navigate("/chats")}
              >
                <Badge badgeContent={"1+"} color="warning">
                  <Chat />
                </Badge>
              </IconButton>

              <IconButton
                color="inherit"
                style={{ color: "#ff6e14" }}
                onClick={handleNotify}
              >
                <Notifications />
              </IconButton>
              {openNotify && <UserNotification onClose={handleCloseNotify} />}
              {profilePicture ? (
                <Avatar
                  src={profilePicture}
                  alt="Profile Picture"
                  onClick={handleMenuOpen}
                />
              ) : (
                <IconButton color="inherit" onClick={handleMenuOpen}>
                  <Avatar>
                    <AccountCircle />
                  </Avatar>
                </IconButton>
              )}

              {/* // Dropdown Menu */}
              <Menu
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
                PaperProps={{
                  style: {
                    background: "transparent",
                    color: "#ff6e4",
                  },
                }}
              >
                <MenuItem onClick={() => navigate("/posts")}>
                  <Home />
                  <Typography variant="inherit" sx={{ ml: 1 }}>
                    Home
                  </Typography>
                </MenuItem>
                <MenuItem  onClick={() => navigate("/friends")}>
                  <Group />
                  <Typography variant="inherit" sx={{ ml: 1 }}>
                    Groups
                  </Typography>
                </MenuItem>
                <MenuItem onClick={() => navigate("/jobs")}>
                  <Work />
                  <Typography variant="inherit" sx={{ ml: 1 }}>
                    Jobs
                  </Typography>
                </MenuItem>
                <MenuItem onClick={() => navigate("/chats")}>
                  <Chat />
                  <Typography variant="inherit" sx={{ ml: 1 }}>
                    Chat
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleNotify}>
                  <Badge badgeContent={"1+"} color="warning">
                    <Notifications />
                  </Badge>
                  <Typography variant="inherit" sx={{ ml: 1 }}>
                    Notifications
                  </Typography>
                </MenuItem>
                <MenuItem onClick={()=>{handleLogout()}} style={{ color: "red" }}>
                  <Logout />
                  <Typography variant="inherit" sx={{ ml: 1 }}>
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }
};

export default Navbar;
