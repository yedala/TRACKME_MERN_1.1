const Chat = require('../models/chatModel');
const  asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const createChat = asyncHandler(async(req,res)=>{
    const {userId} = req.body;
    if(!userId)return res.send(400);
    var isChat = await Chat.find({
        isGroupChat: false,
        $and:[
            {users:{$elemMatch:{$eq:req.user._id}}},
            {users:{$elemMatch:{$eq:userId}}},
        ],
    })
    .populate("users","-password")
    .populate("latestMessage")

    isChat = await User.populate(isChat,{
        path:"latestMessage.sender",
        select:"name,email,pic"
    });
    if(isChat.length >0){
        res.send(isChat[0]);
    }else{
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users:[req.user._id,userId],
        }
        try{
            const createChat = await Chat.create(chatData);
            const createdChat = await Chat.findOne({_id:createChat._id}).populate('users',"-password");
            res.status(200).json(createdChat);
            
        }catch(err){
            res.status(400);
            throw new Error(err.message);
        }
    }
});
const fetchChats = asyncHandler(async(req,res)=>{
   try{
    var allChats = await Chat.find({
       users:{$elemMatch:{$eq:req.user._id}}
    })
    .populate("users","-password")
    .populate("groupAdmin")
    .populate("latestMessage")
    .sort({updatedAt: -1})
    
    allChats = await User.populate(allChats,{
        path:"latestMessage.sender",
        select:"name,pic,email",
    });
    res.status(200).json(allChats);
   }catch(err){
    res.status(400);
    throw new Error(err.message);
   }
})
const createGroup = asyncHandler(async (req,res)=>{
    if(!req.body.users) return res.status(400).send("pls fill all fields");
    var users = JSON.parse(req.body.users);
    if(users.length<2)res.status(400).send("pls add min 2 members to create");

    // need to find if grtp exists or can create multiple grps need to think

    try{
        var createGrp = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user._id,
        });
        const fullGroupChat = await Chat.findOne({ _id: createGrp._id })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
  
      res.status(200).json(fullGroupChat);
    }catch(err){
        res.status(400);
        throw new Error (err.message)
    }
});
const renameGroup= asyncHandler(async(req,res)=>{
    const {chatId,chatName}=req.body;
    const updatedChat = await Chat.findByIdAndUpdate(chatId,{chatName:chatName},{new:true})
    .populate('users','-password')
    .populate("groupAdmin","-password");
    if(!updatedChat){
        res.status(404);
        throw new Error ("Chat is not present");
    }
    else{
        res.json(updatedChat)
    }

});

const removeFromGroup = asyncHandler(async(req,res)=>{
    const {chatId,userId} = req.body;
    if(req.user._id == userId){
        res.status(404);
        throw new Error ("admin cannot be deleted")
    }
    else{
        const removed = await Chat.findByIdAndUpdate(chatId,
            {
                $pull:{users:userId}
            },
            {
                new:true
            }
        )
        .populate("users","-password")
        .populate("groupAdmin","-password");
        if(!removed){
            res.status(404);
        throw new Error ("admin cannot be deleted")
        }
        else{
            res.json(removed);
        }
    }
});

const addToGroup = asyncHandler(async(req,res)=>{
    const {chatId,userId} =req.body;
    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push:{users:userId},
        },
        {
            new:true,
        }
    )
    .populate("users","-password")
    .populate("groupAdmin","-password");
    if(!added){
        res.status(404);
        throw new Error ("admin cannot be deleted")
    }
    else{
        res.json(added);
    }
});


module.exports = {createChat,fetchChats,createGroup,renameGroup,removeFromGroup,addToGroup}