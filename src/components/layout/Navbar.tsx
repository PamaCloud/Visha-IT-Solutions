"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { VISHA_SERVICES } from "@/data/vishaServices";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services", hasDropdown: true },
  { name: "Training", href: "/training" },
  { name: "Projects", href: "/projects" },
  { name: "Careers", href: "/careers" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Split the 6 services into two columns of 3
  const col1 = VISHA_SERVICES.slice(0, 3);
  const col2 = VISHA_SERVICES.slice(3, 6);

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

        {/* Desktop Links with Abhivorn-Style 2-Column Services Dropdown */}
        <div className="hidden lg:flex items-center gap-1.5 py-1">
          {navLinks.map((link) => {
            const isServices = link.hasDropdown;
            const isActive = pathname === link.href || (isServices && pathname.startsWith("/services"));

            if (isServices) {
              return (
                <div
                  key={link.name}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                >
                  <button
                    onClick={() => setServicesDropdownOpen((prev) => !prev)}
                    className={`px-4 py-2 rounded-full text-sm font-medium inline-flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                      isActive || servicesDropdownOpen
                        ? "bg-[hsl(195,100%,25%)]/10 text-[hsl(195,100%,25%)] font-semibold"
                        : "text-slate-600 hover:text-[hsl(195,100%,25%)] hover:bg-slate-100/80"
                    }`}
                  >
                    <span>Services</span>
                    <ChevronDown
                      size={15}
                      className={`transition-transform duration-200 ${
                        servicesDropdownOpen ? "rotate-180 text-[hsl(195,100%,25%)]" : "text-slate-400"
                      }`}
                    />
                  </button>

                  {/* 2-Column Floating Services Card Dropdown */}
                  {servicesDropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                      <div className="w-[560px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-slate-100 p-6 animate-in fade-in zoom-in-95 duration-200">
                        <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                          {/* Column 1 */}
                          <div className="space-y-1">
                            {col1.map((svc) => (
                              <Link
                                key={svc.id}
                                href={`/services/${svc.slug}`}
                                onClick={() => setServicesDropdownOpen(false)}
                                className="block px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-[hsl(195,100%,25%)] hover:bg-slate-50 transition-colors"
                              >
                                {svc.title}
                              </Link>
                            ))}
                          </div>

                          {/* Column 2 */}
                          <div className="space-y-1">
                            {col2.map((svc) => (
                              <Link
                                key={svc.id}
                                href={`/services/${svc.slug}`}
                                onClick={() => setServicesDropdownOpen(false)}
                                className="block px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-[hsl(195,100%,25%)] hover:bg-slate-50 transition-colors"
                              >
                                {svc.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
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
          <Link
            href="/get-a-quote"
            className="inline-flex items-center justify-center text-sm font-semibold px-6 py-2.5 rounded-full bg-gradient-to-r from-[hsl(195,100%,25%)] to-[hsl(195,100%,42%)] hover:from-[hsl(195,100%,20%)] hover:to-[hsl(195,100%,36%)] text-white shadow-[0_4px_14px_rgba(0,105,148,0.22)] hover:shadow-[0_6px_20px_rgba(0,105,148,0.32)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            Book a Demo
          </Link>
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
              if (link.hasDropdown) {
                return (
                  <div key={link.name} className="border-b border-gray-50 pb-2">
                    <button
                      onClick={() => setMobileServicesOpen((prev) => !prev)}
                      className="w-full flex items-center justify-between py-3 text-sm font-semibold text-[hsl(210,29%,24%)]"
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          mobileServicesOpen ? "rotate-180 text-[hsl(195,100%,25%)]" : ""
                        }`}
                      />
                    </button>
                    {mobileServicesOpen && (
                      <div className="pl-4 space-y-2 pb-2">
                        {VISHA_SERVICES.map((svc) => (
                          <Link
                            key={svc.id}
                            href={`/services/${svc.slug}`}
                            onClick={() => setMobileOpen(false)}
                            className="block py-1.5 text-xs font-medium text-slate-600 hover:text-[hsl(195,100%,25%)]"
                          >
                            {svc.title}
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
              <Link
                href="/get-a-quote"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full justify-center text-sm py-3"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
