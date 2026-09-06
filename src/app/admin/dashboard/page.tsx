import connectToDatabase from "@/lib/mongoose";
import JobApplication from "@/lib/models/JobApplication";
import Service from "@/lib/models/Service";
import Project from "@/lib/models/Project";
import TrainingProgram from "@/lib/models/TrainingProgram";
import Job from "@/lib/models/Job";
import Link from "next/link";
import Image from "next/image";
import {
  Layers,
  GraduationCap,
  Folder,
  Briefcase,
  Users,
  CheckCircle2,
  Plus,
  ChevronRight,
  ExternalLink
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  await connectToDatabase();

  const totalCandidates = await JobApplication.countDocuments();
  const totalServices = await Service.countDocuments();
  const totalProjects = await Project.countDocuments();
  const totalTraining = await TrainingProgram.countDocuments();
  const totalJobs = await Job.countDocuments();

  // Recent content items matching website areas
  const recentUpdates = [
    {
      id: "1",
      title: "Senior Full Stack Developer",
      details: "Full-Time • Engineering • Hyderabad (Hybrid)",
      location: "CAREERS / JOB OPENINGS",
      timestamp: "Today",
      actionUrl: "/admin/dashboard/jobs",
      actionLabel: "Manage Jobs >",
      image: "/careers-hero.jpg",
    },
    {
      id: "2",
      title: "Recruitment & Staffing",
      details: "Core Service • Enterprise HR Solutions",
      location: "WEBSITE / SERVICES",
      timestamp: "Live",
      actionUrl: "/admin/dashboard/services",
      actionLabel: "Edit Service >",
      image: "/services/recruitment-and-staffing.jpg",
    },
    {
      id: "3",
      title: "Python Full Stack Development",
      details: "6 Months • Hybrid • Placement Assistance",
      location: "TRAINING / MASTERCLASS",
      timestamp: "Live",
      actionUrl: "/admin/dashboard/training",
      actionLabel: "Edit Course >",
      image: "/training/fullstack.jpg",
    },
    {
      id: "4",
      title: "Global E-Commerce Platform",
      details: "RetailCorp • Next.js & Node.js Cloud Native",
      location: "PROJECTS / CASE STUDY",
      timestamp: "Live",
      actionUrl: "/admin/dashboard/projects",
      actionLabel: "Edit Project >",
      image: "/services/ecommerce-solutions.jpg",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Manage your dynamic services, training programs, project case studies, and live career job openings in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/dashboard/jobs"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#004f6e] via-[#006e94] to-[#0096c7] hover:from-[#003d55] hover:to-[#007ba3] active:scale-[0.99] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md shadow-[#00779e]/25 transition-all cursor-pointer"
          >
            <Plus size={16} />
            <span>Post a New Job</span>
          </Link>

          <Link
            href="/admin/dashboard/services"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <Layers size={16} className="text-[#00779e]" />
            <span>Add Service</span>
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: SERVICES */}
        <Link
          href="/admin/dashboard/services"
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between group hover:border-[#00779e]/40 hover:shadow-md transition-all"
        >
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              ACTIVE SERVICES
            </span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#00779e] flex items-center justify-center border border-sky-100 group-hover:scale-105 transition-transform">
              <Layers size={16} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold text-slate-900">
              {totalServices}
            </h3>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Dynamic offerings live on /services
            </p>
          </div>
        </Link>

        {/* Card 2: TRAINING PROGRAMS */}
        <Link
          href="/admin/dashboard/training"
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between group hover:border-[#00779e]/40 hover:shadow-md transition-all"
        >
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              TRAINING PROGRAMS
            </span>
            <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center border border-cyan-100 group-hover:scale-105 transition-transform">
              <GraduationCap size={16} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold text-slate-900">
              {totalTraining}
            </h3>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              Live academies on /training
            </p>
          </div>
        </Link>

        {/* Card 3: JOB OPENINGS */}
        <Link
          href="/admin/dashboard/jobs"
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between group hover:border-[#00779e]/40 hover:shadow-md transition-all"
        >
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              JOB OPENINGS
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 group-hover:scale-105 transition-transform">
              <Briefcase size={16} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold text-slate-900">
              {totalJobs}
            </h3>
            <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              Active roles live on /careers
            </p>
          </div>
        </Link>

        {/* Card 4: APPLICATIONS */}
        <Link
          href="/admin/dashboard/applications"
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between group hover:border-[#00779e]/40 hover:shadow-md transition-all"
        >
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              CANDIDATES
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 group-hover:scale-105 transition-transform">
              <Users size={16} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold text-slate-900">
              {totalCandidates}
            </h3>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Applications received
            </p>
          </div>
        </Link>
      </div>

      {/* Lower Section: Recent Content Updates Table matching Screenshot */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">
            Recent Content Updates
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            The latest image modifications across the platform.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/70 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="py-3 px-6">MEDIA</th>
                <th className="py-3 px-6">DETAILS</th>
                <th className="py-3 px-6">LOCATION</th>
                <th className="py-3 px-6">TIMESTAMP</th>
                <th className="py-3 px-6 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentUpdates.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                  {/* MEDIA Thumbnail */}
                  <td className="py-3.5 px-6">
                    <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200/80 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                  </td>

                  {/* DETAILS */}
                  <td className="py-3.5 px-6">
                    <div className="font-semibold text-slate-900">{item.title}</div>
                    <div className="text-[11px] text-slate-400 font-mono truncate max-w-xs">
                      {item.details}
                    </div>
                  </td>

                  {/* LOCATION */}
                  <td className="py-3.5 px-6">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 font-medium text-[10px] tracking-wider uppercase">
                      {item.location}
                    </span>
                  </td>

                  {/* TIMESTAMP */}
                  <td className="py-3.5 px-6 text-slate-500 whitespace-nowrap">
                    {item.timestamp}
                  </td>

                  {/* ACTION */}
                  <td className="py-3.5 px-6 text-right">
                    <Link
                      href={item.actionUrl}
                      className="text-xs font-semibold text-slate-600 hover:text-[#004f6e] inline-flex items-center gap-1 transition-colors"
                    >
                      <span>{item.actionLabel}</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
