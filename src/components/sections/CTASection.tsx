"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const slowFadeIn = {
  initial: { opacity: 0, y: 50, filter: "blur(20px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "100px" },
  transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

export default function CTASection() {
  return (
    <section className="py-16 sm:py-24 bg-white px-4 sm:px-0">
      <div className="container">
        {/* Exact Abhivorn CTA card: bg-gradient-to-br from-primary via-[#007090] to-accent rounded-[3rem] */}
        <motion.div
          {...slowFadeIn}
          className="bg-gradient-to-br from-[hsl(195,100%,25%)] via-[#007090] to-[hsl(195,100%,50%)] rounded-3xl sm:rounded-[3rem] px-6 py-10 sm:p-12 md:p-20 text-center relative overflow-hidden shadow-2xl"
        >
          {/* Abhivorn's white glow circles */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-[hsl(195,100%,50%)] opacity-20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight">
              Ready to scale your{" "}
              <br className="hidden sm:block" />
              business?
            </h2>
            <p className="text-sm sm:text-lg text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
              Join industry leaders who rely on our enterprise solutions to streamline operations, automate workflows, and dominate their markets.
            </p>
            {/* Abhivorn: white bg btn-primary + outline border-white/30 secondary */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 max-w-sm mx-auto sm:max-w-none">
              <Link
                href="/get-a-quote"
                className="h-12 sm:h-14 px-8 text-sm sm:text-base font-bold bg-white text-[hsl(195,100%,25%)] hover:bg-white/90 rounded-full w-full sm:w-auto transition-transform hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2"
              >
                Start a Project
              </Link>
              <Link
                href="/contact"
                className="h-12 sm:h-14 px-8 text-sm sm:text-base font-bold border border-white/30 text-white hover:bg-white/10 rounded-full w-full sm:w-auto backdrop-blur-sm transition-transform hover:scale-105 inline-flex items-center justify-center"
              >
                Talk to Sales
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
