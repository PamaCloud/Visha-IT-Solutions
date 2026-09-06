"use client";

import { useSession } from "next-auth/react";
import { Bell, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AdminHeader() {
  const { data: session } = useSession();

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 h-14 flex items-center justify-between px-6 lg:px-8 sticky top-0 z-20">
      <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-gray-400">Admin Control Center</span>
        <span className="text-gray-300">/</span>
        <span className="text-gray-800 font-semibold">Management Console</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-200/60">
          <Sparkles size={13} />
          <span>MongoDB Atlas Active</span>
        </div>

        <Link
          href="/admin/dashboard/applications"
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors relative"
          title="Candidate Applications"
        >
          <Bell size={17} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#00779e] rounded-full ring-2 ring-white" />
        </Link>
      </div>
    </header>
  );
}
