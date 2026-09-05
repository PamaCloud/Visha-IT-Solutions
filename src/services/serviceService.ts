import { serviceRepository } from "@/repositories/serviceRepository";
import { VISHA_SERVICES, VishaServiceItem } from "@/data/vishaServices";

export class ServiceService {
  async getActiveServices(): Promise<any[]> {
    try {
      const services = await serviceRepository.getAllActiveServices();
      if (services && services.length >= 4) {
        return JSON.parse(JSON.stringify(services));
      }
      return VISHA_SERVICES;
    } catch (error) {
      console.warn("MongoDB connection failed or empty, using VISHA_SERVICES data:", error);
      return VISHA_SERVICES;
    }
  }

  async getService(slug: string): Promise<any | null> {
    try {
      const service = await serviceRepository.getServiceBySlug(slug);
      if (service) {
        return JSON.parse(JSON.stringify(service));
      }
      const match = VISHA_SERVICES.find((s) => s.slug === slug || s.id === slug);
      return match || null;
    } catch (error) {
      console.warn(`MongoDB fetch failed for service ${slug}, checking VISHA_SERVICES:`, error);
      const match = VISHA_SERVICES.find((s) => s.slug === slug || s.id === slug);
      return match || null;
    }
  }
}

export const serviceService = new ServiceService();
