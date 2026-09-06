import { Metadata } from "next";
import ClassicQuoteCard from "@/components/forms/ClassicQuoteCard";
import SlideUp from "@/components/animations/SlideUp";
import FadeIn from "@/components/animations/FadeIn";
import { ShieldCheck, Clock, Award, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Get an Enterprise Advisory & Quote - Visha IT Solutions",
  description:
    "Request a free consultation and project quote for software development, IT training, recruitment, digital marketing, or HR services.",
};

export default function GetAQuotePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-cyan-50/20 to-white pt-28 sm:pt-32 lg:pt-36 pb-24 relative overflow-hidden">
      {/* Decorative ambient glowing backdrops */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[hsl(195,100%,35%)]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header Badge & Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[hsl(195,100%,25%)]/10 text-[hsl(195,100%,25%)] text-xs font-bold tracking-wider uppercase mb-3">
              <Sparkles size={13} />
              Enterprise Consultation
            </div>
          </FadeIn>
          <SlideUp delay={0.1}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
              Request Your Solution Quote
            </h1>
          </SlideUp>
          <SlideUp delay={0.2}>
            <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed">
              Connect with our enterprise solution directors for a tailored roadmap, feasibility assessment, and transparent estimate.
            </p>
          </SlideUp>
        </div>

        {/* The Classic Form Card (Screenshot 2 Reference) */}
        <SlideUp delay={0.3}>
          <div className="flex justify-center">
            <ClassicQuoteCard />
          </div>
        </SlideUp>

        {/* Trust & Guarantee Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12 text-center">
          <div className="flex items-center justify-center gap-3 text-slate-700 text-xs sm:text-sm font-semibold">
            <Clock className="text-[hsl(195,100%,25%)] shrink-0" size={18} />
            <span>24-Hour Call Back Guarantee</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-slate-700 text-xs sm:text-sm font-semibold">
            <ShieldCheck className="text-[hsl(195,100%,25%)] shrink-0" size={18} />
            <span>Strict NDA & Data Privacy</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-slate-700 text-xs sm:text-sm font-semibold">
            <Award className="text-[hsl(195,100%,25%)] shrink-0" size={18} />
            <span>Senior Solution Architects</span>
          </div>
        </div>
      </div>
    </div>
  );
}
