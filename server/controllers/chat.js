const Chat = require("../model/chat");
const User = require("../model/user");

const createChat = async (req, res) => {

  try {

    const { userId, oppsteId } = req.body.data;
    const user = await User.findById(userId);
    const oppsteUser = await User.findById(oppsteId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const existingChat = await Chat.findOne({
      users: { $all: [user._id, oppsteUser._id] }
    });

    if (existingChat) {
      return res.status(200).json({ chat: existingChat }); 
    }

    const chat = new Chat({
      users: [user._id, oppsteUser._id],
    });

    await chat.save();

    res.status(201).json({ chat });
  } catch (err) {
    console.error('Error creating chat', err);
    res.status(500).json({ error: 'Error creating chat' });
  }
};

const fetchChats = async (req, res) => {
    try {
      console.log("fetching the chat..")
        const {userId,oppstId} = req.query;
        console.log(userId,oppstId)

        const chat = await Chat.find({
          users: {
            $all: [userId, oppstId] 
          }
        }).populate('users');
    
        if (!chat) {
          return res.status(404).json({ error: 'Chat not found' });
        }
    
        res.status(200).json(chat);
      } catch (err) {
        console.error('Error fetching chat', err);
        res.status(500).json({ error: 'Error fetching chat' });
      }

    }



module.exports = {
    createChat,
    fetchChats,

};
