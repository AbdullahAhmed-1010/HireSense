import { Company } from "../models/company.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerCompany = async (req, res) => {
    try {
        const { companyName, description, location, companyWebsite } = req.body
        if (!companyName || !description || !location || !companyWebsite){
            return res.status(400).json({
                message: "Please provide valid informations!",
                success: false
            })
        }
        let company = await Company.findOne({name: companyName})
        if (company){
            return res.status(400).json({
                message: "You can not register a company with same name!",
                success: false
            })
        }
        let website = await Company.findOne({website: companyWebsite})
        if (website){
            return res.status(400).json({
                message: "You don't want your users to scroll through some other's website!",
                success: false
            })
        }
        company = await Company.create({
            name: companyName,
            description: description,
            location: location,
            website: companyWebsite,
            userId: req.id
        })

        return res.status(201).json({
            message: "Company registered successfully!",
            company,
            success: true
        })
    } catch (error){
        return res.status(404).json({
            message: `Something went wrong! ${error}`,
            success: false
        })
    }
}

export const getCompany = async (req, res) => {
    try {
        const userId = req.id //logged in userId
        const companies = await Company.find({userId})
        if (!companies){
            return res.status(404).json({
                message: "Companies not found!",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success: true
        })
    } catch (error){
        return res.status(404).json({
            message: `Something went wrong! ${error}`,
            success: false
        })
    }
}

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id
        const company = await Company.findById(companyId)
        if(!company) {
            return res.status(404).json({
                message: "Company not found!",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error){
        return res.status(404).json({
            message: `Something went wrong! ${error}`,
            success: false
        })
    }
}

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body
        const file = req.file
        //cloudinary

        const updateData = { name, description, website, location }
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {new: true})
        if(!company) {
            return res.status(404).json({
                message: "Company not found!",
                success: false
            })
        }
        return res.status(200).json({
            message: "Company details updated!",
            company,
            success: true
        })
    } catch (error){
        
    }
}