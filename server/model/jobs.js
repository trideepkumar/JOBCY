const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    orgName: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salaryMin: {
      type: Number,
      required: true,
    },
    salaryMax: {
      type: Number,
      required: true,
    },
    hiringProcess: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    appliedCandidates: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
    isDeleted:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
