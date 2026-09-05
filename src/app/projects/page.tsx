import { publicContentService } from "@/services/publicContentService";
import Link from "next/link";
import { FolderGit2, ArrowUpRight } from "lucide-react";
import { Metadata } from "next";
import SlideUp from "@/components/animations/SlideUp";
import FadeIn from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "Projects & Portfolio - Visha IT Solutions",
  description: "Explore our recent success stories and client projects.",
};

// Fallback mock data to ensure the grid always looks full and professional
const MOCK_PROJECTS = [
  {
    _id: "mock-proj-1",
    slug: "global-ecommerce-platform",
    title: "Global E-Commerce Platform",
    clientName: "RetailCorp Inc.",
    shortDescription: "A high-performance scalable e-commerce solution handling 10k+ concurrent users.",
    imageUrl: "/projects/ecommerce.jpg"
  },
  {
    _id: "mock-proj-2",
    slug: "fintech-dashboard",
    title: "FinTech Analytics Dashboard",
    clientName: "SecureBank",
    shortDescription: "Real-time data visualization and secure financial reporting portal.",
    imageUrl: "/projects/fintech.jpg"
  },
  {
    _id: "mock-proj-3",
    slug: "healthcare-booking-system",
    title: "Healthcare Booking System",
    clientName: "MediCare Clinics",
    shortDescription: "HIPAA-compliant patient portal for appointment scheduling and telemedicine.",
    imageUrl: "/projects/healthcare.jpg"
  },
  {
    _id: "mock-proj-4",
    slug: "logistics-erp",
    title: "Logistics ERP System",
    clientName: "FastTrack Logistics",
    shortDescription: "End-to-end enterprise resource planning for supply chain management.",
    imageUrl: "/projects/erp.jpg"
  }
];

export default async function ProjectsPage() {
  let projects = await publicContentService.getActiveProjects();

  // If DB is empty or has too few items, use mock data to fill the grid
  if (!projects || projects.length < 3) {
    const existingSlugs = projects.map((p: any) => p.slug);
    const missingMocks = MOCK_PROJECTS.filter(m => !existingSlugs.includes(m.slug));
    projects = [...projects, ...missingMocks];
  }

  return (
    <div className="min-h-screen pb-20 relative overflow-hidden bg-surface">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-full h-[600px] bg-gradient-to-bl from-primary/10 via-blue-50/50 to-surface -z-10"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px] -z-10"></div>
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-36">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-primary"></div>
              <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-xs">
                PORTFOLIO
              </h2>
              <div className="w-8 h-[2px] bg-primary"></div>
            </div>
          </FadeIn>
          <SlideUp delay={0.1}>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-secondary mb-4 tracking-tight">
              Our Work
            </h1>
          </SlideUp>
          <SlideUp delay={0.2}>
            <p className="text-base md:text-lg text-secondary-light leading-relaxed max-w-2xl mx-auto">
              We take pride in delivering exceptional digital solutions. Browse through some of our recent projects and success stories.
            </p>
          </SlideUp>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8">
            {projects.map((project: any, idx: number) => (
              <SlideUp 
                key={project._id || project.slug} 
                delay={0.1 + (idx * 0.1)}
                className="lg:col-span-2 lg:[&:nth-last-child(2):nth-child(3n+1)]:col-start-2 lg:[&:last-child:nth-child(3n+1)]:col-start-3 md:[&:last-child:nth-child(odd)]:col-span-2 md:[&:last-child:nth-child(odd)]:max-w-md md:[&:last-child:nth-child(odd)]:mx-auto w-full"
              >
                <Link href={`/projects/${project.slug}`} className="group block h-full">
                  <div className="h-full bg-white/80 backdrop-blur-xl border border-white rounded-[1.5rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-400 flex flex-col relative">
                    
                    {/* Decorative glowing orb behind content */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-500 z-0"></div>

                    {/* Content Area */}
                    <div className="p-6 md:p-8 flex flex-col flex-grow relative z-10">
                      
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-blue-50 border border-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 text-primary">
                          <FolderGit2 size={24} strokeWidth={1.5} />
                        </div>
                        
                        {/* Floating action button */}
                        <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center border border-gray-100 shadow-sm group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 text-gray-400">
                          <ArrowUpRight size={20} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </div>

                      <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                        {project.clientName || 'Client Project'}
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-bold font-display text-secondary mb-3 group-hover:text-primary transition-colors leading-tight">
                        {project.title}
                      </h3>
                      
                      <p className="text-secondary-light/90 text-sm mb-8 flex-grow leading-relaxed">
                        {project.shortDescription}
                      </p>
                      
                      <div className="pt-6 border-t border-gray-100 flex items-center justify-between mt-auto">
                        <div className="text-primary text-sm font-bold flex items-center gap-1.5 group-hover:gap-2 transition-all">
                          View Case Study <span aria-hidden="true">&rarr;</span>
                        </div>
                        {project.category && (
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50 px-2 py-1 rounded-md">
                            {project.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </SlideUp>
            ))}
          </div>
        ) : (
          <FadeIn>
            <div className="text-center p-12 bg-white/70 backdrop-blur-xl rounded-3xl shadow-sm border border-white">
              <h4 className="text-lg font-medium text-secondary-light">Portfolio updates coming soon!</h4>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
}
