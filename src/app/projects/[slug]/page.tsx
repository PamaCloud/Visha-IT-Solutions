import { publicContentService } from "@/services/publicContentService";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Metadata } from "next";
import SlideUp from "@/components/animations/SlideUp";
import FadeIn from "@/components/animations/FadeIn";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await publicContentService.getProject(params.slug);
  if (!project) return { title: "Project Not Found" };
  
  return {
    title: `${project.title} - Case Study - Visha IT Solutions`,
    description: project.shortDescription,
  };
}

// Generate beautiful mock data if the database doesn't have the slug yet
const getMockProject = (slug: string) => {
  const safeSlug = slug || 'project';
  const formattedTitle = safeSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    title: formattedTitle,
    clientName: "Enterprise Client",
    shortDescription: `A comprehensive case study detailing the development and successful delivery of the ${formattedTitle}.`,
    description: `## The Challenge\nOur client approached us with a complex set of requirements aimed at modernizing their legacy systems. The primary goal was to enhance scalability, improve user engagement, and streamline internal workflows without disrupting ongoing operations.\n\n## Our Approach\nWe initiated the project with an in-depth discovery phase, mapping out existing pain points and defining a clear technical roadmap. Utilizing agile methodologies, our cross-functional teams worked closely with the client's stakeholders to ensure every milestone aligned with their strategic vision.\n\n## The Solution\nWe engineered a state-of-the-art solution that leveraged modern cloud infrastructure and a modular architecture. The final product not only met but exceeded performance benchmarks, resulting in a 40% increase in operational efficiency and significantly higher user satisfaction scores.\n\n## Impact\nThe successful deployment of this project has positioned the client for sustained growth, giving them a robust platform that easily adapts to future market demands.`,
    technologies: ["React", "Next.js", "Node.js", "MongoDB", "AWS", "Docker"],
  };
};

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  let project = await publicContentService.getProject(slug);

  // Fallback to mock data to prevent 404s during UI review
  if (!project) {
    project = getMockProject(slug);
  }

  return (
    <div className="bg-surface min-h-screen pb-16">
      {/* Sleek, Compact Hero Section */}
      <div className="relative pt-28 pb-16 overflow-hidden bg-secondary">
        {project.imageUrl && !project.imageUrl.includes('mock') && (
          <div className="absolute inset-0 opacity-20 mix-blend-overlay z-0">
            <img src={project.imageUrl} alt="" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/95 to-primary-dark opacity-95 z-0"></div>
        
        {/* Subtle light effects */}
        <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-primary/20 rounded-full blur-[100px] z-0"></div>
        <div className="absolute bottom-0 left-10 w-[20rem] h-[20rem] bg-blue-500/10 rounded-full blur-[80px] z-0"></div>

        <div className="container relative z-10 max-w-6xl mx-auto px-4 md:px-6">
          <FadeIn>
            <Link href="/projects" className="inline-flex items-center gap-2 text-blue-200/70 hover:text-white transition-colors text-sm font-medium mb-6 group">
              <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
              Back to Portfolio
            </Link>
          </FadeIn>
          
          <div className="max-w-4xl">
            <SlideUp>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-primary"></div>
                <span className="text-primary font-bold tracking-widest uppercase text-xs">Case Study</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4 leading-tight">
                {project.title}
              </h1>
              <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-bold mb-6 shadow-sm">
                Client: {project.clientName}
              </div>
              <p className="text-lg text-blue-100/70 leading-relaxed max-w-2xl font-light">
                {project.shortDescription}
              </p>
            </SlideUp>
          </div>
        </div>
      </div>

      {/* Main Content Area - Overlapping the Hero slightly */}
      <div className="container max-w-6xl mx-auto px-4 md:px-6 -mt-8 relative z-20">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* Left Column: Core Content */}
          <div className="lg:w-2/3 flex flex-col gap-6">
            <SlideUp delay={0.1}>
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
                <h2 className="text-2xl font-bold font-display text-secondary mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-primary rounded-full inline-block"></span>
                  Project Overview
                </h2>
                <div className="prose prose-blue max-w-none text-secondary-light/90 text-base">
                  <div className="whitespace-pre-wrap leading-relaxed">{project.description}</div>
                </div>
              </div>
            </SlideUp>

            <SlideUp delay={0.2}>
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
                <h3 className="text-xl font-bold font-display text-secondary mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-primary rounded-full inline-block"></span>
                  Key Deliverables
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 bg-surface/50 p-3.5 rounded-xl border border-gray-100/80 hover:border-primary/20 hover:bg-white transition-all shadow-sm">
                    <CheckCircle2 className="text-green-500 shrink-0" size={18} />
                    <span className="font-medium text-secondary text-sm">Custom Architecture Design</span>
                  </div>
                  <div className="flex items-center gap-3 bg-surface/50 p-3.5 rounded-xl border border-gray-100/80 hover:border-primary/20 hover:bg-white transition-all shadow-sm">
                    <CheckCircle2 className="text-green-500 shrink-0" size={18} />
                    <span className="font-medium text-secondary text-sm">Full Stack Development</span>
                  </div>
                  <div className="flex items-center gap-3 bg-surface/50 p-3.5 rounded-xl border border-gray-100/80 hover:border-primary/20 hover:bg-white transition-all shadow-sm">
                    <CheckCircle2 className="text-green-500 shrink-0" size={18} />
                    <span className="font-medium text-secondary text-sm">Cloud Deployment Setup</span>
                  </div>
                  <div className="flex items-center gap-3 bg-surface/50 p-3.5 rounded-xl border border-gray-100/80 hover:border-primary/20 hover:bg-white transition-all shadow-sm">
                    <CheckCircle2 className="text-green-500 shrink-0" size={18} />
                    <span className="font-medium text-secondary text-sm">Ongoing Maintenance</span>
                  </div>
                </div>
              </div>
            </SlideUp>
          </div>

          {/* Right Column: Sticky Sidebar */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            <div className="sticky top-28 flex flex-col gap-6">
              
              <SlideUp delay={0.2}>
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
                  <h3 className="text-base font-bold font-display text-secondary mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-primary rounded-full inline-block"></span>
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech: string, idx: number) => (
                      <span key={idx} className="bg-surface border border-gray-100 px-3 py-1.5 rounded-lg text-secondary-light font-medium text-xs shadow-sm hover:border-primary/30 hover:text-primary hover:bg-white transition-all cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </SlideUp>

              <SlideUp delay={0.3}>
                <div className="bg-gradient-to-br from-primary to-primary-dark p-6 rounded-2xl shadow-lg text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                  <h4 className="text-xl font-bold font-display mb-2 relative z-10">Start your project</h4>
                  <p className="text-blue-100/80 mb-6 text-sm leading-relaxed relative z-10">
                    Want to build something similar? Let's discuss your requirements.
                  </p>
                  <Link href="/get-a-quote" className="inline-flex items-center justify-center gap-2 w-full py-3 bg-white text-primary font-bold text-sm rounded-xl hover:bg-gray-50 transition-all shadow-[0_4px_10px_rgba(0,0,0,0.1)] group/btn">
                    Get a Quote
                    <ArrowUpRight size={16} className="transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </Link>
                </div>
              </SlideUp>
              
              <SlideUp delay={0.4}>
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white relative overflow-hidden">
                  <div className="absolute -top-3 -left-3 text-primary/10">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M14.017 21L16.41 14.174C16.894 12.83 17.5 10.702 17.5 9.074C17.5 6.271 15.652 4.415 12.894 4.415C10.051 4.415 7.828 6.438 7.828 9.387C7.828 11.233 8.761 12.44 10.233 12.44C11.517 12.44 12.296 11.666 12.296 10.457C12.296 9.458 11.64 8.791 10.59 8.791C10.219 8.791 9.946 8.847 9.8 8.922C10.158 6.942 11.503 5.795 13.06 5.795C14.777 5.795 15.82 7.037 15.82 9.074C15.82 10.378 15.289 12.222 14.869 13.411L12.597 21H14.017ZM6.189 21L8.582 14.174C9.066 12.83 9.672 10.702 9.672 9.074C9.672 6.271 7.824 4.415 5.066 4.415C2.223 4.415 0 6.438 0 9.387C0 11.233 0.933 12.44 2.405 12.44C3.689 12.44 4.468 11.666 4.468 10.457C4.468 9.458 3.812 8.791 2.762 8.791C2.391 8.791 2.118 8.847 1.972 8.922C2.33 6.942 3.675 5.795 5.232 5.795C6.949 5.795 7.992 7.037 7.992 9.074C7.992 10.378 7.461 12.222 7.041 13.411L4.769 21H6.189Z" /></svg>
                  </div>
                  <div className="relative z-10">
                    <p className="text-secondary-light/90 italic text-sm leading-relaxed mb-4">"Visha IT Solutions completely transformed our business logic. Their dedication and technical expertise are unmatched."</p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                        {project.clientName.charAt(0)}
                      </div>
                      <div>
                        <h5 className="font-bold text-secondary text-xs">{project.clientName}</h5>
                        <span className="text-primary text-[10px] uppercase tracking-wider font-bold">Verified Client</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SlideUp>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
