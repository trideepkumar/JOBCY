import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import { Search ,Menu as MenuIcon} from "@mui/icons-material";

function Navbar() {
  const handleMenuOpen = () => {
    console.log("open");
  };

  const AdminLoggedIn = localStorage.getItem("admin");

  return (
    <div>
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
          {/* Logo or Title */}
          <Typography
            sx={{ color: "black", fontFamily: "fantasy", fontSize: "2rem" }}
          >
            JOBCY ADMIN
          </Typography>

          {AdminLoggedIn && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <TextField
                id="search-bar"
                variant="outlined"
                size="small"
                placeholder="Search"
                sx={{ width: "20rem", marginRight: "2rem" }}
                InputProps={{
                  endAdornment: (
                    <IconButton color="inherit" edge="end">
                      <Search />
                    </IconButton>
                  ),
                }}
              />
            </Box>
          )}

          {/* Hamburger Menu */}
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleMenuOpen}
              style={{ color: "#ff6e14" }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
