const express = require('express')
const router =  express.Router();
const {upload} = require('../middlewares/userMiddleware')
const {signup,login,verifyToken,getUser,verifyEmail,updateAbout,updateExperience,updateProfilepic,getJobs,updateResume,fetchResume,applyJob,createPost,getPosts} = require('../controllers/user')



router.get('/verify/:token', verifyEmail)
router.get('/user/:_id',getUser)
router.get('/jobs',getJobs)
router.get('/resume/:_id',fetchResume)
router.get('/post/:_id', getPosts);


router.post('/signup',signup)
router.post('/login',login)
router.post('/updateExperience/:_id',updateExperience)
router.post('/applyjob/:_id',applyJob)
router.post('/post',upload.single('media'),createPost)




router.patch('/updateAbout/:_id',updateAbout)
router.patch('/updatepic/:_id', upload.single('image'),updateProfilepic)
router.patch('/updateresume/:_id',upload.single('image'),updateResume)


module.exports  = router