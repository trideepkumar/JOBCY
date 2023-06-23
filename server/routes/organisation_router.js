const express = require("express");
const {signup,login,verifyEmail,verifyToken,jobposts,getJobsByOrganization } = require("../controllers/organisation");



const router = express.Router();


router.get('/verify/:token', verifyEmail)

router.get('/jobs/:orgName',getJobsByOrganization)


router.post("/signup", signup);

router.post("/login",login)

router.post('/jobposts/:_id',jobposts)







module.exports = router;
