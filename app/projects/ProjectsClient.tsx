"use client";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import projectsData from "@/data/projects.json";

export default function ProjectsClient() {
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);

  // Handle scroll to fade bottom gradient
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;

      // Distance from bottom
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

      // Start fading when within 100px of bottom, fully fade at bottom
      const fadeThreshold = 100;
      const opacity = Math.min(1, distanceFromBottom / fadeThreshold);

      setBottomGradientOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle fade-up animations on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const elements = document.querySelectorAll(".fade-up");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen text-slate-900">
      <div className="fixed inset-0 z-[-2] bg-[#F5F1EA]" />

      {/* Top fade gradient - light slate to transparent */}
      <div
        className="pointer-events-none fixed top-0 left-0 right-0 h-20 sm:h-24 z-40"
        style={{
          background:
            "linear-gradient(to bottom, #F5F1EA 0%, rgba(245, 241, 234, 0.8) 40%, rgba(245, 241, 234, 0.4) 70%, transparent 100%)",
        }}
      />

      {/* Bottom fade gradient - white to transparent */}
      <div
        className="pointer-events-none fixed bottom-0 left-0 right-0 h-20 sm:h-24 z-40 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(to top, #F5F1EA 0%, rgba(245, 241, 234, 0.8) 40%, rgba(245, 241, 234, 0.4) 70%, transparent 100%)",
          opacity: bottomGradientOpacity,
        }}
      />

      <section className="relative pt-24 md:pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors mb-16"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Home
          </Link>

          <div className="space-y-1">
            {projectsData.map((project, index) => {
              const hasPage =
                (project as { hasPage?: boolean }).hasPage !== false;

              const content = (
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h2
                        className={`text-base font-medium text-slate-900 mb-2 transition-colors leading-relaxed ${
                          hasPage ? "group-hover:text-slate-600" : ""
                        }`}
                      >
                        {project.title}
                      </h2>
                      {!hasPage && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-stone-100 text-stone-500 text-[10px] font-medium px-1.5 py-0.5 border border-stone-200 mb-2">
                          <Clock className="w-2.5 h-2.5" />
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                      {project.description}
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs text-slate-500">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  {hasPage && (
                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <ArrowUpRight className="w-4 h-4 text-slate-400" />
                    </div>
                  )}
                </div>
              );

              return (
                <div
                  key={project.id}
                  className="fade-up"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {hasPage ? (
                    <Link
                      href={`/projects/${project.id}`}
                      className="group block py-6 transition-all duration-200 cursor-pointer"
                    >
                      {content}
                    </Link>
                  ) : (
                    <div className="group block py-6 transition-all duration-200 cursor-default">
                      {content}
                    </div>
                  )}
                  {index < projectsData.length - 1 && (
                    <div className="h-px bg-slate-200" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="h-20" />
    </main>
  );
}
