import mongoose, { Schema, Document } from "mongoose";

export interface IEnquiry extends Document {
  type: "project" | "contact" | "training";
  fullName: string;
  companyName?: string;
  email: string;
  phone: string;
  serviceRequired?: string;
  description: string;
  budgetRange?: string;
  preferredContactMethod?: "Email" | "Phone" | "WhatsApp";
  status: "new" | "in-progress" | "resolved" | "archived";
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema: Schema = new Schema(
  {
    type: { type: String, enum: ["project", "contact", "training"], required: true },
    fullName: { type: String, required: true },
    companyName: { type: String },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    serviceRequired: { type: String },
    description: { type: String, required: true },
    budgetRange: { type: String },
    preferredContactMethod: { type: String, enum: ["Email", "Phone", "WhatsApp"] },
    status: {
      type: String,
      enum: ["new", "in-progress", "resolved", "archived"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Enquiry || mongoose.model<IEnquiry>("Enquiry", EnquirySchema);
