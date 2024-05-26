const asyncHandler = require('express-async-handler');
const Message = require('../models/messageModel');
const User = require('../models/userModel');
const Chat = require('../models/chatModel');


const sendMessage = asyncHandler(async (req, res) => {
    const { chatId, content } = req.body;
    if (!content || !chatId) return res.status(400);
    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    };
    try {
        var message = await Message.create(newMessage);
        message = await message.populate("sender", "name pic");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: "chat.users",
            select: "name pic  email",
        });
        await Chat.findByIdAndUpdate(chatId, {
            latestMessage: message
        });
        res.json(message);
    } catch (err) {
        res.status(400);
        throw new Error("err.message");
    }

});
const allMessages = asyncHandler(async (req, res) => {
    try {
        const chatId = req.params.chatId;
        var messages = await Message.find({
            chat: chatId,
        })
            .populate("sender", "-password")
            .populate("chat");
       
        res.json(messages);
    }catch(err){
        res.status(400);
        throw new Error(err.message);
    }

});



module.exports = { sendMessage,allMessages }