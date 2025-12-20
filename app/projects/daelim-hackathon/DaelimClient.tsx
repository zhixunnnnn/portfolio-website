"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function DaelimClient() {
  const [lightbox, setLightbox] = useState<null | {
    src: string;
    alt: string;
    title: string;
  }>(null);
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);

  // Lightbox open with animation
  const openLightbox = (src: string, alt: string, title: string) => {
    setLightbox({ src, alt, title });
    requestAnimationFrame(() => setLightboxVisible(true));
  };

  // Lightbox close with animation
  const closeLightbox = () => {
    setLightboxVisible(false);
    setTimeout(() => setLightbox(null), 300);
  };

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
                    Semiconductor Operations Assistant
                  </h1>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-lg bg-stone-100 text-stone-700 text-xs font-semibold px-2.5 py-1 border border-stone-200">
                      Daelim + SoC Hackathon
                    </span>
                    <span className="inline-flex items-center rounded-lg bg-stone-100 text-stone-700 text-xs font-semibold px-2.5 py-1 border border-stone-200">
                      December 2025
                    </span>
                  </div>
                </div>

                {/* CTA Buttons - aligned with title */}
                <div className="mt-4 sm:mt-0 sm:flex-shrink-0 w-full sm:w-auto">
                  <Link
                    href="https://github.com/zhixunnnnn/daelim-hackathon"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View AstraSemi Operations Platform source code on GitHub"
                    className="inline-flex items-center justify-center w-full sm:w-auto gap-2 rounded-xl bg-slate-800 text-white text-[15px] font-medium px-2.5 py-1.5 shadow-sm hover:bg-slate-700 hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                  >
                    <Github className="w-4 h-4" strokeWidth={2.5} />
                    View Source
                  </Link>
                </div>
              </div>

              {/* Accent line */}
              <div className="mt-5 sm:mt-6 h-[2px] sm:h-[3px] w-12 sm:w-16 md:w-24 bg-blue-600 rounded-full" />
            </div>

            {/* Description */}
            <p className="mt-5 sm:mt-6 max-w-3xl text-[15px] md:text-[16px] leading-7 sm:leading-relaxed text-slate-700 font-medium">
              We built a comprehensive AI-powered operations platform for
              AstraSemi Corporation that helps semiconductor staff quickly
              understand operational data, interpret technical messages, and
              identify semiconductor components. The platform features four
              intelligent modules: CSV analysis, text interpretation, image
              recognition, and an interactive glossary — all designed to make
              complex information accessible to employees at every level.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-12 fade-up">
        <div className="container mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 md:divide-x md:divide-gray-200">
          <div className="space-y-5 md:pr-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
                Role
              </h3>
              <p className="text-sm text-slate-800 leading-relaxed">
                Full-Stack Developer
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
                Responsibilities
              </h3>
              <p className="text-sm text-slate-800 leading-relaxed">
                Designed and built the complete web application, including both
                the React frontend with TypeScript and the Flask backend with
                Python. Integrated OpenAI APIs for intelligent analysis across
                all modules, implemented internationalization (English/Korean),
                and deployed the full stack to production.
              </p>
            </div>
          </div>

          <div className="space-y-3 md:pl-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
              Team
            </h3>
            <ul className="space-y-2">
              {[
                ["Zhi Xun", "Full-Stack Developer"],
                ["Kayden", "Full-Stack Developer"],
                ["Minseo", "Full-Stack Developer"],
                ["Sooha", "Backend Developer"],
                ["Minseok", "Frontend Developer"],
                ["Heechan", "Frontend Developer"],
              ].map(([name, role]) => (
                <li key={name} className="flex items-center gap-2">
                  <span className="inline-block rounded-xl bg-neutral-700 text-slate-100 text-sm font-medium px-2 py-1">
                    {name}
                  </span>
                  <span className="text-sm text-slate-700 font-medium">
                    {role}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 fade-up">
        <div className="container mx-auto max-w-4xl space-y-10">
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Problem Statement
            </h3>
            <p className="text-slate-800 leading-relaxed">
              AstraSemi Corporation&apos;s semiconductor operations staff face
              daily challenges managing diverse information types: shipment
              spreadsheets, technical messages, equipment updates, and visual
              inspection data. New employees especially struggle to quickly
              understand what&apos;s important across these different formats.
              The challenge was to build an AI-powered assistant that could make
              operational data more accessible, help staff identify
              semiconductor components from images, and provide clear
              explanations of technical terms — all in a user-friendly interface
              that works for both experienced engineers and new hires.
            </p>
          </div>

          <div className="h-px bg-stone-200" />

          {/* Solution */}
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Solution
            </h3>
            <p className="text-slate-800 leading-relaxed">
              We designed a modular platform with four specialized AI-powered
              modules, each addressing a specific operational need. The CSV
              Analysis module processes shipment and operations data, providing
              summaries with highlighted anomalies and actionable insights. The
              Text Interpretation module transforms technical messages into
              clear summaries with beginner-friendly explanations and can
              convert them into professional emails or manager updates. The
              Image Recognition module identifies semiconductor components from
              photos, explaining what each item is and its role in the
              manufacturing process. Finally, the Glossary module serves as an
              intelligent dictionary with AI-enhanced explanations and
              contextual examples for over 100 semiconductor terms.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-slate-700">
                  Key Modules
                </h4>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-slate-800">
                  <li>
                    Module 1: Operations Overview Dashboard — CSV analysis with
                    AI-powered insights
                  </li>
                  <li>
                    Module 2: Document Interpreter — Technical text
                    simplification and conversion
                  </li>
                  <li>
                    Module 3: Image Identifier — Semiconductor component
                    recognition with explanations
                  </li>
                  <li>
                    Module 4: Interactive Glossary — Searchable dictionary with
                    AI explanations
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-700">Tech</h4>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-slate-800">
                  <li>React 19 with TypeScript and Vite</li>
                  <li>Flask (Python) backend with RESTful APIs</li>
                  <li>
                    OpenAI API integration (GPT-4o, GPT-4o-mini) for all AI
                    features
                  </li>
                  <li>
                    i18next for internationalization (English/Korean support)
                  </li>
                  <li>Pandas for CSV data processing</li>
                  <li>
                    Production-grade error handling and centralized logging
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="h-px bg-stone-200" />

          {/* Visual Features Section */}
          <div className="fade-up">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Platform Modules
            </h3>
            <p className="text-sm text-stone-500 mb-6">
              Click to explore each module
            </p>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Module 1: CSV Analysis */}
              <div className="group cursor-default select-none">
                <div className="h-full flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-700 text-sm font-bold">
                          1
                        </span>
                        <h4 className="text-base font-semibold text-slate-900">
                          CSV Analysis
                        </h4>
                      </div>
                    </div>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      Upload operational CSV files to get AI-powered summaries
                      highlighting key metrics, unusual patterns, and top three
                      action items. Designed for quick decision-making.
                    </p>
                  </div>
                </div>
              </div>

              {/* Module 2: Text Interpretation */}
              <div className="group cursor-default select-none">
                <div className="h-full flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-green-100 text-green-700 text-sm font-bold">
                          2
                        </span>
                        <h4 className="text-base font-semibold text-slate-900">
                          Text Interpreter
                        </h4>
                      </div>
                    </div>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      Paste technical messages to receive clear summaries with
                      beginner-friendly explanations. Convert messages into
                      professional emails or manager updates.
                    </p>
                  </div>
                </div>
              </div>

              {/* Module 3: Image Recognition */}
              <div className="group cursor-default select-none">
                <div className="h-full flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-purple-100 text-purple-700 text-sm font-bold">
                          3
                        </span>
                        <h4 className="text-base font-semibold text-slate-900">
                          Image Identifier
                        </h4>
                      </div>
                    </div>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      Upload semiconductor component images to identify wafers,
                      FOUPs, probe cards, and more. Get explanations of what
                      each item is and its manufacturing role.
                    </p>
                  </div>
                </div>
              </div>

              {/* Module 4: Glossary */}
              <div className="group cursor-default select-none">
                <div className="h-full flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-amber-100 text-amber-700 text-sm font-bold">
                          4
                        </span>
                        <h4 className="text-base font-semibold text-slate-900">
                          Interactive Glossary
                        </h4>
                      </div>
                    </div>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      Search 100+ semiconductor terms with definitions,
                      categories, and AI-enhanced explanations. Includes related
                      terms and real-world context examples.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-stone-200" />

          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Implementation Highlights
            </h3>
            <div className="space-y-4 text-slate-800 leading-relaxed">
              <p>
                The platform was built with production-ready practices from day
                one. I implemented a clean React architecture with TypeScript
                for type safety, created reusable components for consistency,
                and integrated i18next for bilingual support (English/Korean).
                The Flask backend follows RESTful API design principles with
                proper error handling and logging. Each module was designed to
                handle edge cases gracefully — from invalid CSV formats to
                unsupported image types — providing clear user feedback rather
                than cryptic errors.
              </p>
              <p>
                One technical challenge was optimizing OpenAI API usage across
                four different modules while maintaining fast response times. I
                implemented model selection based on task complexity (GPT-4o for
                image analysis, GPT-4o-mini for simpler text tasks) and added
                proper error recovery for API failures. The glossary module uses
                efficient client-side filtering for instant search results,
                while the AI explanation feature provides contextual depth when
                users need it.
              </p>
            </div>
          </div>

          <div className="h-px bg-stone-200" />

          {/* Self Reflection */}
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Reflection
            </h3>
            <div className="space-y-4 text-slate-800 leading-relaxed">
              <p>
                This hackathon reinforced the importance of building with real
                users in mind. Rather than creating a technically impressive but
                unusable system, we focused on solving actual pain points for
                semiconductor staff. The modular design made it easy to develop
                and test each feature independently, which was crucial given the
                tight timeline. I learned to balance feature completeness with
                time constraints — the four modules cover the core use cases
                comprehensively rather than trying to do everything.
              </p>
              <p>
                The project also improved my skills in API integration and error
                handling. Working with OpenAI&apos;s APIs taught me to design
                robust systems that gracefully handle failures and provide
                meaningful feedback. The internationalization feature was more
                complex than expected, requiring careful planning of text
                structure and context. If I were to extend this project,
                I&apos;d add user analytics to understand which modules are most
                valuable, implement caching for frequently accessed data, and
                expand the glossary with user-contributed terms. Overall, the
                hackathon demonstrated how AI can be practically applied to
                domain-specific problems when combined with thoughtful UX design
                and solid engineering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Elegant Lightbox Modal */}
      {lightbox && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ease-out ${
            lightboxVisible ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title}
        >
          {/* Backdrop with blur */}
          <div
            className={`absolute inset-0 bg-stone-950/80 backdrop-blur-md transition-opacity duration-300 ${
              lightboxVisible ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Content container */}
          <div
            className={`relative z-10 w-full max-w-5xl mx-4 transition-all duration-300 ease-out ${
              lightboxVisible
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-4"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title bar */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white/90 text-lg font-medium">
                {lightbox.title}
              </h3>
              <button
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200 text-sm font-medium"
                onClick={closeLightbox}
              >
                <span className="hidden sm:inline">Close</span>
                <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 bg-white/10 rounded text-[10px] font-mono">
                  ESC
                </kbd>
                <X className="w-5 h-5 sm:hidden" />
              </button>
            </div>

            {/* Image container with subtle shadow */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl bg-white select-none">
              <Image
                src={lightbox.src}
                alt={lightbox.alt}
                width={1600}
                height={1200}
                draggable={false}
                className="w-full h-auto max-h-[75vh] object-contain pointer-events-none"
                priority
              />
            </div>

            {/* Caption */}
            <p className="text-center text-white/50 text-sm mt-4 max-w-2xl mx-auto">
              {lightbox.alt}
            </p>
          </div>
        </div>
      )}

      <div className="h-20" />
    </main>
  );
}
