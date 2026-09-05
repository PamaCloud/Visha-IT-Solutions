import { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, Award, Users, Target, Rocket } from "lucide-react";
import Link from "next/link";
import SlideUp from "@/components/animations/SlideUp";
import FadeIn from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "About Us - Visha IT Solutions",
  description: "Learn more about Visha IT Solutions, our mission, vision, and core values.",
};

export default function AboutPage() {
  const stats = [
    { label: "Years Experience", value: "10+" },
    { label: "Projects Delivered", value: "500+" },
    { label: "Global Clients", value: "200+" },
    { label: "IT Professionals", value: "50+" },
  ];

  const values = [
    { title: "Innovation", description: "We stay ahead of the curve with cutting-edge technologies.", icon: Rocket },
    { title: "Quality", description: "Uncompromising standards in every line of code we write.", icon: Award },
    { title: "Collaboration", description: "Working closely with clients to ensure their vision is realized.", icon: Users },
    { title: "Focus", description: "Dedicated to delivering results that impact your bottom line.", icon: Target },
  ];

  return (
    <div className="bg-surface min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden pt-20 sm:pt-24">
        {/* Background Image */}
        <Image 
          src="/about-hero.jpg" 
          alt="Visha IT Solutions Corporate Office"
          fill
          priority
          className="object-cover"
        />
        {/* Glassy Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/70 via-[#0f172a]/50 to-[#0f172a]/90 backdrop-blur-[2px]"></div>
        
        <div className="container relative z-10 text-center px-4">
          <FadeIn>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 drop-shadow-lg">
              About <span className="text-primary-light">Visha IT</span>
            </h1>
          </FadeIn>
          <SlideUp delay={0.2}>
            <p className="text-xl md:text-2xl text-blue-50 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-md">
              We are a leading IT solutions provider committed to transforming businesses through technology, innovation, and expertise.
            </p>
          </SlideUp>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white relative">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
              <FadeIn>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-1 bg-primary rounded-full"></div>
                  <h2 className="text-primary font-bold tracking-widest uppercase text-sm">
                    Our Story
                  </h2>
                </div>
              </FadeIn>
              <SlideUp delay={0.1}>
                <h3 className="text-4xl md:text-5xl font-display font-bold text-secondary mb-8 leading-tight">
                  Bridging the gap between <span className="font-serif italic font-medium text-primary-dark">vision</span> and <span className="font-serif italic font-medium text-primary-dark">execution.</span>
                </h3>
              </SlideUp>
              <div className="space-y-6 text-lg text-secondary-light leading-relaxed">
                <SlideUp delay={0.2}>
                  <p>
                    Founded with a vision to bridge the gap between complex technology and business needs, Visha IT Solutions has grown into a trusted partner for companies worldwide.
                  </p>
                </SlideUp>
                <SlideUp delay={0.3}>
                  <p>
                    What started as a small team of passionate developers has evolved into a comprehensive digital agency offering E-Commerce Development, Digital Marketing, specialized IT Recruitment, and Professional Training.
                  </p>
                </SlideUp>
                <SlideUp delay={0.4}>
                  <p className="font-medium text-secondary">
                    Our holistic approach ensures that we don't just deliver projects; we build scalable ecosystems that empower our clients to thrive in competitive markets.
                  </p>
                </SlideUp>
              </div>
            </div>
            
            <div className="lg:w-1/2 grid grid-cols-2 gap-6 w-full">
              {stats.map((stat, idx) => (
                <SlideUp key={idx} delay={0.3 + (idx * 0.1)}>
                  <div className="bg-surface p-8 rounded-[2rem] text-center border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 group">
                    <div className="text-4xl md:text-5xl font-extrabold font-display text-primary mb-3 group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
                    <div className="text-secondary font-medium uppercase tracking-wide text-sm">{stat.label}</div>
                  </div>
                </SlideUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-32 bg-secondary relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -z-0"></div>
        
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Our Core Values</h2>
            </FadeIn>
            <SlideUp delay={0.1}>
              <p className="text-xl text-blue-100/80 leading-relaxed">
                The principles that guide everything we do and how we work with our partners to deliver excellence.
              </p>
            </SlideUp>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <SlideUp key={idx} delay={0.2 + (idx * 0.1)}>
                <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all duration-300 h-full group">
                  <div className="w-16 h-16 bg-primary/20 text-primary-light rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <value.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-white mb-4">{value.title}</h3>
                  <p className="text-blue-100/70 leading-relaxed">{value.description}</p>
                </div>
              </SlideUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-white text-center relative overflow-hidden">
        <div className="container max-w-4xl relative z-10">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-secondary mb-8">Ready to work with us?</h2>
          </FadeIn>
          <SlideUp delay={0.1}>
            <p className="text-xl text-secondary-light mb-12 leading-relaxed">
              Let's discuss how Visha IT Solutions can help you achieve your business goals and accelerate your digital transformation.
            </p>
          </SlideUp>
          <SlideUp delay={0.2}>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/contact" className="btn btn-primary px-10 py-4 text-lg shadow-xl hover:shadow-primary/30">Contact Us Today</Link>
              <Link href="/services" className="btn btn-outline px-10 py-4 text-lg bg-surface hover:bg-gray-100 border-none shadow-md">Explore Our Services</Link>
            </div>
          </SlideUp>
        </div>
      </section>
    </div>
  );
}
