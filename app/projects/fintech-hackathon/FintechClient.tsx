"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function FintechClient() {
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
            {/* Brand */}
            <div className="mt-8 flex items-center gap-3">
              <Image
                src="/images/hsbc-logo.webp"
                alt="HSBC Logo"
                width={140}
                height={40}
                className="h-9 w-auto select-none"
                priority
              />
              <span className="sr-only">HSBC Intelligent Banking Project</span>
            </div>

            {/* Title */}
            <div className="mt-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                <div className="flex-1">
                  <h1 className="text-[40px] sm:text-5xl font-bold text-slate-900 leading-[1.15] sm:leading-[1.1]">
                    Intelligent Banking
                  </h1>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-lg bg-stone-100 text-stone-700 text-xs font-semibold px-2.5 py-1 border border-stone-200">
                      PolyFinTech API Hackathon
                    </span>
                    <span className="inline-flex items-center rounded-lg bg-stone-100 text-stone-700 text-xs font-semibold px-2.5 py-1 border border-stone-200">
                      Category Finalist · 2025
                    </span>
                  </div>
                </div>

                {/* CTA Button - aligned with title */}
                <div className="mt-4 sm:mt-0 sm:flex-shrink-0 w-full sm:w-auto">
                  <Link
                    href="https://fintech-l4pi.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View the live Intelligent Banking project"
                    className="inline-flex items-center justify-center w-full sm:w-auto gap-2 rounded-xl bg-[#DB0011] text-white text-[15px] font-medium px-2.5 py-1.5 shadow-sm hover:bg-[#9d1722] hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                  >
                    View Live Site
                    <ExternalLink className="w-4 h-4" strokeWidth={2.5} />
                  </Link>
                </div>
              </div>

              {/* Accent line */}
              <div className="mt-5 sm:mt-6 h-[2px] sm:h-[3px] w-12 sm:w-16 md:w-24 bg-[#DB0011] rounded-full" />
            </div>

            {/* Description */}
            <p className="mt-5 sm:mt-6 max-w-3xl text-[15px] md:text-[16px] leading-7 sm:leading-relaxed text-slate-700 font-medium">
              We built an intelligent banking experience that helps relationship
              managers and customers make faster decisions using AI-powered
              insights, automated workflows, and a privacy-first data layer. Our
              prototype focused on improving onboarding, spending insights, and
              proactive financial guidance.
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
                Responsible for the full-stack development of the web
                application, covering both client and server-side
                implementation. Designed the interface, built complete
                functionalities, and deployed the final product.
              </p>
            </div>
          </div>

          <div className="space-y-3 md:pl-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
              Team
            </h3>
            <ul className="space-y-2">
              {[
                ["Kylie", "Team Lead"],
                ["Sara", "User Research"],
                ["Harleen", "Solution Planning"],
                ["Sheng Tian", "Solution Planning"],
                ["Isaac", "Market Research"],
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
              Relationship managers face inefficiencies from fragmented data
              systems, manual preparation, and disconnected client insights.
              Valuable time is wasted pulling information from multiple
              platforms, leading to slower prep and generic client interactions.
              Without structured reminders or a unified client view, follow-ups
              are inconsistent and personalized opportunities are often missed.
              This limits proactive engagement, weakens client trust, and
              reduces the quality of financial advice. Our challenge was to
              explore how AI could unify data, streamline workflows, and empower
              wealth managers to deliver timely, transparent, and personalized
              financial experiences.
            </p>
          </div>

          <div className="h-px bg-stone-200" />

          {/* Solution */}
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Solution
            </h3>
            <p className="text-slate-800 leading-relaxed">
              Our solution reimagined the relationship-manager workflow into an
              AI-assisted financial intelligence platform — a single, unified
              dashboard designed to turn fragmented client data into actionable
              insights. We automated repetitive tasks such as data retrieval and
              pre-meeting preparation, giving RMs back the time to focus on
              relationship-building and personalized strategy. Through AI-driven
              summarization and risk analysis, the system surfaced timely client
              insights, spending patterns, and proactive recommendations —
              allowing managers to engage with context, not chaos. We built an
              end-to-end prototype using Next.js, TypeScript, and Node.js,
              powered by concept-level vector search and OpenAI-based
              summarization models to simulate real-time intelligence. The
              dashboard presented a compliant, privacy-first view of each
              client&apos;s profile, upcoming cash constraints, and suggested
              actions, blending predictive analytics with explainable
              recommendations. This created a balance between automation and
              human expertise — improving efficiency without compromising client
              trust or data ethics.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-slate-700">
                  Key Flows
                </h4>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-slate-800">
                  <li>
                    Smart onboarding with guided document analysis and hints
                  </li>
                  <li>
                    Unified dashboard with spending insights and anomaly
                    detection
                  </li>
                  <li>
                    Goal-based planning with AI-driven nudges and savings
                    suggestions
                  </li>
                  <li>
                    Proactive communication assistant for client message
                    drafting
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-700">Tech</h4>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-slate-800">
                  <li>Next.js, TypeScript, Tailwind CSS</li>
                  <li>Node.js with RESTful APIs</li>
                  <li>
                    OpenAI API for summarization and recommendation generation
                  </li>
                  <li>Concept-level vector search for insight retrieval</li>
                  <li>
                    Privacy-first architecture with data separation and
                    compliance principles
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="h-px bg-stone-200" />

          {/* Visual Features Section */}
          <div className="fade-up">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Key Features
            </h3>
            <p className="text-sm text-stone-500 mb-6">
              Click to see each component
            </p>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Feature 1: Portfolio Allocation */}
              <div
                className="group cursor-pointer select-none"
                draggable={false}
                onClick={() =>
                  openLightbox(
                    "/images/allocation.png",
                    "Portfolio allocation visualization showing asset distribution and investment breakdown",
                    "Portfolio Allocation"
                  )
                }
              >
                <div className="h-full flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 ease-out group-hover:shadow-lg group-hover:-translate-y-0.5">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src="/images/allocation.png"
                      alt="Portfolio allocation visualization"
                      fill
                      draggable={false}
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] pointer-events-none"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="flex-1 p-4">
                    <h4 className="text-sm font-semibold text-slate-900">
                      Portfolio Allocation
                    </h4>
                    <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                      Visualize asset distribution and investment breakdown
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2: Market Heatmap */}
              <div
                className="group cursor-pointer select-none"
                draggable={false}
                onClick={() =>
                  openLightbox(
                    "/images/heatmap.png",
                    "Market heatmap showing real-time asset performance",
                    "Market Heatmap"
                  )
                }
              >
                <div className="h-full flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 ease-out group-hover:shadow-lg group-hover:-translate-y-0.5">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src="/images/heatmap.png"
                      alt="Market heatmap visualization"
                      fill
                      draggable={false}
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] pointer-events-none"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="flex-1 p-4">
                    <h4 className="text-sm font-semibold text-slate-900">
                      Market Heatmap
                    </h4>
                    <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                      Real-time asset class performance monitoring
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 3: Product Recommendations */}
              <div
                className="group cursor-pointer select-none"
                draggable={false}
                onClick={() =>
                  openLightbox(
                    "/images/productstopush.png",
                    "AI-driven product recommendations for relationship managers",
                    "Product Recommendations"
                  )
                }
              >
                <div className="h-full flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 ease-out group-hover:shadow-lg group-hover:-translate-y-0.5">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src="/images/productstopush.png"
                      alt="Product recommendations interface"
                      fill
                      draggable={false}
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] pointer-events-none"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="flex-1 p-4">
                    <h4 className="text-sm font-semibold text-slate-900">
                      Product Recommendations
                    </h4>
                    <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                      AI-curated suggestions with ESG ratings
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-stone-200" />

          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Outcome
            </h3>
            <p className="text-slate-800 leading-relaxed">
              The prototype demonstrated how AI can elevate the role of
              relationship managers from reactive advisors to proactive
              financial partners. Our system helped RMs save up to 45 minutes
              per client through automated preparation, leading to up to four
              additional client engagements per day. Smarter follow-ups and
              reminders ensured that no client was overlooked, while customers
              benefited from real-time insights and personalized recommendations
              aligned with their goals and life stages. By merging efficiency
              with empathy, the solution strengthened client trust and improved
              engagement quality — directly supporting HSBC&apos;s
              client-centric strategy. The design also outlined a scalable
              product roadmap, beginning with a pilot rollout in select markets
              (Singapore, UK) and expanding globally in phased deployment.
            </p>
          </div>

          <div className="h-px bg-stone-200" />

          {/* Self Reflection */}
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Reflection
            </h3>
            <div className="space-y-4 text-slate-800 leading-relaxed">
              <p>
                This hackathon trained me to execute fast while still holding
                the line on code quality and product clarity. Building the
                full-stack prototype largely independently meant I had to make
                high-impact architectural calls early—choosing a clean
                structure, defining data models quickly, and keeping the
                implementation maintainable even under pressure. The hardest
                part was managing scope: there were always more “nice-to-have”
                features, but I learned to cut aggressively and concentrate on
                the core user journeys that would best demonstrate value. That
                MVP discipline helped me ship a working end-to-end experience
                that communicated a clear story to the judges, rather than a
                scattered set of half-finished ideas.
              </p>
              <p>
                Looking back, I’d invest more time in tightening the data
                visualization layer for readability and insight density, and I’d
                harden the system with stronger error handling, edge-case
                coverage, and clearer failure states. The project also
                reinforced something I think recruiters care about a lot: impact
                comes from judgment, not just output. While I handled the
                technical build, my teammates’ research and strategic framing
                ensured we were solving a real problem with a credible approach,
                and that alignment made the prototype feel purposeful rather
                than purely technical. Overall, it strengthened my confidence in
                shipping under constraints, making trade-offs intentionally, and
                translating user needs into a product that’s both usable and
                defensible.
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
