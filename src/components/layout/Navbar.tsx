"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { name: "Home",       href: "/" },
  { name: "About Us",   href: "/about" },
  { name: "Services",   href: "/services" },
  { name: "Training",   href: "/training" },
  { name: "Projects",   href: "/projects" },
  { name: "Careers",    href: "/careers" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        <Link href="/" className="flex items-center flex-shrink-0 group">
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

        {/* Desktop Links - Classic, sophisticated pill styling without bottom underlines */}
        <div className="hidden lg:flex items-center gap-1.5 py-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
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
