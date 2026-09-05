"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
}

export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 2500,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (!inView) return;

    const fps = 60;
    const totalFrames = (duration / 1000) * fps;
    let frame = 0;

    // easeOutQuart curve — fast start, slow finish (from docs)
    const easeOutQuart = (x: number) => 1 - Math.pow(1 - x, 4);

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      setCount(value * easeOutQuart(Math.min(progress, 1)));
      if (frame >= totalFrames) {
        setCount(value);
        clearInterval(timer);
      }
    }, 1000 / fps);

    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
