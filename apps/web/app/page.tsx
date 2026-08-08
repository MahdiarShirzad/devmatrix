import Header from "./_components/Header";
import HeroSection from "./_components/HeroSection";
import CoreModulesSection from "./_components/CoreModulesSection";
import HowItWorksSection from "./_components/HowItWorksSection";
import DeveloperExperienceSection from "./_components/DeveloperExperienceSection";
import UseCasesSection from "./_components/UseCasesSection";
import CtaSection from "./_components/CtaSection";
import SiteFooter from "./_components/SiteFooter";

// این صفحه دیگه "use client" نداره: هیچ‌کدوم از بخش‌ها state یا event handler
// ندارن (فقط Link)، پس همه به‌صورت Server Component رندر می‌شن و JS کمتری
// به مرورگر فرستاده می‌شه. اگه Header داخلش منوی موبایل/state داره، خودش
// جدا "use client" می‌مونه — این تغییر روش رو نمی‌شکنه.
export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0916] text-slate-300 font-sans selection:bg-purple-500/30">
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
