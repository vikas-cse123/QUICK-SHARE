import Note from "../models/notes.model.js";
import Session from "../models/session.models.js";
import User from "../models/users.model.js";
import { getNoteUniqueId } from "../services/noteId.service.js";
import { logWithTime } from "../utils/logger.js";

export const createNote = async (req, res) => {
  try {
    const session = await Session.findOne({ id: req.cookies.sid });
    const user = await User.findOne({ id: session?.userId });

    const data = { ...req.body };
    if (user) {
      data.userId = user.id;
    } else {
      data.isGuestUser = true;
    }
    if (
      req.body?.expiresAt &&
      req.body?.expiresAt.toString().toLowerCase() !== "never"
    ) {
      data.expiresAt = new Date(Date.now() + req.body.expiresAt);
    }
    data.id = await getNoteUniqueId();

    const note = await Note.create(data);
    console.log(note);
    res.status(201).json({
      success: true,
      message: "Note created successfully.",
      data: note,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to create note" });
  }
};

export const getNote = async (req, res) => {
  try {
    const note = req.note;
    console.log(note);
    if (!note.isPassword && !note.isBurnAfterRead) {
      return res.status(200).json(note);
    }
    if (note.isBurnAfterRead) {
      return res.status(200).json({
        success: true,
        message: `You're about to Burn this paste: ${note.id} after reading it`,
        data: { isPasswordRequired: note.isPassword },
      });
    }
    return res
      .status(200)
      .json({ success: true, message: "This note requires password." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to get note." });
  }
};

export const getBurnAfterReadNote = async (req, res) => {
  try {
    const note = req.note;
    if (note.isPassword) {
      const password = req.body?.password;
      if (!password) {
        return res.status(400).json({
          success: false,
          message: "Password is required to see this note.",
        });
      }
      const isPasswordCorrect = await note.comparePassword(password);
      if (!isPasswordCorrect) {
        return res
          .status(403)
          .json({ success: false, message: "Password is Incorrect." });
      }
    }
    note.isDeleted = true;
    await note.save();
    return res.status(200).json({ success: true, data: note });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to get note." });
  }
};

//Add zod validation
export const getPasswordProtectedNote = async (req, res) => {
  try {
    const note = req.note;
    if (!note.isPassword) {
      return res.status(200).json({ success: true, note });
    }
    const password = req.body.password;

    const isPasswordCorrect = await bcrypt.comparePassword(password);
    if (!isPasswordCorrect) {
      return res
        .status(403)
        .json({ success: false, message: "Password is Incorrect." });
    }
    return res.status(200).json({ success: false, note });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to get note." });
  }
};
