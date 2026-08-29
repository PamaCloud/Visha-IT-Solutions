import Link from "next/link";
import { Users, ShieldCheck, Target, ArrowRight } from "lucide-react";
import SlideUp from "@/components/animations/SlideUp";
import FadeIn from "@/components/animations/FadeIn";

export default function AboutPreview() {
  const features = [
    {
      title: "Client Focused",
      description: "Our experts craft unique and tailored IT strategies that you won't find off-the-shelf.",
      icon: Users,
    },
    {
      title: "Quality Driven",
      description: "From code to deployment, we maintain the highest standards of software engineering.",
      icon: ShieldCheck,
    },
    {
      title: "Result Oriented",
      description: "We are here anytime you need us, before, during, or after your project delivery.",
      icon: Target,
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-surface relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 rounded-l-full blur-3xl -z-10"></div>
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">
          
          {/* Left Side: Typography */}
          <div className="lg:w-1/2">
            <FadeIn>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[2px] bg-primary"></div>
                <h2 className="text-primary font-semibold tracking-[0.2em] uppercase text-sm">
                  EXCELLENCE IN IT
                </h2>
              </div>
            </FadeIn>
            
            <SlideUp delay={0.1}>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-secondary leading-[1.15] tracking-tight mb-8">
                Engineered for Growth. <br />
                <span className="font-serif italic font-medium text-primary-dark">Built for Excellence.</span>
              </h3>
            </SlideUp>
            
            <SlideUp delay={0.2}>
              <p className="text-lg md:text-xl text-secondary-light mb-10 leading-relaxed">
                From robust enterprise architecture to seamless user experiences, we bring you cutting-edge technology solutions with unmatched local expertise and 24/7 support.
              </p>
            </SlideUp>

            {/* Quick Stats mimicking the small icons in reference */}
            <SlideUp delay={0.3}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8 border-t border-gray-200/60">
                <div className="flex flex-col gap-2">
                  <span className="text-3xl md:text-4xl font-bold font-display text-primary">50+</span>
                  <span className="text-xs md:text-sm font-medium text-secondary-light uppercase tracking-wider">Enterprise Clients</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-3xl md:text-4xl font-bold font-display text-primary">10+</span>
                  <span className="text-xs md:text-sm font-medium text-secondary-light uppercase tracking-wider">Years Experience</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-3xl md:text-4xl font-bold font-display text-primary">200+</span>
                  <span className="text-xs md:text-sm font-medium text-secondary-light uppercase tracking-wider">Projects Delivered</span>
                </div>
              </div>
            </SlideUp>
          </div>
          
          {/* Right Side: Features List */}
          <div className="lg:w-1/2 flex flex-col gap-8 w-full">
            {features.map((feature, idx) => (
              <SlideUp key={idx} delay={0.2 + (idx * 0.1)}>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group flex gap-6 items-start">
                  <div className="shrink-0 w-14 h-14 bg-primary-light/50 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="text-primary group-hover:text-white transition-colors" size={24} strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold font-display text-secondary mb-3">{feature.title}</h4>
                    <p className="text-secondary-light leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </SlideUp>
            ))}
            
            <SlideUp delay={0.5}>
              <div className="pt-4 flex justify-end">
                <Link href="/about" className="group inline-flex items-center gap-2 text-primary font-bold hover:text-primary-dark transition-colors text-lg">
                  Discover our story 
                  <ArrowRight size={20} className="transform group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </SlideUp>
          </div>
          
        </div>
      </div>
    </section>
  );
}
