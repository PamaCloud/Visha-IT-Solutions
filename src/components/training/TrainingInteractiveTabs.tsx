"use client";

import { useState } from "react";
import { CheckCircle2, Terminal, Code2, Database, Cloud, Layers, Cpu, Sparkles } from "lucide-react";
import { VishaTrainingItem } from "@/data/vishaTraining";

interface Props {
  program: VishaTrainingItem;
}

const moduleIcons = [Code2, Terminal, Database, Layers, Cpu, Cloud, Sparkles];

export default function TrainingInteractiveTabs({ program }: Props) {
  const [activeTab, setActiveTab] = useState(0);

  const modules = program.modules && program.modules.length > 0
    ? program.modules
    : [
        {
          title: "Module 1: Architecture & Core Foundations",
          badge: "Weeks 1 - 4",
          description: "Comprehensive mastery of programming semantics, language idioms, and computational problem-solving.",
          points: [
            program.syllabus[0] || "Advanced Core Syntax & Data Structures",
            "Algorithmic Problem Solving & Complexity Analysis",
            "Modular Code Structure & Error Handling",
            "Git Version Control & Collaborative Workflows",
          ],
        },
        {
          title: "Module 2: Advanced Engineering & Frameworks",
          badge: "Weeks 5 - 8",
          description: "Deep dive into enterprise frameworks, asynchronous APIs, and component modularity.",
          points: [
            program.syllabus[1] || "Enterprise Framework Architecture",
            "RESTful API Design & End-to-End Authentication",
            "Security Standards (JWT, OAuth2, CORS)",
          ],
        },
        {
          title: "Module 3: Database & Cloud Integration",
          badge: "Weeks 9 - 12",
          description: "Relational and NoSQL database modeling, query tuning, and caching mechanisms.",
          points: [
            program.syllabus[2] || "Database Schema Design & Query Optimization",
            "Caching Strategies with Redis for High Concurrency",
            "Cloud Storage & Asynchronous Worker Pipelines",
          ],
        },
        {
          title: "Module 4: Enterprise Capstone & Deployment",
          badge: "Weeks 13 - 16",
          description: "Architect a full-scale, production-ready capstone project from scratch and deploy to cloud.",
          points: [
            program.syllabus[3] || "Full-Stack Enterprise Capstone Project",
            "Docker Containerization & CI/CD Deployment",
            "Live Code Review & Portfolio Publication",
          ],
        },
      ];

  const safeActiveTab = activeTab < modules.length ? activeTab : 0;
  const currentModule = modules[safeActiveTab];
  const IconComponent = moduleIcons[safeActiveTab % moduleIcons.length];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Navigation: Vertical Pill Buttons */}
      <div className="lg:col-span-5 flex flex-col gap-3">
        {modules.map((mod, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
              safeActiveTab === idx
                ? "bg-[hsl(195,100%,25%)] text-white border-[hsl(195,100%,25%)] shadow-md translate-x-1"
                : "bg-white text-slate-700 border-slate-200/70 hover:border-slate-300 hover:bg-slate-50/80"
            }`}
          >
            <div>
              <span
                className={`text-[11px] font-bold uppercase tracking-wider block mb-1 ${
                  safeActiveTab === idx ? "text-cyan-200" : "text-slate-400"
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
      <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.06)] min-h-[420px] flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[hsl(195,100%,25%)] flex items-center justify-center">
              <IconComponent size={20} />
            </div>
            <div>
              <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider block">
                {currentModule.badge}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                {currentModule.title}
              </h3>
            </div>
          </div>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
            {currentModule.description}
          </p>

          <div className="pt-6 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Key Competencies Gained
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {currentModule.points.map((point, pIdx) => (
                <div key={pIdx} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                  <span className="leading-snug">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-slate-400 font-medium">
            Technologies Applied
          </span>
          <div className="flex flex-wrap gap-1.5">
            {program.technologies.slice(0, 4).map((tech, tIdx) => (
              <span
                key={tIdx}
                className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-50 border border-slate-100 text-slate-600"
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
