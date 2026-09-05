"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedCounter from "@/components/animations/AnimatedCounter";

const slowFadeIn = {
  initial: { opacity: 0, y: 50, filter: "blur(20px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "100px" },
  transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

const metrics = [
  { value: 50,   suffix: "+",  decimals: 0, label: "Enterprise Clients" },
  { value: 10,   suffix: "+",  decimals: 0, label: "Years Experience"   },
  { value: 200,  suffix: "+",  decimals: 0, label: "Projects Delivered" },
  { value: 99.8, suffix: "%",  decimals: 1, label: "System Uptime"      },
];

const whyUs = [
  { title: "Client Focused",    description: "Our experts craft unique and tailored IT strategies that you won't find off-the-shelf." },
  { title: "Quality Driven",    description: "From code to deployment, we maintain the highest standards of software engineering."   },
  { title: "Result Oriented",   description: "We are here anytime you need us — before, during, or after your project delivery."     },
  { title: "MSME Registered",   description: "Recognized and registered, operating with full compliance and professional integrity." },
];

export default function AboutPreview() {
  return (
    <>
      {/* ── Metrics Section (Abhivorn style: white bg, divide-x border) ── */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="container">
          <motion.div
            {...slowFadeIn}
            className="grid grid-cols-2 md:grid-cols-4 gap-10 divide-x divide-gray-200"
          >
            {metrics.map((metric, index) => (
              <div key={metric.label} className={`text-center ${index === 0 ? "" : "pl-6 md:pl-10"}`}>
                <div className="text-4xl md:text-5xl font-bold text-[hsl(210,29%,24%)] mb-3 tracking-tighter">
                  <AnimatedCounter value={metric.value} suffix={metric.suffix} decimals={metric.decimals} />
                </div>
                <div className="text-xs font-bold text-[hsl(207,14%,50%)] uppercase tracking-widest">
                  {metric.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Why Choose Us (Abhivorn: muted bg, numbered white cards) ── */}
      <section className="section-padding bg-[hsl(210,40%,96%)]/30 border-y border-gray-100">
        <div className="container">
          <motion.div
            {...slowFadeIn}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[hsl(210,29%,24%)] mb-5 tracking-tight">
              Why Visha IT Solutions?
            </h2>
            <p className="text-lg text-[hsl(207,14%,50%)] max-w-2xl mx-auto font-light">
              We combine technical excellence with business acumen to deliver solutions that drive measurable results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50, filter: "blur(20px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "100px" }}
                transition={{ duration: 1.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 hover:border-[hsl(195,100%,25%)]/20 hover:shadow-md transition-all duration-300"
              >
                <div className="text-sm font-mono font-bold text-[hsl(195,100%,25%)]/70 mb-4 sm:mb-6">
                  0{index + 1}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[hsl(210,29%,24%)] mb-2 sm:mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-[hsl(210,29%,24%)]/70 leading-relaxed font-medium">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...slowFadeIn}
            className="text-center mt-12"
          >
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[hsl(195,100%,25%)] font-bold hover:text-[hsl(195,100%,35%)] transition-colors link-underline"
            >
              Discover our story <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
