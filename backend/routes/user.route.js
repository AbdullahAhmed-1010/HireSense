import express from "express"
import { login, logout, register, updateProfile } from "../controllers/user.controller.js"
import authentication from "../middlewares/authentication.js"
import { singleUpload } from "../middlewares/multer.js"

const router = express.Router()

router.route("/register").post(singleUpload, register)
router.route("/login").post(login)
router.route("/profile/update").post(authentication, updateProfile)
router.route("/logout").get(logout)

export default router