"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      
      {/* Scroll To Top Button */}
      <button
        onClick={scrollToTop}
        className={`w-10 h-10 bg-white text-[hsl(210,29%,24%)] rounded-full flex items-center justify-center shadow-lg border border-gray-100 hover:bg-[hsl(195,100%,50%)] hover:text-white hover:border-[hsl(195,100%,50%)] transition-all duration-300 transform ${
          showScroll ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={18} />
      </button>

      
    </div>
  );
}
