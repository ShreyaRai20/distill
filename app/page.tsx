
import FeaturesSection from "@/components/home/features-section";
import FinalCTASection from "@/components/home/final-cta-section";
import HeroSection from "@/components/home/hero-section";
import HowItWorksSection from "@/components/home/how-it-works-sections";
import PricingSection from "@/components/home/pricing";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-8 pt-14 pb-24">
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <FinalCTASection />
      {/* <DemoSection />
      <PricingSection />
      */}
    </div>
  );
}
