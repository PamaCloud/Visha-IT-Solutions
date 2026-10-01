"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Mail, Phone, MapPin, Building2, Users, ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { VISHA_SERVICES } from "@/data/vishaServices";
import { VISHA_TRAINING_PROGRAMS } from "@/data/vishaTraining";
import { VISHA_PROJECTS } from "@/data/vishaProjects";
import { useQuoteDialog } from "@/context/QuoteDialogContext";

type DropdownType = "company" | "services" | "training" | "projects" | null;

interface NavItem {
  name: string;
  href: string;
  dropdownType?: "company" | "services" | "training" | "projects";
}

const navLinks: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Company", href: "/about", dropdownType: "company" },
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

  const fetchNavItems = useCallback(() => {
    fetch(`/api/public/nav-items?_t=${Date.now()}`, { cache: 'no-store' })
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
  }, []);

  useEffect(() => {
    fetchNavItems();

    // BroadcastChannel for instant cross-tab live sync
    let channel: BroadcastChannel | null = null;
    try {
      channel = new BroadcastChannel('visha_cms_sync');
      channel.onmessage = () => {
        fetchNavItems();
      };
    } catch (e) {}

    // Storage event listener fallback
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'visha_cms_last_update') {
        fetchNavItems();
      }
    };
    window.addEventListener('storage', handleStorage);

    return () => {
      if (channel) channel.close();
      window.removeEventListener('storage', handleStorage);
    };
  }, [pathname, fetchNavItems]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
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

  const getDropdownData = (type: DropdownType) => {
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
    return {
      baseHref: "/about",
      col1: [],
      col2: [],
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
      <nav className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-6 xl:px-8 flex items-center justify-between h-[70px] lg:h-[80px]">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center shrink-0 group"
        >
          <div className="relative w-44 sm:w-52 lg:w-48 xl:w-60 h-10 sm:h-11 lg:h-12">
            <Image
              src="/logo-dark.png"
              alt="Visha IT Solutions"
              fill
              sizes="(max-width: 640px) 176px, (max-width: 1024px) 208px, 240px"
              quality={100}
              className="object-contain object-left group-hover:opacity-90 transition-opacity"
              priority
            />
          </div>
        </Link>

        {/* Desktop Links with 2-Column Floating Cards for Services, Training & Projects */}
        <div ref={navContainerRef} className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 py-1">
          {navLinks.map((link) => {
            const hasDropdown = !!link.dropdownType;
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href ||
                  (hasDropdown && pathname.startsWith(link.href)) ||
                  (link.dropdownType === "company" && (pathname === "/about" || pathname === "/team"));
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
                    className={`px-2.5 xl:px-3.5 py-1.5 xl:py-2 rounded-full text-xs xl:text-sm font-medium inline-flex items-center gap-1 transition-all duration-200 cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "bg-[hsl(195,100%,25%)]/10 text-[hsl(195,100%,25%)] font-semibold"
                        : isCurrentOpen
                        ? "text-[hsl(195,100%,25%)] bg-slate-100/80 font-medium"
                        : "text-slate-600 hover:text-[hsl(195,100%,25%)] hover:bg-slate-100/80"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown
                      size={14}
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
                      {link.dropdownType === "company" ? (
                        <div className="w-44 bg-white rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.12)] border border-slate-100 p-1.5 animate-in fade-in zoom-in-95 duration-150">
                          <div className="flex flex-col">
                            <Link
                              href="/about"
                              onClick={() => setActiveDropdown(null)}
                              className="px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-[hsl(195,100%,25%)] hover:bg-slate-50 transition-colors"
                            >
                              About Us
                            </Link>
                            <Link
                              href="/team"
                              onClick={() => setActiveDropdown(null)}
                              className="px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-[hsl(195,100%,25%)] hover:bg-slate-50 transition-colors"
                            >
                              Our Team
                            </Link>
                          </div>
                        </div>
                      ) : link.dropdownType === "training" ? (
                          <div className="w-[580px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-slate-100 p-6 animate-in fade-in zoom-in-95 duration-200">
                            <div className="flex flex-col gap-3">
                              {/* If odd number of courses (e.g. 3 or 1), 1 course centered in the middle on top */}
                              {trainingList.length % 2 === 1 && trainingList[0] && (
                                <div className="flex justify-center">
                                  <Link
                                    href={`/training/${trainingList[0].slug}`}
                                    onClick={() => setActiveDropdown(null)}
                                    className="w-full max-w-xs px-4 py-3 rounded-xl text-center text-sm font-bold text-slate-800 hover:text-[hsl(195,100%,25%)] hover:bg-slate-50 transition-colors border border-slate-100/80 shadow-xs block capitalize"
                                  >
                                    {trainingList[0].title}
                                  </Link>
                                </div>
                              )}

                              {/* 2 Courses in the row below (or all courses if even count) */}
                              {(() => {
                                const paired = trainingList.length % 2 === 1 ? trainingList.slice(1) : trainingList;
                                if (paired.length === 0) return null;
                                return (
                                  <div className="grid grid-cols-2 gap-3">
                                    {paired.map((item) => (
                                      <Link
                                        key={item.id || item.slug}
                                        href={`/training/${item.slug}`}
                                        onClick={() => setActiveDropdown(null)}
                                        className="px-4 py-3 rounded-xl text-center text-sm font-bold text-slate-800 hover:text-[hsl(195,100%,25%)] hover:bg-slate-50 transition-colors border border-slate-100/80 shadow-xs block capitalize"
                                      >
                                        {item.title}
                                      </Link>
                                    ))}
                                  </div>
                                );
                              })()}
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
                className={`px-2.5 xl:px-3.5 py-1.5 xl:py-2 rounded-full text-xs xl:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
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

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("open-entry-modal"));
              }
            }}
            className="inline-flex items-center justify-center text-xs xl:text-sm font-semibold px-3 xl:px-4 py-1.5 xl:py-2 rounded-full border border-[hsl(195,100%,25%)]/30 text-[hsl(195,100%,25%)] hover:bg-[hsl(195,100%,25%)]/5 transition-all duration-200 whitespace-nowrap cursor-pointer"
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => openQuoteDialog()}
            className="inline-flex items-center justify-center text-xs xl:text-sm font-semibold px-4 xl:px-5 py-2 xl:py-2.5 rounded-full bg-gradient-to-r from-[hsl(195,100%,25%)] to-[hsl(195,100%,42%)] hover:from-[hsl(195,100%,20%)] hover:to-[hsl(195,100%,36%)] text-white shadow-[0_4px_14px_rgba(0,105,148,0.22)] hover:shadow-[0_6px_20px_rgba(0,105,148,0.32)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 whitespace-nowrap cursor-pointer"
          >
            Get a Project Quote
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden p-2.5 rounded-xl border border-slate-200/80 bg-slate-50 text-[hsl(210,29%,24%)] hover:bg-slate-100 transition-colors shadow-2xs cursor-pointer flex items-center justify-center"
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

                if (link.dropdownType === "company") {
                  return (
                    <div key={link.name} className="border-b border-gray-50 pb-2">
                      <button
                        onClick={() =>
                          setMobileExpanded((prev) =>
                            prev === link.dropdownType ? null : link.dropdownType!
                          )
                        }
                        className="w-full flex items-center justify-between py-3 text-sm font-semibold text-[hsl(210,29%,24%)] cursor-pointer"
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
                        <div className="pl-4 space-y-1 pb-2">
                          <Link
                            href="/about"
                            onClick={() => setMobileOpen(false)}
                            className="block py-2 text-xs font-semibold text-slate-700 hover:text-[hsl(195,100%,25%)]"
                          >
                            About Us
                          </Link>
                          <Link
                            href="/team"
                            onClick={() => setMobileOpen(false)}
                            className="block py-2 text-xs font-semibold text-slate-700 hover:text-[hsl(195,100%,25%)]"
                          >
                            Our Team
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                }

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
            <div className="pt-4 space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-entry-modal"));
                  }
                }}
                className="w-full flex items-center justify-center text-sm font-semibold py-2.5 rounded-xl border border-[hsl(195,100%,25%)] text-[hsl(195,100%,25%)] bg-[hsl(195,100%,25%)]/5 cursor-pointer"
              >
                Register with Visha
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  openQuoteDialog();
                }}
                className="btn-primary w-full justify-center text-sm py-3 cursor-pointer"
              >
                Get a Project Quote
              </button>

              {/* Tap-to-Call, Tap-to-Email & WhatsApp actions (FSD Section 5) */}
              <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs text-slate-600 gap-2">
                  <a
                    href="tel:+919014646804"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-semibold hover:bg-slate-100 transition-colors"
                  >
                    <Phone size={13} className="text-[hsl(195,100%,25%)]" />
                    <span>Call Us</span>
                  </a>
                  <a
                    href="mailto:info@vishaitsolutions.com"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-semibold hover:bg-slate-100 transition-colors"
                  >
                    <Mail size={13} className="text-[hsl(195,100%,25%)]" />
                    <span>Email Us</span>
                  </a>
                </div>
                <a
                  href="https://wa.me/919014646804"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold hover:bg-emerald-100 transition-colors"
                >
                  <FaWhatsapp size={14} className="text-emerald-600" />
                  <span>Chat on WhatsApp (+91 90146 46804)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
