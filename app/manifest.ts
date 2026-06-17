import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Span Fitness Equipments",
    short_name: "Span Fitness",
    description: "Fitness equipment store and gym equipment dealer in Visakhapatnam.",
    start_url: "/",
    display: "standalone",
    background_color: "#09122C",
    theme_color: "#09122C",
    icons: [
      { src: "/span-fitness-logo.png", sizes: "512x512", type: "image/png" }
    ]
  };
}
