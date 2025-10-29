import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email address"],
      match: [/.+\@.+\..+/, "Please enter a valid email"],
    },
    phone: {
      type: String,
      default: "",
    },

    // ✅ Supports 3 types
    type: {
      type: String,
      enum: ["general", "enquiry", "quotation"],
      default: "general",
    },

    subject: {
      type: String,
      default: "No subject",
    },

    message: {
      type: String,
      required: [true, "Message content is required"],
    },

    // ✅ Linked to Service model (for enquiry/quotation)
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      default: null,
    },

    // ✅ Quotation-only fields
    company: {
      type: String,
      default: "",
    },
    budgetRange: {
      type: String,
      default: "",
    },
    timeline: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["new", "in-progress", "resolved"],
      default: "new",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
