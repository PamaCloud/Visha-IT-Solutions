import { publicContentService } from "@/services/publicContentService";
import { serviceService } from "@/services/serviceService";
import Link from "next/link";
import { ArrowRight, Settings, LayoutGrid, Megaphone, Users2 } from "lucide-react";
import { Metadata } from "next";
import SlideUp from "@/components/animations/SlideUp";
import FadeIn from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "Our Services - Visha IT Solutions",
  description: "Explore our comprehensive IT, digital marketing, recruitment, and training services.",
};

// Helper function to map service slugs to specific icons if available
const getServiceIcon = (slug: string) => {
  if (slug.includes('ecommerce') || slug.includes('web')) return LayoutGrid;
  if (slug.includes('marketing') || slug.includes('seo')) return Megaphone;
  if (slug.includes('recruitment') || slug.includes('hr')) return Users2;
  return Settings; // Fallback
};

// Fallback mock data to ensure the grid always looks full and professional
const MOCK_SERVICES = [
  {
    _id: "mock-srv-1",
    slug: "ecommerce-development",
    title: "E-Commerce Development",
    shortDescription: "Build powerful, scalable, and secure e-commerce platforms that drive sales."
  },
  {
    _id: "mock-srv-2",
    slug: "digital-marketing",
    title: "Digital Marketing",
    shortDescription: "Data-driven marketing strategies to increase your visibility and ROI."
  },
  {
    _id: "mock-srv-3",
    slug: "it-recruitment",
    title: "IT Recruitment",
    shortDescription: "Connecting you with top-tier tech talent to scale your engineering teams."
  },
  {
    _id: "mock-srv-4",
    slug: "custom-software",
    title: "Custom Software",
    shortDescription: "Tailor-made software solutions designed specifically for your business logic."
  }
];

export default async function ServicesPage() {
  let services = await serviceService.getActiveServices();

  // If DB is empty or has too few items, use mock data to fill the grid
  if (!services || services.length < 3) {
    const existingSlugs = services.map((s: any) => s.slug);
    const missingMocks = MOCK_SERVICES.filter(m => !existingSlugs.includes(m.slug));
    services = [...services, ...missingMocks];
  }

  return (
    <div className="min-h-screen pb-20 relative overflow-hidden bg-surface">
      {/* Premium Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-br from-primary/10 via-blue-50 to-surface -z-10"></div>
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[100px] -z-10"></div>
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-primary"></div>
              <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-xs">
                WHAT WE DO
              </h2>
              <div className="w-8 h-[2px] bg-primary"></div>
            </div>
          </FadeIn>
          <SlideUp delay={0.1}>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-secondary mb-4 tracking-tight">
              Our Services
            </h1>
          </SlideUp>
          <SlideUp delay={0.2}>
            <p className="text-base md:text-lg text-secondary-light leading-relaxed max-w-2xl mx-auto">
              We offer end-to-end solutions to help your business thrive in the digital age. From concept to execution, we're with you every step of the way.
            </p>
          </SlideUp>
        </div>

        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service: any, idx: number) => {
              const Icon = getServiceIcon(service.slug);
              return (
                <SlideUp 
                  key={service._id || service.slug} 
                  delay={0.1 + (idx * 0.1)}
                  className="lg:[&:last-child:nth-child(3n+1)]:col-start-2 md:[&:last-child:nth-child(odd)]:col-span-2 md:[&:last-child:nth-child(odd)]:max-w-md md:[&:last-child:nth-child(odd)]:mx-auto w-full"
                >
                  <div className="h-full group relative bg-white/80 backdrop-blur-xl border border-white rounded-[1.5rem] p-6 md:p-8 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-400 overflow-hidden">
                    
                    {/* Glowing effect behind icon */}
                    <div className="absolute top-8 left-8 w-16 h-16 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-colors duration-500"></div>
                    
                    <div className="relative w-12 h-12 bg-white/80 border border-gray-100 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-primary group-hover:border-primary transition-all duration-300 z-10">
                      <Icon size={24} className="text-primary group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                    </div>
                    
                    <h3 className="text-xl font-bold font-display text-secondary mb-3 group-hover:text-primary transition-colors leading-tight relative z-10">{service.title}</h3>
                    <p className="text-secondary-light/90 text-sm mb-8 flex-grow leading-relaxed relative z-10">
                      {service.shortDescription}
                    </p>
                    
                    <Link href={`/services/${service.slug}`} className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-surface/80 border border-gray-100 text-secondary text-sm font-bold hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm hover:shadow-md group-hover:border-primary/20 relative z-10 group/btn">
                      {service.ctaText || "Learn More"}
                      <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </SlideUp>
              );
            })}
          </div>
        ) : (
          <FadeIn>
            <div className="text-center p-12 bg-white/70 backdrop-blur-xl rounded-3xl shadow-sm border border-white">
              <h4 className="text-lg font-medium text-secondary-light">Service information is being updated. Check back soon!</h4>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
}
