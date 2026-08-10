// DeveloperExperienceSection.tsx
import { Zap, Layout, Layers, Rocket } from "lucide-react";
import DxListItem from "./DxListItem";
import TerminalPreview from "./TerminalPreview";

const dxItems = [
  {
    icon: Zap,
    title: "Fast performance",
    desc: "Optimized for speed. No loading spinners, just instant feedback.",
  },
  {
    icon: Layout,
    title: "Clean UI / Dark mode first",
    desc: "A gorgeous, distraction-free interface built for night owls.",
  },
  {
    icon: Layers,
    title: "Modular system",
    desc: "Use only what you need. Every app is connected but decoupled.",
  },
  {
    icon: Rocket,
    title: "Scalable architecture",
    desc: "From side projects to enterprise, DevMatrix scales with you.",
  },
];

export default function DeveloperExperienceSection() {
  return (
    <section className="py-24 border-y border-white/5 bg-[#0D1117] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Designed for the ultimate Developer Experience
            </h2>
            <p className="text-[#e5e5e5]/80 mb-8 text-lg">
              We stripped away the complexity so you can focus on what matters:
              writing great code and shipping products.
            </p>

            <ul className="space-y-6">
              {dxItems.map((item) => (
                <DxListItem key={item.title} {...item} />
              ))}
            </ul>
          </div>

          <TerminalPreview />
        </div>
      </div>
    </section>
  );
}
