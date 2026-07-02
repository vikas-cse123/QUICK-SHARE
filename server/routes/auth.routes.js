import express from "express"
import { getCurrentUser, googleCallbackController, logout } from "../controllers/auth.controller.js"
const router = express.Router()


router.get("/google/callback",googleCallbackController)
router.get("/me",getCurrentUser)
router.post("/logout",logout)
export default router