import StepCard from "./StepCard";

const steps = [
  {
    step: "01",
    title: "Create your workspace",
    desc: "Set up your environment in seconds with smart defaults.",
  },
  {
    step: "02",
    title: "Build and manage",
    desc: "Write code, track issues, and manage tasks simultaneously.",
  },
  {
    step: "03",
    title: "Collaborate and scale",
    desc: "Invite your team, deploy instantly, and monitor growth.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-text-primary text-center mb-16">
          How It Works
        </h2>
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 relative">
          <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent" />

          {steps.map((item) => (
            <StepCard key={item.step} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
