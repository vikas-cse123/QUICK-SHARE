import express from "express";
import { createNote, getBurnAfterReadNote, getNote } from "../controllers/notes.controller.js";
import { requireNote } from "../middlewares/notes.middleware.js";

const router = express.Router();

router.post("/", createNote);
router.get("/:id",requireNote,getNote)
router.post("/burn/:id",requireNote,getBurnAfterReadNote)

export default router;
