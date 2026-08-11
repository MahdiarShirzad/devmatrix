import ProjectCard from "./ProjectCard";
import { mockProjects } from "./mockData";

export default function ProjectsOverview() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-neutral-text-primary">
          Your Projects
        </h2>
        <button
          type="button"
          className="text-xs font-medium text-neutral-text-secondary transition-colors hover:text-neutral-text-primary"
        >
          View all →
        </button>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {mockProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
