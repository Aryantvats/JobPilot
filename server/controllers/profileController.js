
import Profile from "../models/Profile.js";

// Create or update profile
export const saveProfile = async (req, res) => {
  try {
    const { personal, carrerObjective, education, workExperience, internships, extraCurricular, trainingCourses, projects, skills, portfolio, accomplishments, preferences } = req.body;
    const userId = req.user._id;
    let profile = await Profile.findOne({ userId });
    
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { userId },
        { firstName, lastName, email, phone, careerObjective, education, workExperience, certifications, projects, skills, interestedRoles, githubLink, resumeDriveLink },
        {new:true}
      )
    } else {
      profile = await Profile.create({
        userId, firstName, lastName, email, phone, careerObjective, education, workExperience, certifications, projects, skills, interestedRoles, githubLink, resumeDriveLink
      });
    }
    res.json({ success: true, profile });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const getProfile=async (req,res) => {
  try {
    const userId = req.user._id;
    const profile = await Profile.findOne({ userId });
    res.json({ success: true, profile });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

