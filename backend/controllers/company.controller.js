import { Company } from "../models/company.model.js"
import cloudinary from "../utils/cloudinary.js"
import getDataUri from "../utils/data.js"

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
    const { name, description, website, location } = req.body;
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found!"
      });
    }
    if (name) company.name = name;
    if (description) company.description = description;
    if (location) company.location = location;
    if (website) company.website = website;

    if (req.file) {
      const fileURI = getDataUri(req.file);

      if (fileURI) {
        const cloudResponse = await cloudinary.uploader.upload(
          fileURI.content,
          { folder: "company-logos" }
        );
        company.logo = cloudResponse.secure_url;
      }
    }
    await company.save();
    return res.status(200).json({
      success: true,
      message: "Company details updated!",
      company
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}