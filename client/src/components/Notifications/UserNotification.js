import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";

function UserNotification() {
  const authState = useSelector((state) => state.auth.authState);
  const [open, setOpen] = useState(false);
  const [userRequests, setUserRequests] = useState([]);

  useEffect(() => {
    setOpen(true);
    setUserRequests(authState.friendRequestrecieved || []);
  }, [authState.friendRequestrecieved]);

  const handleClose = () => {
    setOpen(false);
  };

  const getProfilePicture = (userId) => {
    return "https://example.com/profile-picture/" + userId;
  };

  const getUsername = (userId) => {
    return "User " + userId;
  };

  useEffect(()=>{
    console.log(userRequests)
  })

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          top: "20px",
          left: "20px",
        }}
      >
        <Card sx={{ width: 500, p: 2, display: "flex", flexDirection: "row" }}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{ height: "1px" }}
          >
            {userRequests.map((userId) => (
              <Grid item key={userId}>
                <Avatar sx={{ mr: -3 }}>
                  <img src={getProfilePicture(userId)} alt="Profile" />
                </Avatar>
              </Grid>
            ))}
            {userRequests.map((userId) => (
              <Grid item key={userId}>
                <CardHeader
                  title={getUsername(userId)}
                  subheader="Subtitle"
                  disableTypography
                />
              </Grid>
            ))}
          </Grid>
          <CardActions style={{ marginLeft: "auto" }}>
            <Button
              variant="contained"
              style={{
                color: "black",
                border: "0.5px solid green",
                color: "#ff6e14",
                background: "white",
                height: "1.5rem",
              }}
            >
              Accept
            </Button>
            <Button
              variant="contained"
              style={{
                color: "black",
                backgroundColor: "white",
                color: "red",
                border: "0.5px solid red",
                height: "1.5rem",
              }}
            >
              Decline
            </Button>
          </CardActions>
        </Card>
      </Modal>
    </div>
  );
}

export default UserNotification;
