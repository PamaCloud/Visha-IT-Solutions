"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { VISHA_SERVICES } from "@/data/vishaServices";
import { VISHA_TRAINING_PROGRAMS } from "@/data/vishaTraining";
import { VISHA_PROJECTS } from "@/data/vishaProjects";
import { useQuoteDialog } from "@/context/QuoteDialogContext";

type DropdownType = "services" | "training" | "projects" | null;

interface NavItem {
  name: string;
  href: string;
  dropdownType?: "services" | "training" | "projects";
}

const navLinks: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services", dropdownType: "services" },
  { name: "Training", href: "/training", dropdownType: "training" },
  { name: "Projects", href: "/projects", dropdownType: "projects" },
  { name: "Careers", href: "/careers" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const { openQuoteDialog } = useQuoteDialog();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);
  const [mobileExpanded, setMobileExpanded] = useState<DropdownType>(null);
  const [servicesList, setServicesList] = useState(VISHA_SERVICES);
  const [trainingList, setTrainingList] = useState(VISHA_TRAINING_PROGRAMS);
  const [projectsList, setProjectsList] = useState(VISHA_PROJECTS);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/public/nav-items")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          if (Array.isArray(json.data.services) && json.data.services.length > 0) {
            setServicesList(json.data.services);
          }
          if (Array.isArray(json.data.training) && json.data.training.length > 0) {
            setTrainingList(json.data.training);
          }
          if (Array.isArray(json.data.projects) && json.data.projects.length > 0) {
            setProjectsList(json.data.projects);
          }
        }
      })
      .catch(() => {});
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on pathname change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileOpen(false);
  }, [pathname]);

  const getDropdownData = (type: "services" | "training" | "projects") => {
    if (type === "services") {
      const half = Math.ceil(servicesList.length / 2);
      return {
        baseHref: "/services",
        col1: servicesList.slice(0, half),
        col2: servicesList.slice(half),
      };
    }
    if (type === "training") {
      return {
        baseHref: "/training",
        items: trainingList,
      };
    }
    const half = Math.ceil(projectsList.length / 2);
    return {
      baseHref: "/projects",
      col1: projectsList.slice(0, half),
      col2: projectsList.slice(half),
    };
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.08)] border-b border-gray-100"
          : "bg-white/95 backdrop-blur-xl border-b border-gray-100"
      }`}
    >
      <nav className="container flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center flex-shrink-0 group"
        >
          <div className="relative w-44 sm:w-48 h-10 sm:h-11">
            <Image
              src="/logo-dark.png"
              alt="Visha IT Solutions"
              fill
              sizes="(max-width: 640px) 176px, 192px"
              className="object-contain object-left group-hover:opacity-90 transition-opacity"
              priority
            />
          </div>
        </Link>

        {/* Desktop Links with 2-Column Floating Cards for Services, Training & Projects */}
        <div ref={navContainerRef} className="hidden lg:flex items-center gap-1.5 py-1">
          {navLinks.map((link) => {
            const hasDropdown = !!link.dropdownType;
            const isActive =
              pathname === link.href || (hasDropdown && pathname.startsWith(link.href));
            const isCurrentOpen = activeDropdown === link.dropdownType;

            if (hasDropdown && link.dropdownType) {
              const { baseHref, col1, col2 } = getDropdownData(link.dropdownType);

              return (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.dropdownType!)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() =>
                      setActiveDropdown((prev) =>
                        prev === link.dropdownType ? null : link.dropdownType!
                      )
                    }
                    className={`px-4 py-2 rounded-full text-sm font-medium inline-flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                      isActive || isCurrentOpen
                        ? "bg-[hsl(195,100%,25%)]/10 text-[hsl(195,100%,25%)] font-semibold"
                        : "text-slate-600 hover:text-[hsl(195,100%,25%)] hover:bg-slate-100/80"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown
                      size={15}
                      className={`transition-transform duration-200 ${
                        isCurrentOpen
                          ? "rotate-180 text-[hsl(195,100%,25%)]"
                          : "text-slate-400"
                      }`}
                    />
                  </button>

                  {/* Floating Card Dropdown */}
                  {isCurrentOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                      {link.dropdownType === "training" ? (
                        <div className="w-[580px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-slate-100 p-6 animate-in fade-in zoom-in-95 duration-200">
                          <div className="flex flex-col gap-3">
                            {/* Above Row: 1 Course in the Middle */}
                            {trainingList[0] && (
                              <div className="flex justify-center">
                                <Link
                                  href={`/training/${trainingList[0].slug}`}
                                  onClick={() => setActiveDropdown(null)}
                                  className="w-full max-w-sm px-4 py-3 rounded-xl text-center text-sm font-bold text-slate-800 hover:text-[hsl(195,100%,25%)] hover:bg-slate-50 transition-colors border border-slate-100/80 shadow-xs block"
                                >
                                  {trainingList[0].title}
                                </Link>
                              </div>
                            )}

                            {/* One Row: 2 Courses side-by-side */}
                            {trainingList.length > 1 && (
                              <div className="grid grid-cols-2 gap-3">
                                {trainingList.slice(1, 3).map((item) => (
                                  <Link
                                    key={item.id || item.slug}
                                    href={`/training/${item.slug}`}
                                    onClick={() => setActiveDropdown(null)}
                                    className="px-4 py-3 rounded-xl text-center text-sm font-bold text-slate-800 hover:text-[hsl(195,100%,25%)] hover:bg-slate-50 transition-colors border border-slate-100/80 shadow-xs block"
                                  >
                                    {item.title}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="w-[560px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-slate-100 p-6 animate-in fade-in zoom-in-95 duration-200">
                          <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                            {/* Column 1 */}
                            <div className="space-y-1">
                              {col1?.map((item: any) => (
                                <Link
                                  key={item.id || item.slug}
                                  href={`${baseHref}/${item.slug}`}
                                  onClick={() => setActiveDropdown(null)}
                                  className="block px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-[hsl(195,100%,25%)] hover:bg-slate-50 transition-colors"
                                >
                                  {item.title}
                                </Link>
                              ))}
                            </div>

                            {/* Column 2 */}
                            <div className="space-y-1">
                              {col2?.map((item: any) => (
                                <Link
                                  key={item.id || item.slug}
                                  href={`${baseHref}/${item.slug}`}
                                  onClick={() => setActiveDropdown(null)}
                                  className="block px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-[hsl(195,100%,25%)] hover:bg-slate-50 transition-colors"
                                >
                                  {item.title}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => {
                  if (link.href === "/" || pathname === link.href) {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[hsl(195,100%,25%)]/10 text-[hsl(195,100%,25%)] font-semibold shadow-xs"
                    : "text-slate-600 hover:text-[hsl(195,100%,25%)] hover:bg-slate-100/80"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <button
            type="button"
            onClick={() => openQuoteDialog()}
            className="inline-flex items-center justify-center text-sm font-semibold px-6 py-2.5 rounded-full bg-gradient-to-r from-[hsl(195,100%,25%)] to-[hsl(195,100%,42%)] hover:from-[hsl(195,100%,20%)] hover:to-[hsl(195,100%,36%)] text-white shadow-[0_4px_14px_rgba(0,105,148,0.22)] hover:shadow-[0_6px_20px_rgba(0,105,148,0.32)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
          >
            Get a Quote
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden p-2 text-[hsl(210,29%,24%)] transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="container py-4 space-y-1">
            {navLinks.map((link) => {
              if (link.dropdownType) {
                const isExpanded = mobileExpanded === link.dropdownType;
                let items: { id?: string; slug: string; title: string }[] = [];
                let baseHref = "";

                if (link.dropdownType === "services") {
                  items = servicesList;
                  baseHref = "/services";
                } else if (link.dropdownType === "training") {
                  items = trainingList;
                  baseHref = "/training";
                } else if (link.dropdownType === "projects") {
                  items = projectsList;
                  baseHref = "/projects";
                }

                return (
                  <div key={link.name} className="border-b border-gray-50 pb-2">
                    <button
                      onClick={() =>
                        setMobileExpanded((prev) =>
                          prev === link.dropdownType ? null : link.dropdownType!
                        )
                      }
                      className="w-full flex items-center justify-between py-3 text-sm font-semibold text-[hsl(210,29%,24%)]"
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          isExpanded ? "rotate-180 text-[hsl(195,100%,25%)]" : ""
                        }`}
                      />
                    </button>
                    {isExpanded && (
                      <div className="pl-4 space-y-2 pb-2">
                        {items.map((item) => (
                          <Link
                            key={item.id}
                            href={`${baseHref}/${item.slug}`}
                            onClick={() => setMobileOpen(false)}
                            className="block py-1.5 text-xs font-medium text-slate-600 hover:text-[hsl(195,100%,25%)]"
                          >
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-3 text-sm font-semibold transition-colors border-b border-gray-50 last:border-0 ${
                    isActive
                      ? "text-[hsl(195,100%,25%)]"
                      : "text-[hsl(210,29%,24%)]/80 hover:text-[hsl(195,100%,25%)]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  openQuoteDialog();
                }}
                className="btn-primary w-full justify-center text-sm py-3 cursor-pointer"
              >
                Get a Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
