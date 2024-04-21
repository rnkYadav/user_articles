// const mongoose = require("mongoose");

const User_Schema =  new mongoose.Schema({
    isActive: { type : Boolean, default : true},
    name : { type : String, required : [ true, "User name is required"]},
    email : { type : String, required : [ true, "User email is required"]},
    password : { type : String, required : [ true, "User password is required"]},
    modifiedAt: { type: Date , default: new Date() },
    createdAt: { type: Date , default: new Date() },
})

const User = mongoose.model("User", User_Schema);

module.exports = User;