import express from "express";
import { createNote, getNote } from "../controllers/notes.controller.js";

const router = express.Router();

router.post("/", createNote);
router.get("/:id",getNote)

export default router;
