import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    id:{
        type:String,
        required:true,
    },
    userId: {
      type: String,
      required: true,
      ref: "Users",
    },
    expiresAt:{
        type:Date,
        required:true,
        expires:0
    }
  },
  
  { timestamps: true },
);

export default mongoose.model("Session", sessionSchema);
