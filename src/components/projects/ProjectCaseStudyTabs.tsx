"use client";

import { useState } from "react";
import { CheckCircle2, ShieldCheck, Zap, Rocket, Layers } from "lucide-react";
import { VishaProjectItem } from "@/data/vishaProjects";

interface Props {
  project: VishaProjectItem;
}

export default function ProjectCaseStudyTabs({ project }: Props) {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      title: "1. The Business Challenge",
      badge: "Discovery & Pain Points",
      icon: Zap,
      heading: `Complex Modernization Needs for ${project.clientName}`,
      description: `Before partnering with Visha IT Solutions, ${project.clientName} faced operational bottlenecks, legacy architectural limits, and growing transaction demands that required a resilient, modernized technological foundation.`,
      highlights: [
        "Legacy architecture incapable of scaling during peak traffic surges",
        "High latency and fragmented data across distributed business units",
        "Strict regulatory compliance and security hardening requirements",
        "Need for automated, continuous delivery without operational downtime",
      ],
    },
    {
      title: "2. Architectural Strategy",
      badge: "System Design",
      icon: Layers,
      heading: "Scalable Microservices & Cloud-Native Engineering",
      description: `Our software architects developed an elastic, distributed system design using ${project.technologies.slice(0, 4).join(", ")}. We decoupled key workflows into independently scalable services connected via event-driven messaging and resilient caching layers.`,
      highlights: [
        "Modular decoupled frontend and backend for independent deployability",
        "Sub-second caching strategies with in-memory distributed data stores",
        "Zero-trust security policies and end-to-end payload encryption",
        "Automated failover clusters ensuring continuous high availability",
      ],
    },
    {
      title: "3. Deliverables & Features",
      badge: "Core Deliverables",
      icon: ShieldCheck,
      heading: "Production-Grade Engineering Delivered",
      description: `We executed an end-to-end agile sprint delivery cycle, implementing each milestone with comprehensive unit test coverage, automated CI/CD pipelines, and rigorous load testing.`,
      highlights: project.deliverables.length > 0 ? project.deliverables : [
        "Custom Scalable Architecture Blueprint",
        "Automated Multi-Environment CI/CD Pipelines",
        "Comprehensive API Security & Token Authentication",
        "Full Administrative Analytics & Real-Time Monitoring Dashboard",
      ],
    },
    {
      title: "4. Measurable Business Impact",
      badge: "Realized ROI",
      icon: Rocket,
      heading: "Demonstrated Performance & Business Outcomes",
      description: project.outcome || "The deployed system immediately delivered tangible business metrics, dramatically accelerating transactional throughput while reducing cloud hosting overhead.",
      highlights: project.metrics.length > 0 ? project.metrics : [
        "+45% Overall System Throughput",
        "99.99% Availability Under Peak Concurrency",
        "<800ms Average Page Load Time",
        "Zero Security Incidents Post-Launch",
      ],
    },
  ];

  const currentTab = tabs[activeTab];
  const IconComponent = currentTab.icon;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Navigation: Vertical Pill Buttons */}
      <div className="lg:col-span-5 flex flex-col gap-3">
        {tabs.map((tab, idx) => (
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
                {tab.badge}
              </span>
              <span className="font-bold text-sm sm:text-base leading-snug block">
                {tab.title}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Right Content Area: Active Tab Detail */}
      <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.06)] min-h-[380px] flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[hsl(195,100%,25%)] flex items-center justify-center">
              <IconComponent size={20} />
            </div>
            <div>
              <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider block">
                {currentTab.badge}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                {currentTab.heading}
              </h3>
            </div>
          </div>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
            {currentTab.description}
          </p>

          <div className="pt-6 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Key Technical Milestones
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {currentTab.highlights.map((point, pIdx) => (
                <div key={pIdx} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                  <span className="leading-snug">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-medium">
            Category: <strong className="text-slate-700 font-bold">{project.category}</strong>
          </span>
          <span className="text-xs font-bold text-[hsl(195,100%,28%)] bg-cyan-50 px-3 py-1 rounded-full border border-cyan-100">
            {project.badge}
          </span>
        </div>
      </div>
    </div>
  );
}
