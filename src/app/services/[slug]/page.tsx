import { serviceService } from "@/services/serviceService";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Phone, Mail } from "lucide-react";
import { Metadata } from "next";
import SlideUp from "@/components/animations/SlideUp";
import FadeIn from "@/components/animations/FadeIn";
import { VISHA_SERVICES } from "@/data/vishaServices";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const service = await serviceService.getService(resolvedParams.slug);
  if (!service) return { title: "Service Not Found - Visha IT Solutions" };

  return {
    title: `${service.title} - Visha IT Solutions`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const service = await serviceService.getService(slug);

  if (!service) {
    notFound();
  }

  const subServices = service.subServices || service.features || [];
  const features = service.features || [];

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-24 overflow-hidden bg-gradient-to-br from-[hsl(195,100%,25%)] via-[#007090] to-[hsl(195,100%,35%)] text-white">
        <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[20rem] h-[20rem] bg-[hsl(195,100%,50%)]/15 rounded-full blur-[80px] pointer-events-none" />

        <div className="container relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium mb-6 group"
            >
              <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
              Back to All Services
            </Link>
          </FadeIn>

          <div className="max-w-3xl">
            <SlideUp>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-white/90 text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles size={13} className="text-[hsl(190,100%,42%)]" />
                Visha Enterprise Solutions
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight tracking-tight">
                {service.title}
              </h1>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed font-light">
                {service.shortDescription}
              </p>
            </SlideUp>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left / Main Column */}
          <div className="lg:w-2/3 flex flex-col gap-8">
            {/* Service Cover Image */}
            {service.image && (
              <SlideUp delay={0.05}>
                <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-slate-100">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </SlideUp>
            )}

            {/* Overview / Description */}
            <SlideUp delay={0.1}>
              <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-[hsl(210,29%,24%)] mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[hsl(195,100%,25%)] rounded-full inline-block" />
                  Service Overview
                </h2>
                <div className="text-[hsl(207,14%,50%)] text-base leading-relaxed whitespace-pre-wrap">
                  {service.description}
                </div>
              </div>
            </SlideUp>

            {/* Included Capabilities / Sub-services */}
            {subServices.length > 0 && (
              <SlideUp delay={0.15}>
                <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
                  <h3 className="text-xl font-bold text-[hsl(210,29%,24%)] mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-[hsl(195,100%,25%)] rounded-full inline-block" />
                    Specialized Capabilities & Offerings
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {subServices.map((sub: string, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100/80 p-3.5 rounded-xl border border-slate-100 transition-colors"
                      >
                        <CheckCircle2 className="text-[hsl(195,100%,25%)] shrink-0" size={17} />
                        <span className="text-sm font-semibold text-slate-700">{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </SlideUp>
            )}

            {/* Key Strategic Advantages */}
            {features.length > 0 && (
              <SlideUp delay={0.2}>
                <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
                  <h3 className="text-xl font-bold text-[hsl(210,29%,24%)] mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-[hsl(195,100%,25%)] rounded-full inline-block" />
                    Key Business Advantages
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {features.map((feat: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50/70 border border-slate-100">
                        <ShieldCheck className="text-[hsl(195,100%,35%)] shrink-0 mt-0.5" size={18} />
                        <span className="text-sm text-slate-700">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </SlideUp>
            )}
          </div>

          {/* Right Column / Sticky CTA Sidebar */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            <div className="sticky top-28 flex flex-col gap-6">
              {/* Primary Action Card */}
              <SlideUp delay={0.2}>
                <div className="bg-gradient-to-br from-[hsl(195,100%,25%)] via-[#007090] to-[hsl(195,100%,35%)] p-7 rounded-2xl text-white relative overflow-hidden shadow-lg">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/20 uppercase tracking-wider mb-4 inline-block">
                    Get Started Today
                  </span>
                  <h3 className="text-2xl font-bold mb-3 leading-snug">
                    Ready to Scale with {service.title}?
                  </h3>
                  <p className="text-white/80 mb-6 text-sm leading-relaxed">
                    Connect with our dedicated experts to build a tailored plan that fits your exact requirements.
                  </p>
                  <Link
                    href={`/contact?service=${service.slug}`}
                    className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-white text-[hsl(195,100%,25%)] font-bold text-sm rounded-xl hover:bg-slate-100 transition-all shadow-md group/btn"
                  >
                    <span>{service.ctaText || "Get Started"}</span>
                    <ArrowRight size={15} className="transform group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </SlideUp>

              {/* Quick Contact Box */}
              <SlideUp delay={0.3}>
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <h4 className="text-base font-bold text-[hsl(210,29%,24%)] mb-4">
                    Have Questions?
                  </h4>
                  <div className="space-y-3 text-sm">
                    <Link
                      href="/contact"
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-slate-700 font-medium"
                    >
                      <Mail size={16} className="text-[hsl(195,100%,25%)]" />
                      <span>Contact Us Online</span>
                    </Link>
                    <Link
                      href="/get-a-quote"
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-slate-700 font-medium"
                    >
                      <Sparkles size={16} className="text-[hsl(195,100%,25%)]" />
                      <span>Request a Custom Quote</span>
                    </Link>
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
