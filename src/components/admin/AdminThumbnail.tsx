"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

interface AdminThumbnailProps {
  src: string;
  alt: string;
  className?: string;
  type?: "service" | "training" | "project" | "job";
  sizes?: string;
}

const FALLBACK_MAP: Record<string, string> = {
  service: "/services/recruitment-and-staffing.jpg",
  training: "/services/training-and-career-development.jpg",
  project: "/services/ecommerce-solutions.jpg",
  job: "/careers-hero.jpg",
};

export default function AdminThumbnail({
  src,
  alt,
  className = "",
  type = "service",
  sizes = "56px",
}: AdminThumbnailProps) {
  const [imgSrc, setImgSrc] = useState<string>(src || FALLBACK_MAP[type] || "/services/recruitment-and-staffing.jpg");
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const fallback = FALLBACK_MAP[type] || "/services/recruitment-and-staffing.jpg";

  const handleError = () => {
    if (!hasError && imgSrc !== fallback) {
      setImgSrc(fallback);
      setHasError(true);
    }
  };

  return (
    <div className={`relative overflow-hidden bg-slate-100 flex items-center justify-center ${className}`}>
      <Image
        src={imgSrc}
        alt={alt || "Media thumbnail"}
        fill
        unoptimized
        sizes={sizes}
        className={`object-cover transition-opacity duration-200 ${loaded ? "opacity-100" : "opacity-90"}`}
        onLoad={() => setLoaded(true)}
        onError={handleError}
      />
    </div>
  );
}
