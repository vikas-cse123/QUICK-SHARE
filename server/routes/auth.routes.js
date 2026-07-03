import express from "express"
import { fetchUser, getCurrentUser, googleCallbackController, logout } from "../controllers/auth.controller.js"
const router = express.Router()


router.get("/google/callback",googleCallbackController)
router.get("/me",getCurrentUser)
router.post("/logout",logout)
router.get("/user/:userId",fetchUser)
export default router