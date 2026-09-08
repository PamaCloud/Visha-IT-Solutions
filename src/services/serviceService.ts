import { serviceRepository } from "@/repositories/serviceRepository";
import { VISHA_SERVICES, VishaServiceItem } from "@/data/vishaServices";

export class ServiceService {
  async getActiveServices(): Promise<any[]> {
    try {
      const services = await serviceRepository.getAllActiveServices();
      if (services && services.length > 0) {
        // Merge with rich definitions from VISHA_SERVICES
        return services.map((s: any) => {
          const parsed = JSON.parse(JSON.stringify(s));
          const match = VISHA_SERVICES.find((v) => v.slug === parsed.slug || v.id === parsed.slug);
          if (match) {
            return {
              ...match,
              ...parsed,
              deliverables: (parsed.deliverables && parsed.deliverables.length > 0) ? parsed.deliverables : match.deliverables,
              benefits: (parsed.benefits && parsed.benefits.length > 0) ? parsed.benefits : match.benefits,
              steps: (parsed.steps && parsed.steps.length > 0) ? parsed.steps : match.steps,
              ctaHeadline: parsed.ctaHeadline || match.ctaHeadline,
              ctaSubtext: parsed.ctaSubtext || match.ctaSubtext,
              ctaButtonText: parsed.ctaButtonText || match.ctaButtonText,
              ctaButtonLink: parsed.ctaButtonLink || match.ctaButtonLink,
              heroPrimaryText: parsed.heroPrimaryText || match.heroPrimaryText,
              heroPrimaryLink: parsed.heroPrimaryLink || match.heroPrimaryLink,
              heroSecondaryText: parsed.heroSecondaryText || match.heroSecondaryText,
              heroSecondaryLink: parsed.heroSecondaryLink || match.heroSecondaryLink,
              image:
                parsed.image && typeof parsed.image === "string" && parsed.image.trim() !== ""
                  ? parsed.image
                  : match.image,
            };
          }
          return parsed;
        });
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
            deliverables: (parsed.deliverables && parsed.deliverables.length > 0) ? parsed.deliverables : staticMatch.deliverables,
            benefits: (parsed.benefits && parsed.benefits.length > 0) ? parsed.benefits : staticMatch.benefits,
            steps: (parsed.steps && parsed.steps.length > 0) ? parsed.steps : staticMatch.steps,
            ctaHeadline: parsed.ctaHeadline || staticMatch.ctaHeadline,
            ctaSubtext: parsed.ctaSubtext || staticMatch.ctaSubtext,
            ctaButtonText: parsed.ctaButtonText || staticMatch.ctaButtonText,
            ctaButtonLink: parsed.ctaButtonLink || staticMatch.ctaButtonLink,
            heroPrimaryText: parsed.heroPrimaryText || staticMatch.heroPrimaryText,
            heroPrimaryLink: parsed.heroPrimaryLink || staticMatch.heroPrimaryLink,
            heroSecondaryText: parsed.heroSecondaryText || staticMatch.heroSecondaryText,
            heroSecondaryLink: parsed.heroSecondaryLink || staticMatch.heroSecondaryLink,
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
