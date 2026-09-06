"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutGrid,
  Layers,
  Folder,
  Users,
  GraduationCap,
  Briefcase,
  MessageSquare,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  AlertTriangle
} from "lucide-react";

export default function AdminLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const userEmail = session?.user?.email || "admin@vishait.com";
  const userInitials = userEmail.substring(0, 2).toUpperCase();

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent background scroll when modal or mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen || logoutModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen, logoutModalOpen]);

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

  const renderNavLinks = () => (
    <div className="space-y-6">
      {/* Overview Section */}
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

      {/* Website Management Section */}
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
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col antialiased">
      {/* ── Fixed Top Header Bar (100% Sticky across all devices) ──────── */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)] h-[62px] sm:h-[72px] flex items-center px-3.5 sm:px-8 lg:px-12">
        {/* Left: Mobile Menu Toggle & Brand Logo */}
        <div className="flex items-center gap-3 sm:gap-6 pl-0.5 sm:pl-4">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </button>

          <Link href="/admin/dashboard" className="relative w-40 sm:w-56 lg:w-64 h-9 sm:h-12 lg:h-13 block">
            <Image
              src="/logo-dark.png"
              alt="Visha IT Solutions"
              fill
              sizes="(max-width: 640px) 160px, (max-width: 1024px) 224px, 256px"
              className="object-contain object-left"
              priority
            />
          </Link>
        </div>
      </header>

      {/* ── Main Workspace Body with offset for fixed header ───────────────── */}
      <div className="pt-[62px] sm:pt-[72px] flex-1 flex min-w-0">
        {/* Desktop Sidebar (Fixed below header) */}
        <aside className="hidden lg:flex w-64 bg-white border-r border-slate-200/80 flex-col shrink-0 select-none shadow-[1px_0_15px_rgba(0,0,0,0.01)] fixed top-[72px] bottom-0 left-0 z-30">
          <nav className="flex-grow px-4 py-6 overflow-y-auto custom-scrollbar">
            {renderNavLinks()}
          </nav>

          {/* Bottom Footer Section (Matching Image 1 & Image 3) */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-2.5">
            <Link
              href="/"
              target="_blank"
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-xs"
            >
              <ExternalLink size={13} className="text-[#00779e]" />
              <span>View Live Website</span>
            </Link>

            <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {userInitials}
                </div>
                <div className="min-w-0 text-left">
                  <p className="text-xs font-semibold text-slate-900 leading-tight truncate max-w-[130px]">
                    {userEmail}
                  </p>
                  <p className="text-[9px] font-bold tracking-wider text-[#00779e] uppercase mt-0.5">
                    ADMINISTRATOR
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setLogoutModalOpen(true)}
                title="Log Out"
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer shrink-0"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Slide-over Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop Blur */}
            <div
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
              aria-hidden="true"
            />

            {/* Slide-over Drawer Panel */}
            <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-250">
              {/* Drawer Header */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div className="relative w-36 h-8">
                  <Image
                    src="/logo-dark.png"
                    alt="Visha IT Solutions"
                    fill
                    sizes="144px"
                    className="object-contain object-left"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex-1 px-4 py-5 overflow-y-auto">
                {renderNavLinks()}
              </div>

              {/* Drawer Bottom Actions */}
              <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-2.5">
                <Link
                  href="/"
                  target="_blank"
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-xs"
                >
                  <ExternalLink size={14} className="text-[#00779e]" />
                  <span>View Live Website</span>
                </Link>

                <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {userInitials}
                    </div>
                    <div className="min-w-0 text-left">
                      <p className="text-xs font-semibold text-slate-900 leading-tight truncate max-w-[130px]">
                        {userEmail}
                      </p>
                      <p className="text-[9px] font-bold tracking-wider text-[#00779e] uppercase mt-0.5">
                        ADMINISTRATOR
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setLogoutModalOpen(true);
                    }}
                    title="Log Out"
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer shrink-0"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area (offset by lg:ml-64 to clear fixed desktop sidebar) */}
        <main className="flex-1 lg:ml-64 p-3.5 sm:p-6 lg:p-8 min-w-0">
          {children}
        </main>
      </div>

      {/* ── Confirm Logout Dialog Modal (Matching Image 4) ────────────────── */}
      {logoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <div
            onClick={() => setLogoutModalOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="relative z-10 w-full max-w-[410px] bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 text-center animate-in zoom-in-95 fade-in duration-200">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2">
              Confirm Logout
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6 font-normal">
              Are you sure you want to log out of the Admin Dashboard?
            </p>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setLogoutModalOpen(false)}
                className="flex-1 py-2.5 px-5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-2xs cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                className="flex-1 py-2.5 px-5 bg-rose-600 hover:bg-rose-700 active:scale-[0.98] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md shadow-rose-600/20 transition-all cursor-pointer"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
