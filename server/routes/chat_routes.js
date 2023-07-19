const express = require('express');
const router =  express.Router();

const {createChat , fetchChats} = require('../controllers/chat')



router.get('/userchat',fetchChats)
router.post('/',createChat)




module.exports = router