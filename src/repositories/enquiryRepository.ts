import connectToDatabase from "@/lib/mongoose";
import Enquiry, { IEnquiry } from "@/lib/models/Enquiry";

export class EnquiryRepository {
  async createEnquiry(data: Partial<IEnquiry>): Promise<IEnquiry> {
    await connectToDatabase();
    return await Enquiry.create(data);
  }

  async getEnquiriesByType(type: "project" | "contact" | "training"): Promise<IEnquiry[]> {
    await connectToDatabase();
    return Enquiry.find({ type }).sort({ createdAt: -1 }).lean();
  }
}

export const enquiryRepository = new EnquiryRepository();
