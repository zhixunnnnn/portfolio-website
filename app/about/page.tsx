"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mail, Linkedin } from "lucide-react";

const EMAIL = "zhixunnnn@icloud.com";
const LINKEDIN = "https://linkedin.com/in/yourhandle";

export default function AboutPage() {
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
      },
    );

    const elements = document.querySelectorAll(".fade-up");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen text-slate-900">
      <div className="fixed inset-0 z-[-2] bg-[#F5F1EA]" />

      {/* Top fade gradient */}
      <div
        className="pointer-events-none fixed top-0 left-0 right-0 h-20 sm:h-24 z-40"
        style={{
          background:
            "linear-gradient(to bottom, #F5F1EA 0%, rgba(245, 241, 234, 0.8) 40%, rgba(245, 241, 234, 0.4) 70%, transparent 100%)",
        }}
      />

      {/* Header */}
      <section className="pt-32 pb-8 px-6">
        <div className="container mx-auto max-w-4xl">
          <Link
            href="/"
            className="fade-up inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </section>

      {/* Professional Summary */}
      <section className="px-6 py-16 fade-up">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-6">
            Summary
          </h2>
          <div className="space-y-4 text-slate-700 text-base leading-relaxed max-w-3xl">
            <p>
              I&rsquo;m a second-year Information Technology student at
              Singapore Polytechnic, specialising in software development. I
              focus on building web applications that are accessible,
              performant, and dependable, with an emphasis on clean architecture
              and thoughtful engineering decisions. I enjoy taking products from
              idea to deployment, balancing speed with quality, and shipping
              features that solve real problems without bloating the experience.
            </p>
            <p>
              I&rsquo;m also deeply interested in user interface design. I care
              about the details that make software feel premium and intuitive:
              clear visual hierarchy, consistent spacing, thoughtful
              micro-interactions, and layouts that guide users naturally. I like
              bridging design and engineering, turning high-level concepts into
              clean, responsive interfaces that look good and stay maintainable.
            </p>
            <p>
              Outside of coding, I&rsquo;m into Formula 1, basketball, and
              mobile games. What I like most about them is the mix of strategy,
              fast decision-making, and constant iteration. Those same themes
              show up in how I work: prioritising what matters, and refining
              until the result feels right and perfect to me.
            </p>
            <p>
              More than anything, I enjoy creating things. Whether it&rsquo;s a
              side project, a small tool that removes friction, or a new tech
              experiment, I&rsquo;m motivated by building something useful,
              polishing it, and putting it in front of people.
            </p>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="px-6 py-16 fade-up">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-8">
            Experience
          </h2>

          <div className="space-y-1">
            {/* Kosui */}
            <div className="group py-6">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden">
                  <Image
                    src="/kosui.png"
                    alt="Kōsui"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                    <div>
                      <h3 className="text-base font-medium text-slate-900">
                        Co-Founder, Lead Designer & Full-Stack Developer
                      </h3>
                      <p className="text-sm text-slate-600 mt-0.5">Kōsui</p>
                    </div>
                    <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
                      2025 — Present
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed max-w-2xl">
                    Leading UI/UX design and full-stack development for a modern
                    travel-planning application. Responsible for product design,
                    frontend and backend architecture, and shipping features
                    end-to-end.
                  </p>
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-200" />

            {/* PARKROYAL */}
            <div className="group py-6">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden">
                  <Image
                    src="/parkroyallogo.jpeg"
                    alt="PARKROYAL COLLECTION"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                    <div>
                      <h3 className="text-base font-medium text-slate-900">
                        Service Staff
                      </h3>
                      <p className="text-sm text-slate-600 mt-0.5">
                        PARKROYAL COLLECTION Marina Bay
                      </p>
                    </div>
                    <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
                      Aug — Oct 2025
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed max-w-2xl">
                    Delivered exceptional hospitality service at
                    Singapore&rsquo;s first &rsquo;Garden-in-a-Hotel&rsquo;.
                    Developed strong communication skills and attention to
                    detail in a fast-paced, premium environment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills / Tech Stack */}
      <section className="px-6 py-16 fade-up">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-8">
            Skills & Technologies
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Languages */}
            <div>
              <h3 className="text-xs font-medium uppercase tracking-wide text-slate-400 mb-4">
                Languages
              </h3>
              <div className="space-y-3">
                {[
                  {
                    name: "TypeScript",
                    icon: "https://cdn.simpleicons.org/typescript/3178C6",
                  },
                  {
                    name: "JavaScript",
                    icon: "https://cdn.simpleicons.org/javascript/F7DF1E",
                  },
                  {
                    name: "Python",
                    icon: "https://cdn.simpleicons.org/python/3776AB",
                  },
                  {
                    name: "Java",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
                  },
                  {
                    name: "HTML",
                    icon: "https://cdn.simpleicons.org/html5/E34F26",
                  },
                  {
                    name: "CSS",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
                  },
                ].map((tech) => (
                  <div key={tech.name} className="flex items-center gap-2.5">
                    <Image
                      src={tech.icon}
                      alt={tech.name}
                      width={18}
                      height={18}
                      className="flex-shrink-0"
                      unoptimized
                    />
                    <span className="text-sm text-slate-700">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Frameworks & Libraries */}
            <div>
              <h3 className="text-xs font-medium uppercase tracking-wide text-slate-400 mb-4">
                Frameworks
              </h3>
              <div className="space-y-3">
                {[
                  {
                    name: "Next.js",
                    icon: "https://cdn.simpleicons.org/nextdotjs/000000",
                  },
                  {
                    name: "React",
                    icon: "https://cdn.simpleicons.org/react/61DAFB",
                  },
                  {
                    name: "Node.js",
                    icon: "https://cdn.simpleicons.org/nodedotjs/339933",
                  },
                  {
                    name: "Tailwind CSS",
                    icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
                  },
                  {
                    name: "Framer Motion",
                    icon: "https://cdn.simpleicons.org/framer/0055FF",
                  },
                  {
                    name: "Express.js",
                    icon: "https://cdn.simpleicons.org/express/000000",
                  },
                ].map((tech) => (
                  <div key={tech.name} className="flex items-center gap-2.5">
                    <Image
                      src={tech.icon}
                      alt={tech.name}
                      width={18}
                      height={18}
                      className="flex-shrink-0"
                      unoptimized
                    />
                    <span className="text-sm text-slate-700">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Databases */}
            <div>
              <h3 className="text-xs font-medium uppercase tracking-wide text-slate-400 mb-4">
                Databases
              </h3>
              <div className="space-y-3">
                {[
                  {
                    name: "PostgreSQL",
                    icon: "https://cdn.simpleicons.org/postgresql/4169E1",
                  },
                  {
                    name: "MongoDB Atlas",
                    icon: "https://cdn.simpleicons.org/mongodb/47A248",
                  },
                  {
                    name: "MySQL",
                    icon: "https://cdn.simpleicons.org/mysql/4479A1",
                  },
                  {
                    name: "Prisma ORM",
                    icon: "https://cdn.simpleicons.org/prisma/2D3748",
                  },
                ].map((tech) => (
                  <div key={tech.name} className="flex items-center gap-2.5">
                    <Image
                      src={tech.icon}
                      alt={tech.name}
                      width={18}
                      height={18}
                      className="flex-shrink-0"
                      unoptimized
                    />
                    <span className="text-sm text-slate-700">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools & Platforms */}
            <div>
              <h3 className="text-xs font-medium uppercase tracking-wide text-slate-400 mb-4">
                Tools
              </h3>
              <div className="space-y-3">
                {[
                  {
                    name: "Git",
                    icon: "https://cdn.simpleicons.org/git/F05032",
                  },
                  {
                    name: "GitHub",
                    icon: "https://cdn.simpleicons.org/github/181717",
                  },
                  {
                    name: "Vercel",
                    icon: "https://cdn.simpleicons.org/vercel/000000",
                  },
                  {
                    name: "Figma",
                    icon: "https://cdn.simpleicons.org/figma/F24E1E",
                  },
                  {
                    name: "VS Code",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
                  },
                ].map((tech) => (
                  <div key={tech.name} className="flex items-center gap-2.5">
                    <Image
                      src={tech.icon}
                      alt={tech.name}
                      width={18}
                      height={18}
                      className="flex-shrink-0"
                      unoptimized
                    />
                    <span className="text-sm text-slate-700">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="px-6 py-16 fade-up">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-8">
            Education
          </h2>

          <div className="space-y-1">
            {/* Singapore Polytechnic */}
            <div className="group py-6">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden bg-white flex items-center justify-center">
                  <Image
                    src="https://www.sp.edu.sg/favicon.ico"
                    alt="Singapore Polytechnic"
                    width={28}
                    height={28}
                    unoptimized
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                    <div>
                      <h3 className="text-base font-medium text-slate-900">
                        Diploma in Information Technology
                      </h3>
                      <p className="text-sm text-slate-600 mt-0.5">
                        Singapore Polytechnic
                      </p>
                    </div>
                    <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
                      2024 — Present
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed max-w-2xl">
                    Specialising in software development with coursework in web
                    development, database management, object-oriented
                    programming, and software engineering principles. Currently
                    in Year 2.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 bg-stone-100 text-stone-600 rounded">
                      Software Development
                    </span>
                    <span className="text-xs px-2 py-1 bg-stone-100 text-stone-600 rounded">
                      Web Technologies
                    </span>
                    <span className="text-xs px-2 py-1 bg-stone-100 text-stone-600 rounded">
                      Database Systems
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-200" />

            {/* Secondary School */}
            <div className="group py-6">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center">
                  <span className="text-lg">🎓</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                    <div>
                      <h3 className="text-base font-medium text-slate-900">
                        GCE O-Level
                      </h3>
                      <p className="text-sm text-slate-600 mt-0.5">
                        Compassvale Secondary School
                      </p>
                    </div>
                    <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
                      2020 — 2023
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed max-w-2xl">
                    Completed GCE O-Level examinations. Subjects included Pure
                    Humanities (History), Elective Humanities (Geography &
                    Social Studies), Additional & Elementary Mathematics, and
                    Combined Science (Chemistry & Physics).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="h-20" />
    </main>
  );
}
