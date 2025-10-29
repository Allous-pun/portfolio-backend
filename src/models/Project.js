import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a project title"],
    },
    description: {
      type: String,
      required: [true, "Please add a project description"],
    },
    technologies: {
      type: [String],
      default: [],
    },
    githubLink: {
      type: String,
    },
    liveDemo: {
      type: String,
    },
    image: {
      type: String, // URL for project thumbnail
    },
    featured: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
