// src/models/Profile.js
import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    company: String,
    role: String,
    location: String,
    startDate: Date,
    endDate: Date,
    isCurrent: Boolean,
    description: String,
  },
  { _id: false }
);

const educationSchema = new mongoose.Schema(
  {
    school: String,
    degree: String,
    fieldOfStudy: String,
    startDate: Date,
    endDate: Date,
    description: String,
  },
  { _id: false }
);

const certificateSchema = new mongoose.Schema(
  {
    name: String,
    issuingOrganization: String,
    issueDate: Date,
    expirationDate: Date,
    credentialId: String,
    credentialUrl: String,
  },
  { _id: false }
);

const languageSchema = new mongoose.Schema(
  {
    language: String,
    proficiency: String, // Beginner, Intermediate, Fluent, Native
  },
  { _id: false }
);

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    title: { type: String, required: true },
    tagline: String,
    bio: String,
    location: String,

    // links
    website: String,
    github: String,
    linkedin: String,
    twitter: String,

    // ✅ renamed field for better clarity
    profileImage: { type: String, default: "" },

    experience: [experienceSchema],
    education: [educationSchema],
    certificates: [certificateSchema],
    languages: [languageSchema],
    interests: [String],
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
