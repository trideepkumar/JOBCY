const bcrypt = require("bcrypt");
const crypto = require("crypto");
const Organization = require("../model/organisation");
const Token = require("../model/Token");
const sendVerificationEmail = require("../utils/mailVerify");
const jwt = require("jsonwebtoken");
const Jobs = require('../model/jobs')


const signup = async (req, res) => {
  try {
    const { orgName, email, category, place, registrationNumber, password, numberOfEmployees } = req.body;
    
    const existingOrganisation =  await Organization.findOne({email})
    console.log(existingOrganisation)

    if(existingOrganisation){
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
    console.log("here")
 // Save the organization to the database
 await newOrganization.save();

 // Generate a token for email verification
 const token = new Token({
   organizationId: newOrganization._id,
   userId: newOrganization._id,
   token: crypto.randomBytes(16).toString('hex'),
 });

 // Save the token to the database
 await token.save();

 // Create the verification URL
 const verificationUrl = `${req.protocol}://${req.get('host')}/verify/${token.token}`;

 // Send the verification email
 await sendVerificationEmail(email, verificationUrl);

 // Return the success response
 res.status(200).json({
   message: 'Signup successful',
   success: true,
 });
} catch (error) {
 console.error('Error during signup:', error);
 res.status(500).json({
   message: 'An error occurred during signup.',
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
      .json({ message: "user not registered! SignUp please!" , success:false});
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingOrganisation.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid password!!" , success:false});
  }
  if (!existingOrganisation.isVerified) {
    return res.status(400).json({ message: "Verify Your Existing account!" ,success:false});
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
}

const verifyToken = async (req, res, next) => {
  console.log('verification started');
  const token = req.headers.authorization.split(" ")[1] ;
  console.log(token)
  if (!token) {
    return res.status(404).json({ message: "No authorization header found" });
  }
  
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log("error")
      return res.status(400).json({ message: "Invalid token found!" });
    }
    req.id = user.id;
    console.log(req.id)
    next();
  });
  console.log("end")
};


const verifyEmail = async (req, res) => {
  try {
    const token = await Token.findOne({ token: req.params.token });
    console.log(token);
    await User.updateOne({ _id: token.userId }, { $set: { isVerified: true } });
    await Token.findByIdAndRemove(token._id);
    res.redirect('http://localhost:3001/login');
    // res.json({ message: "email verification successfull", success: true });
  } catch (err) {
    res.status(400).send("error Occured");
  }
};

const jobposts = async (req, res) => {
  console.log("hi jobpostsss");
  try {
    const { orgName, jobTitle, jobType, qualification, location, salaryMin, salaryMax, hiringProcess, jobDescription } = req.body;
    console.log(req.params._id);
    const organization = await Organization.findById(req.params._id);

    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    console.log(organization._id)

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
      organization: organization._id
    });


    await newJob.save();

    res.status(200).json({ organization: organization, newJob: newJob, success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const jobsearch = async(req, res) => {
  console.log("jobSearch started")
  const { title } = req.query;

  try {
    const organisation = await Organization.find({_id: req.id});
    const jobs = organisation[0].jobposts.filter(item => item.jobTitle === title)    

    res.json({jobs:jobs,success:true});
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during the search.' });
  }
}


module.exports = {
  signup,
  login,
  verifyToken,
  verifyEmail,
  jobposts,
  jobsearch
};

