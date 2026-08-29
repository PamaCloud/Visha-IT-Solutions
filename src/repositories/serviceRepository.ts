import connectToDatabase from "@/lib/mongoose";
import Service, { IService } from "@/lib/models/Service";

export class ServiceRepository {
  async getAllActiveServices(): Promise<IService[]> {
    await connectToDatabase();
    return Service.find({ isActive: true }).sort({ order: 1 }).lean();
  }

  async getServiceBySlug(slug: string): Promise<IService | null> {
    await connectToDatabase();
    return Service.findOne({ slug, isActive: true }).lean();
  }

  // Admin methods
  async getAllServices(): Promise<IService[]> {
    await connectToDatabase();
    return Service.find().sort({ order: 1 }).lean();
  }
}

export const serviceRepository = new ServiceRepository();
