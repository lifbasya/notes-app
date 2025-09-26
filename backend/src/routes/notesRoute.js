import express from "express";
import { getAllNotesHandler } from "../handlers/notesHandler.js";
import { addNoteHandler } from "../handlers/addNoteHandler.js";
import { getNoteByIdHandler } from "../handlers/getNoteByIdHandle.js";
import { updateNoteByIdHandler } from "../handlers/updateNoteByIdHandler.js";
import { deleteNoteByIdHandler } from "../handlers/deleteNoteByIdHandler.js";

const noteRouter = express.Router();
noteRouter.get("/notes", getAllNotesHandler);
noteRouter.post("/notes", addNoteHandler);
noteRouter.get("/notes/:id", getNoteByIdHandler);
noteRouter.put("/notes/:id", updateNoteByIdHandler);
noteRouter.delete("/notes/:id", deleteNoteByIdHandler);

export default noteRouter;
