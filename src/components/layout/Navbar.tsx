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
          isScrolled ? "bg-white shadow-md py-3" : "bg-white py-3"
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
        className={`fixed inset-0 bg-[#0a0f1c]/98 backdrop-blur-3xl z-40 transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden flex flex-col pt-28 pb-10 px-6 overflow-y-auto ${
          mobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        {/* Background Decorative elements */}
        <div className="absolute top-0 right-0 w-[80%] h-[300px] bg-primary/20 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[80%] h-[300px] bg-blue-600/10 rounded-full blur-[100px] -z-10"></div>

        <div className="flex flex-col gap-2 mb-8">
          <p className="text-white/40 text-xs font-bold tracking-[0.2em] uppercase mb-4 px-4">Navigation</p>
          {navLinks.map((link, idx) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{ transitionDelay: `${mobileMenuOpen ? idx * 50 : 0}ms` }}
                className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 transform ${
                  mobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                } ${
                  isActive 
                    ? "bg-primary/10 text-primary border border-primary/20" 
                    : "text-white/70 hover:bg-white/5 hover:text-white border border-transparent"
                }`}
              >
                <span className="text-2xl font-display font-bold">{link.name}</span>
                {isActive && <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(14,165,233,0.8)]"></div>}
              </Link>
            );
          })}
        </div>

        <div className="mt-auto">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>
          
          <div className="flex flex-col gap-4 px-2 mb-8 text-white/60 text-sm font-medium">
            <a href="mailto:contact@vishait.com" className="flex items-center gap-4 hover:text-white transition-colors">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary">
                <Mail size={18} />
              </div>
              contact@vishait.com
            </a>
            <a href="tel:+917036592351" className="flex items-center gap-4 hover:text-white transition-colors">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary">
                <Phone size={18} />
              </div>
              +91 7036592351
            </a>
          </div>

          <Link
            href="/get-a-quote"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-4 bg-primary text-white text-center font-bold text-lg rounded-xl hover:bg-primary-dark transition-all duration-300 shadow-[0_8px_20px_rgba(14,165,233,0.3)] shadow-[inset_0_-2px_0_0_rgba(0,0,0,0.1)] block"
          >
            Get a Project Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
