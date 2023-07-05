  const mongoose = require("mongoose");

  const Schema = mongoose.Schema;

  const MAX_JOB_TITLES_COUNT = 5; 

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
    backgroundPic: {
      type: String,
      default: "",
    },
    profPic: {
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
    jobtitles: [{
      jobtitle:String
    }],
    skills: [{
      skill:String
  }],
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
    resume:{
      type: String,
      default: "",
    },
    friends: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    friendRequestsent: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    friendRequestrecieved: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    orgFollowing:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization'
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });


  userSchema.path("jobtitles").validate(function (jobtitles) {
    return jobtitles && jobtitles.length <= MAX_JOB_TITLES_COUNT;
  }, `Job titles array can have a maximum of ${MAX_JOB_TITLES_COUNT} items.`);


  module.exports = mongoose.model("User", userSchema);
