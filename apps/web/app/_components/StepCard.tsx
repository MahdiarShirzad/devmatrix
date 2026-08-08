interface StepCardProps {
  step: string;
  title: string;
  desc: string;
}

export default function StepCard({ step, title, desc }: StepCardProps) {
  return (
    <div className="flex-1 text-center relative z-10 w-full">
      <div className="w-16 h-16 mx-auto rounded-2xl bg-[#131221] border border-white/10 flex items-center justify-center text-xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-500 mb-6 shadow-xl">
        {step}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400">{desc}</p>
    </div>
  );
}
