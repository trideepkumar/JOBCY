const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: true
    },
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message'
    }
  },
  {
    timestamps: true
  }
);

const Chat = mongoose.model('Chat', ChatSchema); 

module.exports = Chat;
