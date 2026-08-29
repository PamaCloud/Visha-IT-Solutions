import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  slug: string;
  category: string;
  description: string;
  technologies: string[];
  image?: string;
  outcome: string;
  projectUrl?: string;
  featured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    technologies: { type: [String], default: [] },
    image: { type: String },
    outcome: { type: String, required: true },
    projectUrl: { type: String },
    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
