import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#071626] text-white pt-16 pb-10 overflow-hidden border-t border-slate-800">
      {/* Subtle luxury ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00779e]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          {/* Brand & Summary (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block group">
              <div className="relative w-56 sm:w-64 h-12 sm:h-14">
                <Image
                  src="/logo-white.png"
                  alt="Visha IT Solutions"
                  fill
                  sizes="(max-width: 640px) 224px, 256px"
                  quality={100}
                  className="object-contain object-left group-hover:opacity-95 transition-opacity"
                />
              </div>
            </Link>

            <p className="text-white/65 text-sm leading-relaxed max-w-sm">
              Empowering modern enterprises with high-velocity recruitment &amp; staffing, result-driven digital marketing, cutting-edge technology training, and scalable e-commerce ecosystems.
            </p>

            {/* Social Links */}
            <div className="space-y-3 pt-2">
              <span className="text-[11px] font-bold tracking-widest uppercase text-white/50 block">Connect With Us</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://wa.me/919014646804"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all duration-300 hover:scale-105"
                >
                  <FaWhatsapp className="h-4 w-4" />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white transition-all duration-300 hover:scale-105"
                >
                  <FaLinkedin className="h-4 w-4" />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-transparent hover:text-white transition-all duration-300 hover:scale-105"
                >
                  <FaInstagram className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Services Column (lg:col-span-3) - Exact requested order, NO "All Services & Solutions" */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold tracking-widest uppercase text-sky-400 mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>Services</span>
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Recruitment and Staffing",     href: "/services/recruitment-and-staffing" },
                { name: "Digital Marketing",            href: "/services/digital-marketing" },
                { name: "Training Programs",           href: "/training" },
                { name: "Ecommerce Solutions",          href: "/services/ecommerce-solutions" },
                { name: "Talent Acquisition",           href: "/services/talent-acquisition" },
                { name: "Payroll & HR Services",       href: "/services/payroll-and-hr-services" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-sky-400 transition-colors" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold tracking-widest uppercase text-sky-400 mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>Company</span>
            </h4>
            <ul className="space-y-3">
              {[
                { name: "About Us",  href: "/about" },
                { name: "Our Team",  href: "/team" },
                { name: "Training",  href: "/training" },
                { name: "Projects",  href: "/projects" },
                { name: "Careers",   href: "/careers" },
                { name: "Contact",   href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-sky-400 transition-colors" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold tracking-widest uppercase text-sky-400 mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>Contact HQ</span>
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:info@vishaitsolutions.com"
                  className="flex items-start gap-3 text-white/75 hover:text-sky-300 transition-colors text-sm group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-sky-400/50">
                    <Mail className="h-4 w-4 text-sky-400" />
                  </div>
                  <span className="pt-1 break-all">info@vishaitsolutions.com</span>
                </a>
              </li>

              <li>
                <a
                  href="tel:+919014646804"
                  className="flex items-start gap-3 text-white/75 hover:text-sky-300 transition-colors text-sm group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-sky-400/50">
                    <Phone className="h-4 w-4 text-sky-400" />
                  </div>
                  <span className="pt-1 font-semibold text-white">+91 90146 46804</span>
                </a>
              </li>

              <li>
                <div className="flex items-start gap-3 text-white/70 text-xs sm:text-sm leading-relaxed">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="h-4 w-4 text-sky-400" />
                  </div>
                  <span className="pt-0.5">
                    Apurupa Turbo Tower, No:36 Pillar No:1680, 2-293/82/a/787, Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <p>&copy; {currentYear} Visha IT Solutions. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
