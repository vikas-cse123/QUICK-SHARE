import Note from "../models/notes.model.js"
import Session from "../models/session.models.js";
import User from "../models/users.model.js"

export const createNote = async (req, res) => {
  try {
    const session = await Session.findOne({id:req.cookies.sid})
    const user = await User.findOne({id:session?.userId})
    const data = {...req.body}
    if(user){
      data.userId = user.id
    }else{
      data.isGuestUser = true
    }
    if(req.body.expiresAt && req.body.expiresAt.toString().toLowerCase() !== "never"){
      data.expiresAt = new Date(Date.now()+req.body.expiresAt)
    }
    const note = await Note.create(data)
    res.status(201).json({success:true,message:"Note created successfully."})
    
    

  } catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:"Failed to create note"})

  }
};
