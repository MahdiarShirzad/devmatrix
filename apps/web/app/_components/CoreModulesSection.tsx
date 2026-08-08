import { Layout, Terminal, Lock, BarChart } from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: Layout,
    title: "Project Management",
    desc: "Manage projects, tasks, and workflows efficiently with agile boards.",
  },
  {
    icon: Terminal,
    title: "Code Workspace",
    desc: "Integrated coding environment with native version control support.",
  },
  {
    icon: Lock,
    title: "Auth & User System",
    desc: "Secure, drop-in authentication and user management built-in.",
  },
  {
    icon: BarChart,
    title: "Analytics Dashboard",
    desc: "Track performance, team activity, and deployment progress in real-time.",
  },
];

export default function CoreModulesSection() {
  return (
    <section id="features" className="py-24 border-t border-white/5 bg-[#0d0c1b]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Core Modules
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Everything you need to orchestrate your entire development
            lifecycle from a single dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
