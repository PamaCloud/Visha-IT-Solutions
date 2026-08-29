import mongoose, { Schema, Document } from "mongoose";

export interface ISiteSetting extends Document {
  companyName: string;
  email: string;
  phone: string;
  address: string;
  whatsapp: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  seoDefaults: {
    title: string;
    description: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const SiteSettingSchema: Schema = new Schema(
  {
    companyName: { type: String, required: true, default: "Visha IT Solutions" },
    email: { type: String, required: true, default: "contact@vishait.com" },
    phone: { type: String, required: true, default: "+91 9999999999" },
    address: { type: String, required: true, default: "Hyderabad, India" },
    whatsapp: { type: String, default: "+91 9999999999" },
    socialLinks: {
      facebook: { type: String },
      twitter: { type: String },
      linkedin: { type: String },
      instagram: { type: String },
    },
    seoDefaults: {
      title: { type: String, default: "Visha IT Solutions" },
      description: { type: String, default: "Technology. Talent. Solutions." },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.SiteSetting ||
  mongoose.model<ISiteSetting>("SiteSetting", SiteSettingSchema);
