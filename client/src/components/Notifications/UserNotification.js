import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import axiosInstance from "../../api/axiosinstance";
import { Typography } from "@mui/material";
import NotifyToast from "../Notifications/NotifyToast";

function UserNotification() {
  const authState = useSelector((state) => state.auth.authState);

  const [open, setOpen] = useState(false);
  const [userRequests, setUserRequests] = useState([]);
  const [showToast, setShowToast] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const getUserRequests = async () => {
    try {
      const response = await axiosInstance.get("/getFriendRequests", {
        params: {
          _id: authState._id,
        },
      });
      const { data } = response;
      setUserRequests(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAccept = async (userId) => {
    try {
      const endpoint = `/acceptFriendRequest/${authState._id}`;
      const response = await axiosInstance.post(endpoint, { userId });
      if (response.status === 200) {
        setOpen(false);
        setShowToast(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDecline = async (userId) => {
    let endpoint = `/friendRequestDeny/${authState._id}`;
    const response = await axiosInstance.delete(endpoint, { data: { userId } });
    if (response.status === 200) {
      setOpen(false);
      setShowToast(true);
    }
  };

  useEffect(() => {
    setOpen(true);
    getUserRequests();
  }, []);

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
          marginRight: "10px",
        }}
      >
        <Card
          sx={{
            width: 450,
            p: 2,
            height: "100%",
            paddingLeft: "2.5rem",
          }}
        >
          <Typography
            sx={{ paddingBottom: "10px", color: "#ff6e14", fontSize: "1rem" }}
          >
            Friend Requests
          </Typography>
          {userRequests.length === 0 ? (
            <Typography sx={{ justifyContent: "center" }}>
              No notifications
            </Typography>
          ) : (
            <Grid
              container
              spacing={2}
              alignItems="center"
              sx={{ height: "1px" }}
            >
              {userRequests.map((user) => (
                <Grid item key={user._id} sx={{ display: "flex", gap: "2rem" }}>
                  <Avatar sx={{ mr: -3 }}>
                    <img
                      src={user.profPic}
                      alt="Profile"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Avatar>

                  <div>
                    <Typography>{user.name}</Typography>
                    <Typography sx={{ fontSize: "10px" }}>
                      {user.designation}
                    </Typography>
                  </div>

                  <CardActions>
                    <Button
                      variant="contained"
                      style={{
                        color: "green",
                        border: "0.5px solid green",
                        background: "white",
                        height: "1.5rem",
                      }}
                      onClick={() => handleAccept(user._id)}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="contained"
                      style={{
                        color: "red",
                        border: "0.5px solid red",
                        background: "white",
                        height: "1.5rem",
                      }}
                      onClick={() => handleDecline(user._id)}
                    >
                      Decline
                    </Button>
                  </CardActions>
                </Grid>
              ))}
            </Grid>
          )}
        </Card>
      </Modal>
        {showToast && <NotifyToast  />}
    </div>
  );
}

export default UserNotification;
