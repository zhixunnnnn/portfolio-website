"use client";

import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { House, FolderGit, User } from "lucide-react";

const navItems = [
  { href: "/", icon: House, label: "Home" },
  { href: "/projects", icon: FolderGit, label: "Projects" },
  { href: "/about", icon: User, label: "About" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const navbar = document.getElementById("navbar");
      if (navbar) {
        navbar.classList.remove("-translate-y-full");
        navbar.classList.add("translate-y-0");
        // Remove transform after animation to ensure fixed positioning works correctly
        setTimeout(() => {
          if (navbar) {
            navbar.classList.remove("transform");
          }
        }, 700);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <nav
      id="navbar"
      className="fixed top-0 left-0 right-0 w-full z-50 bg-transparent transform -translate-y-full transition-transform duration-700 ease-out pt-5"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-semibold text-gray-900">
          <Image
            src="/images/NavbarBrand.png"
            alt="Navbar Brand"
            width={56}
            height={48}
            className="h-12 md:h-14 w-auto max-h-14"
          />
        </Link>

        <div className="relative" ref={navRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative h-12 md:h-14 max-h-14 w-12 md:w-14 max-w-14 p-0 bg-gradient-to-b from-[#a3bded] to-[#6991c7] rounded-full flex items-center justify-center transition-all duration-300 hover:from-[#b5c9f0] hover:to-[#7a9fd1]"
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <Menu
                className={`absolute inset-0 text-white transition-all duration-300 ${
                  isOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                }`}
                strokeWidth={2.5}
                size={24}
              />
              <X
                className={`absolute inset-0 text-white transition-all duration-300 ${
                  isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                }`}
                strokeWidth={2.5}
                size={24}
              />
            </div>
          </button>

          <div
            className={`absolute right-0 mt-2.5 bg-[#6991c7]/95 backdrop-blur-sm shadow-xl shadow-slate-900/10 rounded-2xl overflow-hidden transition-all duration-200 ease-out origin-top-right ${
              isOpen
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <div className="p-2">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-5 py-3 text-sm text-white/90 font-medium rounded-xl hover:bg-white/[0.12] transition-colors duration-150"
                    style={{
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? "translateY(0)" : "translateY(-4px)",
                      transition: `opacity 0.2s ease-out ${
                        index * 0.03
                      }s, transform 0.2s ease-out ${index * 0.03}s`,
                    }}
                  >
                    <Icon size={20} strokeWidth={1.75} className="opacity-85" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
