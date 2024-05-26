const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
        },
        password:{
            type: String,
            required: true,
        },
        pic:{
            type: String,
            required: false,
            default:"https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png",
        },
        isAdmin:{
            type:Boolean,
            required: false,
            default: false,
        },
        mobileNumber:{
            type: Number,
            required: false
        }
        
    },
    {
        timestamps:true,
    }
);
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next(); 
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);

});
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
const User= mongoose.model('User', userSchema);

module.exports = User;