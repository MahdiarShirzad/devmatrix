interface StepCardProps {
  step: string;
  title: string;
  desc: string;
}

export default function StepCard({ step, title, desc }: StepCardProps) {
  return (
    <div className="flex-1 text-center relative z-10 w-full">
      <div className="w-16 h-16 mx-auto rounded-2xl bg-[#0D1117] border border-white/10 flex items-center justify-center text-xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#fca311] to-amber-200 mb-6 shadow-xl">
        {step}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-[#e5e5e5]/70">{desc}</p>
    </div>
  );
}
