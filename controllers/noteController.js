import Note from "../models/note";

export function getNote(req, res) {
    Note.find({}).then((note) => {
      res.json(note);
    });
  }
  
  export function createNote(req,res){
    if(!isAdmin(req)){
  
      res.json({
        message : "Please login as administrator"
      })
      return
    }
  
    const newNoteData = req.body;
  
    // Log the product details to the console
    console.log("Request Note Details:", newNoteData);
  
    const notes = new Note(newNoteData);
  
    notes.save().then(()=>{
      res.json({
        message: "Note created"
      })
    }).catch((error)=>{
      res.status(403).json({
        message: error
      })
    })
  }
  
  export function deleteNote(req, res) {
    if (!isAdmin(req)) {
      res.status(403).json({
        message: "Please login as administrator",
      });
      return;
    }
  
    const noteId = req.params.noteId;
  
    Note.deleteOne({ noteId: noteId })
      .then(() => {
        res.json({
          message: "Note deleted",
        });
      })
      .catch((error) => {
        res.status(403).json({
          message: error,
        });
      });
  }

  export function updateNote(req, res) {
    if (!isAdmin(req)) {
      res.status(403).json({
        message: "Please login as administrator",
      });
      return;
    }
  
    const noteId = req.params.noteId;
    const updatedNoteData = req.body;
  
    Note.updateOne({ noteId: noteId }, updatedNoteData)
      .then(() => {
        res.json({
          message: "Note updated",
        });
      })
      .catch((error) => {
        res.status(403).json({
          message: error,
        });
      }); 
    }