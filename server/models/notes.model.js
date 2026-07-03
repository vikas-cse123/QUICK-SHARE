import mongoose from "mongoose";
import bcrypt from "bcrypt";
//userId
const notesSchema = new mongoose.Schema(
  {
    id:{
      type:String,
      required:true
    },
    userId: {
      type: String,
      ref: "Users"
    },
    content: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 10000,
    },
    category: {
      type: String,
      default: "None",
      enum: [
        "None",
        "Cryptocurrency",
        "Cybersecurity",
        "Fixit",
        "Food",
        "Gaming",
        "Haiku",
        "Help",
        "History",
        "Housing",
        "Jokes",
        "Legal",
        "Money",
        "Movies",
        "Music",
        "Pets",
        "Photo",
        "Science",
        "Software",
        "Source Code",
        "Spirit",
        "Sports",
        "Travel",
        "TV",
        "Writing",
      ],
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: (value) => value.length <= 10,
        message: "A note can have a maximum of 10 tags.",
      },
    },
    exposure: {
      type: String,
      default: "Public",
      enum: ["Public", "Unlisted"],
    },
    name: {
      type: String,
      default: "Untitled",
      minlength: 1,
      maxlength: 100,
      trim: true,
    },
    password: {
      type: String,
    },
    isPassword: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    expiresAt: {
      type: Date,
      expires: 0,
    },
    isBurnAfterRead: {
      type: Boolean,
      default: false,
    },
    isGuestUser: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

notesSchema.pre("save", async function () {
  if (!this.password) {
    this.isPassword = false;
    return;
  }
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    this.isPassword = true;
  }
});

notesSchema.methods.comparePassword = async function(enteredPassword){
 
  return await bcrypt.compare(enteredPassword,this.password)
}

export default mongoose.model("Note", notesSchema);
