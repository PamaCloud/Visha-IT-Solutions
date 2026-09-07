"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTopOnNavigate() {
  const pathname = usePathname();
  const prevPathnameRef = useRef<string | null>(null);

  useEffect(() => {
    // Only scroll to top when actually navigating from one route to another.
    // On page refresh / initial load, prevPathnameRef is null so the browser's
    // native scroll restoration keeps the exact scroll position.
    if (prevPathnameRef.current !== null && prevPathnameRef.current !== pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
    prevPathnameRef.current = pathname;
  }, [pathname]);

  return null;
}
