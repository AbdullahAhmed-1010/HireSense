import express from "express"
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js"
import authentication from "../middlewares/authentication.js"

const router = express.Router()

router.route("/apply/:id").get(authentication, applyJob)
router.route("/get").get(authentication, getAppliedJobs)
router.route("/:id/applicant").get(authentication, getApplicants)
router.route("/status/:id/update").post(authentication, updateStatus)

export default router