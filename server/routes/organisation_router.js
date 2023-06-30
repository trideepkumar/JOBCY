const express = require("express");
const {signup,login,verifyEmail,verifyToken,jobposts,getJobsByOrganization,updateName ,updatePic,getOrganisation} = require("../controllers/organisation");
const {upload} = require('../middlewares/userMiddleware')



const router = express.Router();


router.get('/verify/:token', verifyEmail)
router.get('/jobs/:orgName',getJobsByOrganization)
router.get('/getOrg/:_id' ,getOrganisation)


router.post("/signup", signup);
router.post("/login",login)
router.post('/jobposts/:_id',jobposts)

router.patch('/updateName/:_id',updateName)
router.patch('/updatepic/:_id', upload.single('image'),updatePic)










module.exports = router;
