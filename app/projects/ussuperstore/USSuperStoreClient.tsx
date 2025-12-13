"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Github } from "lucide-react";

export default function USSuperStoreClient() {
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
                  US Superstore Analysis
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-lg bg-stone-100 text-stone-700 text-xs font-semibold px-2.5 py-1 border border-stone-200">
                    Data Analysis
                  </span>
                  <span className="inline-flex items-center rounded-lg bg-stone-100 text-stone-700 text-xs font-semibold px-2.5 py-1 border border-stone-200">
                    Academic Project · 2024
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-4 sm:mt-0 sm:flex-shrink-0 w-full sm:w-auto">
                <Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View source code on GitHub"
                  className="inline-flex items-center justify-center w-full sm:w-auto gap-2 rounded-xl bg-slate-800 text-white text-[15px] font-medium px-2.5 py-1.5 shadow-sm hover:bg-slate-700 hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                >
                  <Github className="w-4 h-4" strokeWidth={2.5} />
                  Source Code
                </Link>
              </div>
            </div>

            {/* Accent line */}
            <div className="mt-5 sm:mt-6 h-[2px] sm:h-[3px] w-12 sm:w-16 md:w-24 bg-emerald-600 rounded-full" />
          </div>

          {/* Description */}
          <p className="mt-5 sm:mt-6 max-w-3xl text-[15px] md:text-[16px] leading-7 sm:leading-relaxed text-slate-700 font-medium">
            A comprehensive data analysis project exploring the US Superstore
            dataset. The project provides insights into sales patterns, customer
            segments, product performance, and regional trends using Python,
            pandas, and data visualization libraries.
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
                Data Analyst
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
                Responsibilities
              </h3>
              <p className="text-sm text-slate-800 leading-relaxed">
                Performed exploratory data analysis, cleaned and preprocessed
                the dataset, created visualizations to uncover insights, and
                documented findings with actionable business recommendations.
              </p>
            </div>
          </div>

          <div className="space-y-3 md:pl-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
              Tech Stack
            </h3>
            <ul className="space-y-2">
              {[
                ["Python", "Programming Language"],
                ["Pandas", "Data Manipulation"],
                ["Matplotlib", "Visualization"],
                ["Seaborn", "Statistical Graphics"],
                ["Jupyter", "Analysis Environment"],
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

      {/* Analysis Section */}
      <section className="px-6 py-12 fade-up">
        <div className="container mx-auto max-w-4xl space-y-10">
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Project Overview
            </h3>
            <p className="text-slate-800 leading-relaxed">
              The US Superstore dataset contains sales transactions from a
              fictional retail company. This analysis project explores the data
              to identify trends, understand customer behavior, and provide
              insights that could inform business strategy. The goal was to
              practice data analysis techniques while extracting meaningful
              business insights.
            </p>
          </div>

          <div className="h-px bg-gray-200" />

          {/* Key Analyses */}
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Key Analyses
            </h3>
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-slate-700">
                  Sales Performance
                </h4>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-slate-800">
                  <li>Revenue trends over time (monthly, quarterly, yearly)</li>
                  <li>Top-performing products and categories</li>
                  <li>Regional sales distribution and comparison</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-700">
                  Customer Segmentation
                </h4>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-slate-800">
                  <li>
                    Analysis of Consumer, Corporate, and Home Office segments
                  </li>
                  <li>Purchase patterns and order frequency</li>
                  <li>Customer lifetime value indicators</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-700">
                  Profitability Analysis
                </h4>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-slate-800">
                  <li>Profit margins across product categories</li>
                  <li>Impact of discounts on profitability</li>
                  <li>Shipping cost analysis and optimization opportunities</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-200" />

          {/* Key Findings */}
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Key Findings
            </h3>
            <p className="text-slate-800 leading-relaxed">
              The analysis revealed several actionable insights: Technology
              products generate the highest profit margins despite lower sales
              volume; the West region consistently outperforms other regions;
              heavy discounting on certain product categories actually reduces
              overall profitability; and Consumer segment customers, while
              making smaller individual purchases, contribute significantly to
              total revenue through volume.
            </p>
          </div>

          <div className="h-px bg-gray-200" />

          {/* Reflection */}
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Reflection
            </h3>
            <p className="text-slate-800 leading-relaxed">
              This project strengthened my data analysis skills and taught me
              how to translate raw data into business insights. I learned the
              importance of asking the right questions before diving into
              analysis, and how data visualization can make complex patterns
              accessible to non-technical stakeholders. The project also
              reinforced my Python and pandas skills, particularly in data
              cleaning and transformation.
            </p>
          </div>
        </div>
      </section>

      <div className="h-20" />
    </main>
  );
}
