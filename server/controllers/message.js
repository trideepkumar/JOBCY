const Chat = require("../model/chat");
const User = require("../model/user");
const Message = require("../model/message")

const sendMessage = async (req, res) => {
    console.log("sending message");
  
    console.log(req.body)
    const { content, chatId,userId } = req.body.data;
    console.log(content,chatId)
  
    if (!content || !chatId) {
      console.log("Invalid data passed in request")
      res.status(400);
      return;
    }
  
    let newMessage = new Message({
      sender: userId,
      content: content,
      chat: chatId,
    });
  
    try {
      let message = await newMessage.save();

      message = await message.populate("sender","name")
      message = await message.populate("chat")
      message = await User.populate(message,{
        path:"chat.users",
        select:"name email"
      })

      await Chat.findByIdAndUpdate(req.body.chatId,{
        latestMessage:message
      })

    res.json(message)
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to save message" });
    }
}
  

const allMessages = async(req,res)=>{
    try{
      console.log(req.params.chatId)
     const messages = await Message.find({chat:req.params.chatId})
     .populate("sender","name email")
     .populate("chat")
     
    //  console.log(messages)

     res.status(200).json(messages)
    }catch(err){
        console.log(err)
    }
}


module.exports = {
    sendMessage,
    allMessages
};
