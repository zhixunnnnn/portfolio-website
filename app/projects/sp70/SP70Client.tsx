"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function SP70Client() {
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);

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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".fade-up");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
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
      <section className="relative pt-24 md:pt-24 pb-14 px-6 fade-up">
        <div className="container mx-auto max-w-4xl">
          <Link
            href="/projects"
            className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Projects
          </Link>

          {/* Title */}
          <div className="mt-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <div className="flex-1">
                <h1 className="text-[40px] sm:text-5xl font-bold text-slate-900 leading-[1.15] sm:leading-[1.1]">
                  SP70 Website
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-lg bg-stone-100 text-stone-700 text-xs font-semibold px-2.5 py-1 border border-stone-200">
                    Singapore Polytechnic
                  </span>
                  <span className="inline-flex items-center rounded-lg bg-stone-100 text-stone-700 text-xs font-semibold px-2.5 py-1 border border-stone-200">
                    70th Anniversary · 2024
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-4 sm:mt-0 sm:flex-shrink-0 w-full sm:w-auto">
                <Link
                  href="https://sp70.sp.edu.sg"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View the live SP70 website"
                  className="inline-flex items-center justify-center w-full sm:w-auto gap-2 rounded-xl bg-[#E4002B] text-white text-[15px] font-medium px-2.5 py-1.5 shadow-sm hover:bg-[#c9001f] hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                >
                  View Live Site
                  <ExternalLink className="w-4 h-4" strokeWidth={2.5} />
                </Link>
              </div>
            </div>

            {/* Accent line */}
            <div className="mt-5 sm:mt-6 h-[2px] sm:h-[3px] w-12 sm:w-16 md:w-24 bg-[#E4002B] rounded-full" />
          </div>

          {/* Description */}
          <p className="mt-5 sm:mt-6 max-w-3xl text-[15px] md:text-[16px] leading-7 sm:leading-relaxed text-slate-700 font-medium">
            Official website for Singapore Polytechnic&apos;s 70th anniversary
            celebration. The site showcases the institution&apos;s rich history,
            milestone achievements, and upcoming events commemorating seven
            decades of excellence in polytechnic education.
          </p>
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
                Frontend Developer
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
                Responsibilities
              </h3>
              <p className="text-sm text-slate-800 leading-relaxed">
                Developed responsive UI components, implemented animations and
                interactive features, and ensured cross-browser compatibility.
                Collaborated with the design team to translate mockups into
                pixel-perfect implementations.
              </p>
            </div>
          </div>

          <div className="space-y-3 md:pl-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
              Tech Stack
            </h3>
            <ul className="space-y-2">
              {[
                ["Next.js", "React Framework"],
                ["Tailwind CSS", "Styling"],
                ["TypeScript", "Type Safety"],
                ["Framer Motion", "Animations"],
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

      {/* Project Details Section */}
      <section className="px-6 py-12 fade-up">
        <div className="container mx-auto max-w-4xl space-y-10">
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Project Overview
            </h3>
            <p className="text-slate-800 leading-relaxed">
              The SP70 website serves as the digital centerpiece for Singapore
              Polytechnic&apos;s 70th anniversary celebrations. It provides a
              platform for alumni, students, staff, and the public to engage
              with the institution&apos;s history, explore upcoming anniversary
              events, and participate in commemorative activities.
            </p>
          </div>

          <div className="h-px bg-gray-200" />

          {/* Key Features */}
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Key Features
            </h3>
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-slate-700">
                  Interactive Timeline
                </h4>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-slate-800">
                  <li>Visual journey through 70 years of SP history</li>
                  <li>Milestone achievements and notable events</li>
                  <li>Historical photos and archival content</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-700">
                  Events & Registration
                </h4>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-slate-800">
                  <li>Anniversary event listings and schedules</li>
                  <li>Online registration for commemorative activities</li>
                  <li>Alumni reunion coordination</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-700">
                  Responsive Design
                </h4>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-slate-800">
                  <li>Optimized for all device sizes</li>
                  <li>Smooth animations and micro-interactions</li>
                  <li>Fast loading with optimized assets</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-200" />

          {/* Reflection */}
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Reflection
            </h3>
            <p className="text-slate-800 leading-relaxed">
              Working on the SP70 website was a meaningful experience as it
              involved creating something for my own institution. The project
              taught me the importance of balancing visual appeal with
              performance, especially when dealing with media-rich content like
              historical archives and event galleries. Collaborating with
              stakeholders across different departments helped me understand how
              to gather requirements effectively and translate institutional
              identity into a cohesive digital experience.
            </p>
          </div>
        </div>
      </section>

      <div className="h-20" />
    </main>
  );
}
