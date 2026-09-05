import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Users,
  UserCheck,
  FileSpreadsheet,
  Megaphone,
  ShoppingCart,
  GraduationCap,
  CheckCircle2,
} from "lucide-react";
import { Metadata } from "next";
import SlideUp from "@/components/animations/SlideUp";
import FadeIn from "@/components/animations/FadeIn";
import { VISHA_SERVICES, VishaServiceItem } from "@/data/vishaServices";

export const metadata: Metadata = {
  title: "Our Services - Visha IT Solutions",
  description:
    "Explore our 6 core services: Recruitment & Staffing, Talent Acquisition, Payroll & HR Services, Digital Marketing, E-Commerce Solutions, and Training & Career Development.",
};

const iconMap: Record<string, any> = {
  Users,
  UserCheck,
  FileSpreadsheet,
  Megaphone,
  ShoppingCart,
  GraduationCap,
};

export default function ServicesPage() {
  const services: VishaServiceItem[] = VISHA_SERVICES;

  return (
    <div className="min-h-screen pb-24 bg-white">
      {/* Header Banner */}
      <div className="relative pt-16 pb-20 bg-gradient-to-br from-[hsl(195,100%,25%)] via-[#007090] to-[hsl(195,100%,35%)] text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[hsl(195,100%,50%)]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white/90 text-xs font-semibold tracking-wider uppercase mb-4">
              End-to-End Enterprise Capabilities
            </div>
          </FadeIn>
          <SlideUp delay={0.1}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Our Core <span className="text-[hsl(190,100%,42%)]">Services</span>
            </h1>
          </SlideUp>
          <SlideUp delay={0.2}>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
              Empowering organizations with world-class recruitment, compliant HR & payroll infrastructure, high-converting digital marketing, robust e-commerce, and hands-on career training.
            </p>
          </SlideUp>
        </div>
      </div>

      {/* Services Listing Section */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const IconComponent = iconMap[service.iconName] || Users;

            return (
              <SlideUp key={service.id} delay={0.1 + idx * 0.1}>
                <div className="group bg-white rounded-3xl border border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all duration-500 flex flex-col h-full overflow-hidden">
                  {/* Service Cover Image */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                    {/* Badge */}
                    {service.badge && (
                      <span className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full bg-white/95 text-[hsl(195,100%,25%)] shadow-md">
                        {service.badge}
                      </span>
                    )}

                    {/* Icon Floating */}
                    <div className="absolute bottom-4 right-4 w-11 h-11 rounded-xl bg-white text-[hsl(195,100%,25%)] shadow-lg flex items-center justify-center group-hover:bg-[hsl(195,100%,25%)] group-hover:text-white transition-colors duration-300">
                      <IconComponent className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-7 flex flex-col flex-grow">
                    <h2 className="text-2xl font-bold text-[hsl(210,29%,24%)] mb-3 tracking-tight group-hover:text-[hsl(195,100%,25%)] transition-colors">
                      {service.title}
                    </h2>

                    <p className="text-sm text-[hsl(207,14%,50%)] mb-6 leading-relaxed">
                      {service.shortDescription}
                    </p>

                    {/* Sub-services / Offerings */}
                    <div className="pt-4 border-t border-gray-100 mb-6 flex-grow">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                        Included Offerings
                      </h3>
                      <div className="grid grid-cols-1 gap-2">
                        {service.subServices.map((sub, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[hsl(195,100%,35%)] shrink-0" />
                            <span>{sub}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link
                      href={`/services/${service.slug}`}
                      className="mt-auto flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-slate-50 border border-slate-200 text-[hsl(210,29%,24%)] text-sm font-semibold hover:bg-[hsl(195,100%,25%)] hover:text-white hover:border-[hsl(195,100%,25%)] transition-all duration-300 group/btn"
                    >
                      <span>{service.ctaText}</span>
                      <ArrowRight size={14} className="transform group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </SlideUp>
            );
          })}
        </div>
      </div>
    </div>
  );
}
