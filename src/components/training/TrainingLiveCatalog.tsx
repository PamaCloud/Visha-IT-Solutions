'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Clock,
  Laptop,
  CheckCircle2,
  ArrowRight,
  Code2,
  Layers,
  Cpu,
  Database,
  Terminal,
  GraduationCap,
} from 'lucide-react';
import SlideUp from '@/components/animations/SlideUp';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';

const iconList = [Code2, Layers, Cpu, Database, Terminal, GraduationCap];

function CourseCard({ program, idx }: { program: any; idx: number }) {
  const IconComponent = iconList[idx % iconList.length];
  const syllabusList = Array.isArray(program.syllabus) && program.syllabus.length > 0
    ? program.syllabus
    : Array.isArray(program.modules) && program.modules.length > 0
    ? program.modules.map((m: any) => m.title || m)
    : ["Industry Standard Curriculum", "Hands-on Practical Labs", "Capstone Project Deployment"];

  const techList = Array.isArray(program.technologies) && program.technologies.length > 0
    ? program.technologies
    : ["Full Stack", "Cloud", "Modern Frameworks"];

  const imageSrc = program.image || (idx % 2 === 0 ? "/services/training-and-career-development.jpg" : "/services/website-development.jpg");

  return (
    <div className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_12px_35px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-500 flex flex-col h-full overflow-hidden">
      {/* Top Image Container with Arched Corners & Floating Badges */}
      <div className="relative h-56 w-full overflow-hidden rounded-t-[2.5rem] bg-slate-900">
        <Image
          src={imageSrc}
          alt={program.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Floating Top-Left Pill Badge */}
        {program.badge && (
          <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full bg-white/95 text-[hsl(195,100%,25%)] shadow-md backdrop-blur-md">
            {program.badge}
          </span>
        )}

        {/* Floating Top-Right Icon Badge */}
        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 text-cyan-300">
          <IconComponent size={20} />
        </div>

        {/* Bottom Image Overlay Strip with Duration & Mode */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-medium bg-black/40 backdrop-blur-md py-1.5 px-3 rounded-xl border border-white/10">
          <div className="flex items-center gap-1.5">
            <Clock size={13} className="text-cyan-300" />
            <span>{program.duration || "12 Weeks"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Laptop size={13} className="text-cyan-300" />
            <span>{program.mode || "Hybrid"}</span>
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 sm:p-8 flex flex-col flex-grow">
        {/* Title & Short Description */}
        <div className="mb-5">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[hsl(195,100%,25%)] transition-colors mb-2 capitalize">
            {program.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed">
            {program.shortDescription || program.description || "Comprehensive hands-on training program designed for career readiness."}
          </p>
        </div>

        {/* Syllabus / Key Modules Highlights */}
        <div className="mb-6 flex-grow">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Curriculum Highlights
          </h4>
          <div className="grid grid-cols-1 gap-2.5">
            {syllabusList.slice(0, 3).map((item: string, sIdx: number) => (
              <div key={sIdx} className="flex items-start gap-2.5">
                <CheckCircle2
                  size={15}
                  className="text-[hsl(195,100%,35%)] shrink-0 mt-0.5"
                />
                <span className="text-xs text-slate-700 font-medium leading-tight line-clamp-1">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="mb-6 flex flex-wrap gap-1.5">
          {techList.slice(0, 4).map((tech: string, tIdx: number) => (
            <span
              key={tIdx}
              className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <Link
          href={`/training/${program.slug}`}
          className="inline-flex items-center justify-between w-full px-5 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-slate-700 bg-slate-50 border border-slate-200/80 group-hover:bg-[hsl(195,100%,25%)] group-hover:text-white group-hover:border-[hsl(195,100%,25%)] transition-all duration-300 shadow-xs mt-auto"
        >
          <span>Explore Full Curriculum</span>
          <ArrowRight
            size={16}
            className="transform group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    </div>
  );
}

export default function TrainingLiveCatalog({ initialPrograms }: { initialPrograms: any[] }) {
  const programs = useRealtimeSync('/api/public/training', initialPrograms);

  // If 3 courses: 1 in the middle on top, 2 in the row below (side-by-side)
  if (programs.length === 3) {
    return (
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 relative z-20 space-y-8">
        {/* Row 1: 1 Course in the Middle */}
        <div className="max-w-md mx-auto w-full">
          <SlideUp delay={0.1}>
            <CourseCard program={programs[0]} idx={0} />
          </SlideUp>
        </div>

        {/* Row 2: 2 Courses side-by-side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {programs.slice(1).map((program: any, idx: number) => (
            <SlideUp key={program.slug || program._id || idx} delay={0.2 + idx * 0.1}>
              <CourseCard program={program} idx={idx + 1} />
            </SlideUp>
          ))}
        </div>
      </div>
    );
  }

  // Standard responsive grid for 2, 4, or more courses
  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {programs.map((program: any, idx: number) => (
          <SlideUp key={program.slug || program._id || idx} delay={0.1 + (idx % 3) * 0.1}>
            <CourseCard program={program} idx={idx} />
          </SlideUp>
        ))}
      </div>
    </div>
  );
}
