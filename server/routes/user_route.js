const express = require('express')
const router =  express.Router();
const {upload} = require('../middlewares/userMiddleware')
const {cloudinary} = require('../middlewares/cloudinary')
const {signup,login,verifyToken,getUser,verifyEmail,updateAbout,updateExperience,updateProfilepic,getJobs,updateResume,fetchResume,applyJob} = require('../controllers/user')



router.get('/verify/:token', verifyEmail)
router.get('/user/:_id',getUser)
router.get('/jobs',getJobs)
router.get('/resume/:_id',fetchResume)


router.post('/signup',signup)
router.post('/login',login)
router.post('/updateExperience/:_id',updateExperience)
router.post('/applyjob/:_id',applyJob)




router.patch('/updateAbout/:_id',updateAbout)
router.patch('/updatepic/:_id', upload.single('image'),updateProfilepic)
router.patch('/updateresume/:_id',upload.single('image'),updateResume)


module.exports  = router