import { Application } from "../models/application.model.js"
import { Job } from "../models/job.model.js"

export const applyJob = async (req, res) => {
    try {
        const userId = req.id
        const jobId = req.params.id
        if (!jobId){
            return res.status(400).json({
                message: "Job ID is required!",
                success: false
            })
        }
        const existingApplication = await Application.findOne({job: jobId, applicant: userId})
        if (existingApplication){
            return res.status(400).json({
                message: "You have already applied for this job!",
                success: false
            })
        }
        const job = await Job.findById(jobId)
        if (!job){
            return res.status(404).json({
                message: "Job not found!",
                success: false
            })
        }
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId  
        })
        job.applications.push(newApplication._id)
        await job.save()

        return res.status(201).json({
            message: "Job applied successfully!",
            success: true
        })
    } catch (error){
        return res.status(404).json({
            message: `Something went wrong! ${error}`,
            success: false
        })
    }
}

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id
        const application = await Application.find({applicant: userId}).sort({createdAt: -1}).populate({
            path: "job",
            options: {sort: {createdAt: -1}},
            populate: {
                path: "company",
                options: {sort: {createdAt: -1}}
            }
        })
        if (!application){
            return res.status(400).json({
                message: "No applications found!",
                success: false
            })
        }
        return res.status(200).json({
            application,
            success: true
        })
    } catch (error){
        return res.status(404).json({
            message: `Something went wrong! ${error}`,
            success: false
        })
    }
}

export const getApplications = async (req, res) => {
    try {
        
    } catch (error){
        return res.status(404).json({
            message: `Something went wrong! ${error}`,
            success: false
        })
    }
}