import React, { useEffect, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import axiosInstance from "../../../api/axiosinstance";
import { useSelector } from "react-redux";
import ChatBox from "./ChatBox";

function FriendsList({handleClickEvent}) {
  const authState = useSelector((state) => {
    return state.auth.authState;
  });

  const [friends, setFriends] = useState([]);
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axiosInstance.get("/friends", {
          params: {
            _id: authState._id,
          },
        });
        console.log(response.data.friends);
        setFriends(response.data.friends);
      } catch (error) {
        console.error("Error fetching friends list", error);
      }
    };

    fetchFriends();
  }, []);

  const handleChat = async (id) => {
    try {
      console.log(id);
      const response = await axiosInstance.post("/chats", {
        data: {
          userId: authState._id,
          oppsteId: id,
        },
      });

      console.log(response);

      // Set the selected user
      const selected = friends.find((friend) => friend._id === id);
      setSelectedUser(selected);
      handleClickEvent(id)
    } catch (err) {
      console.log(err);
      // res.status(400)
    }
  };

  return (
    <div>
      <Box
        sx={{
          textAlign: "left",
          borderBottom: "0.5px solid grey",
          padding: "10px 10px 18px 10px",
        }}
      >
        <Typography variant="subtitle1">messaging</Typography>
      </Box>

      {friends.map((friend) => (
        <div key={friend._id}>
          <Box
            sx={{
              display: "flex",
              margin: "0.5rem 0.5rem 0.5rem 0.5rem",
              border: "0.1px solid grey",
              padding: "0.5rem",
              borderRadius: "10px",
              cursor: "pointer",
              backgroundColor:
                selectedFriendId === friend._id ? "lightgrey" : "transparent",
            }}
            onClick={() => {
              handleChat(friend._id);
              setSelectedFriendId(friend._id);
            }}
          >
            <Avatar src={friend.profPic} alt={friend.name} />
            <Box sx={{ paddingLeft: "8px", color: selectedFriendId === friend._id ? "grey" : "black" }}>
              <Typography textAlign={"left"} fontWeight={"10px"}>
                {friend.name}
              </Typography>
            </Box>
          </Box>
        </div>
      ))}

    </div>
  );
}

export default FriendsList;
