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
import SlideUp from "@/components/animations/SlideUp";
import FadeIn from "@/components/animations/FadeIn";
import { VISHA_SERVICES, VishaServiceItem } from "@/data/vishaServices";

const iconMap: Record<string, any> = {
  Users,
  UserCheck,
  FileSpreadsheet,
  Megaphone,
  ShoppingCart,
  GraduationCap,
};

export default function ServicesPreview() {
  const services: VishaServiceItem[] = VISHA_SERVICES;

  return (
    <section className="section-padding bg-white relative overflow-hidden" id="services">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <div className="section-label justify-center mb-3">Our Core Expertise</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[hsl(210,29%,24%)] mb-5 tracking-tight">
            Comprehensive <span className="gradient-text">Technology & Talent</span> Solutions
          </h2>
          <p className="text-base sm:text-lg text-[hsl(207,14%,50%)] leading-relaxed">
            From modern staffing and HR operations to high-growth e-commerce platforms and performance marketing, we deliver end-to-end solutions for forward-thinking enterprises.
          </p>
        </FadeIn>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || Users;

            return (
              <SlideUp key={service.id} delay={index * 0.1}>
                <div className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-500 flex flex-col h-full overflow-hidden">
                  {/* Service Image Header */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Badge */}
                    {service.badge && (
                      <span className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[hsl(195,100%,25%)] shadow-sm">
                        {service.badge}
                      </span>
                    )}

                    {/* Floating Icon */}
                    <div className="absolute bottom-4 right-4 w-11 h-11 rounded-xl bg-white/95 backdrop-blur-md text-[hsl(195,100%,25%)] shadow-md flex items-center justify-center group-hover:bg-[hsl(195,100%,25%)] group-hover:text-white transition-colors duration-300">
                      <IconComponent className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 sm:p-7 flex flex-col flex-grow">
                    <h3 className="text-xl sm:text-2xl font-bold text-[hsl(210,29%,24%)] mb-2 tracking-tight group-hover:text-[hsl(195,100%,25%)] transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-sm text-[hsl(207,14%,50%)] mb-5 leading-relaxed">
                      {service.shortDescription}
                    </p>

                    {/* Sub-services Pills / Offerings */}
                    <div className="mb-6 pt-4 border-t border-gray-100 flex-grow">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                        Key Capabilities
                      </p>
                      <ul className="space-y-1.5">
                        {service.subServices.slice(0, 4).map((sub, sIdx) => (
                          <li key={sIdx} className="flex items-center gap-2 text-xs font-medium text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[hsl(195,100%,40%)] shrink-0" />
                            <span>{sub}</span>
                          </li>
                        ))}
                      </ul>
                      {service.subServices.length > 4 && (
                        <p className="text-[11px] font-semibold text-[hsl(195,100%,35%)] mt-2">
                          + {service.subServices.length - 4} more specialized offerings
                        </p>
                      )}
                    </div>

                    {/* Custom Requested CTA Button */}
                    <Link
                      href={`/services/${service.slug}`}
                      className="mt-auto flex items-center justify-center gap-2 w-full h-11 rounded-xl border border-slate-200 text-[hsl(210,29%,24%)] text-sm font-semibold hover:bg-[hsl(195,100%,25%)] hover:text-white hover:border-[hsl(195,100%,25%)] transition-all duration-300 group/btn shadow-2xs"
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

        {/* Bottom Contact Banner */}
        <FadeIn className="text-center mt-16 pt-8 border-t border-gray-100">
          <div className="inline-flex flex-wrap items-center justify-center gap-4 bg-slate-50 border border-slate-200/80 rounded-2xl px-6 py-4">
            <span className="text-sm font-medium text-slate-700">
              Need a customized enterprise solution or specialized staffing plan?
            </span>
            <Link
              href="/get-a-quote"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[hsl(195,100%,25%)] hover:text-[hsl(195,100%,40%)] hover:underline"
            >
              Get a Project Quote <ArrowRight size={14} />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
