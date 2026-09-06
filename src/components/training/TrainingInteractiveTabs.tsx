"use client";

import { useState } from "react";
import { CheckCircle2, Terminal, Code2, Database, Cloud, Layers } from "lucide-react";
import { VishaTrainingItem } from "@/data/vishaTraining";

interface Props {
  program: VishaTrainingItem;
}

export default function TrainingInteractiveTabs({ program }: Props) {
  const [activeTab, setActiveTab] = useState(0);

  // Generate 4 rich modules based on the program's syllabus
  const modules = [
    {
      title: "Module 1: Architecture & Core Foundations",
      badge: "Week 1 - 4",
      description: `Comprehensive mastery of programming semantics, language idioms, object-oriented paradigms, and computational problem-solving.`,
      points: [
        program.syllabus[0] || "Advanced Core Syntax & Data Structures",
        "Algorithmic Problem Solving & Complexity Analysis",
        "Modular Code Structure & Error Handling",
        "Git Version Control & Collaborative Workflows",
      ],
      icon: Code2,
    },
    {
      title: "Module 2: Advanced Engineering & Frameworks",
      badge: "Week 5 - 12",
      description: `Deep dive into enterprise frameworks, asynchronous APIs, component modularity, state management, and multi-tier patterns.`,
      points: [
        program.syllabus[1] || "Enterprise Framework Architecture",
        program.syllabus[2] || "State Management & Component Lifecycle",
        "RESTful API Design & End-to-End Authentication",
        "Security Standards (JWT, OAuth2, CORS)",
      ],
      icon: Terminal,
    },
    {
      title: "Module 3: Database & Cloud Integration",
      badge: "Week 13 - 18",
      description: `Relational and NoSQL database modeling, query tuning, cloud object storage, caching mechanisms, and microservice discovery.`,
      points: [
        program.syllabus[3] || "Database Schema Design & Query Optimization",
        "Caching Strategies with Redis for High Concurrency",
        "Cloud Storage & Asynchronous Worker Pipelines",
        "Automated Testing with Unit & Integration Suites",
      ],
      icon: Database,
    },
    {
      title: "Module 4: Enterprise Capstone & Deployment",
      badge: "Week 19 - 24",
      description: `Architect a full-scale, production-ready capstone project from scratch. Containerize with Docker and set up automated CI/CD deployment pipelines.`,
      points: [
        program.syllabus[4] || "Full-Stack Enterprise Capstone Project",
        program.syllabus[5] || "Containerization & Cloud Infrastructure",
        "GitHub Actions / Jenkins Continuous Integration",
        "Live Code Review & Portfolio Publication",
      ],
      icon: Cloud,
    },
  ];

  const currentModule = modules[activeTab];
  const IconComponent = currentModule.icon;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Navigation: Vertical Pill Buttons */}
      <div className="lg:col-span-5 flex flex-col gap-3">
        {modules.map((mod, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
              activeTab === idx
                ? "bg-[hsl(195,100%,25%)] text-white border-[hsl(195,100%,25%)] shadow-md translate-x-1"
                : "bg-white text-slate-700 border-slate-200/70 hover:border-slate-300 hover:bg-slate-50/80"
            }`}
          >
            <div>
              <span
                className={`text-[11px] font-bold uppercase tracking-wider block mb-1 ${
                  activeTab === idx ? "text-cyan-200" : "text-slate-400"
                }`}
              >
                {mod.badge}
              </span>
              <span className="font-bold text-sm sm:text-base leading-snug block">
                {mod.title}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Right Content Area: Module Details Card */}
      <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.06)] min-h-[380px] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-[hsl(195,100%,25%)]/10 text-[hsl(195,100%,25%)]">
              <IconComponent size={14} />
              {currentModule.badge}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Syllabus Details
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
            {currentModule.title}
          </h3>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
            {currentModule.description}
          </p>

          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Key Competencies Gained
            </h4>
            {currentModule.points.map((point, pIdx) => (
              <div key={pIdx} className="flex items-start gap-3">
                <CheckCircle2
                  size={18}
                  className="text-[hsl(195,100%,35%)] shrink-0 mt-0.5"
                />
                <span className="text-sm font-medium text-slate-700 leading-snug">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Banner */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Technologies Applied
          </span>
          <div className="flex flex-wrap gap-1.5">
            {program.technologies.slice(0, 4).map((tech, tIdx) => (
              <span
                key={tIdx}
                className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
