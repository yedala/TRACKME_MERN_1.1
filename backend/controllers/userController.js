const User = require('../models/userModel');
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken")

const registerUser =asyncHandler(async (req,res)=>{
    const {name,email,password,pic}=req.body;
   const userExists = await User.findOne({email});
   if(!userExists){
    const user = await User.create({
        name,email,password,pic
    });
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token: generateToken(user._id),
        });
        
    }else{
        res.status(400);
        throw new Error('Error occured');
    }
   }
   else{
    res.status(400);
    throw new Error('user already exists');
   }

});

const authUser = asyncHandler(async (req,res)=>{
    const {email , password} = req.body;
    
    const user = await  User.findOne({email});
    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name:user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic:user.pic,
            token: generateToken(user._id),
        })
    }else{
        res.status(400);
        throw new Error("Invalid  password !")
    }

});

const allUsers = asyncHandler(async(req,res)=>{
    const search = req.query.search ?
    {
        $or:[
            {name:{$regex: req.query.search, $options:"i"}},
            {name:{$regex: req.query.search, $options:"i"}},
        ],
    }:{};
    const users = await User.find(
        search
    ).find({_id:{$ne:req.user._id}});
    res.send(users);
})
const fetchUser = asyncHandler(async(req,res)=>{
    const userId = req.params.userId;
    try{
        const user = await User.find({_id:userId});
        console.log(user);
        res.json(user);
    }catch(err){
         res.status(404).send(err.message);
    }
})

module.exports = {registerUser,authUser,allUsers,fetchUser}