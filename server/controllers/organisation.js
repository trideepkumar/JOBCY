const bcrypt = require("bcrypt");
const crypto = require("crypto");
const Organization = require("../model/organisation");
const Token = require("../model/Token");
const sendVerificationEmail = require("../utils/mailVerify");
const jwt = require("jsonwebtoken");
const Jobs = require("../model/jobs");
const sendJobMail = require("../utils/jobMail")
const User = require('../model/user')

const signup = async (req, res) => {
  try {
    const {
      orgName,
      email,
      category,
      place,
      registrationNumber,
      password,
      numberOfEmployees,
    } = req.body;

    const existingOrganisation = await Organization.findOne({ email });

    if (existingOrganisation) {
      return res.json({
        message: "Organisation with email already exists.",
        success: false,
      });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new organization instance
    const newOrganization = new Organization({
      orgName,
      email,
      category,
      place,
      registrationNumber,
      password: hashedPassword,
      numberOfEmployees,
      isVerified: false,
    });

    // Save the organization to the database
    await newOrganization.save();

    // Generate a token for email verification
    const token = new Token({
      organizationId: newOrganization._id,
      userId: newOrganization._id,
      token: crypto.randomBytes(16).toString("hex"),
    });

    // Save the token to the database
    await token.save();

    // Create the verification URL
    const verificationUrl = `${req.protocol}://${req.get("host")}/verify/${
      token.token
    }`;

    // Send the verification email
    await sendVerificationEmail(email, verificationUrl);

    // Return the success response
    res.status(200).json({
      message: "Signup successful",
      success: true,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({
      message: "An error occurred during signup.",
      success: false,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  let existingOrganisation;

  try {
    existingOrganisation = await Organization.findOne({ email: email });
  } catch (err) {
    console.log(err);
  }
  if (!existingOrganisation) {
    return res
      .status(400)
      .json({ message: "user not registered! SignUp please!", success: false });
  }
  const isPasswordCorrect = bcrypt.compareSync(
    password,
    existingOrganisation.password
  );
  if (!isPasswordCorrect) {
    return res
      .status(400)
      .json({ message: "Invalid password!!", success: false });
  }
  if (!existingOrganisation.isVerified) {
    return res
      .status(400)
      .json({ message: "Verify Your Existing account!", success: false });
  }
  if (existingOrganisation && existingOrganisation.isVerified) {
    const token = jwt.sign(
      { id: existingOrganisation._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.status(200).cookie("token", token, options).json({
      success: true,
      organisation: existingOrganisation,
      token: token,
    });
  }
};

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(404).json({ message: "No authorization header found" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Invalid token found!" });
    }
    req.id = user.id;
    next();
  });
};

const verifyEmail = async (req, res) => {
  try {
    const token = await Token.findOne({ token: req.params.token });
    await User.updateOne({ _id: token.userId }, { $set: { isVerified: true } });
    await Token.findByIdAndRemove(token._id);
    res.redirect("http://localhost:3001/login");
    // res.json({ message: "email verification successfull", success: true });
  } catch (err) {
    res.status(400).send("error Occured");
  }
};

const getOrganisation = async (req, res) => {
  const orgId = req.params;
  let organization;
  try {
    organization = await Organization.findById(orgId);
  } catch (err) {
    return res.status(500).json({ error: "An error occurred" });
  }
  if (!organization) {
    return res.status(404).json({ message: "Organization not found" });
  }
  return res.status(200).json({ organization });
};

const jobposts = async (req, res) => {
  try {
    const {
      orgName,
      jobTitle,
      jobType,
      category,
      qualification,
      location,
      salaryMin,
      salaryMax,
      hiringProcess,
      jobDescription,
    } = req.body;
   
    const organization = await Organization.findById(req.params._id);

    if (!organization) {
      return res.status(404).json({ error: "Organization not found" });
    }


    // Create a new job document
    const newJob = new Jobs({
      orgName,
      jobTitle,
      jobType,
      qualification,
      location,
      category,
      salaryMin,
      salaryMax,
      hiringProcess,
      jobDescription,
      appliedCandidates: [],
      organization: organization._id,
    });

    await newJob.save();

    res
      .status(200)
      .json({ organization: organization, newJob: newJob, success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getJobsByOrganization = async (req, res) => {
  const orgName = req.params.orgName;
  try {
    const jobs = await Jobs.find({ orgName: orgName });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

const updateName = async (req, res) => {
  try {
    const { name, category, employees, place,about } = req.body;
    
    const organization = await Organization.findById(req.params._id);

    if (!organization) {
      return res.status(404).json({ error: "Organization not found" });
    }

    if (name) {
      organization.orgName = name;
    }

    if (category) {
      organization.category = category;
    }

    if (employees) {
      organization.numberOfEmployees = employees;
    }

    if (place) {
      organization.place = place;
    }

    if(about){
      organization.about = about
    }

    await organization.save();

    res
      .status(200)
      .json({ message: "Organization updated successfully", organization });
  } catch (error) {
    console.error("Error updating organization:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const updatePic = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(500).json({ error: "Image is required" });
    }
    const path = req.file.path.slice(7);
    const filepath = `http://localhost:${process.env.PORT}/${path}`;

    await Organization.findOneAndUpdate(
      { _id: req.params._id },
      { $set: { profPic: filepath } }
    );

    res.json({ success: true, url: filepath });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

const getAppliedCandidates = async (req, res) => {
   
  const jobId = req.query.jobId;
  try {
    const job = await Jobs.findById(jobId).populate('appliedCandidates');
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    const Applied = job.appliedCandidates
    return res.status(200).json(Applied);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }

};

const sentEmail = async(req,res)=>{
  const { subject, body, email, userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userEmail = user.email; 

    try {

      const info = await sendJobMail(email,userEmail,subject,body); 


      res.json({ message: 'Email sent successfully' }).status(200);
    } catch (error) {
      res.status(500).json({ message: 'Error sending email' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user' });
  }
  
}

const getJob = async (req, res) => {

  try {

    const { jobId } = req.query;

    if (!jobId) {
      return res.status(400).json({ error: 'Invalid jobId' });
    }

    const job = await Jobs.findById(jobId);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    return res.status(200).json(job);
  } catch (error) {
    console.error('Error fetching job:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

const updateJob = async (req, res) => {
  try {
    const jobId = req.body.jobId;
    const { jobTitle, jobType, qualification, location, salaryMin, salaryMax, hiringProcess, jobDescription } = req.body.job;

    const updatedJobData = {
      jobTitle,
      jobType,
      qualification,
      location,
      salaryMin,
      salaryMax,
      hiringProcess,
      jobDescription
    };


    const updatedJob = await Jobs.findByIdAndUpdate(jobId, updatedJobData, { new: true });

    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    return res.status(200).json(updatedJob);
  } catch (error) {
    console.error('Error updating job:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteJob = async (req, res) => {
  const { jobId } = req.body;

  try {
    const updatingJob = await Jobs.findByIdAndUpdate(
      jobId,
      { isDeleted: true },
      { new: true }
    );

    if (!updatingJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    

    return res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};




module.exports = {
  signup,
  login,
  verifyToken,
  verifyEmail,
  jobposts,
  getJobsByOrganization,
  updateName,
  updatePic,
  getOrganisation,
  getAppliedCandidates,
  sentEmail,
  getJob,
  updateJob,
  deleteJob
};
