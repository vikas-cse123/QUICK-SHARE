import Note from "../models/notes.model.js";
import Session from "../models/session.models.js";
import User from "../models/users.model.js";
import {getNoteUniqueId} from "../services/noteId.service.js"
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
      req.body.expiresAt &&
      req.body.expiresAt.toString().toLowerCase() !== "never"
    ) {
      data.expiresAt = new Date(Date.now() + req.body.expiresAt);
    }
    data.id = await getNoteUniqueId()

    const note = await Note.create(data);
    res
      .status(201)
      .json({ success: true, message: "Note created successfully." ,data:note});
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to create note" });
  }
};



export const getNote = async (req,res) => {
  try {
    const id = req.params.id
    const note = await Note.findOne({id,isDeleted:false})
    if(!note){
      return res.status(404).json({success:false,message:"Note not found"})
    }
    if(!note.isPassword){
      return res.status(200).json(note)

    }
    if(note.isBurnAfterRead){
      return res.status(200).json({success:true,message:`You're about to Burn this paste: ${note.id} after reading it`})
    }
    return res.status(200).json({success:true,message:"This note requires password."})
    
  } catch (error) {

    
  }

}