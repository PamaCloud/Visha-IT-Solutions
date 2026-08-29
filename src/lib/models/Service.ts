import mongoose, { Schema, Document } from "mongoose";

export interface IService extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon?: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);
