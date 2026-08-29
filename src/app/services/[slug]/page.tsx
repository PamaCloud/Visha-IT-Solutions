import { serviceService } from "@/services/serviceService";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Metadata } from "next";
import SlideUp from "@/components/animations/SlideUp";
import FadeIn from "@/components/animations/FadeIn";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = await serviceService.getService(params.slug);
  if (!service) return { title: "Service Not Found" };
  
  return {
    title: `${service.title} - Visha IT Solutions`,
    description: service.shortDescription,
  };
}

// Generate beautiful mock data if the database doesn't have the slug yet
const getMockService = (slug: string) => {
  const safeSlug = slug || 'service';
  const formattedTitle = safeSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    title: formattedTitle,
    shortDescription: `Comprehensive ${formattedTitle} solutions designed to accelerate your business growth.`,
    description: `We deliver top-tier ${formattedTitle} services tailored specifically for modern enterprises. Our approach blends cutting-edge technology with deep industry expertise to ensure you achieve your strategic goals.\n\nWhether you are looking to scale your operations, enhance your digital presence, or streamline your workflows, our dedicated team of professionals is equipped to deliver exceptional results. We partner with you at every stage of the lifecycle, from initial consultation and strategic planning to execution and continuous support.\n\nKey Benefits:\n- Tailored strategies aligned with your business objectives\n- Access to a team of seasoned industry experts\n- Proven methodologies that guarantee quality and efficiency\n- 24/7 dedicated support and maintenance`,
  };
};

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  let service = await serviceService.getService(slug);

  // Fallback to mock data to prevent 404s during UI review
  if (!service) {
    service = getMockService(slug);
  }

  return (
    <div className="bg-surface min-h-screen pb-16">
      {/* Sleek, Compact Hero Section */}
      <div className="relative pt-28 pb-16 overflow-hidden bg-secondary">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary to-primary-dark opacity-95"></div>
          {/* Subtle light effects */}
          <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-primary/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-10 w-[20rem] h-[20rem] bg-blue-500/10 rounded-full blur-[80px]"></div>
        </div>

        <div className="container relative z-10 max-w-6xl mx-auto px-4 md:px-6">
          <FadeIn>
            <Link href="/services" className="inline-flex items-center gap-2 text-blue-200/70 hover:text-white transition-colors text-sm font-medium mb-6 group">
              <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
              Back to Services
            </Link>
          </FadeIn>

          <div className="max-w-4xl">
            <SlideUp>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-primary"></div>
                <span className="text-primary font-bold tracking-widest uppercase text-xs">Service Overview</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4 leading-tight">
                {service.title}
              </h1>
              <p className="text-lg text-blue-100/70 leading-relaxed max-w-2xl font-light">
                {service.shortDescription}
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
                  About this service
                </h2>
                <div className="prose prose-blue max-w-none text-secondary-light/90 text-base">
                  <div className="whitespace-pre-wrap leading-relaxed">{service.description}</div>
                </div>
              </div>
            </SlideUp>

            <SlideUp delay={0.2}>
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
                <h3 className="text-xl font-bold font-display text-secondary mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-primary rounded-full inline-block"></span>
                  Our Proven Process
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="group bg-surface/50 p-5 rounded-xl border border-gray-100/80 hover:border-primary/20 hover:bg-white transition-all shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center font-bold text-sm group-hover:bg-primary group-hover:text-white transition-colors">1</div>
                      <h4 className="font-bold text-secondary text-sm">Discovery & Strategy</h4>
                    </div>
                    <p className="text-xs text-secondary-light leading-relaxed pl-11">Understanding your core objectives and mapping a strategic plan.</p>
                  </div>
                  <div className="group bg-surface/50 p-5 rounded-xl border border-gray-100/80 hover:border-primary/20 hover:bg-white transition-all shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center font-bold text-sm group-hover:bg-primary group-hover:text-white transition-colors">2</div>
                      <h4 className="font-bold text-secondary text-sm">Design & Architecture</h4>
                    </div>
                    <p className="text-xs text-secondary-light leading-relaxed pl-11">Designing robust, scalable solutions aligned perfectly with goals.</p>
                  </div>
                  <div className="group bg-surface/50 p-5 rounded-xl border border-gray-100/80 hover:border-primary/20 hover:bg-white transition-all shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center font-bold text-sm group-hover:bg-primary group-hover:text-white transition-colors">3</div>
                      <h4 className="font-bold text-secondary text-sm">Execution & Delivery</h4>
                    </div>
                    <p className="text-xs text-secondary-light leading-relaxed pl-11">Implementing using agile methodologies for rapid, high-quality delivery.</p>
                  </div>
                  <div className="group bg-surface/50 p-5 rounded-xl border border-gray-100/80 hover:border-primary/20 hover:bg-white transition-all shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center font-bold text-sm group-hover:bg-primary group-hover:text-white transition-colors">4</div>
                      <h4 className="font-bold text-secondary text-sm">Support & Scaling</h4>
                    </div>
                    <p className="text-xs text-secondary-light leading-relaxed pl-11">Continuous monitoring and optimizations to fuel your growth post-launch.</p>
                  </div>
                </div>
              </div>
            </SlideUp>
          </div>

          {/* Right Column: Sticky Sidebar */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            <div className="sticky top-28 flex flex-col gap-6">
              
              <SlideUp delay={0.2}>
                <div className="bg-gradient-to-br from-primary to-primary-dark p-6 rounded-2xl shadow-lg text-white relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                  
                  <h3 className="text-xl font-bold font-display mb-2 relative z-10">Transform Your Business</h3>
                  <p className="text-blue-100/80 mb-6 text-sm leading-relaxed relative z-10">
                    Ready to see how our expertise can drive results for you?
                  </p>
                  
                  <Link href="/get-a-quote" className="inline-flex items-center justify-center gap-2 w-full py-3 bg-white text-primary font-bold text-sm rounded-xl hover:bg-gray-50 transition-all shadow-[0_4px_10px_rgba(0,0,0,0.1)] group/btn">
                    Get a Quote
                    <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </SlideUp>

              <SlideUp delay={0.3}>
                 <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
                   <h4 className="text-base font-bold text-secondary mb-4 flex items-center gap-2">
                     <CheckCircle2 className="text-primary" size={18} />
                     Why Choose Us
                   </h4>
                   <ul className="space-y-3">
                     <li className="flex items-start gap-2.5 text-secondary-light/90 text-sm">
                       <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0"></div>
                       <span>Expert team with deep industry experience</span>
                     </li>
                     <li className="flex items-start gap-2.5 text-secondary-light/90 text-sm">
                       <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0"></div>
                       <span>Tailored strategies for your unique goals</span>
                     </li>
                     <li className="flex items-start gap-2.5 text-secondary-light/90 text-sm">
                       <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0"></div>
                       <span>Proven track record of success</span>
                     </li>
                   </ul>
                 </div>
              </SlideUp>
              
              <SlideUp delay={0.4}>
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white text-center">
                  <h4 className="text-base font-bold font-display text-secondary mb-1">Need Immediate Help?</h4>
                  <p className="text-secondary-light/70 mb-4 text-xs">Our team is available 24/7 to answer your queries.</p>
                  <a href="tel:+919999999999" className="inline-flex items-center justify-center w-full py-2.5 bg-surface border border-gray-100 text-secondary text-sm font-bold rounded-xl hover:border-primary/20 hover:text-primary transition-all">
                    Call +91 9999999999
                  </a>
                </div>
              </SlideUp>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
