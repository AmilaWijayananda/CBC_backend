import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    reviewId : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    },
    status : {
        type : String,
        default : "Visible"
    },
    review : {
        type : String
    },
    stars : {
        type : Number,
        required : true
    },
    });
     const Review = mongoose.model("review", reviewSchema);
    
     export default Review