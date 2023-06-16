const express = require('express')
const router =  express.Router();
const {upload} = require('../middlewares/userMiddleware')
const {signup,login,verifyToken,getUser,verifyEmail,updateAbout,updateExperience,updateProfilepic} = require('../controllers/user')



router.get('/verify/:token', verifyEmail)
router.get('/user/:_id',getUser)


router.post('/signup',signup)
router.post('/login',login)
router.post('/updateExperience/:_id',updateExperience)




router.patch('/updateAbout/:_id',updateAbout)
router.patch('/updatepic/:_id', upload.single('image'),updateProfilepic)


module.exports  = router