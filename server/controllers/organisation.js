const bcrypt = require("bcrypt");
const crypto = require("crypto");
const Organization = require("../model/organisation");
const Token = require("../model/Token");
const sendVerificationEmail = require("../utils/mailVerify");
const jwt = require("jsonwebtoken");


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
  let existingUser;

  try {
    console.log("loginworks");
    existingUser = await Organization.findOne({ email: email });
    console.log(existingUser);
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

module.exports = {
  signup,
  login,
  verifyToken,
  verifyEmail
};
