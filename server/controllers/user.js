const User = require("../model/user");
const bcrypt = require("bcrypt");
const Token = require("../model/Token");
const jwt = require("jsonwebtoken");
const sendVerificationEmail = require("../utils/mailVerify");
const crypto = require("crypto");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
   console.log(req.body)
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
}

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
      .json({ message: "user not registered! SignUp please!" , success:false});
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid password!!" , success:false});
  }
  if (!existingUser.isVerified) {
    return res.status(400).json({ message: "Verify Your Existing account!" ,success:false});
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
}


const verifyToken = async (req, res, next) => {
  console.log('verification started');
  const token = req.headers.authorization;
  console.log(token)
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
  console.log('get user started!');
  const userId = req.id;
  // console.log(userId)
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
}

// for email verification

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

const updateAbout = async (req, res) => {
  try {
    console.log('about update')
    const { username, designation, place, state, country, about } = req.body;
    console.log(username,designation,place,state,country,about)
    // Find the user by their ID
    console.log(req.params)
    const user = await User.findById(req.params._id); 
    // Assuming you have authentication middleware to get the user ID from the request
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Update the user's information
    user.username = username || user.username;
    user.designation = designation || user.designation;
    user.place = place || user.place;
    user.state = state || user.state;
    user.country = country || user.country;
    user.about = about || user.about;
    
    // Save the updated user
    await user.save()
    
    res.status(200).json({ message: 'User information updated successfully', user });
  } catch (error) {
    console.error('Error updating user information:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
exports.verifyEmail = verifyEmail;
exports.updateAbout = updateAbout;
