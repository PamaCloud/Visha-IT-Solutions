"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWidgets() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, [showScroll]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {/* Scroll To Top Button */}
      <button
        onClick={scrollToTop}
        className={`w-11 h-11 bg-white text-slate-700 rounded-full flex items-center justify-center shadow-lg border border-slate-200/80 hover:bg-[hsl(195,100%,25%)] hover:text-white hover:border-[hsl(195,100%,25%)] transition-all duration-300 transform cursor-pointer ${
          showScroll ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={18} />
      </button>

      {/* Floating WhatsApp Button (Bottom Right Down) */}
      <a
        href="https://wa.me/919014646804"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Visha IT Solutions on WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_28px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        {/* Soft ambient pulsing ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none opacity-75" />
        
        <FaWhatsapp className="w-7 h-7 relative z-10 text-white" />

        {/* Hover Tooltip (Desktop) */}
        <span className="absolute right-16 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
