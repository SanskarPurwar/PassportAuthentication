// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt');

import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    fullName : {
        type : String,
        required : true,
        trim : true 
    },
    email : {
        type : String ,
        required : true ,
        unique : true,
        lowercase : true, 
        trim : true 
    },
    password : {
        type : String ,
        required : [true , "password is required"]
    },
    date : {
        type : Date ,
        default: Date.now
    }
},
{
    timespamp: true
}
);

// middleware
userSchema.pre("save" , async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password , 10);
    return next()
});


userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password)
};

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            fullName : this.fullName,
            email : this.email,
            password : this.password
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
};

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            fullName : this.fullName,
            email : this.email,
            password : this.password
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
};

export const User = mongoose.model("User" , userSchema);
// module.exports = User