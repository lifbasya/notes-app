import express from "express";
import { getAllNotesHandler } from "../handlers/notesHandler.js";
import { addNoteHandler } from "../handlers/addNoteHandler.js";
import { getNoteByIdHandler } from "../handlers/getNoteByIdHandle.js";

const noteRouter = express.Router();
noteRouter.get("/notes", getAllNotesHandler);
noteRouter.post("/notes", addNoteHandler)
noteRouter.get("/notes/:id", getNoteByIdHandler)

export default noteRouter;
