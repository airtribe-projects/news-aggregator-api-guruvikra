const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        minlength: 2,
        maxlength: 100,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    preferences: {
        type: [String],
        default: []
    }
}, { timestamps: true })



userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    try{
        this.password=await bcrypt.hash(this.password, 10);
    }
    catch(err){
        console.error(err);
        console.error("Hashing error:", err);
    }
})


userSchema.methods.isPasswordCorrect=async function (password){
    return await bcrypt.compare(password,this.password);

}

userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email

        },
         process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRY});
}

module.exports = mongoose.model("User", userSchema);
