import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Analytics } from "@vercel/analytics/next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zhixun.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Zhi Xun | Full-Stack Developer & Designer",
    template: "%s | Zhi Xun",
  },
  description:
    "Full-stack developer building clean, performant web apps with modern technologies. Specialising in React, Next.js, TypeScript, and Node.js. Based in Singapore.",
  keywords: [
    "Zhi Xun",
    "Full-Stack Developer",
    "Web Developer",
    "Software Engineer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Singapore",
    "UI/UX Designer",
    "Frontend Developer",
    "Backend Developer",
  ],
  authors: [{ name: "Zhi Xun", url: siteUrl }],
  creator: "Zhi Xun",
  publisher: "Zhi Xun",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_SG",
    url: siteUrl,
    siteName: "Zhi Xun's Portfolio",
    title: "Zhi Xun | Full-Stack Developer & Designer",
    description:
      "Full-stack developer building clean, performant web apps with modern technologies. Based in Singapore.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zhi Xun - Full-Stack Developer & Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zhi Xun | Full-Stack Developer & Designer",
    description:
      "Full-stack developer building clean, performant web apps with modern technologies. Based in Singapore.",
    images: ["/og-image.png"],
    creator: "@zhixun",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#0FFFFF",
};

// JSON-LD Structured Data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Zhi Xun's Portfolio",
      description:
        "Full-stack developer building clean, performant web apps with modern technologies.",
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
      inLanguage: "en-SG",
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Zhi Xun",
      url: siteUrl,
      jobTitle: "Full-Stack Developer",
      description:
        "Full-stack developer and designer specialising in React, Next.js, TypeScript, and Node.js. Based in Singapore.",
      sameAs: [
        "https://linkedin.com/in/yourhandle",
        "https://github.com/zhixun",
      ],
      knowsAbout: [
        "Web Development",
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "UI/UX Design",
        "Full-Stack Development",
      ],
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Singapore Polytechnic",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Singapore",
        addressCountry: "SG",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-foreground">
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
