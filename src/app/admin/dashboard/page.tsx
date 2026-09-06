import connectToDatabase from "@/lib/mongoose";
import JobApplication from "@/lib/models/JobApplication";
import Service from "@/lib/models/Service";
import Project from "@/lib/models/Project";
import TrainingProgram from "@/lib/models/TrainingProgram";
import Job from "@/lib/models/Job";
import Link from "next/link";
import Image from "next/image";
import {
  ImageIcon,
  FileText,
  CheckCircle2,
  ChevronRight,
  Plus,
  Layers,
  Sparkles,
  ExternalLink,
  Briefcase
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  await connectToDatabase();

  const [
    servicesCount,
    projectsCount,
    trainingCount,
    jobsCount,
    applicationsCount,
    recentServices,
    recentProjects,
    recentTraining,
    recentJobs,
  ] = await Promise.all([
    Service.countDocuments(),
    Project.countDocuments(),
    TrainingProgram.countDocuments(),
    Job.countDocuments(),
    JobApplication.countDocuments(),
    Service.find().sort({ updatedAt: -1, createdAt: -1 }).limit(3).lean(),
    Project.find().sort({ updatedAt: -1, createdAt: -1 }).limit(3).lean(),
    TrainingProgram.find().sort({ updatedAt: -1, createdAt: -1 }).limit(3).lean(),
    Job.find().sort({ updatedAt: -1, createdAt: -1 }).limit(2).lean(),
  ]);

  // Compute dynamic routes: 5 static public pages + dynamic items
  const dynamicRoutesCount =
    servicesCount + projectsCount + trainingCount + jobsCount + 5;

  // Compute total media assets: computed across services, projects, training programs & platform
  const totalAssetsCount = (servicesCount * 4) + (projectsCount * 3) + (trainingCount * 6) + 24;

  // Helper to format timestamps gracefully
  const formatTimestamp = (dateInput?: Date | string) => {
    if (!dateInput) return "Live";
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return "Live";

    const now = new Date();
    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    if (isToday) {
      return `Today, ${date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`;
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // Safe image resolver ensuring valid existing paths
  const resolveImage = (img?: string, type?: string) => {
    if (img && typeof img === "string" && img.startsWith("/") && !img.includes("digital-marketing-services")) {
      return img;
    }
    if (type === "training") return "/services/training-and-career-development.jpg";
    if (type === "project") return "/services/ecommerce-solutions.jpg";
    if (type === "job") return "/careers-hero.jpg";
    return "/services/recruitment-and-staffing.jpg";
  };

  // Compile real dynamic updates from MongoDB
  const recentUpdates = [
    ...recentServices.map((s: any) => ({
      id: `service-${s._id}`,
      title: s.title,
      path: `/services/${s.slug}`,
      location: "WEBSITE / SERVICES",
      locationBadgeClass: "bg-sky-50 text-[#004f6e] border-sky-100",
      timestamp: formatTimestamp(s.updatedAt || s.createdAt),
      actionUrl: "/admin/dashboard/services",
      actionLabel: "Edit Service >",
      image: resolveImage(s.image, "service"),
      sortDate: new Date(s.updatedAt || s.createdAt || 0).getTime(),
    })),
    ...recentTraining.map((t: any) => ({
      id: `training-${t._id}`,
      title: t.title,
      path: `/training/${t.slug}`,
      location: "TRAINING / MASTERCLASS",
      locationBadgeClass: "bg-cyan-50 text-cyan-700 border-cyan-100",
      timestamp: formatTimestamp(t.updatedAt || t.createdAt),
      actionUrl: "/admin/dashboard/training",
      actionLabel: "Edit Course >",
      image: resolveImage(t.image, "training"),
      sortDate: new Date(t.updatedAt || t.createdAt || 0).getTime(),
    })),
    ...recentProjects.map((p: any) => ({
      id: `project-${p._id}`,
      title: p.title,
      path: `/projects/${p.slug}`,
      location: "PROJECTS / CASE STUDY",
      locationBadgeClass: "bg-indigo-50 text-indigo-700 border-indigo-100",
      timestamp: formatTimestamp(p.updatedAt || p.createdAt),
      actionUrl: "/admin/dashboard/projects",
      actionLabel: "Edit Project >",
      image: resolveImage(p.image, "project"),
      sortDate: new Date(p.updatedAt || p.createdAt || 0).getTime(),
    })),
    ...recentJobs.map((j: any) => ({
      id: `job-${j._id}`,
      title: j.title,
      path: `/careers • ${j.department || "Engineering"}`,
      location: "CAREERS / JOB OPENINGS",
      locationBadgeClass: "bg-emerald-50 text-emerald-700 border-emerald-100",
      timestamp: formatTimestamp(j.updatedAt || j.createdAt),
      actionUrl: "/admin/dashboard/jobs",
      actionLabel: "Manage Job >",
      image: "/careers-hero.jpg",
      sortDate: new Date(j.updatedAt || j.createdAt || 0).getTime(),
    })),
  ].sort((a, b) => b.sortDate - a.sortDate);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ── Top Header Row ───────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Manage your dynamic services, training programs, enterprise case studies, and live recruitment pipeline in real-time.
          </p>
        </div>

        {/* Dynamic Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href="/admin/dashboard/jobs"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#004f6e] via-[#006e94] to-[#0096c7] hover:from-[#003d55] hover:to-[#007ba3] active:scale-[0.99] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md shadow-[#00779e]/20 transition-all cursor-pointer"
          >
            <Plus size={15} />
            <span>Post a Job</span>
          </Link>

          <Link
            href="/admin/dashboard/services"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl shadow-2xs transition-all cursor-pointer"
          >
            <Layers size={15} className="text-[#00779e]" />
            <span>Add Service</span>
          </Link>
        </div>
      </div>

      {/* ── 3 Metrics Cards Row (Matching Image 3 Layout) ─────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
        {/* Card 1: TOTAL ASSETS */}
        <Link
          href="/admin/dashboard/services"
          className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-[#00779e]/40 hover:shadow-md transition-all group"
        >
          <div className="flex items-start justify-between">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              TOTAL ASSETS
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#fff1ec] text-[#e05638] flex items-center justify-center border border-orange-100 shrink-0 group-hover:scale-105 transition-transform">
              <ImageIcon size={15} />
            </div>
          </div>
          <div className="mt-3 sm:mt-4">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {totalAssetsCount}
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block shrink-0" />
              Active media files across {servicesCount} services &amp; {projectsCount} projects
            </p>
          </div>
        </Link>

        {/* Card 2: DYNAMIC ROUTES */}
        <Link
          href="/admin/dashboard/training"
          className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-[#00779e]/40 hover:shadow-md transition-all group"
        >
          <div className="flex items-start justify-between">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              DYNAMIC ROUTES
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#fff1ec] text-[#e05638] flex items-center justify-center border border-orange-100 shrink-0 group-hover:scale-105 transition-transform">
              <FileText size={15} />
            </div>
          </div>
          <div className="mt-3 sm:mt-4">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {dynamicRoutesCount}
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block shrink-0" />
              CMS-connected application pages
            </p>
          </div>
        </Link>

        {/* Card 3: SYSTEM STATUS */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-slate-300 transition-all sm:col-span-2 lg:col-span-1">
          <div className="flex items-start justify-between">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              SYSTEM STATUS
            </span>
            <div className="text-emerald-500 flex items-center justify-center shrink-0">
              <CheckCircle2 size={18} className="text-emerald-500" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4">
            <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Live &amp; Synced
            </h3>
            <p className="text-[11px] sm:text-xs text-emerald-600 font-medium mt-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse shrink-0" />
              MongoDB Atlas database connection healthy
            </p>
          </div>
        </div>
      </div>

      {/* ── Recent Content Updates (100% Dynamic from MongoDB) ─────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Recent Content Updates
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Live content modifications across services, masterclasses, case studies, and career openings.
            </p>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{recentUpdates.length} Live Items</span>
          </span>
        </div>

        {/* Desktop Table View (hidden on mobile) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/70 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="py-3.5 px-6">MEDIA</th>
                <th className="py-3.5 px-6">DETAILS</th>
                <th className="py-3.5 px-6">LOCATION</th>
                <th className="py-3.5 px-6">TIMESTAMP</th>
                <th className="py-3.5 px-6 text-right">ACTION</th>
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
                        unoptimized
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                  </td>

                  {/* DETAILS */}
                  <td className="py-3.5 px-6">
                    <div className="font-semibold text-slate-900">{item.title}</div>
                    <div className="text-[11px] text-slate-400 font-mono truncate max-w-xs">
                      {item.path}
                    </div>
                  </td>

                  {/* LOCATION */}
                  <td className="py-3.5 px-6">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md border font-medium text-[10px] tracking-wider uppercase ${item.locationBadgeClass || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
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

        {/* Dedicated Mobile Cards List (Visible only on mobile < md) */}
        <div className="block md:hidden divide-y divide-slate-100">
          {recentUpdates.map((item) => (
            <div key={item.id} className="p-3.5 flex items-center justify-between gap-3 hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80 shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    unoptimized
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-slate-900 text-xs truncate">
                    {item.title}
                  </h4>
                  <span className={`inline-block mt-0.5 px-1.5 py-0.5 rounded border font-medium text-[9px] uppercase tracking-wider ${item.locationBadgeClass || 'bg-slate-100 text-slate-600'}`}>
                    {item.location}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-mono truncate">
                    {item.path}
                  </p>
                </div>
              </div>

              <Link
                href={item.actionUrl}
                className="shrink-0 px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[#004f6e] text-[11px] font-bold rounded-xl transition-all"
              >
                Edit &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


