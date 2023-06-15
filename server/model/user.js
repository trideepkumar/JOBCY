const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  backgroundimage: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  designation: {
    type: String,
    default: "",
  },
  about: {
    type: String,
    default: "",
  },
  skills: {
    type: Array,
    default: [],
  },
  experience: [
    {
      companyName: String,
      duration:String,
      title: String,
    },
  ],
  education: [
    {
      institutionName: String,
      qualification:String,
      aboutEdu:String
    },
  ],

  place: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
