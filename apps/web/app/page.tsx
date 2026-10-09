import Header from "./_components/Header";
import SiteFooter from "./_components/SiteFooter";
import Hero from "./_components/landing/Hero";
import ProblemStrip from "./_components/landing/ProblemStrip";
import Modules from "./_components/landing/Modules";
import ProjectContext from "./_components/landing/ProjectContext";
import ThemeLab from "./_components/landing/ThemeLab";
import CtaBand from "./_components/landing/CtaBand";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-bg font-sans text-neutral-text-primary selection:bg-brand-primary/30 selection:text-button-text">
      <Header />
      <main>
        <Hero />
        <ProblemStrip />
        <Modules />
        <ProjectContext />
        <ThemeLab />
        <CtaBand />
      </main>
      <SiteFooter />
    </div>
  );
}
