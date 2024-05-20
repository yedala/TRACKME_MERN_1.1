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
            default:"https://in.images.search.yahoo.com/images/view;_ylt=Awrx_e2Vqkdm3bAGOvW9HAx.;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzdmOTk5OTkzNTFiMzk0ODY2NzVjMjc1NzUwNGE4M2UwBGdwb3MDNQRpdANiaW5n?back=https%3A%2F%2Fin.images.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Dprofile%2Bpic%2B%2Bdummy%2Bimage%26ei%3DUTF-8%26type%3DE210IN885G0%26fr%3Dmcafee%26fr2%3Dp%253As%252Cv%253Ai%252Cm%253Asb-top%26tab%3Dorganic%26ri%3D5&w=300&h=300&imgurl=www.inforwaves.com%2Fmedia%2F2021%2F04%2Fdummy-profile-pic-300x300-1.png&rurl=https%3A%2F%2Fwww.inforwaves.com%2Fhome-2%2Fdummy-profile-pic-300x300-1%2F&size=10.8KB&p=profile+pic+dummy+image&oid=7f99999351b39486675c2757504a83e0&fr2=p%3As%2Cv%3Ai%2Cm%3Asb-top&fr=mcafee&tt=dummy-profile-pic-300%C3%97300-1+-+Inforwaves&b=0&ni=160&no=5&ts=&tab=organic&sigr=x.LXk4dzAfJ6&sigb=VZ2XimSZSyr6&sigi=sWcP4f6GbKia&sigt=KqZYQkX74rGc&.crumb=AXZnfpkXLz7&fr=mcafee&fr2=p%3As%2Cv%3Ai%2Cm%3Asb-top&type=E210IN885G0",
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