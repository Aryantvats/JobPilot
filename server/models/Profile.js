import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // always required

  // Basic Info
  phone: { type: String, required: true },  
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  dob: { type: Date },

  education: [
    {
      college: { type: String, required: true },
      degree: { type: String, required: true },
      branch: { type: String },
      startYear: Number,
      endYear: Number,
      cgpa: Number,
    }
  ],

  preferences: {
    workType: { type: String, enum: ["Remote", "In-office", "Hybrid"], required: true },
    availability: { type: String, enum: ["Full-time", "Part-time"], required: true },
    startDate: { type: Date, required: true },
    duration: { type: String }, // e.g. "6 months"
  },

  skills: { type: [String], required: true }, // Internshala asks skills list

  
  experience: [
    {
      company: String,
      role: String,
      duration: String,
      description: String,
    }
  ],

  resume: {
    type: String, 
    required: true, 
  },

  github: {
    type: String, 
    required: true, 
  },
  linkedin: {
    type: String, 
    required: true, 
  },
  portfolio: String,

  // Extra
  bio: String,
  achievements: [String],
}, { timestamps: true });


const Profile = mongoose.model("Profile", profileSchema);
export default Profile;