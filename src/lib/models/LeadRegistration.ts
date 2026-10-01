import mongoose, { Schema, Document } from "mongoose";

export interface ILeadRegistration extends Document {
  userType: "client" | "candidate";
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  industry?: string;
  experienceLevel?: string;
  requirement?: string;
  resumeUrl?: string;
  resumeName?: string;
  status: "new" | "contacted" | "in-discussion" | "converted" | "archived";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadRegistrationSchema: Schema = new Schema(
  {
    userType: {
      type: String,
      enum: ["client", "candidate"],
      required: true,
      default: "client",
      index: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    companyName: {
      type: String,
      trim: true,
      default: "",
    },
    industry: {
      type: String,
      trim: true,
      default: "",
    },
    experienceLevel: {
      type: String,
      trim: true,
      default: "",
    },
    requirement: {
      type: String,
      trim: true,
      default: "",
    },
    resumeUrl: {
      type: String,
      default: "",
    },
    resumeName: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["new", "contacted", "in-discussion", "converted", "archived"],
      default: "new",
      index: true,
    },
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.LeadRegistration ||
  mongoose.model<ILeadRegistration>("LeadRegistration", LeadRegistrationSchema);
