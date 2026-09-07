import { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";
import { Mail, Phone, MapPin, Clock, Sparkles } from "lucide-react";
import SlideUp from "@/components/animations/SlideUp";
import FadeIn from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "Contact Us - Visha IT Solutions",
  description: "Get in touch with Visha IT Solutions. We are here to help with your web development, recruitment, and training needs.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pb-24 relative overflow-hidden bg-slate-50/50">
      {/* Premium Background Elements */}
      <div className="absolute top-0 left-0 w-[50%] h-[500px] bg-gradient-to-br from-[hsl(195,100%,25%)]/10 via-cyan-50/30 to-transparent rounded-br-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[hsl(195,100%,25%)]/5 rounded-full blur-[100px] -z-10"></div>
      
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-36">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[hsl(195,100%,25%)]/10 text-[hsl(195,100%,25%)] text-xs font-bold tracking-wider uppercase mb-4">
              <Sparkles size={13} />
              Connect With Us
            </div>
          </FadeIn>
          <SlideUp delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-5 tracking-tight">
              Get in Touch
            </h1>
          </SlideUp>
          <SlideUp delay={0.2}>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-light">
              Whether you have a question about our enterprise services, pricing, or training programs, our senior team is ready to assist you.
            </p>
          </SlideUp>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-start">
          
          {/* Left Column: Contact Information */}
          <SlideUp delay={0.3} className="lg:col-span-5 h-full">
            <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-slate-100 relative overflow-hidden h-full flex flex-col justify-between">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-50 rounded-full blur-2xl"></div>
              
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-8 relative z-10">
                  Contact Information
                </h3>
                
                <div className="space-y-7 relative z-10">
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-slate-50 border border-slate-100 text-[hsl(195,100%,25%)] rounded-2xl flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 group-hover:bg-[hsl(195,100%,25%)] group-hover:text-white transition-all duration-300">
                      <MapPin size={22} strokeWidth={1.75} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-0.5">Our Location</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">Hyderabad, Telangana, India</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-slate-50 border border-slate-100 text-[hsl(195,100%,25%)] rounded-2xl flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 group-hover:bg-[hsl(195,100%,25%)] group-hover:text-white transition-all duration-300">
                      <Phone size={22} strokeWidth={1.75} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-0.5">Phone Number</h4>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-0.5">
                        <a
                          href="tel:+919014646804"
                          className="text-slate-600 text-sm font-medium hover:text-[hsl(195,100%,25%)] transition-colors"
                        >
                          +91 90146 46804
                        </a>
                        
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-slate-50 border border-slate-100 text-[hsl(195,100%,25%)] rounded-2xl flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 group-hover:bg-[hsl(195,100%,25%)] group-hover:text-white transition-all duration-300">
                      <Mail size={22} strokeWidth={1.75} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-0.5">Email Address</h4>
                      <p className="text-slate-600 text-sm font-medium">contact@vishait.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-slate-50 border border-slate-100 text-[hsl(195,100%,25%)] rounded-2xl flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 group-hover:bg-[hsl(195,100%,25%)] group-hover:text-white transition-all duration-300">
                      <Clock size={22} strokeWidth={1.75} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-0.5">Working Hours</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">Mon - Fri: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-500 font-medium">
                Visha IT Solutions Pvt. Ltd. &bull; Enterprise Solutions
              </div>
            </div>
          </SlideUp>

          {/* Right Column: Message Form (No Blue Labels) */}
          <SlideUp delay={0.4} className="lg:col-span-7 h-full">
            <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-slate-100 h-full relative overflow-hidden flex flex-col">
              <h3 className="text-2xl font-extrabold text-slate-900 mb-6">
                Send us a message
              </h3>
              <ContactForm />
            </div>
          </SlideUp>

        </div>
      </div>
    </div>
  );
}
