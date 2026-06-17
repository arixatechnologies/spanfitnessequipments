"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, BadgeCheck, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import type { Category } from "../data";
import { business, categories, navItems, whatsappUrl } from "../data";

export function ButtonLink({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) {
  const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  const className = `inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-bold transition hover:-translate-y-0.5 ${secondary ? "border border-white/20 bg-white/5 text-white hover:border-coral" : "btn-shine bg-gradient-to-r from-ember to-coral text-white shadow-glow"}`;
  return external ? <a href={href} className={className}>{children}</a> : <Link href={href} className={className}>{children}</Link>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  if (path.startsWith("/admin")) return null;
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070d20]/95 shadow-[0_18px_55px_rgba(0,0,0,.32)] backdrop-blur-xl">
      <div className="hidden border-b border-white/5 bg-white/[0.025] sm:block">
        <div className="section-shell flex h-9 items-center justify-between text-[11px] font-semibold text-white/60">
          <div className="flex items-center gap-5"><a href={`tel:${business.phone}`} className="flex items-center gap-2 hover:text-coral"><Phone className="size-3.5 text-coral" /> {business.phone}</a><span className="hidden items-center gap-2 md:flex"><MapPin className="size-3.5 text-coral" /> Visakhapatnam, Andhra Pradesh</span></div>
          <span className="hidden items-center gap-2 uppercase tracking-[.14em] md:flex"><BadgeCheck className="size-3.5 text-coral" /> Trusted gym equipment partner</span>
          <a href={`mailto:${business.email}`} className="hidden hover:text-coral lg:block">{business.email}</a>
        </div>
      </div>
      <nav className="section-shell flex min-h-[84px] items-center justify-between gap-4">
        <Link href="/" aria-label="Span Fitness home"><Image src="/span-fitness-logo-light.png" alt="Span Fitness Equipments" width={192} height={56} priority className="h-14 w-44 object-contain object-left xl:w-48" /></Link>
        <div className="hidden items-center xl:flex">
          {navItems.map(([label, href]) => {
            const active = href === "/" ? path === "/" : path.startsWith(href);
            return <Link key={href} href={href} className={`group relative px-2.5 py-4 text-xs font-bold transition hover:text-white ${active ? "text-white" : "text-white/60"}`}>{label}<span className={`absolute inset-x-2.5 bottom-2 h-0.5 origin-left bg-coral transition-transform duration-300 ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} /></Link>;
          })}
        </div>
        <div className="flex items-center gap-2">
          <a href={`tel:${business.phone}`} aria-label="Call" className="hidden size-11 place-items-center rounded-md border border-white/15 text-white transition hover:border-coral sm:grid"><Phone className="size-5" /></a>
          <Link href="/contact" className="btn-shine hidden rounded-md bg-gradient-to-r from-ember to-coral px-5 py-3 text-sm font-bold shadow-[0_9px_28px_rgba(190,49,68,.3)] lg:block">Get a Quote</Link>
          <button onClick={() => setOpen(!open)} aria-label="Toggle menu" className="grid size-11 place-items-center rounded-md border border-white/15 xl:hidden">{open ? <X /> : <Menu />}</button>
        </div>
      </nav>
      {open && <div className="section-shell grid border-t border-white/10 py-4 xl:hidden">{navItems.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="border-b border-white/5 py-3 text-sm font-bold text-white/75">{label}</Link>)}</div>}
    </header>
  );
}

export function Footer({ categories: footerCategories = categories }: { categories?: Category[] }) {
  const path = usePathname();
  if (path.startsWith("/admin")) return null;
  return (
    <footer className="site-footer relative overflow-hidden border-t border-white/10 bg-[#070d20] pt-14">
      <div className="site-footer__glow site-footer__glow--one" />
      <div className="site-footer__glow site-footer__glow--two" />
      <div className="section-shell relative grid gap-6 pb-10 md:grid-cols-2 lg:grid-cols-5">
        <div className="site-footer__brand">
          <Image src="/span-fitness-logo-light.png" alt="Span Fitness Equipments" width={192} height={56} className="h-14 w-48 object-contain object-left" />
          <p className="mt-5 text-sm leading-7 text-white/55">Premium cardio, strength, home gym, multi play station and commercial fitness solutions across Andhra Pradesh and Telangana.</p>
        </div>
        <div className="site-footer__panel">
          <h3>Explore</h3>
          <div className="site-footer__links mt-4 grid grid-cols-2 gap-2">
            {navItems.slice(1).map(([label, href]) => <Link key={href} href={href}>{label}<span className="site-footer__dot" /></Link>)}
          </div>
        </div>
        <div className="site-footer__panel">
          <h3>Categories</h3>
          <div className="site-footer__links mt-4 grid gap-2">
            {footerCategories.slice(0, 5).map((item) => <Link key={item.slug} href={`/categories/${item.slug}`}>{item.name}<span className="site-footer__dot" /></Link>)}
            <Link href="/products/multi-play-station-equipment">Multi Play Station<span className="site-footer__dot" /></Link>
          </div>
        </div>
        <div className="site-footer__panel">
          <h3>Legal</h3>
          <div className="site-footer__links mt-4 grid gap-2">
            <Link href="/privacy-policy">Privacy Policy<span className="site-footer__dot" /></Link>
            <Link href="/terms-and-conditions">Terms &amp; Conditions<span className="site-footer__dot" /></Link>
          </div>
        </div>
        <div className="site-footer__panel">
          <h3>Contact</h3>
          <div className="mt-4 grid gap-3 text-sm text-white/70">
            <a href={`tel:${business.phone}`} className="site-footer__contact"><Phone className="size-4 shrink-0 text-coral" />{business.phone}</a>
            <a href={`mailto:${business.email}`} className="site-footer__contact break-all"><Mail className="size-4 shrink-0 text-coral" />{business.email}</a>
            <span className="site-footer__contact leading-6"><MapPin className="size-4 shrink-0 text-coral" />{business.address}</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/40">
        Copyright © 2026 Span Fitness Equipments. All Rights Reserved.
        <span className="mx-2 text-white/20">|</span>
        Developed by <span className="font-bold text-coral">Arixa Technologies</span>
      </div>
    </footer>
  );
}

export function PageHero({ eyebrow, title, description, image }: { eyebrow: string; title: string; description: string; image?: string }) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 py-20 sm:py-28">
      {image && <><Image src={image} alt="" fill sizes="100vw" className="object-cover opacity-30" /><div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/45" /></>}
      <div className="absolute -left-24 top-0 size-72 rounded-full bg-ember/20 blur-[110px]" />
      <div className="section-shell relative max-w-4xl">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-coral">{eyebrow}</p>
        <h1 className="mt-5 font-display text-4xl font-black leading-[1.05] sm:text-6xl lg:text-7xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">{description}</p>
      </div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return <div className="mb-10 max-w-3xl"><p className="text-xs font-black uppercase tracking-[0.2em] text-coral">{eyebrow}</p><h2 className="mt-3 font-display text-3xl font-black sm:text-5xl">{title}</h2>{body && <p className="mt-4 leading-8 text-white/60">{body}</p>}</div>;
}

export function CtaBand({ title = "Planning a new fitness space?", text = "Tell us about your space, users and budget. We will help shortlist the right equipment mix." }: { title?: string; text?: string }) {
  return <section className="py-16"><div className="section-shell rounded-3xl border border-coral/30 bg-gradient-to-br from-wine/65 to-[#101a38] p-8 sm:p-12"><div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center"><div><h2 className="font-display text-3xl font-black">{title}</h2><p className="mt-3 max-w-2xl text-white/65">{text}</p></div><div className="flex flex-wrap gap-3"><ButtonLink href="/contact">Request a Quote <ArrowRight className="size-4" /></ButtonLink><ButtonLink href={whatsappUrl()} secondary>WhatsApp Us</ButtonLink></div></div></div></section>;
}
