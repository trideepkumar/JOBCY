import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import axiosInstance from "../../../api/axiosinstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UserCard.css";

export default function UserCard() {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      let endpoint = "/admin/users";
      const response = await axiosInstance.get(endpoint);
      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBlock = async (userId) => {
    const response = await axiosInstance.patch("/admin/blockuser", { userId });
    toast.success("User blocked successfully", {
      className: "toast-success",
      bodyClassName: "toast-body",
      progressClassName: "toast-progress",
    });
    fetchData();
  };

  const handleUnblock = async (userId) => {
    const response = await axiosInstance.patch("/admin/unblockuser", {
      userId,
    });
    toast.success("User Unblocked successfully");
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        marginTop: "5rem",
        width: "55rem",
        position: "relative",
        overflow: { xs: "auto", sm: "initial" },
      }}
    >
      <ToastContainer />

      {users.map((user, index) => (
        <Card
          key={user._id}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            p: 2,
            height: "7rem",
            paddingLeft: "0px",
            marginLeft: "20rem",
            width: "60vw",
            marginBottom: "10px",
          }}
        >
          <img
            src={user.profPic}
            alt="User Avatar"
            style={{ width: "13rem", objectFit: "cover" }}
          />
          <CardContent>
            <Box>
              <Typography variant="h5" fontWeight="bold">
                {user.name}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                fontWeight="bold"
              >
                {user.designation}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "2rem" }}>
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" fontWeight="bold">
                  Total Friends
                </Typography>
                <Typography variant="body1">{user.friendCount}</Typography>
              </Box>
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" fontWeight="bold">
                  Organisation Following
                </Typography>
                <Typography variant="body1">
                  {user.orgFollowingCount}
                </Typography>
              </Box>
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" fontWeight="bold" color="red">
                  Total Reports
                </Typography>
                <Typography variant="body1" color="red">
                  8
                </Typography>
              </Box>
            </Box>
          </CardContent>
          <Box sx={{ mt: 2, ml: 10, gap: "3rem" }}>
            {user.isVerified ? (
              <Button
                variant="outlined"
                sx={{
                  ml: 1,
                  color: "red",
                  background: "white",
                  border: "0.1px solid red",
                }}
                onClick={() => {
                  handleBlock(user._id);
                }}
              >
                Block
              </Button>
            ) : (
              <Button
                variant="outlined"
                sx={{
                  ml: 1,
                  color: "green",
                  background: "white",
                  border: "0.1px solid green",
                }}
                onClick={() => {
                  handleUnblock(user._id);
                }}
              >
                Unblock
              </Button>
            )}
          </Box>
        </Card>
      ))}
    </Box>
  );
}
