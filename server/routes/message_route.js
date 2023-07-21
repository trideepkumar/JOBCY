const express = require('express');
const router =  express.Router();

const {sendMessage,allMessages,lastMessage} = require('../controllers/message')   


router.post('/' , sendMessage)
router.get('/:chatId',allMessages)
router.get('/last/:friendId',lastMessage)



module.exports = router