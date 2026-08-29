"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, MapPin, Home, Info, Briefcase, BookOpen, Folder, Users, MessageSquare, Bug } from "lucide-react";

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
    { name: "Home", href: "/", icon: Home, section: "OVERVIEW" },
    { name: "About Us", href: "/about", icon: Info, section: "COMPANY" },
    { name: "Services", href: "/services", icon: Briefcase, section: "COMPANY" },
    { name: "Training", href: "/training", icon: BookOpen, section: "COMPANY" },
    { name: "Projects", href: "/projects", icon: Folder, section: "COMPANY" },
    { name: "Careers", href: "/careers", icon: Users, section: "SUPPORT" },
    { name: "Contact Us", href: "/contact", icon: MessageSquare, section: "SUPPORT" },
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
        className={`w-full transition-all duration-300 border-b border-gray-100/50 shadow-sm ${
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

      {/* Mobile Drawer Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-md z-40 transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col shadow-2xl ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <span className="font-display font-bold text-lg text-secondary">Menu</span>
          <button 
            onClick={() => setMobileMenuOpen(false)} 
            className="text-gray-500 hover:text-gray-800 bg-gray-50 p-2 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Sidebar Links */}
        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-8">
          {["OVERVIEW", "COMPANY", "SUPPORT"].map((sectionName) => (
            <div key={sectionName}>
              <p className="text-[10px] font-bold text-gray-400 tracking-[0.2em] mb-3 px-3 uppercase">
                {sectionName}
              </p>
              <div className="flex flex-col gap-1">
                {navLinks
                  .filter((link) => link.section === sectionName)
                  .map((link) => {
                    const isActive = pathname === link.href;
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-4 px-3 py-3.5 rounded-xl transition-all duration-200 text-sm font-semibold ${
                          isActive 
                            ? "bg-primary/10 text-primary" 
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <Icon size={18} className={isActive ? "text-primary" : "text-gray-400"} />
                        {link.name}
                      </Link>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="mt-auto px-6 py-6 border-t border-gray-100 bg-gray-50/50 flex flex-col gap-4">
          <Link
            href="/get-a-quote"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-3.5 bg-primary text-white text-center font-bold text-sm rounded-xl hover:bg-primary-dark transition-all duration-300 shadow-sm"
          >
            Get a Project Quote
          </Link>
          
          <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
            <span className="flex flex-col">
              <span>SYSTEM VERSION</span>
              <span className="text-gray-400 font-normal">v1.0.0</span>
            </span>
            <a href="mailto:contact@vishait.com" className="flex items-center gap-2 hover:text-primary transition-colors border border-gray-200 bg-white px-3 py-1.5 rounded-lg">
              <Bug size={14} /> Report Bug
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
