const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const user_router = require('./routes/user_route')
const organisation_router = require('./routes/organisation_router')
const cookieParser = require('cookie-parser');
const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const authRoutes = require('./routes/auth/userAuth')


require('dotenv').config()
const app = express()



app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const cors = require('cors');






app.use(express.json())
app.use(cors())



passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL:process.env.CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      // Strategy callback implementation
    }
  )
);





app.use('/', user_router)
app.use('/organisation',organisation_router)

app.use('/auth',authRoutes)


mongoose.connect(process.env.MONGODB_URL).then(()=>{
    app.listen(process.env.PORT)
    console.log('mongoose connected succesfully!')
}).catch((err)=>{
   console.log(err)
})
