import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    noteId : {
        type : String,
        required : true
    },
    page : {
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
    topic : {
        type : String,
        required : true
    },
    note : {
        type : String,
        required : true
    },
    });
     const Note = mongoose.model("note", noteSchema);
    
     export default Note