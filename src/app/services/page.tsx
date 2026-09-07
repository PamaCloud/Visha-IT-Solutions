import Link from "next/link";
import { Sparkles, ShieldCheck, Clock, Award, Headphones } from "lucide-react";
import { Metadata } from "next";
import SlideUp from "@/components/animations/SlideUp";
import FadeIn from "@/components/animations/FadeIn";
import ServicesLiveCatalog from "@/components/services/ServicesLiveCatalog";
import { readPersistedFile, initialCmsServices } from "@/lib/cmsStorage";
import connectToDatabase from "@/lib/mongoose";
import Service from "@/lib/models/Service";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Enterprise Services - Visha IT Solutions",
  description:
    "Explore our core enterprise services: Recruitment & Staffing, Talent Acquisition, Payroll & HR Services, Digital Marketing, E-Commerce Solutions, and Training & Career Development.",
};

export default async function ServicesPage() {
  let services: any[] = readPersistedFile<any>("services.json", initialCmsServices);

  try {
    await connectToDatabase();
    const dbServices = await Service.find({ isActive: true }).sort({ order: 1 }).lean();
    const validDb = dbServices.filter(
      (s: any) => !['wheel-alignment', 'wheel-balancing', 'new-tyre-services', 'battery-replacement-jump-start'].includes(s.slug)
    );
    if (validDb && validDb.length > 0) {
      const map = new Map();
      services.forEach((s: any) => map.set(s.slug || s._id, s));
      validDb.forEach((s: any) => map.set(s.slug || s._id.toString(), {
        ...s,
        id: s._id.toString(),
      }));
      services = Array.from(map.values());
    }
  } catch (err) {
    console.error("Error loading services dynamically from DB:", err);
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Hero Banner */}
      <div className="relative pt-28 sm:pt-32 lg:pt-36 pb-28 sm:pb-32 bg-gradient-to-br from-[hsl(195,100%,22%)] via-[#006994] to-[hsl(195,100%,32%)] text-white overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-cyan-200 text-xs font-semibold tracking-wider uppercase mb-5 border border-white/10">
              <Sparkles size={13} className="text-cyan-300" />
              Strategic Enterprise Capabilities
            </div>
          </FadeIn>

          <SlideUp delay={0.1}>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Enterprise <span className="text-[hsl(190,100%,50%)]">Services &amp; Solutions</span>
            </h1>
          </SlideUp>

          <SlideUp delay={0.2}>
            <p className="text-base sm:text-lg lg:text-xl text-white/85 max-w-3xl mx-auto font-light leading-relaxed mb-10">
              From high-velocity talent recruitment and automated payroll to performance digital marketing and scalable commerce architectures, we empower high-growth enterprises worldwide.
            </p>
          </SlideUp>

          {/* Value Props Bar */}
          <SlideUp delay={0.3}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-white/15">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <ShieldCheck size={20} className="text-cyan-300 mx-auto mb-2" />
                <div className="text-sm sm:text-base font-bold text-white">100% SLA Guarantee</div>
                <div className="text-xs text-cyan-100/70">Rigorous quality benchmarks</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <Clock size={20} className="text-cyan-300 mx-auto mb-2" />
                <div className="text-sm sm:text-base font-bold text-white">72-Hr Turnaround</div>
                <div className="text-xs text-cyan-100/70">Rapid candidate shortlisting</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <Award size={20} className="text-cyan-300 mx-auto mb-2" />
                <div className="text-sm sm:text-base font-bold text-white">500+ Projects</div>
                <div className="text-xs text-cyan-100/70">Delivered across 14 countries</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <Headphones size={20} className="text-cyan-300 mx-auto mb-2" />
                <div className="text-sm sm:text-base font-bold text-white">24/7 PM Support</div>
                <div className="text-xs text-cyan-100/70">Dedicated delivery managers</div>
              </div>
            </div>
          </SlideUp>
        </div>
      </div>

      {/* Live Services Catalog with Real-time synchronization */}
      <ServicesLiveCatalog initialServices={services} />
    </div>
  );
}
