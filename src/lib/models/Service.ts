import mongoose, { Schema, Document } from "mongoose";

export interface IService extends Document {
  title: string;
  slug: string;
  badge?: string;
  shortDescription: string;
  description: string;
  iconName?: string;
  subServices?: string[];
  features?: string[];
  ctaText?: string;
  ctaLink?: string;
  image?: string;
  deliverables?: Array<{
    title: string;
    description: string;
    points: string[];
  }>;
  benefits?: Array<{
    title: string;
    description: string;
    iconName: string;
  }>;
  steps?: Array<{
    step: string;
    title: string;
    description: string;
  }>;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    badge: { type: String },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    iconName: { type: String, default: "Users" },
    subServices: [{ type: String }],
    features: [{ type: String }],
    ctaText: { type: String, default: "Learn More →" },
    ctaLink: { type: String },
    image: { type: String, default: "/services/website-development.jpg" },
    deliverables: [
      {
        title: { type: String },
        description: { type: String },
        points: [{ type: String }],
      },
    ],
    benefits: [
      {
        title: { type: String },
        description: { type: String },
        iconName: { type: String },
      },
    ],
    steps: [
      {
        step: { type: String },
        title: { type: String },
        description: { type: String },
      },
    ],
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);
