const express = require('express')
const router =  express.Router();

const {signup,login,verifyToken,getUser,verifyEmail} = require('../controllers/user')



router.post('/signup',signup)
router.post('/login',login)


router.get('/verify/:token', verifyEmail)
router.get('/user',verifyToken,getUser)

module.exports  = router