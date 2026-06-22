import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Dumbbell,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqSection } from "@/components/seo/faq-section";
import { getPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, JsonLd, webPageSchema } from "@/lib/schema";
import { seoFaqs } from "@/src/config/seo-content";
import { BrandLogoRail } from "../components/brand-logo-rail";
import { business, images, phoneDisplay, whatsappUrl } from "../data";

const title = "About Span Fitness Equipments";
const description = "Learn about Span Fitness Equipments, commercial gym equipment, home gym equipment, brand stores, service locations and complete gym setup support.";

const aboutStats = [
  ["9+", "Brand Stores"],
  ["6000+", "Gym Installations"],
  ["6 Lakh+", "Happy Customers"],
  ["9+", "Major Cities Served"],
] as const;

const aboutWhyCards = [
  [ShieldCheck, "Premium Quality Equipment", "Durable and reliable products for long-term fitness use."],
  [Building2, "Complete Gym Setup Support", "From equipment selection to layout planning and installation guidance."],
  [Dumbbell, "Commercial & Home Solutions", "Solutions for gyms, homes, apartments, hotels, schools and studios."],
  [BadgeCheck, "Trusted Brand Partners", "We work with reputed national and international fitness brands."],
  [Users, "Expert Product Guidance", "We help customers select equipment based on space, budget and fitness goals."],
  [MessageCircle, "After-Sales Support", "Reliable service support to keep fitness spaces running smoothly."],
] as const;

const founderProfiles = [
  {
    name: business.owner,
    role: "Founder & Fitness Equipment Consultant",
    image: "/images/gallery/gallery5.jpg",
    text: "With hands-on experience in cardio, strength and complete gym setup planning, he guides customers through practical equipment choices based on space, usage, durability and budget.",
  },
  {
    name: "Founding Partner",
    role: "Co-Founder & Customer Support Lead",
    image: "/images/gallery/founder2.jpg",
    text: "Focused on showroom experience, product coordination, installation guidance and after-sales support, the leadership team helps every customer move from enquiry to a confident setup.",
  },
] as const;

export const dynamic = "force-dynamic";
export function generateMetadata() {
  return getPageMetadata({ title, description, path: "/about", image: images.showroom });
}

export default function AboutPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "About", path: "/about" }];

  return (
    <>
      <JsonLd data={[webPageSchema({ name: title, description, path: "/about", type: "AboutPage" }), breadcrumbSchema(crumbs), faqSchema(seoFaqs.about)]} />
      <Breadcrumbs items={crumbs} />

      <section className="home-about-premium relative overflow-hidden py-20 sm:py-24">
        <div className="home-about-premium__mesh" />
        <div className="home-about-premium__glow home-about-premium__glow--left" />
        <div className="home-about-premium__glow home-about-premium__glow--right" />
        <div className="section-shell relative">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
            <div className="home-about-premium__copy">
              <div className="home-about-premium__eyebrow">
                <Sparkles className="size-4" />
                About Span Fitness Equipment
              </div>
              <h1 className="mt-5 font-display text-4xl font-black leading-[1.02] tracking-[-.03em] text-navy sm:text-6xl">
                Your Trusted Partner for
                <span className="block bg-gradient-to-r from-coral via-ember to-wine bg-clip-text italic text-transparent">
                  Commercial & Home Fitness Equipment
                </span>
              </h1>
              <div className="mt-6 grid gap-4 text-base leading-8 text-slate-600">
                <p>
                  Span Fitness Equipment provides high-quality fitness equipment for commercial gyms, home gyms, fitness studios, apartments, hotels, schools, corporate wellness spaces and professional training centers. We help customers choose the right equipment based on space, budget, usage and long-term durability.
                </p>
                <p>
                  We offer a wide range of cardio machines, strength equipment, free weights, benches, racks, functional training equipment and gym accessories. Our goal is to make fitness spaces stronger, smarter and more reliable with premium products and proper guidance.
                </p>
                <p className="home-about-premium__trust">
                  With multiple brand stores, thousands of gym installations and lakhs of happy customers, Span Fitness Equipment has built trust through quality products, expert support, professional service and reliable after-sales assistance.
                </p>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/categories" className="btn-shine inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-gradient-to-r from-ember to-coral px-6 py-3 text-sm font-bold text-white shadow-glow transition hover:-translate-y-0.5">
                  Explore Equipment <ArrowRight className="size-4" />
                </Link>
                <a href={whatsappUrl("complete gym setup")} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-navy/15 bg-white px-6 py-3 text-sm font-bold text-navy shadow-[0_14px_32px_rgba(9, 18, 44,.08)] transition hover:-translate-y-0.5 hover:border-coral hover:text-coral">
                  <MessageCircle className="size-4" /> Get Setup Guidance
                </a>
              </div>

              <div className="home-about-premium__stats mt-8">
                {aboutStats.map(([value, label]) => (
                  <div key={label} className="home-about-premium__stat">
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="home-about-premium__visual">
              <div className="home-about-premium__image-card">
                <Image
                  src="/images/gallery/gallery6.jpg"
                  alt="Span Fitness Equipment modern gym showroom"
                  fill
                  priority
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="home-about-premium__floating-card home-about-premium__floating-card--bottom">
                <Phone className="size-5" />
                <span>{phoneDisplay}</span>
              </div>
            </div>
          </div>

          <div className="home-about-premium__founders">
            <div className="home-about-premium__founders-head">
              <p>Founder Story</p>
              <h2>The people behind Span Fitness Equipment.</h2>
            </div>
            <div className="home-about-premium__founder-stack">
              {founderProfiles.map((profile, index) => (
                <article key={profile.name} className={`home-about-premium__founder-card ${index % 2 === 1 ? "home-about-premium__founder-card--reverse" : ""}`}>
                  <div className="home-about-premium__founder-photo">
                    <Image
                      src={profile.image}
                      alt={`${profile.name} - ${profile.role}`}
                      fill
                      sizes="(min-width: 1024px) 18rem, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="home-about-premium__founder-copy">
                    <span>{profile.role}</span>
                    <h3>{profile.name}</h3>
                    <p>{profile.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="home-about-premium__brand-panel home-about-premium__brand-panel--dark">
            <div className="brand-board__panel-head">
              <p>Brand&apos;s We Deal</p>
            </div>
            <BrandLogoRail tone="dark" />
          </div>

          <div className="mt-8 grid items-start gap-6 lg:grid-cols-[.86fr_1.14fr]">
            <div className="home-about-premium__presence">
              <p className="text-[10px] font-black uppercase tracking-[.24em] text-coral">Our Presence</p>
              <h2 className="mt-2 font-display text-3xl font-black text-navy">Service support across major cities.</h2>
              <div className="home-about-premium__presence-cities">
                {business.locations.map((city, index) => (
                  <span key={city} className="home-about-premium__city" style={{ animationDelay: `${index * 55}ms` }}>
                    <MapPin className="size-3.5" /> {city}
                  </span>
                ))}
              </div>
              <div className="home-about-premium__presence-strip">
                <span>
                  <strong>9+</strong>
                  <small>Major Cities</small>
                </span>
                <span>
                  <strong>AP + TS</strong>
                  <small>Regional Support</small>
                </span>
                <span>
                  <strong>Fast</strong>
                  <small>Enquiry Help</small>
                </span>
              </div>
              <p className="home-about-premium__presence-note">
                Share your city and requirement to get practical product suggestions, availability help and setup guidance.
              </p>
            </div>

            <div className="home-about-premium__why-grid">
              {aboutWhyCards.map(([Icon, heading, text], index) => {
                const I = Icon as typeof ShieldCheck;
                return (
                  <article key={heading} className="home-about-premium__why-card" style={{ animationDelay: `${index * 80}ms` }}>
                    <span><I className="size-5" /></span>
                    <h3>{heading}</h3>
                    <p>{text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <FaqSection items={seoFaqs.about} />
    </>
  );
}
