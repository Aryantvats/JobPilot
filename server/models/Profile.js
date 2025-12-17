import mongoose from "mongoose";
import User from "./User.js";

const educationSchema = new mongoose.Schema({
  degree: String,
  branch: String,
  year: Number,
});



const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required:true
    },
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    careerObjective: String,
    education: [educationSchema],
    workExperience: [
      {
        company: String,
        role: String,
        duration: String,
        description: String,
      },
    ],
    certifications: String,
    projects: String,
    skills: String,
    interestedRoles: String,
    githubLink: String,
    resumeDriveLink: String,
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
