import Header from "./_components/Header";
import HeroSection from "./_components/HeroSection";
import CoreModulesSection from "./_components/CoreModulesSection";
import HowItWorksSection from "./_components/HowItWorksSection";
import DeveloperExperienceSection from "./_components/DeveloperExperienceSection";
import UseCasesSection from "./_components/UseCasesSection";
import CtaSection from "./_components/CtaSection";
import SiteFooter from "./_components/SiteFooter";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-bg text-neutral-text-primary font-sans selection:bg-brand-primary/30">
      <Header />
      <HeroSection />
      <CoreModulesSection />
      <HowItWorksSection />
      <DeveloperExperienceSection />
      <UseCasesSection />
      <CtaSection />
      <SiteFooter />
    </div>
  );
}
