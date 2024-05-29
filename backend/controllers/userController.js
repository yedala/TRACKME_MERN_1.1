const User = require('../models/userModel');
const asyncHandler = require("express-async-handler");
const {generateToken,generateRefreshToken} = require("../utils/generateToken");
const { decryptPassword } = require('../utils/decryptPassword');
const jwt = require('jsonwebtoken')

const registerUser = asyncHandler(async (req, res) => {
    
    let { name, email, password, pic } = req.body;
    password = decryptPassword(password);
    const userExists = await User.findOne({ email });
    if (!userExists) {
        const user = await User.create({
            name, email, password, pic
        });
        if (user) {
            let refreshToken = generateRefreshToken(user._id);
            user.refreshToken = refreshToken;
            await user.save();
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
                refreshToken: refreshToken,
            });

        } else {
            res.status(400);
            throw new Error('Error occured');
        }
    }
    else {
        res.status(400);
        throw new Error('user already exists');
    }

});

const authUser = asyncHandler(async (req, res) => {
    let { email, password } = req.body;
    password = decryptPassword(password);
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        let refreshToken = generateRefreshToken(user._id);
        user.refreshToken = refreshToken;
        await user.save();

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id),
            refreshToken: user?.refreshToken,
        })
    } else {
        res.status(400);
        throw new Error("Invalid  password !")
    }

});

const allUsers = asyncHandler(async (req, res) => {
    const search = req.query.search ?
        {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { name: { $regex: req.query.search, $options: "i" } },
            ],
        } : {};
    const users = await User.find(
        search
    ).find({ _id: { $ne: req.user._id } });
    res.send(users);
})
const fetchUser = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.find({ _id: userId });
        res.json(user[0]);
    } catch (err) {
        res.status(404).send(err.message);
    }
});

const updateToken = asyncHandler(async(req,res)=>{
    const {refreshToken} = req.body;
    console.log(refreshToken);
    if(!refreshToken)return res.status(403).json({message:'Access denied'});
    try{
        const decoded = jwt.verify(refreshToken,process.env.JWT_SECRET_REFRESH);
        const user = await User.findById(decoded.id);
        if(!user)return res.status(403).json({message:'Access denied'});
        let token = generateToken(user._id);
       res.json({token});
        
    }catch(err){
       throw new Error(err)
    }
    
})

module.exports = { registerUser, authUser, allUsers, fetchUser,updateToken }