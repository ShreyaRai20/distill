import CTASection from "@/components/home/cta-section";
import DemoSection from "@/components/home/demo-section";
import HeroSection from "@/components/home/hero-section";
import HowItWorksSection from "@/components/home/how-it-works-sections";
import PricingSection from "@/components/home/pricing";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <HeroSection />
      <DemoSection />
      <HowItWorksSection />
      <PricingSection />
      <CTASection />
    </>
  );
}
