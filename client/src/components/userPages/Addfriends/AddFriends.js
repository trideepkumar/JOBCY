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
import Organisations from "./Organisation";
import Jobapplied from "./Jobapplied";
import Chats from "./Chats";
import { useNavigate } from "react-router";


function AddFriends() {
  const authState = useSelector((state) => {
    return state.auth.authState;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [users, setUsers] = useState([]);
  const [activeButton, setActiveButton] = useState("explore");
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [organizations, setOrganizations] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get(`/getAllusers/${authState._id}`);
      setUsers(response.data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const fetchOrganisations = async () => {
    try {
      const response = await axiosInstance.get("/getAllorganisations");
      setOrganizations(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonClick = (Btn) => {
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
      const requested = response.data.sender;
      localStorage.setItem("user", JSON.stringify(requested));
      dispatch(setAuth());
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollow = async (orgId) => {
    const endpoint = `/orgFollow/${authState._id}`;
    const response = await axiosInstance.post(endpoint, { orgId });
    const newUser = response.data.user;
    localStorage.setItem("user", JSON.stringify(newUser));
    dispatch(setAuth());
    fetchOrganisations()
  };

  useEffect(() => {
    fetchUsers();
    fetchOrganisations();
  }, []);

  return (
    <div>
      <Appbar />

      <Grid container spacing={2}>
        {/* left */}
        <Grid
          item
          lg={3}
          sm={12}
          sx={{ width: "22rem", color: "grey", position: "fixed" }}
          className="menu"
        >
          <CardContent>
          <Grid >
            <List
              style={{
                background: "white",
                marginTop: "5rem",
                marginLeft: "3rem",
                color: "grey",
              }}
              className="list"
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
              
              <ListItem>
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
                  onClick={() => navigate('/chats')}
                  startIcon={<Chat />}
                  sx={{ color: "grey" }}
                  fullWidth
                >
                  Chat
                </Button>
              </ListItem>
            </List>
            </Grid>
          </CardContent>
        </Grid>
        {/* right */}

        <Grid
          className="exploreGrid"
          sx={{
            marginTop: "7rem",
            width: "70%",
            background: "white",
            paddingTop: "20px",
            paddingLeft: "20px",
            marginLeft: "23rem",
            paddingBottom: "10px",
          }}
        >
          {activeButton === "explore" && (
            // Friend list
            <Box
              item
              lg={9}
              sx={{
                display: "flex",
                gap: "0px",
                flexWrap: "wrap",
                position: "relative",
              }}
            >
              <Typography
                variant="subtitle1"
                color="primary"
                onClick={() => setShowAllUsers(!showAllUsers)}
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  top: 0,
                  right: 0,
                  marginRight: "20px",
                  marginTop: "-20px",
                }}
              >
                {showAllUsers ? "Go Back." : "See More..."}
              </Typography>
              {users.slice(0, showAllUsers ? users.length : 5).map((user) => (
                <Card
                  key={user._id}
                  className="left-card"
                  style={{
                    width: "18%",
                    height: "18rem",
                    margin: "5px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      paddingTop: "20px",
                      backgroundImage: `url(${user.backgroundPic})`,
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
                    {authState.friendRequestsent.includes(user._id) ? (
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

      {/* organisations */}
      <Grid
        sx={{
          marginTop: "1rem",
          width: "70%",
          background: "white",
          paddingTop: "20px",
          paddingLeft: "22px",
          marginLeft: "22rem",
        }}
        className="orgn"
      >
        <Typography variant="h6" textAlign={"left"} fontFamily={"fantasy"}>Organisations....</Typography>
        <Box
          item
          lg={9}
          sx={{
            display: "flex",
            gap: "0px",
            flexWrap: "wrap",
            position: "relative",
          }}
        >
          {/* ... */}
          
          {organizations.map((organization) => (
            <Card
              key={organization._id}
              className="left-card"
              style={{
                width: "18%",
                height: "18rem",
                margin: "5px",
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
                  src={organization.profPic}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "4px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {organization.orgName}
                </Typography>
                <Typography gutterBottom variant="subtitle2" component="div">
                  {organization.category}
                </Typography>
              </CardContent>
              <CardActions
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {organization.followers.includes(authState._id) ? (
                  <Button
                  size="small"
                  style={{
                    border: "0.5px solid black",
                    marginTop: "10px",
                    width: "100%",
                    color: "grey  ",
                    borderRadius: "12px",
                    backgroundColor: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  disabled
                >
                  Following <span style={{ marginLeft: "5px"  }}>&#10003;</span>
                </Button>
                
                ) : (
                  <Button
                    size="small"
                    style={{
                      border: "0.5px solid #0C64C2",
                      marginTop: "10px",
                      width: "100%",
                      color: "#0C64C2 ",
                      borderRadius: "12px",
                    }}
                    onClick={() => handleFollow(organization._id)}
                  >
                    Follow
                  </Button>
                )}
              </CardActions>
            </Card>
          ))}
        </Box>
      </Grid>
    </div>
  );
}

export default AddFriends;
