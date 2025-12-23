import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["applicant", "recruiter"],
    required: true
  },
  profile: {
    bio:{type: String},
    skills:[{type: String}],
    profilePicture:{type: String, default: ""}, //URL for profile picture
    resume:{type: String}, //URL for resume file
    resumeOriginalName:{type: String},
    company:{type: mongoose.Schema.Types.ObjectId, ref: "Company"}, //relation between company schema and user schema
    gender:{type: String, enum: ["male", "female", "others"]}
  }
}, {timestamps: true})

export const User = mongoose.model("User", userSchema)