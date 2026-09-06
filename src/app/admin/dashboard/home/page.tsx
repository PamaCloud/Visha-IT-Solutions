import { Home as HomeIcon, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AdminHomePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <HomeIcon size={22} className="text-[#00779e]" /> Homepage CMS Configuration
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure marquee banners, hero headlines, featured project highlights, and call-to-actions.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 text-center max-w-xl mx-auto space-y-4 shadow-[0_2px_15px_rgba(0,0,0,0.03)]">
        <div className="w-14 h-14 rounded-2xl bg-sky-50 text-[#00779e] flex items-center justify-center mx-auto border border-sky-100">
          <Sparkles size={28} />
        </div>
        <h2 className="text-lg font-bold text-slate-900">Homepage Dynamic Content Engine</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          Your homepage dynamically connects to live Services, featured Projects, and active Training programs managed via your Admin Dashboard.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            href="/admin/dashboard/services"
            className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-colors"
          >
            Manage Services
          </Link>
          <Link
            href="/admin/dashboard/projects"
            className="px-4 py-2 bg-gradient-to-r from-[#004f6e] to-[#0096c7] hover:from-[#003d55] hover:to-[#007ba3] text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
          >
            Manage Featured Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
