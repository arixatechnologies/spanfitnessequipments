"use client";

import { usePathname } from "next/navigation";
import { MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/src/config/site";

export function FloatingActions() {
  const path = usePathname();
  if (path.startsWith("/admin")) return null;
  const message = encodeURIComponent("Hello Span Fitness Equipments, I would like to request a quote.");
  return <>
    <a href={`https://wa.me/91${siteConfig.customerCare}?text=${message}`} aria-label="WhatsApp Span Fitness Equipments" className="fixed bottom-20 right-4 z-40 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl transition hover:scale-105 sm:bottom-6"><MessageCircle className="size-7" /></a>
    <a href={`tel:${siteConfig.phone}`} className="fixed inset-x-0 bottom-0 z-40 flex h-14 items-center justify-center gap-2 bg-gradient-to-r from-ember to-coral font-bold shadow-2xl sm:hidden"><Phone className="size-5" /> Call Span Fitness</a>
  </>;
}
