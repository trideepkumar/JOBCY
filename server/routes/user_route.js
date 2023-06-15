const express = require('express')
const router =  express.Router();

const {signup,login,verifyToken,getUser,verifyEmail,updateAbout,updateExperience} = require('../controllers/user')



router.get('/verify/:token', verifyEmail)
router.get('/user/:_id',getUser)


router.post('/signup',signup)
router.post('/login',login)



router.patch('/updateAbout/:_id',updateAbout)
router.post('/updateExperience/:_id',updateExperience)

module.exports  = router