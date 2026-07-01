import express from "express"
import { googleCallbackController } from "../controllers/auth.controller.js"
const router = express.Router()


router.get("/google/callback",googleCallbackController)

export default router