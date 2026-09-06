import mongoose, { Schema, Document } from "mongoose";

export interface ITrainingProgram extends Document {
  title: string;
  slug: string;
  badge?: string;
  shortDescription: string;
  description: string;
  duration: string;
  mode: string;
  level: string;
  technologies: string[];
  syllabus: string[];
  modules?: Array<{
    title: string;
    badge: string;
    description: string;
    points: string[];
  }>;
  careerRoles?: string[];
  image?: string;
  eligibility?: string;
  curriculum?: string;
  projectDetails?: string;
  fee?: string;
  startDate?: Date;
  status: "upcoming" | "ongoing" | "completed";
  isActive: boolean;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const TrainingProgramSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    badge: { type: String, default: "Professional Track" },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    mode: { type: String, default: "Hybrid (Online + Lab)" },
    level: { type: String, default: "Beginner to Enterprise" },
    technologies: { type: [String], default: [] },
    syllabus: { type: [String], default: [] },
    modules: [
      {
        title: { type: String },
        badge: { type: String },
        description: { type: String },
        points: [{ type: String }],
      },
    ],
    careerRoles: { type: [String], default: [] },
    image: { type: String, default: "/services/training-and-career-development.jpg" },
    eligibility: { type: String, default: "Graduates & Working Professionals" },
    curriculum: { type: String, default: "Comprehensive Modular Roadmap" },
    projectDetails: { type: String, default: "Live Production Capstone Projects" },
    fee: { type: String },
    startDate: { type: Date },
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed"],
      default: "upcoming",
    },
    isActive: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.TrainingProgram ||
  mongoose.model<ITrainingProgram>("TrainingProgram", TrainingProgramSchema);
