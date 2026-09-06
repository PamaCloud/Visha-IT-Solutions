export interface VishaProjectItem {
  id: string;
  slug: string;
  title: string;
  clientName?: string;
  category?: string;
}

export const VISHA_PROJECTS: VishaProjectItem[] = [
  {
    id: "global-ecommerce-platform",
    slug: "global-ecommerce-platform",
    title: "Global E-Commerce Platform",
    clientName: "RetailCorp Inc.",
    category: "E-Commerce",
  },
  {
    id: "fintech-dashboard",
    slug: "fintech-dashboard",
    title: "FinTech Analytics Dashboard",
    clientName: "SecureBank",
    category: "Financial Tech",
  },
  {
    id: "healthcare-booking-system",
    slug: "healthcare-booking-system",
    title: "Healthcare Booking System",
    clientName: "MediCare Clinics",
    category: "Healthcare",
  },
  {
    id: "logistics-erp",
    slug: "logistics-erp",
    title: "Logistics ERP System",
    clientName: "FastTrack Logistics",
    category: "Enterprise",
  },
  {
    id: "corporate-hr-portal",
    slug: "corporate-hr-portal",
    title: "Corporate HR Portal",
    clientName: "Enterprise Solutions LLC",
    category: "HR & Operations",
  },
  {
    id: "ai-customer-support-bot",
    slug: "ai-customer-support-bot",
    title: "AI Support Bot & Analytics",
    clientName: "OmniTech Global",
    category: "Artificial Intelligence",
  },
];
