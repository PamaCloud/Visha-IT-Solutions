import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Settings, Code, Megaphone, Users, GraduationCap, Server } from "lucide-react";
import { serviceService } from "@/services/serviceService";
import SlideUp from "@/components/animations/SlideUp";
import FadeIn from "@/components/animations/FadeIn";

const iconMap: Record<string, any> = {
  "Code": Code,
  "Megaphone": Megaphone,
  "Users": Users,
  "GraduationCap": GraduationCap,
  "Server": Server,
};

export default async function ServicesPreview() {
  const services = await serviceService.getActiveServices();

  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      <div className="container relative z-10">
        <FadeIn className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-secondary tracking-tight mb-4">
              Core Capabilities
            </h2>
            <p className="text-lg text-secondary-light">
              End-to-end digital solutions driving innovation and measurable growth.
            </p>
          </div>
          <Link href="/services" className="btn btn-primary text-sm px-6 rounded-full whitespace-nowrap hidden md:inline-flex shadow-lg">
            View all services
          </Link>
        </FadeIn>

        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {services.map((service: any, index: number) => {
              const IconComponent = service.icon && iconMap[service.icon] ? iconMap[service.icon] : Settings;
              
              return (
                <SlideUp key={service._id} delay={index * 0.1}>
                  <Link href={`/services/${service.slug}`} className="group block h-[450px] relative rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    
                    {/* Background Image mapped by slug */}
                    <Image 
                      src={`/services/${service.slug}.jpg`} 
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    
                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"></div>

                    {/* Icon at top right */}
                    <div className="absolute top-6 right-6">
                      <div className="w-12 h-12 bg-white/10 backdrop-blur-md text-white rounded-full flex items-center justify-center border border-white/20 group-hover:bg-white group-hover:text-primary transition-colors duration-500">
                        <IconComponent size={20} />
                      </div>
                    </div>

                    {/* Content at bottom */}
                    <div className="absolute bottom-0 left-0 w-full p-8">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h4 className="text-2xl font-bold font-display text-white mb-3">{service.title}</h4>
                        <p className="text-white/70 text-sm line-clamp-2 leading-relaxed font-medium">
                          {service.shortDescription}
                        </p>
                      </div>
                    </div>
                  </Link>
                </SlideUp>
              );
            })}
          </div>
        ) : (
          <div className="text-center p-12 bg-white rounded-3xl shadow-sm border border-gray-100">
            <h4 className="text-xl font-medium text-secondary-light">New services coming soon.</h4>
          </div>
        )}
        
        <div className="mt-8 text-center md:hidden">
          <Link href="/services" className="btn btn-primary text-sm px-6 rounded-full shadow-lg">
            View all services
          </Link>
        </div>
      </div>
    </section>
  );
}
