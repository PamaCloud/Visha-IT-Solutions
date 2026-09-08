'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Users,
  UserCheck,
  FileSpreadsheet,
  Megaphone,
  ShoppingCart,
  GraduationCap,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import SlideUp from '@/components/animations/SlideUp';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';

const iconMap: Record<string, any> = {
  Users,
  UserCheck,
  FileSpreadsheet,
  Megaphone,
  ShoppingCart,
  GraduationCap,
};

export default function ServicesLiveCatalog({ initialServices }: { initialServices: any[] }) {
  const services = useRealtimeSync('/api/public/services', initialServices);

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service: any, idx: number) => {
          const IconComponent = iconMap[service.iconName] || Users;
          const subList = Array.isArray(service.subServices) && service.subServices.length > 0
            ? service.subServices
            : ["Enterprise Architecture", "Dedicated Support"];

          return (
            <SlideUp key={service.slug || service.id || service._id || idx} delay={0.1 + (idx % 3) * 0.1}>
              <div className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_12px_35px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-500 flex flex-col h-full overflow-hidden">
                {/* Top Image Container */}
                <div className="relative h-60 w-full overflow-hidden rounded-t-[2.5rem] bg-slate-900">
                  <Image
                    src={service.image || "/services/website-development.jpg"}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {service.badge && (
                    <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full bg-white/95 text-[hsl(195,100%,25%)] shadow-md backdrop-blur-md">
                      {service.badge}
                    </span>
                  )}

                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 text-cyan-300">
                    <IconComponent size={20} />
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 sm:p-8 flex flex-col flex-grow">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[hsl(195,100%,25%)] transition-colors mb-3">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6 line-clamp-3">
                    {service.shortDescription || service.description}
                  </p>

                  <div className="mb-8 flex-grow">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                      Core Capabilities
                    </h4>
                    <div className="grid grid-cols-1 gap-2.5">
                      {subList.slice(0, 4).map((sub: string, sIdx: number) => (
                        <div key={sIdx} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                          <span>{sub}</span>
                        </div>
                      ))}
                      {subList.length > 4 && (
                        <div className="text-xs font-medium text-slate-400 pl-6">
                          +{subList.length - 4} more specialized offerings
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={`/services/${service.slug}`}
                    className="w-full h-12 rounded-full border border-slate-200 bg-slate-50/80 text-slate-800 text-sm font-semibold hover:bg-[hsl(195,100%,25%)] hover:text-white hover:border-[hsl(195,100%,25%)] transition-all duration-300 shadow-xs flex items-center justify-center gap-2 group/btn mt-auto"
                  >
                    <span>{(service.ctaText || "Explore Service").replace(/[\s\u2192\->]+$/, "").trim()}</span>
                    <ArrowRight size={15} className="transform group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </SlideUp>
          );
        })}
      </div>
    </div>
  );
}
