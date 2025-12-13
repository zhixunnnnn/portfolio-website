import { Metadata } from "next";
import PropertyPulseClient from "./PropertyPulseClient";

export const metadata: Metadata = {
  title: "PropertyPulse - Real Estate Platform",
  description:
    "A full-stack real estate website built with React.js and Node.js. Users can list properties for rent and make enquiries. Features MongoDB database and Cloudinary image storage.",
  openGraph: {
    title: "PropertyPulse - Real Estate Platform | Zhi Xun",
    description:
      "Full-stack real estate application with property listings and enquiry features.",
    type: "article",
  },
  keywords: [
    "Real Estate",
    "React.js",
    "Node.js",
    "MongoDB",
    "Full-Stack Development",
    "Property Listings",
    "Cloudinary",
  ],
};

export default function PropertyPulsePage() {
  return <PropertyPulseClient />;
}
