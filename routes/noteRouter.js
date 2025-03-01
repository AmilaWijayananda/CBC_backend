import express from 'express';
import { createNote, deleteNote, getNote, updateNote } from '../controllers/noteController.js';

const noteRouter = express.Router();

noteRouter.get('/',getNote);     
noteRouter.post('/',createNote);  
noteRouter.delete("/:noteId",deleteNote); 
noteRouter.put("/:noteId",updateNote);  

export default noteRouter;