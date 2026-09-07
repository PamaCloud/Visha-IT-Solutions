"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Layers,
  Folder,
  Users,
  GraduationCap,
  Briefcase,
  MessageSquare,
  ExternalLink,
  LogOut
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const userEmail = session?.user?.email || "admin@vishait.com";
  const userInitials = userEmail.substring(0, 2).toUpperCase();

  const overviewLinks = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutGrid },
  ];

  const websiteManagementLinks = [
    { name: "Services", href: "/admin/dashboard/services", icon: Layers },
    { name: "Training", href: "/admin/dashboard/training", icon: GraduationCap },
    { name: "Projects", href: "/admin/dashboard/projects", icon: Folder },
    { name: "Job Postings", href: "/admin/dashboard/jobs", icon: Briefcase },
    { name: "Applications", href: "/admin/dashboard/applications", icon: Users, badge: "Candidates" },
    { name: "Enquiries", href: "/admin/dashboard/enquiries", icon: MessageSquare },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/admin/dashboard") {
      return pathname === "/admin/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 text-slate-700 flex flex-col h-screen sticky top-0 shrink-0 select-none shadow-[1px_0_15px_rgba(0,0,0,0.02)]">
      {/* Brand Header */}
      <div className="pt-6 pb-5 px-6 border-b border-slate-100 flex items-center justify-center">
        <Link href="/admin/dashboard" className="relative w-52 h-13 block">
          <Image
            src="/logo-dark.png"
            alt="Visha IT Solutions"
            fill
            sizes="176px"
            className="object-contain object-center"
            priority
          />
        </Link>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-grow px-4 py-5 space-y-6 overflow-y-auto custom-scrollbar">
        {/* Section: OVERVIEW */}
        <div>
          <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase px-3 mb-2">
            OVERVIEW
          </p>
          <div className="space-y-1">
            {overviewLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? "bg-[#e6f4f8] text-[#004f6e] shadow-xs"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <link.icon
                    size={17}
                    className={active ? "text-[#00779e]" : "text-slate-400"}
                  />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Section: WEBSITE CONTENT MANAGEMENT */}
        <div>
          <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase px-3 mb-2">
            WEBSITE MANAGEMENT
          </p>
          <div className="space-y-1">
            {websiteManagementLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    active
                      ? "bg-[#e6f4f8] text-[#004f6e] font-semibold shadow-xs"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <link.icon
                    size={16}
                    className={active ? "text-[#00779e]" : "text-slate-400"}
                  />
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="ml-auto bg-[#00779e]/10 text-[#004f6e] text-[10px] px-2 py-0.5 rounded-full font-bold">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Bottom Footer Section */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-2.5">
        {/* View Live Website Button */}
        <Link
          href="/"
          target="_blank"
          className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 text-xs font-medium text-slate-700 bg-white border border-slate-200/90 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs"
        >
          <ExternalLink size={14} className="text-[#00779e]" />
          <span>View Live Website</span>
        </Link>

        {/* Admin Profile Pill */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200/70">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#004f6e] to-[#0096c7] text-white flex items-center justify-center font-bold text-xs shrink-0">
              {userInitials}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-800 truncate leading-tight">
                {userEmail}
              </p>
              <p className="text-[9px] font-bold tracking-wider text-[#00779e] uppercase">
                ADMINISTRATOR
              </p>
            </div>
          </div>
          <button
            onClick={async () => {
              if (typeof window !== "undefined") {
                sessionStorage.clear();
                localStorage.clear();
              }
              await signOut({ redirect: false });
              window.location.replace("/admin/login");
            }}
            title="Sign Out"
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors shrink-0 ml-1 cursor-pointer"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
