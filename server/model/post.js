const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    description: {
      type: String,
    },
    location: {
      type: String,
    },
    media: {
      type: String,
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
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Users",
    },
    reported: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Users",
    },
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Posts", postSchema);
