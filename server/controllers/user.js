const User = require("../model/user");
const bcrypt = require("bcrypt");
const Token = require("../model/Token");
const jwt = require("jsonwebtoken");
const sendVerificationEmail = require("../utils/mailVerify");
const crypto = require("crypto");
const Organization = require("../model/organisation");
const Jobs = require("../model/jobs");
const Post = require("../model/post");
const mongoose = require('mongoose');
const cloudinary = require("cloudinary").v2;
const Chat = require("../model/chat")
const Message = require('../model/message')
require("dotenv").config();
const FRONT_URL = process.env.FRONT_URL;


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

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User not found. Please sign up first.", success: false });
    }

    const token = new Token({
      userId: existingUser._id,
      token: crypto.randomBytes(16).toString("hex"),
    });

    await token.save();

    const resetPasswordUrl = `${FRONT_URL}/reset-password/${token.token}`; 


  
    await sendVerificationEmail(email, resetPasswordUrl);

    res.status(200).json({
      message: "Reset password link has been sent to your email.",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred.", success: false });
  }
};


const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const existingToken = await Token.findOne({ token });

    if (!existingToken) {
      return res.status(404).json({
        message: "Invalid or expired password reset token.",
        success: false,
      });
    }

    const existingUser = await User.findById(existingToken.userId);

    if (!existingUser) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    existingUser.password = hashedPassword;
    await existingUser.save();

    await existingToken.deleteOne();

    res.status(200).json({
      message: "Password reset successful. You can now login with the new password.",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred.", success: false });
  }
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

const getAllusers = async (req, res) => {
  try {
    const { _id } = req.params;
    console.log(_id);
    const users = await User.find({ isVerified: true, _id: { $ne: _id } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
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

    console.log(req.body);
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

    res
      .status(200)
      .json({ message: "User experience updated successfully", user });
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

// const updateResume = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.json({ error: "Resume file is required" });
//     }

//     const result = await cloudinary.uploader.upload(req.file.path);

//     const filepath = result.secure_url;

//     await User.findOneAndUpdate(
//       { _id: req.params._id },
//       { $set: { resume: filepath } }
//     );

//     console.log("Resume updated");
//     res.json({ success: true, url: filepath });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "An error occurred", success: false });
//   }
// };

const updateResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({ error: "Resume file is required" });
    }
    
    console.log(req.file)

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "raw", 
    });


    
    const filepath = result.url;
     console.log(filepath)
    await User.findOneAndUpdate(
      { _id: req.params._id },
      { $set: { resume: filepath } }
    );
 
    console.log("Resume updated");
    res.json({ success: true});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred", success: false });
  }
}

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

const   applyJob = async (req, res) => {
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
    console.log("post create starts..");
    const { description, location, createdBy } = req.body;

    if (req.file) {
      const file = req.file;
      if (
        file.originalname.endsWith(".jpg") ||
        file.originalname.endsWith(".jpeg") ||
        file.originalname.endsWith(".png") ||
        file.originalname.endsWith(".gif") ||
        file.originalname.endsWith(".bmp") ||
        file.originalname.endsWith(".avif")||
        file.originalname.endsWith(".webp") 
      ) 
       {
        const image = file.path;
        const cloudinaryResult = await cloudinary.uploader.upload(image);
        const imageResult = cloudinaryResult.secure_url;

        const post = new Post({
          createdBy: createdBy,
          description: description,
          location: location,
          image: imageResult,
        });

        const savedPost = await post.save();
        return res.status(201).json(savedPost);

      } 
      else if (/\.(mp4|mov|avi|wmv|flv|mkv)$/i.test(file.originalname)) {
        // Handle video upload
      }
      {
        
        const video = file.path;
        console.log("video suppprot")
        console.log(video)
        const cloudinaryResult = await cloudinary.uploader.upload(video,{resource_type: "video"});
        const videoResult = cloudinaryResult.secure_url;
        console.log(videoResult)
        console.log(video)
        const post = new Post({
          createdBy: createdBy,
          description: description,
          location: location,
          video: videoResult,
        });

        const savedPost = await post.save();
        return res.status(201).json(savedPost);
      }
    }
    
    // Handle the case when neither image nor video is uploaded
    return res.status(400).json({ error: "No image or video uploaded" });

  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
};


// const getPosts = async (req, res) => {
//   try {
//     console.log("getPosts fetching");
//     const userId = req.params._id;
//     console.log(userId);
//     const posts = await Post.find({ createdBy: userId }).sort({
//       createdAt: -1,
//     }).populate("createdBy");
//     console.log(posts);
//     res.status(200).json(posts);
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     res.status(500).json({ error: "Failed to fetch posts" });
//   }
// };
const getPosts = async (req, res) => {
  try {
    console.log("getPosts fetching");
    const userId = req.params._id;
    console.log(userId);

    const user = await User.findById(userId).populate("friends");
    const friendIds = user.friends.map((friend) => friend._id);

    friendIds.push(userId);

    const posts = await Post.find({ createdBy: { $in: friendIds } })
      .sort({ createdAt: -1 })
      .populate("createdBy");
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
      return res.status(404).json({ message: "User not found" });
    }

    const jobTitleIndex = user.jobtitles.findIndex(
      (title) => title._id.toString() === jobTitleId
    );
    if (jobTitleIndex === -1) {
      return res.status(404).json({ message: "Job title not found" });
    }

    // Delete the job title from the user's jobtitles array
    user.jobtitles.splice(jobTitleIndex, 1);
    await user.save();

    res.json({ message: "Job title deleted successfully" });
  } catch (error) {
    console.error("Error deleting job title:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const friendRequest = async (req, res) => {
  const senderId = req.params._id;
  const { userId } = req.body;
  const receiverId = userId;

  try {
    const sender = await User.findById(senderId);
    if (!sender) {
      return res.status(404).json({ error: "Sender user not found" });
    }

    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ error: "Receiver user not found" });
    }

    if (
      receiver.friendRequestrecieved.includes(senderId) ||
      sender.friendRequestsent.includes(receiverId)
    ) {
      return res.status(400).json({ error: "Friend request already sent" });
    }

    sender.friendRequestsent.push(receiverId);
    await sender.save();

    receiver.friendRequestrecieved.push(senderId);
    await receiver.save();

    console.log("me" + sender);

    res
      .status(200)
      .json({ message: "Friend request sent successfully", sender });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllorganisations = async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.json(organizations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch organizations" });
  }
};

const orgFollow = async (req, res) => {
  try {
    const userId = req.params;
    const orgId = req.body.orgId;

    const user = await User.findById(userId);
    const organization = await Organization.findById(orgId);

    if (
      user.orgFollowing.includes(orgId) ||
      organization.followers.includes(userId)
    ) {
      return res.status(404).json({ error: "Already Followed" });
    }

    user.orgFollowing.push(orgId);
    await user.save();
    organization.followers.push(userId);
    await organization.save();
    res.status(200).json({ message: "Followed successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getFriendRequests = async (req, res) => {
  try {
   
    const user = await User.findById(req.query._id).populate(
      "friendRequestrecieved"
    );
    if (!user) {
      return res.status(404).send("User not found");
    }

    const friendRequests = user.friendRequestrecieved;
    const friendRequestData = friendRequests.map((request) => {
      return {
        _id: request._id,
        name: request.name,
        profPic: request.profPic,
        designation: request.designation,
      };
    });

    res.send(friendRequestData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const acceptFriendRequest = async (req, res) => {
  try {
    const friendUserId = req.body.userId;
    console.log("friendrequests:-"+friendUserId);
    const userId = req.params;
    console.log("userId :-"+userId);

    const user = await User.findOne({ _id: userId });
    console.log("user"+user)
    if (user) {
      const friendIndex = user.friendRequestrecieved.indexOf(friendUserId);
      if (friendIndex !== -1) {
        user.friendRequestrecieved.splice(friendIndex, 1);
        user.friends.push(friendUserId);
        await user.save();
      }
    }

    const oppositeUser = await User.findOne({ _id: friendUserId });

    console.log("opposite user", oppositeUser);
    if (oppositeUser) {
      const friendUserIndex = oppositeUser.friendRequestsent.indexOf(user._id);
      console.log(friendUserIndex)
      if (friendUserIndex !== -1) {
        oppositeUser.friendRequestsent.splice(friendUserIndex, 1);
        oppositeUser.friends.push(user._id);
        await oppositeUser.save();
      }
    }

    res.status(200).json({ message: "Friend request accepted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while accepting friend request" });
  }
};


const friendRequestDeny = async (req, res) => {
  try {


    const userId = req.params;
    console.log(userId)
    const oppositeUserId = req.body.userId;
    console.log(oppositeUserId)

    const user = await User.findById(userId);
    console.log(user)
    const userIndex = user.friendRequestrecieved.indexOf(oppositeUserId);
    console.log(userIndex)
    if (userIndex > -1) {
      user.friendRequestrecieved.splice(userIndex, 1);
    }
    await user.save();

    const oppositeUser = await User.findById(oppositeUserId);
    console.log(oppositeUser)
    const oppositeUserIndex = oppositeUser.friendRequestsent.indexOf(user._id);
    console.log(oppositeUserIndex)
    if (oppositeUserIndex > -1) {
      oppositeUser.friendRequestsent.splice(oppositeUserIndex, 1);
    }
    await oppositeUser.save();

    res.status(200).send("successfully updated!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while updating friend requests");
  }
};

const getFriends = async (req, res) => {
  try {
    const userId = req.query._id;
    console.log(userId)

    const user = await User.findById(userId).populate('friends'); 

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ friends: user.friends });
  } catch (err) {
    console.error('Error fetching friends', err);
    res.status(500).json({ error: 'Error fetching friends' });
  }

  // const userId = req.query._id;
  
  // try {
  //   const friends = await Chat.aggregate([
  //     {
  //       $match: {
  //         users: mongoose.Types.ObjectId(userId),
  //       },
  //     },
  //     {
  //       $lookup: {
  //         from: 'messages', // Name of the Message model collection
  //         localField: 'latestMessage', // Field in the Chat collection
  //         foreignField: '_id', // Field in the Message collection
  //         as: 'latestMessage', // Alias for the joined result
  //       },
  //     },
  //     {
  //       $unwind: {
  //         path: '$latestMessage',
  //         preserveNullAndEmptyArrays: true,
  //       },
  //     },
  //     {
  //       $lookup: {
  //         from: 'users', // Name of the User model collection
  //         localField: 'users', // Field in the Chat collection
  //         foreignField: '_id', // Field in the User collection
  //         as: 'usersData', // Alias for the joined result
  //       },
  //     },
  //     {
  //       $project: {
  //         chatName: 1,
  //         users: 1,
  //         latestMessage: {
  //           _id: '$latestMessage._id',
  //           content: '$latestMessage.content',
  //           sender: '$latestMessage.sender',
  //           // Add other fields from the Message schema as needed
  //         },
  //         // Add other fields from the Chat schema as needed
  //       },
  //     },
  //   ]);

  //   res.json({ friends });
  // } catch (error) {
  //   console.error('Error fetching friends list', error);
  //   res.status(500).json({ error: 'Internal server error' });
  // }
}



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
exports.getPosts = getPosts;
exports.deleteJobTitle = deleteJobTitle;
exports.getAllusers = getAllusers;
exports.friendRequest = friendRequest;
exports.getAllorganisations = getAllorganisations;
exports.orgFollow = orgFollow;
exports.getFriendRequests = getFriendRequests;
exports.acceptFriendRequest = acceptFriendRequest;
exports.friendRequestDeny = friendRequestDeny;
exports.getFriends =getFriends
exports.forgotPassword = forgotPassword
exports.resetPassword = resetPassword
