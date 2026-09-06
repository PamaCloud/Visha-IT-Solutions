import { Info, Users, Target, Award } from "lucide-react";

export default function AdminAboutPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Info size={22} className="text-[#00779e]" /> About &amp; Brand Story Management
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review company vision, leadership information, and organizational milestones.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.03)] space-y-2">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#00779e] flex items-center justify-center border border-sky-100">
            <Target size={20} />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Mission &amp; Philosophy</h3>
          <p className="text-xs text-slate-500">
            Delivering future-ready digital engineering and world-class enterprise web applications.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.03)] space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
            <Users size={20} />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Leadership &amp; Talent</h3>
          <p className="text-xs text-slate-500">
            Expert software architects, UI/UX designers, and industry mentors.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.03)] space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <Award size={20} />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Proven Results</h3>
          <p className="text-xs text-slate-500">
            Trusted by modern digital enterprises across cloud, design, and web technology.
          </p>
        </div>
      </div>
    </div>
  );
}
