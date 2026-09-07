'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Users,
  UserCheck,
  FileSpreadsheet,
  Megaphone,
  ShoppingCart,
  GraduationCap,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { VISHA_SERVICES } from '@/data/vishaServices';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users className="w-4 h-4 text-[#0284c7]" />,
  UserCheck: <UserCheck className="w-4 h-4 text-[#0284c7]" />,
  FileSpreadsheet: <FileSpreadsheet className="w-4 h-4 text-[#0284c7]" />,
  Megaphone: <Megaphone className="w-4 h-4 text-[#0284c7]" />,
  ShoppingCart: <ShoppingCart className="w-4 h-4 text-[#0284c7]" />,
  GraduationCap: <GraduationCap className="w-4 h-4 text-[#0284c7]" />,
};

export default function ServicesPreview() {
  const liveServices = useRealtimeSync('/api/public/services', VISHA_SERVICES);

  // Duplicate items 3x for a seamless infinite loop
  const marqueeItems = [...liveServices, ...liveServices, ...liveServices];

  return (
    <section className="py-14 bg-gradient-to-b from-slate-50 via-white to-slate-50/80 relative overflow-hidden border-y border-slate-100">
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />

      {/* Centered Header Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-[#0369a1] border border-sky-200 mb-3 mx-auto">
          <Sparkles className="w-3.5 h-3.5 text-[#0284c7]" />
          <span>CORE CAPABILITIES</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          Enterprise Services &amp; Solutions
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          End-to-end technology, talent, and digital transformation built for high-growth enterprises.
        </p>
        <div className="mt-3">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0369a1] hover:text-[#0284c7] group transition-colors"
          >
            <span>View all services</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Low-Height Continuous Auto-scrolling Marquee */}
      <div className="relative w-full overflow-hidden py-1">
        {/* Left & Right gradient fade masks for smooth transition */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        {/* Marquee Track */}
        <div className="animate-marquee flex gap-4 w-max cursor-pointer">
          {marqueeItems.map((service: any, index: number) => {
            const icon = iconMap[service.iconName] || (
              <ShieldCheck className="w-4 h-4 text-[#0284c7]" />
            );

            const subList = Array.isArray(service.subServices) && service.subServices.length > 0
              ? service.subServices
              : ["Enterprise Architecture", "Dedicated Support"];

            return (
              <div
                key={`${service.slug || service.id || service._id}-${index}`}
                className="group relative w-[300px] sm:w-[340px] h-[160px] bg-white rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-sky-300 transition-all duration-300 flex flex-col justify-between p-3.5 flex-shrink-0 overflow-hidden"
              >
                {/* Brand top accent highlight on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Top Row: Icon + Badge + Mini image thumbnail */}
                <div className="flex items-start justify-between gap-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center flex-shrink-0 text-[#0284c7] group-hover:bg-[#0284c7] group-hover:text-white transition-colors">
                      {icon}
                    </div>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100/80">
                      {service.badge || "Enterprise Grade"}
                    </span>
                  </div>

                  <div className="relative w-12 h-8 rounded-md overflow-hidden border border-slate-100 flex-shrink-0 shadow-inner bg-slate-100">
                    <Image
                      src={service.image || "/services/website-development.jpg"}
                      alt={service.title}
                      fill
                      sizes="48px"
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Middle: Title & 1-line Description */}
                <div className="my-0.5">
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0369a1] transition-colors line-clamp-1">
                    {service.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                    {service.shortDescription || service.description}
                  </p>
                </div>

                {/* Bottom Row: Key capability & Direct Link */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 truncate max-w-[210px]">
                    <span className="font-medium text-slate-600 truncate">
                      {subList[0]}
                    </span>
                    {subList.length > 1 && (
                      <>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-400">+{subList.length - 1} more</span>
                      </>
                    )}
                  </div>

                  <Link
                    href={`/services#${service.slug}`}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0284c7] hover:text-[#0369a1] flex-shrink-0 group-hover:translate-x-0.5 transition-all"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
