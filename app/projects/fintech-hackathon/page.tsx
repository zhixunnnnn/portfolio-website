import { Metadata } from "next";
import FintechClient from "./FintechClient";

export const metadata: Metadata = {
  title: "PolyFinTech API Hackathon - HSBC Intelligent Banking",
  description:
    "Case study of the HSBC Intelligent Banking project built for the PolyFinTech API Hackathon. An AI-powered platform for relationship managers with automated workflows and spending insights.",
  openGraph: {
    title: "PolyFinTech Hackathon - HSBC Intelligent Banking | Zhi Xun",
    description:
      "AI-powered intelligent banking experience for relationship managers. Category Finalist 2025.",
    type: "article",
    images: ["/images/hsbc-logo.webp"],
  },
  keywords: [
    "FinTech",
    "Hackathon",
    "HSBC",
    "AI Banking",
    "Next.js",
    "Full-Stack Development",
    "Singapore Polytechnic",
  ],
};

export default function FintechHackathonPage() {
  return <FintechClient />;
}
