import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  slug: string;
  clientName: string;
  category: string;
  badge?: string;
  shortDescription: string;
  description: string;
  image?: string;
  technologies: string[];
  metrics: string[];
  deliverables: string[];
  outcome: string;
  projectUrl?: string;
  featured: boolean;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    clientName: { type: String, default: "Enterprise Client" },
    category: { type: String, required: true },
    badge: { type: String, default: "Featured Project" },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: "/services/ecommerce-solutions.jpg" },
    technologies: { type: [String], default: [] },
    metrics: { type: [String], default: [] },
    deliverables: { type: [String], default: [] },
    outcome: { type: String, required: true },
    projectUrl: { type: String },
    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
