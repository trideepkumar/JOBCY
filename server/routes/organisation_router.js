const express = require("express");
const {signup,login,verifyEmail,verifyToken,jobposts} = require("../controllers/organisation");



const router = express.Router();


router.get('/verify/:token', verifyEmail)


router.post("/signup", signup);

router.post("/login",login)

router.post('/jobposts/:_id',jobposts)





module.exports = router;
