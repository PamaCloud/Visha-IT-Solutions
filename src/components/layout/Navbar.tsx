"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Training", href: "/training" },
    { name: "Projects", href: "/projects" },
    { name: "Careers", href: "/careers" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="fixed w-full top-0 z-50 flex flex-col">
      {/* Top Bar */}
      <div className="hidden lg:flex bg-[#0f172a] text-white py-2 text-sm">
        <div className="container flex justify-between items-center">
          <div className="flex gap-6">
            <a href="mailto:contact@vishait.com" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
              <Mail size={16} /> contact@vishait.com
            </a>
            <a href="tel:+919999999999" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
              <Phone size={16} /> +91 9999999999
            </a>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <MapPin size={16} /> Hyderabad, India
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 border-b border-gray-100/50 ${
          isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-white/95 py-3"
        }`}
      >
        <div className="container flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-50 relative w-56 h-16">
            <Image 
              src="/logo.jpg" 
              alt="Visha IT Solutions Logo" 
              fill
              className="object-contain object-left mix-blend-darken contrast-[1.1] brightness-[1.1]"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            <div className="flex gap-8 font-medium text-secondary-light text-[15px]">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`hover:text-primary transition-colors relative ${
                    pathname === link.href ? "text-primary font-semibold after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full" : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <Link href="/get-a-quote" className="btn btn-primary text-sm px-6 py-2.5">
              Get a Project Quote
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden z-50 text-secondary bg-surface p-2 rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 bg-white/95 backdrop-blur-xl z-40 transform transition-transform duration-300 lg:hidden flex flex-col pt-28 pb-8 px-8 overflow-y-auto ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-6 text-xl font-medium mb-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={pathname === link.href ? "text-primary" : "text-secondary"}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="mt-auto flex flex-col gap-4">
          <Link
            href="/get-a-quote"
            onClick={() => setMobileMenuOpen(false)}
            className="btn btn-primary w-full py-4 text-center text-lg"
          >
            Get a Project Quote
          </Link>
          <div className="flex flex-col gap-3 mt-4 text-secondary-light">
            <a href="mailto:contact@vishait.com" className="flex items-center gap-3">
              <Mail size={20} className="text-primary" /> contact@vishait.com
            </a>
            <a href="tel:+919999999999" className="flex items-center gap-3">
              <Phone size={20} className="text-primary" /> +91 9999999999
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
