import React, { useEffect, useRef, useState } from "react";
import {
  Grid,
  Avatar,
  Box,
  Typography,
  TextField,
  FormControl,
  IconButton,
} from "@mui/material";
import { useSelector } from "react-redux";
import axiosInstance from "../../../api/axiosinstance";
import SendIcon from "@mui/icons-material/Send";
import "./chatStyles.css";
import io from "socket.io-client";
import Lottie from "react-lottie";
import animationData from "../../../animations/typing.json";
import { VideoCall as VideoCallIcon } from "@mui/icons-material";
import VideoCall from "./VideoCall";
import Modal from "react-modal";
// import { showVideoCallNotification } from "../../../Helpers/VideoCallNotification";
import VideoCallNotification from "../../../Helpers/VideoCallNotification";


const ENDPOINT = "http://jobcybackend.thecowboy.shop";
let socket, selectedChatCompare;

function ChatBox({ oppstId }) {
  const { authState } = useSelector((state) => {
    return state.auth;
  });

  const modalStyles = {
    content: {
      width: "70%",
      height: "70%",
      margin: "auto",
    },
  };

  const chatMessagesRef = useRef(null);

  const [oppositeUser, setOppositeUser] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showIncomingCallNotification, setShowIncomingCallNotification] = useState(false);


  const userId = authState._id;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    renderSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", authState);
    socket.on("connecting", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

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
      setOppositeUser(data[0].users.find((user) => user._id === oppstId));
    } catch (error) {
      console.error("Error fetching chat", error);
    }
  };

  const typingHandler = (e) => {
    const value = e.target.value;
    setNewMessage(value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", chatId);
    }

    let lastTypingTime = new Date().getTime();
    let timerLength = 1000;

    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", chatId);
        setTyping(false);
      }
    }, timerLength);
  };

  const handleSendMessage = async () => {
    try {
      socket.emit("stop typing", chatId);
      const { data } = await axiosInstance.post("/messages", {
        data: {
          content: newMessage,
          userId: authState._id,
          chatId: chatId,
        },
      });
      socket.emit("new message", data);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMessages = async () => {
    try {
      const endpoint = `/messages/${chatId}`;
      const response = await axiosInstance.get(endpoint);
      // Set the messages state with the response data
      if (response.status === 200) {
        setMessages(response.data);
        socket.emit("join room", chatId);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleVideocall = async () => {
    setModalIsOpen(true);
    setShowVideoCall(true);
   

    if (authState._id !== oppositeUser._id) {
      socket.emit("video_call_initiation", oppositeUser._id,chatId);
    }
    
  };

  useEffect(() => {
    fetchChats(oppstId, userId);
  }, [oppstId]);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = chatId;
  }, [chatId]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare !== newMessageRecieved.chat._id
      ) {
        //give notification
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  useEffect(() => {
    // Check if chatMessagesRef is valid before accessing scrollHeight
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    socket.on("video_call_notification", (oppositeUserId) => {
      setShowIncomingCallNotification(true); 
    });
  
    // Rest of the code
  }, []);

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  if (messages.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          color="black"
          fontFamily={"fantasy"}
        >
          Tap users to chat
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        style={modalStyles}
      >
        {showVideoCall && <VideoCall chatId={chatId} />}
      </Modal>
     

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
              {isTyping ? (
                <div style={{ color: "#ff6e14" }}>Typing...</div>
              ) : (
                <></>
              )}
            </Box>
            {/* Add the VideoCallIcon to the right side */}
            <Box
              sx={{
                marginLeft: "auto",
                marginRight: "10px",
                paddingTop: "5px",
                color: "#ff6e14",
                cursor: "pointer",
              }}
            >
                    {showIncomingCallNotification && <VideoCallNotification callerName={oppositeUser.name}  />}

              <VideoCallIcon onClick={handleVideocall} />
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
            {isTyping ? (
              <div style={{ color: "#ff6e14" }}>
                <Lottie
                  options={defaultOptions}
                  width={100}
                  style={{ marginBottom: 15, marginLeft: 0 }}
                />
              </div>
            ) : (
              <></>
            )}
          </Box>

          <Box
            sx={{
              position: "fixed",
              bottom: "0",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FormControl isRequired sx={{ position: "sticky", bottom: 0 }}>
              <TextField
                sx={{
                  width: "49vw",
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
                InputProps={{
                  endAdornment: (
                    <Box sx={{ background: "#ff6e14", borderRadius: "5px" }}>
                      <IconButton onClick={handleSendMessage}>
                        <SendIcon sx={{ color: "white" }} />
                      </IconButton>
                    </Box>
                  ),
                }}
              />
            </FormControl>
          </Box>
        </Box>
      </Grid>
    </div>
  );
}

export default ChatBox;
