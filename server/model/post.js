const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
    },
    location: {
      type: String,
    },
    image: {
      type: String,
    },
    video:{
      type:String,
    },
    shared: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    likes: {
      type: Boolean,
      default: false,
    },
    likedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    reported: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Users",
    },
    reports:{
      type:Boolean
    }
   
  },
  { timestamps: true }
);

  module.exports = mongoose.model("Posts", postSchema);
