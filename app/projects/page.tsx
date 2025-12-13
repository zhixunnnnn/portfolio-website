import { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore my portfolio of web development projects including full-stack applications, UI/UX designs, and more. Built with React, Next.js, TypeScript, and modern technologies.",
  openGraph: {
    title: "Projects | Zhi Xun",
    description:
      "Explore my portfolio of web development projects including full-stack applications, UI/UX designs, and more.",
    type: "website",
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
