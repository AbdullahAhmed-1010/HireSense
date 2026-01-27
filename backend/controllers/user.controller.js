import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/data.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({ success: false, message: "Invalid data" })
    }

    const exists = await User.findOne({ email })
    if (exists) {
      return res.status(400).json({ success: false, message: "User exists" })
    }

    let profilePicture = ""
    if (req.file) {
      const fileURI = getDataUri(req.file)
      const cloudResponse = await cloudinary.uploader.upload(
        fileURI.content,
        { folder: "avatars" }
      )
      profilePicture = cloudResponse.secure_url
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: { profilePicture }
    })
    return res.status(201).json({
      success: true,
      user
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Please provide valid informations!",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password!",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password!",
        success: false,
      });
    }
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role!",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
        secure: false
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    return res.status(404).json({
      message: `Something went wrong! ${error}`,
      success: false,
    });
  }
}

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully!",
      success: true,
    });
  } catch (error) {
    return res.status(404).json({
      message: `Something went wrong! ${error}`,
      success: false,
    });
  }
}

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills, gender } = req.body
    const userId = req.id

    let user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    if (fullname) user.fullname = fullname
    if (email) user.email = email
    if (phoneNumber) user.phoneNumber = phoneNumber
    if (bio) user.profile.bio = bio
    if (gender) user.profile.gender = gender
    if (skills) user.profile.skills = skills.split(",")

    if (req.files?.avatar) {
      const avatarUri = getDataUri(req.files.avatar[0])
      const avatarUpload = await cloudinary.uploader.upload(
        avatarUri.content,
        {
          folder: "avatars",
          resource_type: "image"
        }
      )
      user.profile.profilePicture = avatarUpload.secure_url
    }

    if (req.files?.resume) {
      const resumeUri = getDataUri(req.files.resume[0])
      const resumeUpload = await cloudinary.uploader.upload(
        resumeUri.content,
        {
          folder: "resumes",
          resource_type: "raw"
        }
      )
      user.profile.resume = resumeUpload.secure_url
      user.profile.resumeOriginalName = req.files.resume[0].originalname
    }

    await user.save()
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}