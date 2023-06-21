const mongoose = require('mongoose');
const user = require('./user');

const organizationSchema = new mongoose.Schema({
    orgName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  place: {
    type: String,
    required: true,
    trim: true,
  },
  registrationNumber: {
    type: String,
    required: true,
    trim: true,
  },
  password:{
    type:String,
    required:true,
    minlength: 6
  },
  numberOfEmployees: {
    type: Number,
    required: true,
  },
  isVerified:{
    type:Boolean,
    default:false
  },
  jobposts:[
    {
      jobTitle:String,
      jobType:String,
      qualification:String,
      location:String,
      salaryMin:Number,
      salaryMax:Number,
      hiringProcess:String,
      jobDescription:String,
      appliedCandidates:[
        {
          type:mongoose.Schema.Types.ObjectId,
          ref:user
        }
      ],
      
    }
  ]
});

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;
