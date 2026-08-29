import mongoose, { Schema, Document } from "mongoose";

export interface ITrainingProgram extends Document {
  title: string;
  slug: string;
  description: string;
  duration: string;
  eligibility: string;
  mode: string;
  curriculum: string;
  projectDetails: string;
  fee?: string;
  startDate?: Date;
  status: "upcoming" | "ongoing" | "completed";
  isActive: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TrainingProgramSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    eligibility: { type: String, required: true },
    mode: { type: String, required: true },
    curriculum: { type: String, required: true },
    projectDetails: { type: String, required: true },
    fee: { type: String },
    startDate: { type: Date },
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed"],
      default: "upcoming",
    },
    isActive: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.TrainingProgram ||
  mongoose.model<ITrainingProgram>("TrainingProgram", TrainingProgramSchema);
