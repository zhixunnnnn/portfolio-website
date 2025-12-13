import { MetadataRoute } from "next";
import projectsData from "@/data/projects.json";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zhixun.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = projectsData.map((project) => ({
    url: `${siteUrl}/projects/${project.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...projects,
  ];
}
