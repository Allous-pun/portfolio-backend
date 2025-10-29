import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a service title"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a service description"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a base price for this service"],
    },
    duration: {
      type: String,
      default: "Flexible",
      trim: true,
    },
    category: {
      type: String,
      enum: ["design", "development", "consulting", "other"],
      default: "other",
    },
    image: {
      type: String,
      default: "https://via.placeholder.com/300x200.png?text=Service",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
