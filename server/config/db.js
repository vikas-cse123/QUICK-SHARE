import mongoose from "mongoose";
import { logWithTime } from "../utils/logger.js";

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        logWithTime("Database connected");
        
    } catch (error) {
        logWithTime(error)
        logWithTime("Database not connected")
        
    }
}