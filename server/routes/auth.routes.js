import express from "express"
import { getCurrentUser, googleCallbackController } from "../controllers/auth.controller.js"
const router = express.Router()


router.get("/google/callback",googleCallbackController)
router.get("/me",getCurrentUser)
export default router