import { Metadata } from "next";
import USSuperStoreClient from "./USSuperStoreClient";

export const metadata: Metadata = {
  title: "US Superstore Analysis",
  description:
    "Data analysis and visualization project for US Superstore dataset. Explores sales patterns, customer segments, and business insights using Python and data science techniques.",
  openGraph: {
    title: "US Superstore Analysis | Zhi Xun",
    description:
      "Data analysis and visualization project exploring retail sales patterns and business insights.",
    type: "article",
  },
  keywords: [
    "Data Analysis",
    "Python",
    "Data Visualization",
    "Business Intelligence",
    "Retail Analytics",
  ],
};

export default function USSuperStorePage() {
  return <USSuperStoreClient />;
}
