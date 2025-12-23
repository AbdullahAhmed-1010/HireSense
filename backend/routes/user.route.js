import express from "express"
import { login, register, updateProfile } from "../controllers/user.controller.js"
import authentication from "../middlewares/authentication.js"

const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/profile/update").post(authentication, updateProfile)

export default router