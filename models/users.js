import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    isBlocked : {
        type : Boolean,
        default : false
    },
    type : {
        type : String,
        default : "Customer"
    },
    profilePicture : {
        type : String,
        default : "https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg?t=st=1735185473~exp=1735189073~hmac=6d607c779d722744b48c6346ad3a36bea25503f569ef7ed2c1d84ca9b4667f99&w=740"
    }
})

const User = mongoose.model("users",userSchema)

export default User;
