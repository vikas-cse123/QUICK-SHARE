import express from "express"
import { googleCallbackController } from "../controllers/auth.controller.js"
const router = express.Router()


router.post("/google/callback",googleCallbackController)

export default router