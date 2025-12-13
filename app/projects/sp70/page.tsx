import { Metadata } from "next";
import SP70Client from "./SP70Client";

export const metadata: Metadata = {
  title: "SP70 Website - Singapore Polytechnic 70th Anniversary",
  description:
    "Official website for Singapore Polytechnic's 70th anniversary celebration. Built with Next.js and Tailwind CSS.",
  openGraph: {
    title: "SP70 Website | Zhi Xun",
    description:
      "Official website for Singapore Polytechnic's 70th anniversary celebration.",
    type: "article",
  },
  keywords: [
    "Singapore Polytechnic",
    "SP70",
    "Anniversary Website",
    "Next.js",
    "Tailwind CSS",
  ],
};

export default function SP70Page() {
  return <SP70Client />;
}
