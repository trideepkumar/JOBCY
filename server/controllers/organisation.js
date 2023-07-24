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
    console.log(existingOrganisation);

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

    console.log(newOrganization);
    console.log("here");
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
    console.log("loginworks");
    existingOrganisation = await Organization.findOne({ email: email });
    console.log(existingOrganisation);
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
    // console.log("jwt start")
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
  console.log("verification started");
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(404).json({ message: "No authorization header found" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log("error");
      return res.status(400).json({ message: "Invalid token found!" });
    }
    req.id = user.id;
    console.log(req.id);
    next();
  });
  console.log("end");
};

const verifyEmail = async (req, res) => {
  try {
    const token = await Token.findOne({ token: req.params.token });
    console.log(token);
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
  console.log("heloo")
  console.log(orgId)
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
  console.log("hi jobpostsss");
  try {
    const {
      orgName,
      jobTitle,
      jobType,
      qualification,
      location,
      salaryMin,
      salaryMax,
      hiringProcess,
      jobDescription,
    } = req.body;
    console.log(req.params._id);
    const organization = await Organization.findById(req.params._id);

    if (!organization) {
      return res.status(404).json({ error: "Organization not found" });
    }

    console.log(organization._id);

    // Create a new job document
    const newJob = new Jobs({
      orgName,
      jobTitle,
      jobType,
      qualification,
      location,
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
  console.log("hello");
  const orgName = req.params.orgName;
  console.log(orgName);
  try {
    const jobs = await Jobs.find({ orgName: orgName });
    console.log(jobs);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

const updateName = async (req, res) => {
  try {
    const { name, category, employees, place,about } = req.body;
    console.log("about")
    console.log(name, category, employees, place,about);
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
  console.log("org pic update");
  try {
    console.log("1");
    console.log(req.body);
    console.log(req.file);
    if (!req.file) {
      return res.status(500).json({ error: "Image is required" });
    }
    console.log("2");
    const path = req.file.path.slice(7);
    console.log(path);
    const filepath = `http://localhost:${process.env.PORT}/${path}`;
    console.log(filepath);

    await Organization.findOneAndUpdate(
      { _id: req.params._id },
      { $set: { profPic: filepath } }
    );

    console.log("Profile picture updated");
    res.json({ success: true, url: filepath });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const getAppliedCandidates = async (req, res) => {
   console.log("getAppliedCandidates")
   console.log(req.query.jobId)
  const jobId = req.query.jobId;
  try {
    const job = await Jobs.findById(jobId).populate('appliedCandidates');
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    console.log(job.appliedCandidates)
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

      console.log('Email sent:', info);

      res.json({ message: 'Email sent successfully' }).status(200);
    } catch (error) {
      console.log('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email' });
    }
  } catch (error) {
    console.log('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user' });
  }
  
}

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
  sentEmail
};
