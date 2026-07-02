import crypto from "crypto";
import User from "../models/users.model.js";
import Session from "../models/session.models.js";
import { exchangeGoogleCodeForToken,getGoogleUserInfo } from "../services/googleAuth.service.js";

export const googleCallbackController = async (req, res, next) => {
  try {
    const token = await exchangeGoogleCodeForToken(req.query.code);
    const userData = await getGoogleUserInfo(token.access_token);
    const {
      error,
      sub: id,
      name,
      picture: avatarUrl,
      email,
      email_verified: emailVerified,
    } = userData;
    if (error) {
      //Continue with google failed
    }
    const existingUser = await User.findOne({ id });
    if (!existingUser) {
      await User.create({ id, name, avatarUrl, email });
    }
    let session = await Session.findOne({ id: req.cookies.sid, userId: id });
    if (session) {
      session.expiresAt = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000);
      await session.save();
    } else {
      session = await Session.create({
        id: crypto.randomUUID(),
        userId: id,
        expiresAt: new Date(Date.now() + 60 * 60 * 24 * 30 * 1000),
      });
    }

    res.cookie("sid", session.id, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30 * 1000,
    });
    res.redirect(`${process.env.CLIENT_URL}?login=true`)
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = async (req,res) => {
  try {
   
    const session = await Session.findOne({id:req.cookies.sid})
    if(!session){
      return res.status(403).json({success:false,message:"Authentication required."})
    }
    const user = await User.findOne({id:session.userId})
    if(!user){
      return res.status(403).json({success:false,message:"Authentication required."})


    }
    return res.status(200).json({success:true,data:user})
    
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:"Something went wrong."})
    
  }
  
}