
import Profile from "../models/Profile.js";

// Create or update profile
export const createProfile = async (req, res) => {
  try {
    const { phone, education, preferences, skills, gender, dob, experience, github, linkedin, portfolio, bio, achievements } = req.body;

    // Check required fields
    if (!phone || !education || !preferences || !skills) {
      return res.json({ success: false, message: "Please fill all required fields" });
    }

    if (!req.file) {
      return res.json({ success: false, message: "Resume file is required" });
    }

    // Parse JSON strings if sent as form-data
    const edu = typeof education === "string" ? JSON.parse(education) : education;
    const prefs = typeof preferences === "string" ? JSON.parse(preferences) : preferences;
    const skillList = typeof skills === "string" ? JSON.parse(skills) : skills;
    const achList = achievements ? (typeof achievements === "string" ? JSON.parse(achievements) : achievements) : [];

    // Check if profile already exists
    const existingProfile = await Profile.findOne({ user: req.user.id });

    if (existingProfile) {
      // Update profile
      existingProfile.phone = phone;
      existingProfile.education = edu;
      existingProfile.preferences = prefs;
      existingProfile.skills = skillList;
      existingProfile.gender = gender || existingProfile.gender;
      existingProfile.dob = dob || existingProfile.dob;
      existingProfile.experience = experience || existingProfile.experience;
      existingProfile.github = github || existingProfile.github;
      existingProfile.linkedin = linkedin || existingProfile.linkedin;
      existingProfile.portfolio = portfolio || existingProfile.portfolio;
      existingProfile.bio = bio || existingProfile.bio;
      existingProfile.achievements = achList.length ? achList : existingProfile.achievements;
      existingProfile.resume = req.file.path; // replace resume

      await existingProfile.save();
      return res.json({ success: true, message: "Profile updated", profile: existingProfile });
    }

    // Create new profile
    const newProfile = await Profile.create({
      user: req.user.id,
      phone,
      education: edu,
      preferences: prefs,
      skills: skillList,
      gender,
      dob,
      experience,
      github,
      linkedin,
      portfolio,
      bio,
      achievements: achList,
      resume: req.file.path,
    });

    res.json({ success: true, message: "Profile created", profile: newProfile });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
