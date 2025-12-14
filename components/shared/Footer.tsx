import { Github, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-10">
      <div className="flex flex-col items-center space-y-4">
        {/* Icons Row */}
        <div className="flex space-x-6">
          <a
            href="https://instagram.com/zhi.xun_"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-slate-600 hover:text-[#DB2777] transition"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/zhixunnn/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-slate-600 hover:text-blue-600 transition"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/zhixunnnnn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-slate-600 hover:text-neutral-700 transition"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} Zhi Xun. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
