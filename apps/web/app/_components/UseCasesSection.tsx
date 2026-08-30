import { Code2, Rocket, Users, GraduationCap } from "lucide-react";
import UseCaseCard from "./UseCaseCard";

const useCases = [
  {
    icon: Code2,
    title: "Indie Developers",
    desc: "Ship side projects faster without juggling 10 different tools.",
  },
  {
    icon: Rocket,
    title: "Startups",
    desc: "Move fast and break things, but keep your workflow organized.",
  },
  {
    icon: Users,
    title: "Teams",
    desc: "Collaborate seamlessly with unified access and permissions.",
  },
  {
    icon: GraduationCap,
    title: "Students",
    desc: "Learn modern dev workflows with industry-standard practices.",
  },
];

export default function UseCasesSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-neutral-text-primary mb-4">
            Who is DevMatrix for?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase) => (
            <UseCaseCard key={useCase.title} {...useCase} />
          ))}
        </div>
      </div>
    </section>
  );
}
