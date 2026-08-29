import mongoose, { Schema, Document } from "mongoose";

export interface IJob extends Document {
  title: string;
  slug: string;
  location: string;
  experienceRequired: string;
  type: string;
  department: string;
  description: string;
  requirements: string[];
  skills: string[];
  status: "open" | "closed";
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    experienceRequired: { type: String, required: true },
    type: { type: String, required: true },
    department: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: [String], required: true },
    skills: { type: [String], default: [] },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Job || mongoose.model<IJob>("Job", JobSchema);
