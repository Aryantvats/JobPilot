import mongoose from "mongoose";
import User from "./User.js";

const educationSchema = new mongoose.Schema({
  degree: String,
  branch: String,
  institute: String,
  startYear: Number,
  endYear: Number,
});

const courseSchema = new mongoose.Schema({
  title: String,
  platform: String,
  technologies: [String],
  year: Number,
});

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  technologies: [String],
  year: Number,
  link: String,
});

const portfolioSchema = new mongoose.Schema({
  title: String,
  link: String,
});

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required:true
    },
    personal: {
      firstName: { type: String, required: true },
      lastName: String,
      email: { type: String, required: true, unique: true },
      phone: { type: String, required: true },
      city: String,
      gender: { type: String, enum: ["Male", "Female", "Others"] },
      languages: [String],
      profilePicture: String, // file path or URL
    },
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
    internships: [
      {
        company: String,
        role: String,
        duration: String,
        description: String,
      },
    ],
    extraCurricular: [String],
    trainingsCourses: [courseSchema],
    projects: [projectSchema],
    skills: [String],
    portfolio: [portfolioSchema],
    accomplishments: [String],
    preferences: {
      areasOfInterest: [String],
      currentlyLookingFor: {
        type: String,
        enum: ["Jobs", "Internships"],
      },
      workMode: [String], // ["In-office", "Work from home"]
      preferredCities: [String],
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
