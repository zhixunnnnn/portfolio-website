"use client";
import { MapPin, Mail, Linkedin, ArrowUpRight } from "lucide-react";
import projectsData from "@/data/projects.json";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

const EMAIL = "zhixunnnn@icloud.com";
const LINKEDIN = "https://linkedin.com/in/yourhandle";

export default function Home() {
  const projects: Project[] = (projectsData as Project[]).slice(0, 3);
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

      {/* Hero */}
      <section
        id="hero"
        className="relative h-[65vh] min-h-[500px] flex flex-col justify-center items-center text-center px-6 overflow-hidden transition-opacity duration-500 ease-out"
      >
        <h1 className="text-[40px] sm:text-5xl font-bold text-slate-900 leading-[1.15] sm:leading-[1.1]">
          Hi! I&rsquo;m Zhi Xun
        </h1>
        <div className="flex items-center justify-center gap-2 mt-5">
          <MapPin
            className="w-5 h-5 text-slate-600 flex-shrink-0"
            strokeWidth={2.5}
          />
          <p className="text-base text-slate-700 font-medium">Singapore, SG</p>
        </div>
        <p className="text-[15px] md:text-[16px] text-slate-700 mt-5 font-medium text-center max-w-[60ch] mx-auto leading-relaxed">
          Full-stack developer building clean, performant web apps with modern
          technologies.
        </p>
        <div className="flex items-center gap-2.5 sm:gap-3 mt-8">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg font-medium border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Me</span>
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg font-medium border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="px-6 py-20 sm:py-24 fade-up">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-6">
            Featured Projects
          </h2>
          <div className="space-y-1">
            {projects.map((project: Project, index: number) => (
              <div
                key={project.id}
                className="fade-up"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Link
                  href={`/projects/${project.id}`}
                  className="group block py-6 transition-all duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="text-base font-medium text-slate-900 mb-2 group-hover:text-slate-600 transition-colors leading-relaxed">
                        {project.title}
                      </h3>
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
                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <ArrowUpRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                </Link>
                {index < projects.length - 1 && (
                  <div className="h-px bg-slate-200" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 fade-up">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm text-slate-700 hover:text-slate-900 font-medium transition-colors group"
            >
              <span>See All Projects</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="px-6 py-20 sm:py-24 fade-up">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-6">
            About
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
      <section className="px-6 py-20 sm:py-24 fade-up">
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

      {/* Tech Stack */}
      <section className="px-6 py-20 sm:py-24 fade-up">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-8">
            Tech Stack
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-5">
            <div className="flex items-center gap-2.5">
              <Image
                src="https://cdn.simpleicons.org/nextdotjs/000000"
                alt="Next.js"
                width={20}
                height={20}
                className="flex-shrink-0"
                unoptimized
              />
              <span className="text-sm text-slate-700">Next.js</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Image
                src="https://cdn.simpleicons.org/react/61DAFB"
                alt="React"
                width={20}
                height={20}
                className="flex-shrink-0"
                unoptimized
              />
              <span className="text-sm text-slate-700">React</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Image
                src="https://cdn.simpleicons.org/typescript/3178C6"
                alt="TypeScript"
                width={20}
                height={20}
                className="flex-shrink-0"
                unoptimized
              />
              <span className="text-sm text-slate-700">TypeScript</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Image
                src="https://cdn.simpleicons.org/javascript/F7DF1E"
                alt="JavaScript"
                width={20}
                height={20}
                className="flex-shrink-0"
                unoptimized
              />
              <span className="text-sm text-slate-700">JavaScript</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Image
                src="https://cdn.simpleicons.org/tailwindcss/06B6D4"
                alt="Tailwind CSS"
                width={20}
                height={20}
                className="flex-shrink-0"
                unoptimized
              />
              <span className="text-sm text-slate-700">Tailwind CSS</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Image
                src="https://cdn.simpleicons.org/nodedotjs/339933"
                alt="Node.js"
                width={20}
                height={20}
                className="flex-shrink-0"
                unoptimized
              />
              <span className="text-sm text-slate-700">Node.js</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Image
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg"
                alt="Java"
                width={20}
                height={20}
                className="flex-shrink-0"
                unoptimized
              />
              <span className="text-sm text-slate-700">Java</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Image
                src="https://cdn.simpleicons.org/postgresql/4169E1"
                alt="PostgreSQL"
                width={20}
                height={20}
                className="flex-shrink-0"
                unoptimized
              />
              <span className="text-sm text-slate-700">PostgreSQL</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Image
                src="https://cdn.simpleicons.org/mongodb/47A248"
                alt="MongoDB"
                width={20}
                height={20}
                className="flex-shrink-0"
                unoptimized
              />
              <span className="text-sm text-slate-700">MongoDB</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Image
                src="https://cdn.simpleicons.org/git/F05032"
                alt="Git"
                width={20}
                height={20}
                className="flex-shrink-0"
                unoptimized
              />
              <span className="text-sm text-slate-700">Git</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Image
                src="https://cdn.simpleicons.org/github/181717"
                alt="GitHub"
                width={20}
                height={20}
                className="flex-shrink-0"
                unoptimized
              />
              <span className="text-sm text-slate-700">GitHub</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Image
                src="https://cdn.simpleicons.org/vercel/000000"
                alt="Vercel"
                width={20}
                height={20}
                className="flex-shrink-0"
                unoptimized
              />
              <span className="text-sm text-slate-700">Vercel</span>
            </div>
          </div>
        </div>
      </section>

      <div className="h-20" />
    </main>
  );
}
