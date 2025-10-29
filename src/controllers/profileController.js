// src/controllers/profileController.js
import Profile from "../models/Profile.js";

/**
 * ✅ PUBLIC — Anyone can view your profile (no authentication required)
 * GET /api/profile
 */
export const getPublicProfile = async (req, res) => {
  try {
    // Since you are the ONLY user, just return the first profile
    const profile = await Profile.findOne().populate("user", ["name", "email"]);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * ✅ PRIVATE — Create or update profile (upsert = create if doesn't exist)
 * POST /api/profile
 */
export const createOrUpdateProfile = async (req, res) => {
  try {
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: req.body },
      { new: true, upsert: true } // ✅ create if not exists
    );

    res.status(200).json({
      success: true,
      profile: updatedProfile,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * ✅ PRIVATE — Update only if profile exists
 * PUT /api/profile
 */
export const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile does not exist",
      });
    }

    const updated = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      profile: updated,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * ✅ PRIVATE — Delete profile
 * DELETE /api/profile
 */
export const deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    await Profile.deleteOne({ user: req.user.id });

    res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
