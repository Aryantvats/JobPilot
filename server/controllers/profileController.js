import Profile from "../models/Profile.js";

export const saveProfile = async (req, res) => {
  try {
    const {firstName,lastName,email,phone,careerObjective,education,workExperience,certifications,projects,skills,interestedRoles,githubLink,resumeDriveLink,} = req.body;

    const userId = req.user._id;

    const profile = await Profile.findOneAndUpdate(
      { userId },
      {
        firstName,
        lastName,
        email,
        phone,
        careerObjective,
        education,
        workExperience,
        certifications,
        projects,
        skills,
        interestedRoles,
        githubLink,
        resumeDriveLink,
      },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    res.set("Cache-Control", "no-store");

    const userId = req.user._id;

    let profile = await Profile.findOne({ userId });

    if (!profile) {
      profile = await Profile.create({
        userId,
        email: req.user.email,
      });
    }

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
