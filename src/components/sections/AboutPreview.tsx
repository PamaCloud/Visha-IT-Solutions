"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Award, TrendingUp, Handshake } from "lucide-react";
import { motion } from "framer-motion";

const slowFadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

const trustPoints = [
  {
    title: "Client Focused",
    description: "Our experts craft unique and tailored IT strategies that align directly with your distinct business vision and operational goals.",
    icon: ShieldCheck,
  },
  {
    title: "Quality Driven",
    description: "From architecture to deployment, we maintain rigorous software engineering standards, peer reviews, and comprehensive quality assurance.",
    icon: Award,
  },
  {
    title: "Result Oriented",
    description: "Every digital solution, marketing campaign, and talent placement is focused on delivering measurable commercial value and sustainable growth.",
    icon: TrendingUp,
  },
  {
    title: "Trusted Partner",
    description: "A dependable technology and workforce partner offering full transparency, proactive collaboration, and dedicated ongoing support.",
    icon: Handshake,
  },
];

export default function AboutPreview() {
  return (
    <section className="py-20 sm:py-28 bg-slate-50/70 border-b border-slate-100 relative overflow-hidden">
      <div className="container">
        {/* ── 3–5 Line Company Introduction (FSD Section 6.2) ── */}
        <motion.div {...slowFadeIn} className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0d5cd9] text-xs font-semibold uppercase tracking-wider mb-4">
            About Visha IT Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-5">
            Empowering Modern Enterprises with Technology &amp; Talent
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Visha IT Solutions is a professional technology and talent solutions business dedicated to driving enterprise growth.
            We specialize in delivering high-converting <strong>E-Commerce</strong> platforms, data-driven <strong>Digital Marketing</strong> campaigns,
            strategic <strong>Recruitment &amp; Staffing</strong>, and career-advancing <strong>IT Training</strong>.
            Our team combines technical rigor with business acumen to deliver dependable, high-impact results.
          </p>
        </motion.div>

        {/* ── 4 Official Trust / Value Points (FSD Section 6.2) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-sm hover:shadow-md hover:border-blue-300 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0d5cd9] mb-5">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="text-xs font-mono font-bold text-slate-300 mt-6">
                  0{index + 1}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── CTA: Learn More (FSD Section 6.2) ── */}
        <motion.div {...slowFadeIn} className="text-center mt-12 sm:mt-14">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#0d5cd9] hover:bg-[#0b4eb8] text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all group"
          >
            <span>Learn More About Us</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

