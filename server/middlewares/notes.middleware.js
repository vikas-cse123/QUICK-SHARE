import Note from "../models/notes.model.js";

export const requireNote = async (req, res, next) => {
  const id = req.params.id;
  const note = await Note.findOne({ id, isDeleted: false });
  if (!note) {
    return res.status(404).json({ success: false, message: "Note not found" });
  }
  req.note = note;
  next();
};
