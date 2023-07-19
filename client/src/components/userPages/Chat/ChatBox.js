import React, { useEffect, useRef, useState } from "react";
import {
  Grid,
  Avatar,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  IconButton,
} from "@mui/material";
import { useSelector } from "react-redux";
import axiosInstance from "../../../api/axiosinstance";
import SendIcon from "@mui/icons-material/Send";
import "./chatStyles.css";

function ChatBox({ oppstId }) {
  const { authState } = useSelector((state) => {
    return state.auth;
  });

  const chatMessagesRef = useRef(null);

  const [oppositeUser, setOppositeUser] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState("");

  const userId = authState._id;

  const fetchChats = async (oppstId, userId) => {
    try {
      const { data } = await axiosInstance.get("/chats/userchat", {
        params: {
          oppstId: oppstId,
          userId: userId,
        },
      });
      const chat = data[0]._id;
      setChatId(chat);
      console.log(chatId);
      setOppositeUser(data[0].users.find((user) => user._id === oppstId));
    } catch (error) {
      console.error("Error fetching chat", error);
    }
  };

  const typingHandler = (e) => {
    const value = e.target.value;
    setNewMessage(value);
  };

  const handleSendMessage = async () => {
    try {
      const response = await axiosInstance.post("/messages", {
        data: {
          content: newMessage,
          userId: authState._id,
          chatId: chatId,
        },
      });
      console.log(response);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMessages = async () => {
    try {
      const endpoint = `/messages/${chatId}`;
      const response = await axiosInstance.get(endpoint);
      console.log(response);
      // Set the messages state with the response data
      if (response.status === 200) {
        setMessages(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchChats(oppstId, userId);
  }, [oppstId]);

  useEffect(() => {
    fetchMessages();
    console.log("selectedChatCompare  " + chatId);
  }, [chatId]);

  useEffect(() => {
    chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
  }, [messages]);

  return (
    <div>
      <Grid>
        <Box position="relative">
          <Box
            sx={{
              display: "flex",
              padding: "8px",
              borderBottom: "0.5px solid grey",
            }}
          >
            <Avatar src={oppositeUser.profPic} alt={oppositeUser.name} />
            <Box
              sx={{ display: "grid", paddingLeft: "10px", paddingTop: "5px" }}
            >
              <Typography textAlign={"left"}>{oppositeUser.name}</Typography>
            </Box>
          </Box>

          <Box
            sx={{
              overflowY: "auto",
              maxHeight: "575px",
              "&::-webkit-scrollbar": {
                width: "0.4em",
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "transparent",
              },
            }}
            ref={chatMessagesRef}
          >
            {" "}
            {messages.map((message) => (
              <div
                className={`${
                  message.sender && message.sender._id === authState._id
                    ? "right"
                    : "left"
                }`}
              >
                <Typography
                  key={message._id}
                  className={`${
                    message.sender._id === authState._id
                      ? "contentright"
                      : "contentleft"
                  }`}
                >
                  {message.content}
                </Typography>
              </div>
            ))}
          </Box>

          <Box
            sx={{
              position: "fixed",
              bottom: "0",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FormControl
              // onKeyDown={handleSendMessage}
              isRequired
              sx={{ position: "sticky", bottom: 0 }}
            >
              <TextField
                sx={{
                  width: "48vw",
                  border: "1px solid #ff6e14",
                  margin: "10px",
                  borderRadius: "10px",
                }}
                value={newMessage}
                onChange={typingHandler}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
            </FormControl>
            <Box sx={{ background: "#ff6e14", borderRadius: "5px" }}>
              <IconButton onClick={handleSendMessage}>
                <SendIcon sx={{ color: "white" }} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Grid>
    </div>
  );
}

export default ChatBox;
