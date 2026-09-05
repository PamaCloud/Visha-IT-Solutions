import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    /* Exact Abhivorn Footer: bg-primary (hsl 195 100% 25%) deep teal, white text */
    <footer className="bg-[hsl(195,100%,25%)] text-white pt-20 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">

          {/* Brand (Abhivorn: lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block group">
              <img
                src="/logo.jpg"
                alt="Visha IT Solutions"
                width={160}
                height={40}
                className="h-10 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              Enterprise-grade IT solutions for modern businesses. Building the future of digital innovation through cutting-edge architectures and top-tier talent.
            </p>
            {/* Social links (Abhivorn: w-8 h-8 rounded-full bg-white/5, hover → accent) */}
            <div className="flex gap-4 pt-2">
              {[
                { icon: FaLinkedin, href: "#", label: "LinkedIn" },
                { icon: FaInstagram, href: "#", label: "Instagram" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-[hsl(195,100%,50%)] hover:text-white transition-all duration-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-white/90 mb-6">Services</h4>
            <ul className="space-y-3">
              {[
                { name: "Recruitment & Staffing",        href: "/services/recruitment-and-staffing" },
                { name: "Talent Acquisition",             href: "/services/talent-acquisition" },
                { name: "Payroll & HR Services",         href: "/services/payroll-and-hr-services" },
                { name: "Digital Marketing",              href: "/services/digital-marketing" },
                { name: "E-Commerce Solutions",          href: "/services/ecommerce-solutions" },
                { name: "Training & Career Dev",         href: "/services/training-and-career-development" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[hsl(195,100%,50%)] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-white/90 mb-6">Overview</h4>
            <ul className="space-y-4">
              {[
                { name: "About Us",  href: "/about"    },
                { name: "Services",  href: "/services" },
                { name: "Projects",  href: "/projects" },
                { name: "Careers",   href: "/careers"  },
                { name: "Contact",   href: "/contact"  },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[hsl(195,100%,50%)] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-white/90 mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:contact@vishait.com"
                  className="flex items-start gap-3 text-white/60 hover:text-[hsl(195,100%,50%)] transition-colors text-sm"
                >
                  <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>contact@vishait.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+919999999999"
                  className="flex items-start gap-3 text-white/60 hover:text-[hsl(195,100%,50%)] transition-colors text-sm"
                >
                  <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>+91 9999999999</span>
                </a>
              </li>
              <li>
                <span className="flex items-start gap-3 text-white/60 text-sm">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Hyderabad, Telangana, India</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>&copy; {currentYear} Visha IT Solutions. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-white/70 transition-colors">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
