import mongoose, { Schema, Document } from "mongoose";

export interface IJobApplication extends Document {
  jobId: mongoose.Types.ObjectId;
  fullName: string;
  email: string;
  phone: string;
  currentLocation: string;
  experience: string;
  coverMessage: string;
  resumeUrl: string; // Internal path or S3 url
  status: "pending" | "reviewed" | "rejected" | "accepted";
  createdAt: Date;
  updatedAt: Date;
}

const JobApplicationSchema: Schema = new Schema(
  {
    jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    currentLocation: { type: String, required: true },
    experience: { type: String, required: true },
    coverMessage: { type: String, required: true },
    resumeUrl: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "reviewed", "rejected", "accepted"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.JobApplication ||
  mongoose.model<IJobApplication>("JobApplication", JobApplicationSchema);
