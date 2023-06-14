const express = require('express')
const router =  express.Router();

const {signup,login,verifyToken,getUser,verifyEmail,updateAbout} = require('../controllers/user')



router.get('/verify/:token', verifyEmail)
router.get('/user',verifyToken,getUser)


router.post('/signup',signup)
router.post('/login',login)



router.patch('/updateAbout/:_id',updateAbout)

module.exports  = router