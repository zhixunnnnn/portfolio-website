import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group flex flex-col lg:flex-row max-w-5xl items-center bg-white/80 border border-slate-300 backdrop-blur-sm p-6 rounded-2xl transition-all duration-300 ease-out hover:shadow-lg hover:scale-[1.02] hover:bg-white hover:border-slate-400 relative"
    >
      <div className="lg:w-1/2 text-left h-full px-5 relative z-20">
        <h3 className="text-3xl font-semibold mb-4 text-slate-800">
          {project.title}
        </h3>
        <p className="text-slate-600 font-normal mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-slate-100 border border-slate-300 rounded-lg text-xs text-slate-700 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="mt-4 inline-flex items-center text-slate-700 font-semibold text-lg group-hover:text-slate-900 transition-colors">
          Read More
          <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">
            <ArrowRight size={20} strokeWidth={3} />
          </span>
        </span>
      </div>
      <div className="lg:w-2/3 mt-6 lg:mt-0 flex justify-center w-[480px] h-[360px] relative z-20">
        <Image
          src={project.image || "https://placehold.co/480x360"}
          width={480}
          height={360}
          alt={project.title + " Thumbnail"}
          className="rounded-xl w-full object-cover"
        />
      </div>
    </Link>
  );
};

export default ProjectCard;
