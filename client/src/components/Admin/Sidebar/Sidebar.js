import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard,
  People,
  Business,
  Work,
  PostAdd,
} from "@mui/icons-material";

const Sidebar = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  const getIcon = (index) => {
    switch (index) {
      case 0:
        return <Dashboard />;
      case 1:
        return <People />;
      case 2:
        return <Business />;
      case 3:
        return <Work />;
      case 4:
        return <PostAdd />;
      default:
        return null;
    }
  };

  return (
    <>
      {isSmallScreen ? (
        <>
          <IconButton color="inherit" onClick={handleToggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={open} onClose={handleToggleDrawer}>
            <div
              role="presentation"
              onClick={handleToggleDrawer}
              onKeyDown={handleToggleDrawer}
            >
              <List>
                {[
                  { text: "DASHBOARD", route: "/admin/dashboard" },
                  { text: "USER", route: "/admin/user" },
                  { text: "ORGANISATION", route: "/admin/organisation" },
                  { text: "JOBS", route: "/admin/jobs" },
                  { text: "POSTS", route: "/admin/posts" },
                ].map((item, index) => (
                  <ListItem
                    button
                    component={Link}
                    to={item.route}
                    key={item.text}
                  >
                    <ListItemIcon>{getIcon(index)}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </List>
            </div>
          </Drawer>
        </>
      ) : (
        <Box
          sx={{
            marginLeft: "2rem",
            width: "15rem",
            border: "0.5px solid #ff6e14",
            marginTop: "6rem",
            padding: "20px",
            height: "20rem",
            borderRadius: "10px",
            position:'fixed'
          }}
        >
          <List>
            {["DASHBOARD", "USER", "ORGANISATION", "JOBS", "POSTS"].map(
              (text, index) => (
                <ListItem
                  button
                  component={Link}
                  to={`/admin/${text.toLowerCase()}`}
                  key={text}
                >
                  <ListItemIcon>{getIcon(index)}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              )
            )}
          </List>
        </Box>
      )}
    </>
  );
};

export default Sidebar;
