"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

export default function PropertyPulseClient() {
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);
  const [lightbox, setLightbox] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  // Handle scroll to fade bottom gradient
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
      const fadeThreshold = 100;
      const opacity = Math.min(1, distanceFromBottom / fadeThreshold);
      setBottomGradientOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const elements = document.querySelectorAll(".fade-up");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="relative min-h-screen text-slate-900">
      {/* Background */}
      <div className="fixed inset-0 z-[-2] bg-[#F5F1EA]" />

      {/* Top fade gradient */}
      <div
        className="pointer-events-none fixed top-0 left-0 right-0 h-20 sm:h-24 z-40"
        style={{
          background:
            "linear-gradient(to bottom, #F5F1EA 0%, rgba(245, 241, 234, 0.8) 40%, rgba(245, 241, 234, 0.4) 70%, transparent 100%)",
        }}
      />

      {/* Bottom fade gradient */}
      <div
        className="pointer-events-none fixed bottom-0 left-0 right-0 h-20 sm:h-24 z-40 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(to top, #F5F1EA 0%, rgba(245, 241, 234, 0.8) 40%, rgba(245, 241, 234, 0.4) 70%, transparent 100%)",
          opacity: bottomGradientOpacity,
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-14 px-6">
        <div className="container mx-auto max-w-4xl">
          <Link
            href="/projects"
            className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Projects
          </Link>

          {/* Content that fades up */}
          <div className="fade-up">
            {/* Title */}
            <div className="mt-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                <div className="flex-1">
                  <h1 className="text-[40px] sm:text-5xl font-bold text-slate-900 leading-[1.15] sm:leading-[1.1]">
                    PropertyPulse
                  </h1>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-lg bg-stone-100 text-stone-700 text-xs font-semibold px-2.5 py-1 border border-stone-200">
                      Personal Project
                    </span>
                    <span className="inline-flex items-center rounded-lg bg-stone-100 text-stone-700 text-xs font-semibold px-2.5 py-1 border border-stone-200">
                      Learning React · 2024
                    </span>
                  </div>
                </div>

                {/* CTA Buttons - Disabled */}
                <div className="mt-4 sm:mt-0 sm:flex-shrink-0 w-full sm:w-auto">
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      disabled
                      className="inline-flex items-center justify-center flex-1 sm:flex-none gap-2 rounded-xl bg-slate-300 text-slate-500 text-[15px] font-medium px-2.5 py-1.5 shadow-sm cursor-not-allowed opacity-60"
                    >
                      <Github className="w-4 h-4" strokeWidth={2.5} />
                      Source
                    </button>
                    <button
                      disabled
                      className="inline-flex items-center justify-center flex-1 sm:flex-none gap-2 rounded-xl bg-blue-300 text-blue-500 text-[15px] font-medium px-2.5 py-1.5 shadow-sm cursor-not-allowed opacity-60"
                    >
                      Live Site
                      <ExternalLink className="w-4 h-4" strokeWidth={2.5} />
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 text-center sm:text-left">
                    Source code and live site coming soon
                  </p>
                </div>
              </div>

              {/* Accent line */}
              <div className="mt-5 sm:mt-6 h-[2px] sm:h-[3px] w-12 sm:w-16 md:w-24 bg-blue-600 rounded-full" />
            </div>

            {/* Description */}
            <p className="mt-5 sm:mt-6 max-w-3xl text-[15px] md:text-[16px] leading-7 sm:leading-relaxed text-slate-700 font-medium">
              A full-stack real estate platform built while learning React.
              Users can list properties for rent, browse available listings, and
              send inquiries to property owners. Features include user
              authentication, image uploads with Cloudinary, and a MongoDB
              database for data persistence.
            </p>
          </div>
        </div>
      </section>

      {/* Role & Tech Section */}
      <section className="px-6 pb-12 fade-up">
        <div className="container mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 md:divide-x md:divide-gray-200">
          <div className="space-y-5 md:pr-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
                Role
              </h3>
              <p className="text-sm text-slate-800 leading-relaxed">
                Solo Developer
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
                Responsibilities
              </h3>
              <p className="text-sm text-slate-800 leading-relaxed">
                Designed and developed the entire application from scratch,
                including user authentication, property CRUD operations, image
                handling, and database design. Built both the frontend UI and
                backend API.
              </p>
            </div>
          </div>

          <div className="space-y-3 md:pl-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
              Tech Stack
            </h3>
            <ul className="space-y-2">
              {[
                ["React.js", "Frontend Framework"],
                ["Node.js", "Backend Runtime"],
                ["MongoDB", "Database"],
                ["Cloudinary", "Image Storage"],
                ["Next Auth", "Authentication"],
              ].map(([tech, desc]) => (
                <li key={tech} className="flex items-center gap-2">
                  <span className="inline-block rounded-xl bg-neutral-700 text-slate-100 text-sm font-medium px-2 py-1">
                    {tech}
                  </span>
                  <span className="text-sm text-slate-700 font-medium">
                    {desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="px-6 py-12 fade-up">
        <div className="container mx-auto max-w-4xl space-y-10">
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Motivation
            </h3>
            <p className="text-slate-800 leading-relaxed">
              I built PropertyPulse as a hands-on project to solidify my
              understanding of React and full-stack development. Real estate
              platforms involve complex data relationships, user authentication,
              and media handling — making it an ideal challenge for learning.
              The goal was to build something functional and deployable while
              practicing modern development patterns.
            </p>
          </div>

          <div className="h-px bg-gray-200" />

          {/* Features */}
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Key Features
            </h3>
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-slate-700">
                  User Management
                </h4>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-slate-800">
                  <li>Google OAuth and credential-based authentication</li>
                  <li>User profiles with property management dashboard</li>
                  <li>Saved/bookmarked properties feature</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-700">
                  Property Listings
                </h4>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-slate-800">
                  <li>Create, edit, and delete property listings</li>
                  <li>Multi-image upload with Cloudinary integration</li>
                  <li>
                    Detailed property information (amenities, location, pricing)
                  </li>
                  <li>Search and filter by location, type, and price</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-700">
                  Communication
                </h4>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-slate-800">
                  <li>In-app messaging system for property inquiries</li>
                  <li>Notification system for new messages</li>
                  <li>Contact property owners directly</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-200" />

          {/* Learning Outcomes */}
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              What I Learned
            </h3>
            <p className="text-slate-800 leading-relaxed">
              This project taught me the fundamentals of building
              production-ready React applications. I learned how to structure a
              full-stack app, handle authentication flows, manage file uploads,
              and work with NoSQL databases. More importantly, I gained
              experience debugging real issues and making architectural
              decisions that affect user experience. The project reinforced the
              importance of planning data models early and writing maintainable
              code from the start.
            </p>
          </div>

          <div className="h-px bg-gray-200" />

          {/* Reflection */}
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Reflection
            </h3>
            <div className="space-y-4 text-slate-800 leading-relaxed">
              <p>
                Looking back, PropertyPulse was a formative project that bridged
                the gap between tutorials and real development. I made plenty of
                beginner mistakes — over-complicated state management,
                inconsistent API patterns, and spending too much time on
                features nobody would use. But those mistakes were valuable.
                They taught me to focus on core functionality first and iterate
                based on actual needs.
              </p>
              <p>
                If I were to rebuild this today, I&apos;d use TypeScript from
                the start, implement better error handling, and add
                comprehensive testing. I&apos;d also spend more time on the UX
                details that make a platform feel polished. But as a learning
                project, it achieved its goal: giving me the confidence and
                skills to tackle more complex applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-5xl w-full max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              width={1600}
              height={1200}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
              priority
            />
            <button
              className="absolute top-2 right-2 text-white/90 bg-black/40 hover:bg-black/60 rounded-md px-3 py-1.5 text-sm font-medium"
              onClick={() => setLightbox(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="h-20" />
    </main>
  );
}
