import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import notesRoutes from "./routes/notes.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { connectDb } from "./config/db.js";
import { logWithTime } from "./utils/logger.js";
import {
  exchangeGoogleCodeForToken,
  getGoogleUserInfo,
} from "./services/googleAuth.service.js";

const app = express();
const PORT = process.env.PORT;

await connectDb();
app.use(cors({
  origin:process.env.CLIENT_URL,
  credentials:true
}))
app.use(express.json())
app.use(cookieParser());

app.use((req, res, next) => {
  logWithTime(`${req.method} ${req.originalUrl}`);
  console.log(req.cookies);
  next();
});

app.use("/notes", notesRoutes);
app.use("/auth",authRoutes)

app.get("/categories", (req, res) => {
  const categories = [
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
  ];
  res.status(200).json(categories);
});


app.use((err,req,res,next) => {
  res.status(500).json({success:false,message:"Something went wrong"})
})
app.listen(PORT, () => {
  console.log("Server Started");
});
