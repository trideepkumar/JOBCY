const User = require('../model/user');
const bcrypt = require('bcrypt');
const Token  = require("../model/Token")
const jwt = require('jsonwebtoken');
const sendVerificationEmail = require('../utils/mailVerify');
const crypto = require('crypto');



const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
    });

    await newUser.save();


  //token generation for email verification

  const token = new Token(
    {userId:newUser._id,
      token:crypto.randomBytes(16).toString('hex')
    }
  )
  await token.save()
  console.log(token)

    const verificationUrl = `${req.protocol}://${req.get('host')}/verify/${token.token}`;

    await sendVerificationEmail(email, verificationUrl);

    

    res
      .status(200)
      .json({ message: 'User registered successfully. Please check your email for verification.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred during signup' });
  }
};




const login = async (req,res) =>{
    const {email,password} = req.body
    let existingUser

    try{
      console.log('loginworks')
        existingUser = await User.findOne({email:email})
        console.log(existingUser)
    }catch(err){
        console.log(err)
    }
    if(!existingUser){
      return res.status(400).json({message:"user not registered! SignUp please!"})
    }
    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password)
    if(!isPasswordCorrect){
       return res.status(400).json({message:"Invalid password!!"})
    }
    if(!existingUser.isVerified) {
      return res.status(400).json({message:"Verfication not completed"})
    }
    if(existingUser&&existingUser.isVerified){
    const token = jwt.sign({id:existingUser._id},process.env.JWT_SECRET_KEY ,{
      expiresIn:"1d"
    })

    const options = {
      expires: new Date(
          Date.now() + 3*24*60*60*1000
      ) ,
      httpOnly: true
    }
    res.status(200).cookie('token',token,options).json({
      success: true,
      user:  existingUser,
      token: token
    });   
  
  }
}

const verifyToken = async(req,res,next)=>{
  // console.log('verification started');
  const token = req.cookies.token
  
  if(!token){
    res.status(404).json({message:"No cookie header found"})
  }
  jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
    if(err){
      return res.status(400).json({message:'Invalid token found!'})
    }
    // console.log(user.id)
    req.id = user.id
  })
  next();
}

const getUser = async(req,res,next)=>{
  // console.log('get user started!');
  const userId = req.id
  // console.log(userId)
  let user;
  try{
    user = await User.findById(userId,"-password")
    // console.log(user);
  }catch(err){
    return new  Error(err)    
  }
  if(!user){
    return res.status(404).json({message:'user not found!'})
  }
  return res.status(200).json({user})
}

// for email verification

const verifyEmail = async (req, res) => {

  try {
    const token = await Token.findOne({token:req.params.token});
    console.log(token)
    await User.updateOne({_id:token.userId},{$set:{isVerified:true}})
    await Token.findByIdAndRemove(token._id)
    res.send("email verification successfull")
  }
  catch(err){
    res.status(400).send("error Occured")
  }
    
};

  
exports.signup = signup  
exports.login = login
exports.verifyToken = verifyToken
exports.getUser = getUser
exports.verifyEmail = verifyEmail
