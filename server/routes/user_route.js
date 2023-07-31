const express = require('express')
const router =  express.Router();
const {upload} = require('../middlewares/userMiddleware')
const {signup,login,verifyToken,getUser,verifyEmail,updateAbout,updateExperience,updateProfilepic,getJobs,updateResume,fetchResume,applyJob,createPost,getPosts,deleteJobTitle,getAllusers,friendRequest,getAllorganisations,orgFollow,getFriendRequests,acceptFriendRequest,friendRequestDeny,getFriends,forgotPassword,resetPassword,getJobDetails,updatePostLike,reportPost,connectedOrg} = require('../controllers/user')



router.get('/verify/:token', verifyEmail)
router.get('/user/:_id',getUser)
router.get('/jobs',getJobs)
router.get('/resume/:_id',fetchResume)
router.get('/post/:_id',getPosts);
router.get('/getAllusers/:_id' , getAllusers)
router.get('/getAllorganisations',getAllorganisations)
router.get('/connectedOrg',connectedOrg)
router.get('/getFriendRequests',getFriendRequests)
router.get('/friends',getFriends)
router.get('/getJobDetails',getJobDetails)


router.post('/signup',signup)
router.post('/login',login)
router.post('/forgot-password',forgotPassword)
router.post("/reset-password/:token", resetPassword)
router.post('/updateExperience/:_id',updateExperience)
router.post('/applyjob/:_id',applyJob)
router.post('/post',upload.single('image'),createPost)
router.post('/postVideo',upload.single('video'),createPost)
router.post('/friendRequest/:_id',friendRequest)
router.post('/orgFollow/:_id',orgFollow)
router.post('/acceptFriendRequest/:_id',acceptFriendRequest)





router.patch('/updateAbout/:_id',updateAbout)
router.patch('/updatepic/:_id', upload.single('image'),updateProfilepic)
router.patch('/updateresume/:_id',upload.single('image'),updateResume)
router.patch('/postlike',updatePostLike)
router.patch('/reportPost',reportPost)


router.delete('/deletejobtitle/:userId/:jobTitleId', deleteJobTitle);
router.delete('/friendRequestDeny/:_id',friendRequestDeny)


module.exports  = router