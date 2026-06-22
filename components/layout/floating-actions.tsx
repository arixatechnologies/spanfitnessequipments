"use client";

import { usePathname } from "next/navigation";
import { Instagram, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/src/config/site";

export function FloatingActions() {
  const path = usePathname();
  if (path.startsWith("/admin")) return null;
  const message = encodeURIComponent("Hello Span Fitness Equipments, I would like to request a quote.");
  return (
    <div className="fixed bottom-5 right-4 z-40 grid gap-3 sm:bottom-6">
      <a
        href={`tel:${siteConfig.phone}`}
        aria-label="Call Span Fitness Equipments"
        className="grid size-12 place-items-center rounded-full border border-white/20 bg-gradient-to-br from-coral to-ember text-white shadow-[0_18px_45px_rgba(0,0,0,.35)] transition hover:-translate-y-1 hover:scale-105 hover:shadow-glow sm:size-14"
      >
        <Phone className="size-6" />
      </a>
      <a
        href={`https://wa.me/91${siteConfig.customerCare}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Span Fitness Equipments"
        className="grid size-12 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_18px_45px_rgba(0,0,0,.35)] transition hover:-translate-y-1 hover:scale-105 sm:size-14"
      >
        <MessageCircle className="size-6" />
      </a>
      <a
        href={siteConfig.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram Span Fitness Equipments"
        className="grid size-12 place-items-center rounded-full bg-[radial-gradient(circle_at_30%_110%,#feda75_0%,#fa7e1e_24%,#d62976_48%,#962fbf_72%,#4f5bd5_100%)] text-white shadow-[0_18px_45px_rgba(0,0,0,.35)] transition hover:-translate-y-1 hover:scale-105 sm:size-14"
      >
        <Instagram className="size-6" />
      </a>
    </div>
  );
}
