const User = require("../model/user");
const bcrypt = require("bcrypt");
const Token = require("../model/Token");
const jwt = require("jsonwebtoken");
const sendVerificationEmail = require("../utils/mailVerify");
const crypto = require("crypto");
const Organizations = require("../model/organisation");
const Jobs = require("../model/jobs");
const Post = require("../model/post");
const cloudinary = require('cloudinary').v2;

// const {cloudinary} = require('../middlewares/cloudinary')


cloudinary.config({
  cloud_name: "dbnrosh3i",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({
        message: "User with email already exists.",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
    });

    await newUser.save();

    // Generate a token for email verification
    const token = new Token({
      userId: newUser._id,
      token: crypto.randomBytes(16).toString("hex"),
    });

    await token.save();

    console.log(token);

    const verificationUrl = `${req.protocol}://${req.get("host")}/verify/${
      token.token
    }`;

    await sendVerificationEmail(email, verificationUrl);

    res.status(200).json({
      message: "Signup Successfull",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.json({ message: "An error occurred during signup.", success: false });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  let existingUser;

  try {
    console.log("loginworks");
    existingUser = await User.findOne({ email: email });
    // console.log(existingUser);
  } catch (err) {
    console.log(err);
  }
  if (!existingUser) {
    return res
      .status(400)
      .json({ message: "user not registered! SignUp please!", success: false });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res
      .status(400)
      .json({ message: "Invalid password!!", success: false });
  }
  if (!existingUser.isVerified) {
    return res
      .status(400)
      .json({ message: "Verify Your Existing account!", success: false });
  }
  if (existingUser && existingUser.isVerified) {
    // console.log("jwt start")
    const token = jwt.sign(
      { id: existingUser._id },
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
      user: existingUser,
      token: token,
    });
  }
};

const verifyToken = async (req, res, next) => {
  console.log("verification started");
  const token = req.headers.authorization;
  console.log(token);
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

  console.log("end");
};

const getUser = async (req, res) => {
  console.log("get user started!");
  console.log(req.params._id);
  const userId = req.params._id;
  console.log(userId);
  let user;
  try {
    user = await User.findById(userId, "-password");
    // console.log(user);
  } catch (err) {
    return new Error(err);
  }
  if (!user) {
    return res.status(404).json({ message: "user not found!" });
  }
  return res.status(200).json({ user });
};

// for email verification

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

const updateAbout = async (req, res) => {
  try {
    console.log("about update");
    const { name, designation, place, state, country, about } = req.body;
    console.log(name, designation, place, state, country, about);
    // Find the user by their ID
    console.log(req.params);
    const user = await User.findById(req.params._id);
    // Assuming you have authentication middleware to get the user ID from the request

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user's information
    user.name = name || user.name;
    user.designation = designation || user.designation;
    user.place = place || user.place;
    user.state = state || user.state;
    user.country = country || user.country;
    user.about = about || user.about;

    // Save the updated user
    await user.save();

    res
      .status(200)
      .json({ message: "User information updated successfully", user });
  } catch (error) {
    console.error("Error updating user information:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const updateExperience = async (req, res) => {
  try {
    const {
      "experience[0].companyName": companyName,
      "experience[0].duration": duration,
      "experience[0].title": title,
      "education[0].institutionName": institutionName,
      "education[0].qualification": qualification,
      "education[0].aboutEdu": educationAbout,
      "jobtitles[0].jobtitle": jobtitle,
      "skills[0].skill": skill,
    } = req.body;
  
    console.log(req.body)
    const user = await User.findById(req.params._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newExperience = {};
    const newEducation = {};
    const newJobTitle = {};
    const newSkill = {};

    if (companyName && duration && title) {
      newExperience.companyName = companyName;
      newExperience.duration = duration;
      newExperience.title = title;
    }

    if (institutionName && qualification && educationAbout) {
      newEducation.institutionName = institutionName;
      newEducation.qualification = qualification;
      newEducation.aboutEdu = educationAbout;
    }

    if (jobtitle) {
      newJobTitle.jobtitle = jobtitle;
    }

    if (skill) {
      newSkill.skill = skill;
    }

    if (Object.keys(newExperience).length > 0) {
      user.experience.push(newExperience);
    }

    if (Object.keys(newEducation).length > 0) {
      user.education.push(newEducation);
    }

    if (Object.keys(newJobTitle).length > 0) {
      user.jobtitles.push(newJobTitle);
    }

    if (Object.keys(newSkill).length > 0) {
      user.skills.push(newSkill);
    }

    await user.save();

    res.status(200).json({ message: "User experience updated successfully", user });
  } catch (error) {
    console.error("Error updating user experience:", error);
    res.status(500).json({ error: "Server error" });
  }
};


const updateProfilepic = async (req, res) => {
  console.log("prof pic update");
  try {
    console.log("1");
    console.log(req.body);
    console.log(req.file);
    if (!req.file) {
      return res.json({ error: "Image is required" });
    }
    console.log("2");
    const path = req.file.path.slice(7);
    console.log(path);
    const filepath = `http://localhost:${process.env.PORT}/${path}`;
    console.log(filepath);

    await User.findOneAndUpdate(
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

const getJobs = async (req, res) => {
  try {
    const jobs = await Jobs.find();

    res.status(200).json({ jobs: jobs, success: true });
  } catch (error) {
    res.status(500).json({ error: "An error occurred", success: false });
  }
};

const updateResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({ error: "Resume file is required" });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    const filepath = result.secure_url;

    await User.findOneAndUpdate(
      { _id: req.params._id },
      { $set: { resume: filepath } }
    );

    console.log("Resume updated");
    res.json({ success: true, url: filepath });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred", success: false });
  }
};

const fetchResume = async (req, res) => {
  try {
    const userId = req.params._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const resumeData = user.resume;

    res.json(resumeData);
  } catch (error) {
    console.error("Error fetching resume data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const applyJob = async (req, res) => {
  try {
    console.log("applyjob");
    console.log(req.body);
    const { jobId, userId } = req.body;
    console.log(jobId);
    console.log(userId);

    const job = await Jobs.findById(jobId);
    // console.log(job);

    if (!job) {
      return res.status(404).json({ error: "Job not found", success: false });
    }

    if (job.appliedCandidates.includes(userId)) {
      return res
        .status(400)
        .json({ error: "User already applied for this job", success: false });
    }

    job.appliedCandidates.push(userId);
    await job.save();

    res.json({ message: "Job applied successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createPost = async (req, res) => {
  try {
    console.log('post create starts..')
    const { description, location, createdBy ,media} = req.body;
    console.log(media)
   
    console.log(req.body)
    // const mediaUpload = await cloudinary.uploader.upload(req.media);
    // const mediaUrl = mediaUpload.secure_url;
    // console.log(mediaUrl)
    const post = new Post({
      createdBy:createdBy,
      description:description,
      location:location,
      media: media,
    });
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
};

const getPosts = async (req, res) => {
  try {
    console.log("getPosts fetching");
    const userId = req.params._id;
    console.log(userId);
    const posts = await Post.find({ createdBy: userId }).sort({ createdAt: -1 });
    console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

const deleteJobTitle = async (req, res) => {
  try {
    const { userId, jobTitleId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const jobTitleIndex = user.jobtitles.findIndex((title) => title._id.toString() === jobTitleId);
    if (jobTitleIndex === -1) {
      return res.status(404).json({ message: 'Job title not found' });
    }

    // Delete the job title from the user's jobtitles array
    user.jobtitles.splice(jobTitleIndex, 1);
    await user.save();

    res.json({ message: 'Job title deleted successfully' });
  } catch (error) {
    console.error('Error deleting job title:', error);
    res.status(500).json({ message: 'Server error' });
  }
};




exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
exports.verifyEmail = verifyEmail;
exports.updateAbout = updateAbout;
exports.updateExperience = updateExperience;
exports.updateProfilepic = updateProfilepic;
exports.getJobs = getJobs;
exports.updateResume = updateResume;
exports.fetchResume = fetchResume;
exports.applyJob = applyJob;
exports.createPost = createPost;
exports.getPosts = getPosts
exports.deleteJobTitle = deleteJobTitle
