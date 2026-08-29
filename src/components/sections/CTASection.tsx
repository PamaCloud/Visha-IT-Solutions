import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SlideUp from "@/components/animations/SlideUp";

export default function CTASection() {
  return (
    <section className="py-32 bg-white text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-light/50 rounded-full blur-[100px] -z-10"></div>
      
      <div className="container max-w-3xl relative z-10">
        <SlideUp delay={0.1}>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-secondary tracking-tight mb-6">
            Have a Project in Mind?
          </h2>
        </SlideUp>
        <SlideUp delay={0.2}>
          <p className="text-xl text-secondary-light mb-12 max-w-2xl mx-auto leading-relaxed">
            Let's build something great together. Our team is ready to turn your vision into reality.
          </p>
        </SlideUp>
        <SlideUp delay={0.3}>
          <Link href="/get-a-quote" className="btn btn-primary bg-secondary text-white hover:bg-primary px-10 py-4 inline-flex items-center gap-3 shadow-2xl hover:shadow-primary/30">
            Get a Free Project Quote <ArrowRight size={20} className="mt-0.5" />
          </Link>
        </SlideUp>
      </div>
    </section>
  );
}
