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
    subnote : [
        {
            subtopic1 : {
                type : String,
                
            },
            subnote1 : {
                type : String,
                
            },
            subtopic2 : {
                type : String,
                
            },
            subnote2 : {
                type : String,
                
            },
            subtopic3 : {
                type : String,
                
            },
            subnote3 : {
                type : String,
                
            },
            subtopic4 : {
                type : String,
                
            },
            subnote4 : {
                type : String,
                
            }
        }
    ],
    language : {
        type : String,
        required : true
    },

    });
     const Note = mongoose.model("note", noteSchema);
    
     export default Note