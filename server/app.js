const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const user_router = require("./routes/user_route");
const organisation_router = require("./routes/organisation_router");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const authRoutes = require("./routes/auth/userAuth");
const adminRoutes = require("./routes/admin_router");
const chatRoutes = require("./routes/chat_routes");
const messageRoutes = require("./routes/message_route");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
  allowedHeaders: ["Content-Type", "Authorization", "Accept", "x-access-token"],
};

require("dotenv").config();
const app = express();
const server = http.createServer(app);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Place cors middleware here
const cors = require("cors");
const { connect } = require("http2");

app.use(cors(corsOptions))

app.use(express.json());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      // Strategy callback implementation
    }
  )
);

app.use("/", user_router);
app.use("/organisation", organisation_router);
app.use("/chats", chatRoutes);
app.use("/messages", messageRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    server.listen(process.env.PORT);
    console.log("mongoose connected successfully!");
  })
  .catch((err) => {
    console.log(err);
  });








//socket io

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://jobcy-pil9iwbyi-trideepkumar.vercel.app/",
  },
});

io.on("connection", (socket) => {
 
  
  //for getting the userid
  
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connecting");
  });

  //for creating room
  socket.on("join room", (room) => {
    socket.join(room);    
  });

  //for typing

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  //for messages
  socket.on("new message", (newMessageRecieved) => {
    let chat = newMessageRecieved.chat;


    if (!chat.users) return console.log("usernot defined");

    chat.users.forEach((user) => {
      if (user._id === newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup",()=>{
    socket.leave(userData._id)
  })

  //for video call 
  
  socket.on("video call", async(room,videolink) => {
    socket.to(room).emit("video call link", videolink);
  })

  
  socket.on("video_call_initiation", (oppositeUserId,room) => {
   socket.to(room).emit("video_call_notification",oppositeUserId)
  });

});
