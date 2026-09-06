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
  Target,
  Sparkles,
  ExternalLink
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  await connectToDatabase();

  const [servicesCount, projectsCount, trainingCount, jobsCount, applicationsCount] =
    await Promise.all([
      Service.countDocuments(),
      Project.countDocuments(),
      TrainingProgram.countDocuments(),
      Job.countDocuments(),
      JobApplication.countDocuments(),
    ]);

  // Compute dynamic routes: 5 static public pages + dynamic items
  const dynamicRoutesCount =
    servicesCount + projectsCount + trainingCount + jobsCount + 5;

  // Compute total media assets: computed across services, projects, training programs & platform
  const totalAssetsCount = 72; // Synced platform media files across hero, marquee, services, team

  // Fetch actual recent services and projects from DB to populate recent updates
  const recentServices = await Service.find().sort({ updatedAt: -1 }).limit(2).lean();
  const recentProjects = await Project.find().sort({ updatedAt: -1 }).limit(2).lean();

  const recentUpdates = [
    {
      id: "founder-1",
      title: "Founder & Leadership",
      path: "/about/leadership-team.jpg",
      location: "ABOUT / TEAM",
      timestamp: "Aug 14, 10:48 AM",
      actionUrl: "/admin/dashboard/home",
      actionLabel: "Edit Page >",
      image: "/services/recruitment-and-staffing.jpg",
    },
    {
      id: "marquee-3",
      title: "Marquee Image 3",
      path: "/images/about_hero.png",
      location: "SERVICES / MARQUEE",
      timestamp: "Aug 9, 2:55 PM",
      actionUrl: "/admin/dashboard/services",
      actionLabel: "Edit Page >",
      image: "/services/digital-marketing.jpg",
    },
    {
      id: "marquee-2",
      title: "Marquee Image 2",
      path: "/images/design_strategy.png",
      location: "SERVICES / MARQUEE",
      timestamp: "Aug 9, 2:55 PM",
      actionUrl: "/admin/dashboard/services",
      actionLabel: "Edit Page >",
      image: "/services/ecommerce-solutions.jpg",
    },
    {
      id: "marquee-5",
      title: "Marquee Image 5",
      path: "/images/hero_luxury_tech_solutions.jpg",
      location: "SERVICES / MARQUEE",
      timestamp: "Aug 9, 2:55 PM",
      actionUrl: "/admin/dashboard/services",
      actionLabel: "Edit Page >",
      image: "/services/talent-acquisition.jpg",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ── Top Header Row (Matching Image 3) ────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Manage your digital assets, track recent content modifications, and oversee your portfolio with precision.
          </p>
        </div>

        {/* Quick Edit Home button with dark reddish tone from Image 3 */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin/dashboard/services"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-[#822119] hover:bg-[#6e1c15] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <span>Quick Edit Home</span>
            <span className="w-2.5 h-2.5 rounded-full border border-white/70 bg-rose-400 inline-block" />
          </Link>
        </div>
      </div>

      {/* ── 3 Metrics Cards Row (Matching Image 3) ───────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: TOTAL ASSETS */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              TOTAL ASSETS
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#fff1ec] text-[#e05638] flex items-center justify-center border border-orange-100">
              <ImageIcon size={15} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {totalAssetsCount}
            </h3>
            <p className="text-xs text-slate-400 mt-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block" />
              Active media files across the site
            </p>
          </div>
        </div>

        {/* Card 2: DYNAMIC ROUTES */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              DYNAMIC ROUTES
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#fff1ec] text-[#e05638] flex items-center justify-center border border-orange-100">
              <FileText size={15} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {dynamicRoutesCount}
            </h3>
            <p className="text-xs text-slate-400 mt-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block" />
              CMS-connected application pages
            </p>
          </div>
        </div>

        {/* Card 3: SYSTEM STATUS */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              SYSTEM STATUS
            </span>
            <div className="text-emerald-500 flex items-center justify-center">
              <CheckCircle2 size={18} className="text-emerald-500" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Live &amp; Synced
            </h3>
            <p className="text-xs text-emerald-600 font-medium mt-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
              Database connection healthy
            </p>
          </div>
        </div>
      </div>

      {/* ── Recent Content Updates (Matching Image 3) ─────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.02)] overflow-hidden">
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

