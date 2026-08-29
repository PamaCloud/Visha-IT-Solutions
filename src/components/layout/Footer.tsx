import Link from "next/link";
import { MapPin, Phone, Mail, ChevronRight } from "lucide-react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0f1c] text-white pt-20 pb-8 border-t border-gray-800">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
          
          {/* Brand & Social */}
          <div className="flex flex-col">
            <Link href="/" className="inline-flex w-[60px] h-[60px] bg-[#131b2f] p-1.5 rounded-xl border border-white/5 shadow-sm items-center justify-center hover:bg-[#1a243d] transition-colors mb-6">
              <img 
                src="/logo.jpg" 
                alt="Visha IT Solutions" 
                className="w-full h-full object-cover rounded-full bg-white shadow-inner"
              />
            </Link>
            <p className="text-gray-300/90 mb-8 leading-relaxed text-sm pr-4">
              We help you find the perfect tech solutions to live, work, and grow. Your digital transformation is just a step away.
            </p>
            <div className="flex gap-4 mt-auto">
              <a href="#" className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300 text-gray-400 hover:!text-black" aria-label="Facebook">
                <FaFacebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300 text-gray-400 hover:!text-black" aria-label="Twitter">
                <FaTwitter size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300 text-gray-400 hover:!text-black" aria-label="LinkedIn">
                <FaLinkedin size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300 text-gray-400 hover:!text-black" aria-label="Instagram">
                <FaInstagram size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-white flex items-center gap-2 mb-6 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3.5 text-sm">
              <li className="flex items-center gap-3 group">
                <ChevronRight size={14} className="text-primary shrink-0 transition-transform group-hover:translate-x-1" />
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li className="flex items-center gap-3 group">
                <ChevronRight size={14} className="text-primary shrink-0 transition-transform group-hover:translate-x-1" />
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link>
              </li>
              <li className="flex items-center gap-3 group">
                <ChevronRight size={14} className="text-primary shrink-0 transition-transform group-hover:translate-x-1" />
                <Link href="/projects" className="text-gray-300 hover:text-white transition-colors">Projects</Link>
              </li>
              <li className="flex items-center gap-3 group">
                <ChevronRight size={14} className="text-primary shrink-0 transition-transform group-hover:translate-x-1" />
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link>
              </li>
              <li className="flex items-center gap-3 group">
                <ChevronRight size={14} className="text-primary shrink-0 transition-transform group-hover:translate-x-1" />
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col">
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-white flex items-center gap-2 mb-6 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              Our Services
            </h4>
            <ul className="flex flex-col gap-3.5 text-sm">
              <li className="flex items-center gap-3 group">
                <ChevronRight size={14} className="text-primary shrink-0 transition-transform group-hover:translate-x-1" />
                <Link href="/services/ecommerce-development" className="text-gray-300 hover:text-white transition-colors truncate">E-Commerce</Link>
              </li>
              <li className="flex items-center gap-3 group">
                <ChevronRight size={14} className="text-primary shrink-0 transition-transform group-hover:translate-x-1" />
                <Link href="/services/digital-marketing" className="text-gray-300 hover:text-white transition-colors truncate">Digital Marketing</Link>
              </li>
              <li className="flex items-center gap-3 group">
                <ChevronRight size={14} className="text-primary shrink-0 transition-transform group-hover:translate-x-1" />
                <Link href="/services/it-recruitment" className="text-gray-300 hover:text-white transition-colors truncate">IT Recruitment</Link>
              </li>
              <li className="flex items-center gap-3 group">
                <ChevronRight size={14} className="text-primary shrink-0 transition-transform group-hover:translate-x-1" />
                <Link href="/training" className="text-gray-300 hover:text-white transition-colors truncate">Training</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col">
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-white flex items-center gap-2 mb-6 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              Contact Us
            </h4>
            <ul className="flex flex-col gap-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
                <span className="text-white leading-relaxed">Hyderabad, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-primary shrink-0" />
                <a href="tel:+919999999999" className="text-white hover:text-gray-300 transition-colors">+91 9999999999</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-primary shrink-0" />
                <a href="mailto:contact@vishait.com" className="text-white hover:text-gray-300 transition-colors truncate">contact@vishait.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/80 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-400">
          <p>&copy; {currentYear} Visha IT Solutions. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="text-gray-400 hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <p className="hidden md:block border-l border-gray-800 pl-6 text-gray-500">Designed with 🤍 for Excellence</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
