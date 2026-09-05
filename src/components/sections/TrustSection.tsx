"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Code, ShieldCheck, Rocket, Headset } from "lucide-react";

const slowFadeIn = {
  initial: { opacity: 0, y: 50, filter: "blur(20px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "100px" },
  transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

const steps = [
  { step: "1", icon: Search,      title: "Discovery",   desc: "Comprehensive requirements analysis and goal setting." },
  { step: "2", icon: PenTool,     title: "Design",      desc: "Robust architecture and high-fidelity prototyping." },
  { step: "3", icon: Code,        title: "Development", desc: "Agile coding, implementation, and integration." },
  { step: "4", icon: ShieldCheck, title: "Testing",     desc: "Rigorous automated and manual quality assurance." },
  { step: "5", icon: Rocket,      title: "Deployment",  desc: "Zero-downtime launch into enterprise infrastructure." },
  { step: "6", icon: Headset,     title: "Support",     desc: "Ongoing maintenance, scaling, and technical support." },
];

export default function TrustSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        {/* Section Header */}
        <motion.div
          {...slowFadeIn}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[hsl(210,29%,24%)] mb-5 tracking-tight">
            Our Proven Process
          </h2>
          <p className="text-lg text-[hsl(207,14%,50%)] max-w-2xl mx-auto font-light">
            A structured, transparent approach that delivers results on time and on budget.
          </p>
        </motion.div>

        {/* Process steps grid (exact Abhivorn pattern) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-20 gap-x-12">
          {steps.map((p, index) => (
            <motion.div
              key={p.step}
              initial={{ opacity: 0, y: 50, filter: "blur(20px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ duration: 1.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Dashed connector line (Abhivorn: hidden on last of each row) */}
              {(index % 3 !== 2) && (
                <div className="hidden md:block absolute top-7 left-1/2 w-full border-t border-dashed border-gray-200 -z-10" />
              )}

              {/* Step icon circle (Abhivorn: border circle, hover → border-foreground) */}
              <div className="w-14 h-14 rounded-full border border-gray-200 bg-white flex items-center justify-center mb-6 group-hover:border-[hsl(210,29%,24%)] transition-colors duration-500 z-10 relative">
                <p.icon className="w-5 h-5 text-[hsl(207,14%,50%)] group-hover:text-[hsl(210,29%,24%)] transition-colors duration-500" />
              </div>

              {/* Step number label (Abhivorn: primary/80 text) */}
              <span className="text-xs font-bold text-[hsl(195,100%,25%)]/80 uppercase tracking-widest mb-3">
                STEP {p.step}
              </span>

              <h3 className="text-xl font-bold text-[hsl(210,29%,24%)] mb-3">{p.title}</h3>
              <p className="text-sm text-[hsl(210,29%,24%)]/70 leading-relaxed max-w-[250px] font-medium">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
