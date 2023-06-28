import React, { useEffect, useState } from "react";
import Appbar from "../../Appbar/Appbar";
import { PersonAdd } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { People, Business, Work, Chat, Explore } from "@mui/icons-material";
import "./AddFriends.css";
import axiosInstance from "../../../api/axiosinstance";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../../app/features/auth/authSlice";
import Connection from "./Connection";
import Organisations from "./Organisations";
import Jobapplied from "./Jobapplied";
import Chats from "./Chats";

function AddFriends() {
  const authState = useSelector((state) => {
    return state.auth.authState;
  });

  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  const [activeButton, setActiveButton] = useState("explore");

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get(`/getAllusers/${authState._id}`);
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const handleButtonClick = (Btn) => {
    console.log(Btn);
    setActiveButton(Btn);
  };

  const renderComponent = () => {
    switch (activeButton) {
      case "connections":
        return <Connection />;
      case "organisations":
        return <Organisations />;
      case "jobapplied":
        return <Jobapplied />;
      case "chat":
        return <Chats />;
      default:
        return null;
    }
  };

  const handleRequest = async (userId) => {
    try {
      let endpoint = `friendRequest/${authState._id}`;
      const response = await axiosInstance.post(endpoint, { userId });
      const requested = response.data.receiver;
      localStorage.setItem("user", JSON.stringify(requested));
      dispatch(setAuth());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <Appbar />
      <Grid container spacing={2}>
        {/* left */}
        <Grid item lg={3} sx={{ width: "22rem", color: "grey" }}>
          <CardContent >
            <List
              style={{
                background: "white",
                marginTop: "5rem",
                marginLeft: "3rem",
                color: "grey",
              }}
              
            >
              <Typography
                textAlign="left"
                sx={{
                  paddingLeft: "20px",
                  marginBottom: "15px",
                  marginTop: "10px",
                  marginLeft: "10px",
                }}
                gutterBottom
              >
                Manage your friends
              </Typography>
              <Divider />
              <ListItem >
                <Button
                  onClick={() => handleButtonClick("explore")}
                  startIcon={<Explore />}
                  sx={{ color: "grey" }}
                  fullWidth
                >
                  Explore
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  onClick={() => handleButtonClick("connections")}
                  startIcon={<People />}
                  sx={{ color: "grey" }}
                  fullWidth
                >
                  Connections
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  onClick={() => handleButtonClick("organisations")}
                  startIcon={<Business />}
                  sx={{ color: "grey" }}
                  fullWidth
                >
                  Organizations
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  onClick={() => handleButtonClick("jobapplied")}
                  startIcon={<Work />}
                  sx={{ color: "grey" }}
                  fullWidth
                >
                  Job applied
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  onClick={() => handleButtonClick("chat")}
                  startIcon={<Chat />}
                  sx={{ color: "grey" }}
                  fullWidth
                >
                  Chat
                </Button>
              </ListItem>
            </List>
          </CardContent>
        </Grid>



        {/* right */}
        <Grid  className="exploreGrid" sx={{marginTop:'7rem',width:'70%',background:"white",paddingTop:"20px",paddingLeft:'20px'}}>
          {activeButton === "explore" && (
            <Box item lg={9} sx={{ display: "flex", gap: "0px" }}>
              {users.map((user) => (
                <Card
                  key={user._id}
                  className="left-card"
                  style={{
                    width: "19%",
                    height: "18rem",
                    margin:"5px"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      paddingTop: "20px",
                      backgroundImage: "",
                      backgroundSize: "cover",
                      background: "grey",
                    }}
                  >
                    <Avatar
                      className="avatar"
                      src={user.profPic}
                      style={{ width: 80, height: 80 }}
                    />
                  </div>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {user.name}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      component="div"
                    >
                      {user.designation}
                    </Typography>
                  </CardContent>

                  <CardActions
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {authState.friendRequests.includes(user._id) ? (
                      <Button
                        size="small"
                        style={{
                          border: "0.5px solid black",
                          marginTop: "10px",
                          width: "100%",
                          color: "gray",
                        }}
                        disabled
                      >
                        Pending
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        style={{
                          border: "0.5px solid black",
                          marginTop: "10px",
                          width: "100%",
                          color: "#ff6e14",
                        }}
                        startIcon={<PersonAdd />}
                        onClick={() => handleRequest(user._id)}
                      >
                        Connect
                      </Button>
                    )}
                  </CardActions>
                </Card>
              ))}
            </Box>
          )}
          {renderComponent()}
        </Grid>
      </Grid>
    </div>
  );
}

export default AddFriends;
