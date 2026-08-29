import Hero from "@/components/sections/Hero";
import AboutPreview from "@/components/sections/AboutPreview";
import ServicesPreview from "@/components/sections/ServicesPreview";
import TrustSection from "@/components/sections/TrustSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ServicesPreview />
      <TrustSection />
      <CTASection />
    </>
  );
}
