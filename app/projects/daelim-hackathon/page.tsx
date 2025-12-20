import { Metadata } from "next";
import DaelimClient from "./DaelimClient";

export const metadata: Metadata = {
  title: "Daelim + SoC Hackathon - AstraSemi Operations Platform",
  description:
    "Case study of the AstraSemi Operations Platform built for the Daelim + SoC Hackathon. An AI-powered semiconductor operations assistant featuring CSV analysis, text interpretation, image recognition, and a comprehensive glossary.",
  openGraph: {
    title: "Daelim + SoC Hackathon - AstraSemi Platform | Zhi Xun",
    description:
      "AI-powered semiconductor operations platform with 4 intelligent modules for data analysis, text interpretation, and image recognition.",
    type: "article",
    images: ["/images/daelim-logo.png"],
  },
  keywords: [
    "Semiconductor",
    "Hackathon",
    "AI",
    "React",
    "Python",
    "Flask",
    "OpenAI",
    "Full-Stack Development",
    "Singapore Polytechnic",
  ],
};

export default function DaelimHackathonPage() {
  return <DaelimClient />;
}
