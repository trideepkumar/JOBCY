const express = require("express");
const {signup,login,verifyEmail,verifyToken,jobposts ,jobsearch} = require("../controllers/organisation");



const router = express.Router();


router.get('/verify/:token', verifyEmail)


router.post("/signup", signup);

router.post("/login",login)

router.post('/jobposts/:_id',jobposts)

//search router for job title search

router.post('/jobs/search' , verifyToken ,jobsearch)




module.exports = router;
