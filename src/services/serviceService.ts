import { serviceRepository } from "@/repositories/serviceRepository";

export class ServiceService {
  async getActiveServices() {
    try {
      const services = await serviceRepository.getAllActiveServices();
      // Transform to plain objects for Server Components to avoid serialization issues
      return JSON.parse(JSON.stringify(services));
    } catch (error) {
      console.error("Error fetching active services:", error);
      return [];
    }
  }

  async getService(slug: string) {
    try {
      const service = await serviceRepository.getServiceBySlug(slug);
      return service ? JSON.parse(JSON.stringify(service)) : null;
    } catch (error) {
      console.error(`Error fetching service ${slug}:`, error);
      return null;
    }
  }
}

export const serviceService = new ServiceService();
