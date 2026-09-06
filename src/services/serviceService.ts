import { serviceRepository } from "@/repositories/serviceRepository";
import { VISHA_SERVICES, VishaServiceItem } from "@/data/vishaServices";

export class ServiceService {
  async getActiveServices(): Promise<any[]> {
    try {
      const services = await serviceRepository.getAllActiveServices();
      if (services && services.length > 0) {
        return JSON.parse(JSON.stringify(services));
      }
      return VISHA_SERVICES;
    } catch (error) {
      console.warn("MongoDB connection failed or empty, using VISHA_SERVICES data:", error);
      return VISHA_SERVICES;
    }
  }

  async getService(slug: string): Promise<any | null> {
    const staticMatch = VISHA_SERVICES.find((s) => s.slug === slug || s.id === slug);
    try {
      const service = await serviceRepository.getServiceBySlug(slug);
      if (service) {
        const parsed = JSON.parse(JSON.stringify(service));
        if (staticMatch) {
          return {
            ...staticMatch,
            ...parsed,
            image:
              parsed.image && typeof parsed.image === "string" && parsed.image.trim() !== ""
                ? parsed.image
                : staticMatch.image,
          };
        }
        return parsed;
      }
      return staticMatch || null;
    } catch (error) {
      console.warn(`MongoDB fetch failed for service ${slug}, checking VISHA_SERVICES:`, error);
      return staticMatch || null;
    }
  }
}

export const serviceService = new ServiceService();
