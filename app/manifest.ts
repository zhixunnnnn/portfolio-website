import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Zhi Xun's Portfolio",
    short_name: "Zhi Xun",
    description:
      "Full-stack developer building clean, performant web apps with modern technologies. Based in Singapore.",
    start_url: "/",
    display: "standalone",
    background_color: "#F5F1EA",
    theme_color: "#0FFFFF",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
