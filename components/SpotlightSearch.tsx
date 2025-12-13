"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, Command, CornerDownLeft } from "lucide-react";
import projectsData from "@/data/projects.json";

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  hasPage: boolean;
}

export default function SpotlightSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [resultsHeight, setResultsHeight] = useState<number | null>(null);
  const [isMac, setIsMac] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Detect OS for keyboard shortcut display
  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf("MAC") >= 0);
  }, []);

  // Filter projects with pages that match the query
  const filteredProjects = (projectsData as Project[])
    .filter((project) => project.hasPage)
    .filter((project) => {
      if (!query.trim()) return true;
      const searchQuery = query.toLowerCase();
      return (
        project.title.toLowerCase().includes(searchQuery) ||
        project.description.toLowerCase().includes(searchQuery) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchQuery))
      );
    });

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Measure results content height for smooth animation
  useEffect(() => {
    if (resultsContentRef.current) {
      const height = resultsContentRef.current.scrollHeight;
      // Cap at 50vh equivalent (roughly 400px for most screens)
      const maxHeight = Math.min(height, window.innerHeight * 0.5);
      setResultsHeight(maxHeight);
    }
  }, [filteredProjects.length, query]);

  // Handle open/close with animation
  const openSpotlight = useCallback(() => {
    setIsOpen(true);
    setIsVisible(true);
    setIsClosing(false);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const closeSpotlight = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsVisible(false);
      setIsClosing(false);
      setQuery("");
    }, 200);
  }, []);

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Open spotlight with Cmd+K (Mac) or Ctrl+K (Windows)
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          closeSpotlight();
        } else {
          openSpotlight();
        }
      }

      // Close with Escape
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        closeSpotlight();
      }
    },
    [isOpen, openSpotlight, closeSpotlight]
  );

  // Handle navigation within the list
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredProjects.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter" && filteredProjects.length > 0) {
      e.preventDefault();
      const selectedProject = filteredProjects[selectedIndex];
      if (selectedProject) {
        router.push(`/projects/${selectedProject.id}`);
        closeSpotlight();
      }
    }
  };

  // Add global keyboard listener
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] hidden sm:block">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-200 ${
          isClosing ? "opacity-0" : "spotlight-backdrop"
        }`}
        onClick={closeSpotlight}
      />

      {/* Modal */}
      <div className="relative flex items-start justify-center pt-[12vh] px-4">
        <div
          className={`w-full max-w-2xl bg-[#F5F1EA] rounded-2xl shadow-2xl shadow-slate-900/20 border border-stone-200/60 overflow-hidden ${
            isClosing ? "spotlight-modal-out" : "spotlight-modal"
          }`}
        >
          {/* Search Input */}
          <div className="flex items-center gap-4 px-5 py-5 border-b border-stone-200/60">
            <Search className="w-5 h-5 text-stone-400 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Search projects..."
              className="flex-1 bg-transparent text-slate-900 placeholder:text-stone-400 text-base outline-none"
            />
            <kbd className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-stone-500 bg-stone-100 rounded-lg border border-stone-200">
              esc
            </kbd>
          </div>

          {/* Results - with smooth height transition */}
          <div
            className="overflow-hidden transition-[height] duration-300 cubic-bezier-smooth"
            style={{
              height: resultsHeight !== null ? `${resultsHeight}px` : "auto",
            }}
          >
            <div
              ref={resultsContentRef}
              className="overflow-y-auto"
              style={{ maxHeight: "50vh" }}
            >
              {filteredProjects.length === 0 ? (
                <div className="px-5 py-6 text-center text-stone-500">
                  <p className="text-sm">No projects found</p>
                </div>
              ) : (
                <div className="p-3">
                  <div className="px-3 py-2 text-xs font-semibold text-stone-500 uppercase tracking-wider spotlight-item">
                    Projects
                  </div>
                  {filteredProjects.map((project, index) => (
                    <button
                      key={project.id}
                      onClick={() => {
                        router.push(`/projects/${project.id}`);
                        closeSpotlight();
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`spotlight-item w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left transition-all duration-200 ${
                        index === selectedIndex
                          ? "bg-gradient-to-r from-[#a3bded]/15 to-[#6991c7]/15 border border-[#6991c7]/25 scale-[1.01]"
                          : "hover:bg-stone-100/50 border border-transparent"
                      }`}
                      style={{ animationDelay: `${(index + 1) * 50}ms` }}
                    >
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`text-sm font-semibold truncate transition-colors duration-200 ${
                            index === selectedIndex
                              ? "text-slate-900"
                              : "text-slate-700"
                          }`}
                        >
                          {project.title}
                        </h3>
                        <p className="text-xs text-stone-500 truncate mt-1">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-2.5">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium text-stone-600 bg-stone-100 rounded-md"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 flex-shrink-0 transition-all duration-200 ${
                          index === selectedIndex
                            ? "text-[#6991c7] opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-1"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer with hints */}
          <div
            className="flex items-center justify-between px-5 py-4 border-t border-stone-200/60 bg-stone-50/50 spotlight-item"
            style={{ animationDelay: "150ms" }}
          >
            <div className="flex items-center gap-5 text-xs text-stone-500">
              <span className="flex items-center gap-2">
                <kbd className="flex items-center justify-center w-6 h-6 text-[10px] font-medium bg-stone-100 rounded-md border border-stone-200">
                  ↑
                </kbd>
                <kbd className="flex items-center justify-center w-6 h-6 text-[10px] font-medium bg-stone-100 rounded-md border border-stone-200">
                  ↓
                </kbd>
                <span className="ml-1">Navigate</span>
              </span>
              <span className="flex items-center gap-2">
                <kbd className="flex items-center justify-center px-2 h-6 text-[10px] font-medium bg-stone-100 rounded-md border border-stone-200">
                  <CornerDownLeft className="w-3 h-3" />
                </kbd>
                <span className="ml-1">Open</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-stone-500">
              {isMac ? (
                <Command className="w-3 h-3" />
              ) : (
                <span className="text-[10px] font-medium">Ctrl</span>
              )}
              <span>K to close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
