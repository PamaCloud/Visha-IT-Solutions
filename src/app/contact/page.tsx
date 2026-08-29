import { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import SlideUp from "@/components/animations/SlideUp";
import FadeIn from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "Contact Us - Visha IT Solutions",
  description: "Get in touch with Visha IT Solutions. We are here to help with your web development, recruitment, and training needs.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pb-24 relative overflow-hidden bg-surface">
      {/* Premium Background Elements */}
      <div className="absolute top-0 left-0 w-[50%] h-[500px] bg-gradient-to-br from-primary/10 via-blue-50/50 to-surface rounded-br-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px] -z-10"></div>
      
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <FadeIn>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-primary"></div>
              <h2 className="text-primary font-semibold tracking-[0.2em] uppercase text-sm">
                LET'S TALK
              </h2>
              <div className="w-12 h-[2px] bg-primary"></div>
            </div>
          </FadeIn>
          <SlideUp delay={0.1}>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-secondary mb-6 tracking-tight">
              Get in Touch
            </h1>
          </SlideUp>
          <SlideUp delay={0.2}>
            <p className="text-lg md:text-xl text-secondary-light leading-relaxed">
              Whether you have a question about our services, pricing, or anything else, our team is ready to answer all your questions.
            </p>
          </SlideUp>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          <SlideUp delay={0.3} className="h-full">
            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white relative overflow-hidden h-full flex flex-col justify-center">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-2xl"></div>
              
              <h3 className="text-2xl font-bold font-display text-secondary mb-8 relative z-10">Contact Information</h3>
              
              <div className="space-y-8 relative z-10">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-surface border border-gray-100 text-primary rounded-xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <MapPin size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary mb-0.5">Our Location</h4>
                    <p className="text-secondary-light text-sm">Hyderabad, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-surface border border-gray-100 text-primary rounded-xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Phone size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary mb-0.5">Phone Number</h4>
                    <p className="text-secondary-light text-sm">+91 7036592351</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-surface border border-gray-100 text-primary rounded-xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Mail size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary mb-0.5">Email Address</h4>
                    <p className="text-secondary-light text-sm">contact@vishait.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-surface border border-gray-100 text-primary rounded-xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Clock size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary mb-0.5">Working Hours</h4>
                    <p className="text-secondary-light text-sm">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </SlideUp>

          <SlideUp delay={0.4} className="h-full">
            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white h-full relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 w-full h-1.5 bg-gradient-to-r from-primary to-blue-400"></div>
              <h3 className="text-2xl font-bold font-display text-secondary mb-6">Send us a message</h3>
              <ContactForm />
            </div>
          </SlideUp>

        </div>
      </div>
    </div>
  );
}
