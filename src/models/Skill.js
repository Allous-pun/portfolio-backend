import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a skill name"],
    },
    category: {
      type: String,
      enum: ["technical", "non-technical"],
      required: [true, "Please specify a skill category"],
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
      default: "Intermediate",
    },
    icon: {
      type: String, // URL or icon class name (e.g., "fa-react" or a local SVG)
    },
    description: {
      type: String, // Optional: describe how you use this skill
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Skill = mongoose.model("Skill", skillSchema);
export default Skill;
