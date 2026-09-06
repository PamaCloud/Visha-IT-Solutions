import mongoose, { Schema, Document } from "mongoose";

export interface IJobApplication extends Document {
  jobId?: mongoose.Types.ObjectId | string;
  position?: string;
  firstName?: string;
  lastName?: string;
  fullName: string;
  email: string;
  phone: string;
  currentCompany?: string;
  linkedin?: string;
  portfolio?: string;
  experienceLevel?: string;
  coverLetter?: string;
  resumeUrl: string;
  resumeName?: string;
  status: "New" | "Shortlisted" | "Under Review" | "Interview Scheduled" | "Hired" | "Rejected" | "pending" | "reviewed" | "accepted";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const JobApplicationSchema: Schema = new Schema(
  {
    jobId: { type: Schema.Types.Mixed },
    position: { type: String, default: "General Application" },
    firstName: { type: String },
    lastName: { type: String },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    currentCompany: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    portfolio: { type: String, default: "" },
    experienceLevel: { type: String, default: "Fresher (0–1y)" },
    coverLetter: { type: String, default: "" },
    resumeUrl: { type: String, required: true },
    resumeName: { type: String, default: "resume.pdf" },
    status: {
      type: String,
      enum: [
        "New",
        "Shortlisted",
        "Under Review",
        "Interview Scheduled",
        "Hired",
        "Rejected",
        "pending",
        "reviewed",
        "accepted",
      ],
      default: "New",
    },
    notes: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.JobApplication ||
  mongoose.model<IJobApplication>("JobApplication", JobApplicationSchema);
