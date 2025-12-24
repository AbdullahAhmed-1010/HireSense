import express from "express"
import authentication from "../middlewares/authentication.js"
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js"


const router = express.Router()

router.route("/post").post(authentication, postJob)
router.route("/get").get(authentication, getAllJobs)
router.route("/get/:id").get(authentication, getJobById)
router.route("/admin").get(authentication, getAdminJobs)

export default router