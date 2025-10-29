import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Client name is required"],
      trim: true,
    },
    company: {
      type: String,
      default: "",
      trim: true,
    },
    role: {
      type: String,
      default: "",
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Testimonial message is required"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    avatar: {
      type: String,
      default: "",
    },
    isApproved: {
      type: Boolean,
      default: false, // Admin must approve before showing on frontend
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // allow anonymous submission
    },
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", testimonialSchema);
