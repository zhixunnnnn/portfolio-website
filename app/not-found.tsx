"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowLeft, Compass } from "lucide-react";
import { useEffect, useState, useRef } from "react";

// Glitch animation for the 404 text
const glitchVariants = {
  animate: {
    x: [0, -2, 2, -1, 1, 0],
    y: [0, 1, -1, 0.5, -0.5, 0],
    transition: {
      duration: 0.15,
      repeat: Infinity,
      repeatDelay: 4,
    },
  },
};

// Floating animation for decorative elements
const floatVariants = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Stagger children animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Scramble text effect
function ScrambleText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`";
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let iteration = 0;
    const scramble = () => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) return text[index];
            if (char === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      iteration += 1 / 3;
      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    };

    intervalRef.current = setInterval(scramble, 30);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  return <span className={className}>{displayText}</span>;
}

// Magnetic hover button
function MagneticButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  return (
    <motion.div
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const relX = (event.clientX - rect.left - rect.width / 2) * 0.3;
        const relY = (event.clientY - rect.top - rect.height / 2) * 0.3;
        x.set(relX);
        y.set(relY);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: springX, y: springY }}
    >
      <Link
        href={href}
        className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm rounded-lg font-medium border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 shadow-sm hover:shadow-md"
      >
        <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
        {children}
      </Link>
    </motion.div>
  );
}

// Animated grid background
function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <defs>
          <pattern
            id="grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-slate-900"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Animated scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-400/30 to-transparent"
        initial={{ top: "-10%" }}
        animate={{ top: "110%" }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

// Floating particles
function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 3 + 4,
    delay: Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-slate-400/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Glitch layer effect
function GlitchLayers() {
  return (
    <>
      {/* Cyan glitch layer */}
      <motion.span
        className="absolute inset-0 text-[clamp(6rem,20vw,14rem)] font-bold text-cyan-500/20 select-none"
        animate={{
          x: [0, -3, 0, 2, 0],
          opacity: [0, 0.3, 0, 0.2, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: 3,
        }}
        aria-hidden
      >
        404
      </motion.span>
      {/* Red glitch layer */}
      <motion.span
        className="absolute inset-0 text-[clamp(6rem,20vw,14rem)] font-bold text-red-500/20 select-none"
        animate={{
          x: [0, 3, 0, -2, 0],
          opacity: [0, 0.2, 0, 0.3, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: 3,
          delay: 0.05,
        }}
        aria-hidden
      >
        404
      </motion.span>
    </>
  );
}

// Decorative compass animation
function AnimatedCompass() {
  return (
    <motion.div className="relative" variants={floatVariants} animate="animate">
      <motion.div
        className="absolute inset-0 rounded-full bg-slate-200/50 blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="relative"
      >
        <Compass className="w-16 h-16 text-slate-300" strokeWidth={1} />
      </motion.div>
    </motion.div>
  );
}

// Noise overlay
function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.015]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

// Handle keyboard navigation
function KeyboardNavigation() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "h" && !e.metaKey && !e.ctrlKey) {
        window.location.href = "/";
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return null;
}

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-slate-900 overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-[-2] bg-[#F8FAFC]" />

      {/* Animated elements */}
      <AnimatedGrid />
      <FloatingParticles />
      <NoiseOverlay />

      {/* Top fade gradient */}
      <div
        className="pointer-events-none fixed top-0 left-0 right-0 h-20 sm:h-24 z-40"
        style={{
          background:
            "linear-gradient(to bottom, #F8FAFC 0%, rgba(248, 250, 252, 0.8) 40%, rgba(248, 250, 252, 0.4) 70%, transparent 100%)",
        }}
      />

      {/* Bottom fade gradient */}
      <div
        className="pointer-events-none fixed bottom-0 left-0 right-0 h-20 sm:h-24 z-40"
        style={{
          background:
            "linear-gradient(to top, #ffffff 0%, rgba(255, 255, 255, 0.8) 40%, rgba(255, 255, 255, 0.4) 70%, transparent 100%)",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Compass icon */}
        <motion.div variants={itemVariants} className="mb-8">
          <AnimatedCompass />
        </motion.div>

        {/* 404 with glitch effect */}
        <motion.div variants={itemVariants} className="relative mb-4">
          <GlitchLayers />
          <motion.h1
            className="relative text-[clamp(6rem,20vw,14rem)] font-bold text-slate-900 leading-none tracking-tighter"
            variants={glitchVariants}
            animate="animate"
          >
            404
          </motion.h1>

          {/* Glitch clip effect */}
          <motion.div
            className="absolute inset-0 overflow-hidden"
            animate={{
              clipPath: [
                "inset(0 0 100% 0)",
                "inset(40% 0 50% 0)",
                "inset(0 0 100% 0)",
                "inset(80% 0 10% 0)",
                "inset(0 0 100% 0)",
              ],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              repeatDelay: 4,
            }}
          >
            <span className="text-[clamp(6rem,20vw,14rem)] font-bold text-slate-600 leading-none tracking-tighter">
              404
            </span>
          </motion.div>
        </motion.div>

        {/* Page Not Found text with scramble effect */}
        <motion.div variants={itemVariants} className="mb-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            {mounted ? (
              <ScrambleText text="Page Not Found" />
            ) : (
              "Page Not Found"
            )}
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="max-w-md text-base text-slate-600 mb-10 leading-relaxed"
        >
          The page you&apos;re looking for might have been moved, renamed, or
          never existed at all.
        </motion.p>

        {/* Animated line */}
        <motion.div
          variants={itemVariants}
          className="w-16 h-px bg-slate-300 mb-10 overflow-hidden"
        >
          <motion.div
            className="h-full w-full bg-slate-500"
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Button */}
        <motion.div variants={itemVariants}>
          <MagneticButton href="/">Back to Home</MagneticButton>
        </motion.div>

        {/* Keyboard shortcut hint */}
        <motion.p
          variants={itemVariants}
          className="mt-8 text-xs text-slate-400 flex items-center gap-2"
        >
          <span>Press</span>
          <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-mono">
            H
          </kbd>
          <span>to go home</span>
        </motion.p>
      </motion.div>

      {/* Decorative corner elements */}
      <motion.div
        className="absolute top-20 left-8 w-20 h-20 border-l border-t border-slate-200/50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      />
      <motion.div
        className="absolute bottom-20 right-8 w-20 h-20 border-r border-b border-slate-200/50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      />

      {/* Keyboard navigation */}
      <KeyboardNavigation />
    </main>
  );
}
