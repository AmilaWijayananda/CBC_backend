import Note from "../models/note.js";
import { isAdmin } from "./userController.js";

export function getNote(req, res) {
    Note.find({}).then((note) => {
      res.json(note);
    });
  }
  
  export async function createNote(req, res) {
    // Admin control
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Please login as an administrator to create a note." });
    }

    const { page, topic, note, status, subnote, language } = req.body;

    try {
        // Find the latest note to generate the next noteId
        const latestNote = await Note.find().sort({ noteId: -1 }).limit(1);
        let noteId;

        if (latestNote.length === 0) {
            // If no notes exist, start with NOTE0001
            noteId = "NOTE0001";
        } else {
            // Extract the numeric part of the latest noteId and increment it
            const currentNoteId = latestNote[0].noteId;
            const numberString = currentNoteId.replace("NOTE", "");
            const number = parseInt(numberString);
            const newNumber = (number + 1).toString().padStart(4, "0");
            noteId = "NOTE" + newNumber;
        }

        // Create the new note with auto-generated noteId and current date
        const newNote = new Note({
            noteId,
            page,
            topic,
            note,
            status,
            subnote: subnote || [{
                subtopic1: "",
                subnote1: "",
                subtopic2: "",
                subnote2: "",
                subtopic3: "",
                subnote3: "",
                subtopic4: "",
                subnote4: ""
            }],
            language: language || "English", // Default to "English" if not provided
            date: new Date(), // Automatically set the current date
        });

        // Save the new note to the database
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
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