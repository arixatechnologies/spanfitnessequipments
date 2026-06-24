"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Dumbbell,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { BrandLogoRail } from "./components/brand-logo-rail";
import { CategoryCard, NewArrivalCard } from "./components/cards";
import { ButtonLink } from "./components/site";
import type { Category, Product } from "./data";
import {
  business,
  categories as fallbackCategories,
  images,
  phoneDisplay,
  products as fallbackProducts,
  whatsappUrl,
} from "./data";

type GalleryItem = {
  title: string;
  image: string;
  description: string;
  href: string;
};

type HomeClientProps = {
  categories?: Category[];
  products?: Product[];
  galleryItems?: GalleryItem[];
  testimonials?: TestimonialItem[];
};

type TestimonialItem = {
  name: string;
  role: string;
  quote: string;
  location: string;
};

const enquirySessionKey = "span-fitness-enquiry-shown";
const heroSlides = [
  {
    src: "/images/og/og.png",
    alt: "Welcare and Span Fitness Equipments showroom",
    position: "object-[58%_top] sm:object-center",
  },
  {
    src: "/images/home/premium-fitness-equipment-showcase.png",
    alt: "Premium commercial gym equipment showroom",
    position: "object-[54%_center] sm:object-center",
  },
] as const;

const fallbackGalleryItems: GalleryItem[] = [
  { title: "Showroom Cardio Floor", image: "/images/gallery/gallery1.jpg", description: "Live equipment display", href: "/gym-fitness/cardio" },
  { title: "Cardio Equipment Display", image: "/images/gallery/gallery2.jpg", description: "Showroom equipment zone", href: "/gym-fitness/cardio" },
  { title: "Customer Guidance", image: "/images/gallery/gallery3.jpg", description: "Expert buying support", href: "/about" },
  { title: "Store Launch Moments", image: "/images/gallery/gallery4.jpg", description: "Span Fitness showroom", href: "/about" },
  { title: "Span Fitness Team", image: "/images/gallery/gallery5.jpg", description: "People and service", href: "/contact" },
  { title: "Showroom Team", image: "/images/gallery/gallery6.jpg", description: "Trusted support team", href: "/contact" },
  { title: "Partner Celebration", image: "/images/gallery/gallery7.jpg", description: "Brand relationships", href: "/about" },
  { title: "Equipment Consultation", image: "/images/gallery/gallery8.jpg", description: "Planning and guidance", href: "/contact" },
  { title: "Gallery Moments", image: "/images/gallery/gallery9.jpg", description: "Showroom highlights", href: "/contact" },
  { title: "Showroom Gallery", image: "/images/gallery/gallery10.jpg", description: "Span Fitness showroom", href: "/about" },
];

const fallbackTestimonials: TestimonialItem[] = [
  { name: "Commercial Gym Owner", role: "Gym Setup Customer", quote: "Span Fitness helped us compare cardio and strength equipment clearly, so our gym floor felt planned instead of crowded.", location: "Visakhapatnam" },
  { name: "Home Fitness Buyer", role: "Home Gym Customer", quote: "The team suggested practical equipment for our room size and budget. The guidance made choosing a treadmill and accessories much easier.", location: "Hyderabad" },
  { name: "Apartment Fitness Committee", role: "Residential Gym Setup", quote: "We received a focused equipment mix for shared use, including strength, cardio and free-weight options that matched our space.", location: "Vijayawada" },
];

const testimonialDetails = [
  {
    badge: "Commercial Gym",
    location: "Visakhapatnam",
    image: "/images/home/testimonial1.png",
    result: "Better zone planning and stronger product mix.",
  },
  {
    badge: "Home Gym",
    location: "Hyderabad",
    image: "/images/categories/home-gym-equipment-premium.png",
    result: "Compact setup with cardio, mat and strength basics.",
  },
  {
    badge: "Apartment Gym",
    location: "Vijayawada",
    image: "/images/gallery/gallery2.jpg",
    result: "Shared-use cardio and strength choices for residents.",
  },
  {
    badge: "Fitness Studio",
    location: "Kakinada",
    image: "/images/categories/functional-training-premium.png",
    result: "Functional training tools grouped around floor flow.",
  },
  {
    badge: "Corporate Fitness Center",
    location: "Srikakulam",
    image: "/images/gallery/gallery6.jpg",
    result: "Clean equipment shortlist with support planning.",
  },
] as const;

const testimonialFallbackPool: TestimonialItem[] = [
  ...fallbackTestimonials,
  {
    name: "Fitness Studio Partner",
    role: "Studio Setup Customer",
    quote: "The installation guidance and product support helped us open with confidence. Members noticed the quality from day one.",
    location: "Kakinada",
  },
  {
    name: "Corporate Wellness Team",
    role: "Office Fitness Space",
    quote: "Span Fitness made the buying process simple, from space planning to reliable after-sales support for our team fitness room.",
    location: "Srikakulam",
  },
];

const testimonialStats = [
  ["1000+", "Gym Installations"],
  ["5000+", "Happy Customers"],
  ["9+", "Brand Stores"],
  ["98%", "Customer Satisfaction"],
] as const;

const testimonialTrust = [
  "Genuine Brands",
  "Professional Installation",
  "After-Sales Support",
  "Warranty Assistance",
  "PAN India Delivery",
] as const;

const testimonialMarquee = [
  "Visakhapatnam Gym Floor",
  "Hyderabad Home Gym",
  "Vijayawada Studio",
  "Kakinada Fitness Space",
  "Srikakulam Wellness Setup",
  "Apartment Gym Upgrade",
] as const;

const homeAccessories = [
  ["Barbell Rods", "Strength training", "/images/about/barbell rods.png"],
  ["Dumbbells", "Free weights", "/images/about/dumbbells.webp"],
  ["Gym Belts", "Lifting support", "/images/about/gym belts.png"],
  ["Gym Gloves", "Grip support", "/images/about/gym gloves.webp"],
  ["Kettlebells", "Power movement", "/images/about/kettlebells.png"],
  ["Resistance Bands", "Mobility work", "/images/about/resistance bands.png"],
  ["Skipping Ropes", "Conditioning", "/images/about/skipping ropes.png"],
  ["Span Fitness Showroom", "Accessory display", "/images/about/span-fitness-showroom.png"],
  ["Weight Plate", "Strength loading", "/images/about/weight plate.jpeg"],
  ["Yoga Mat", "Floor training", "/images/products/Premium%20yoga%20mat.png"],
] as const;

function EnquiryPopup({ close }: { close: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[80] grid place-items-center bg-navy/85 p-4 backdrop-blur-md"
      onMouseDown={(event) => event.target === event.currentTarget && close()}
    >
      <div className="gradient-border relative grid w-full max-w-4xl overflow-hidden rounded-lg bg-[#101a38] shadow-2xl lg:grid-cols-[.9fr_1.1fr]">
        <button
          onClick={close}
          aria-label="Close enquiry"
          className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-md border border-white/15 bg-navy/80"
        >
          <X className="size-5" />
        </button>
        <div className="relative hidden min-h-[560px] lg:block">
          <Image
            src={images.setup}
            alt="Commercial gym setup equipment"
            fill
            sizes="40vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
          <div className="absolute bottom-0 p-9">
            <p className="text-xs font-black uppercase tracking-widest text-coral">
              Plan Your Fitness Space
            </p>
            <h2 className="mt-3 font-display text-4xl font-black">
              Equipment guidance for gyms of every scale.
            </h2>
          </div>
        </div>
        <div className="bg-[#fff7f3] p-7 pt-16 text-navy sm:p-10">
          <Image
            src="/span-fitness-logo.png"
            alt="Span Fitness Equipments"
            width={288}
            height={80}
            className="h-20 w-72 object-contain object-left"
          />
          <p className="mt-6 text-xs font-black uppercase tracking-widest text-coral">
            Quick Enquiry
          </p>
          <h2 className="mt-2 font-display text-4xl font-black">
            Let&apos;s build your ideal gym.
          </h2>
          <div className="mt-7 grid gap-4">
            <input
              placeholder="Your name"
              className="h-12 rounded-md border border-navy/10 bg-white px-4 outline-none focus:border-coral"
            />
            <input
              placeholder="Phone number"
              className="h-12 rounded-md border border-navy/10 bg-white px-4 outline-none focus:border-coral"
            />
            <select
              defaultValue=""
              className="h-12 rounded-md border border-navy/10 bg-white px-4"
            >
              <option value="" disabled>
                Choose your requirement
              </option>
              <option>Commercial Gym Setup</option>
              <option>Cardio Equipment</option>
              <option>Strength Equipment</option>
              <option>Fitness Accessories</option>
            </select>
            <textarea
              placeholder="Tell us what equipment you need"
              className="min-h-24 rounded-md border border-navy/10 bg-white p-4 outline-none"
            />
            <a
              href={whatsappUrl()}
              className="btn-shine flex min-h-12 items-center justify-center gap-2 rounded-md bg-gradient-to-r from-ember to-coral px-5 font-black text-white"
            >
              <MessageCircle className="size-4" /> Send Enquiry on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomeClient({
  categories = fallbackCategories,
  products = fallbackProducts,
  galleryItems = fallbackGalleryItems,
  testimonials = fallbackTestimonials,
}: HomeClientProps) {
  const [popup, setPopup] = useState(false);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const trustedStories = testimonialDetails.map((detail, index) => {
    const item = testimonials[index] || testimonialFallbackPool[index] || testimonialFallbackPool[0];

    return {
      ...detail,
      ...item,
      location: item.location || detail.location,
      badge: detail.badge,
      image: detail.image,
      result: detail.result,
    };
  });
  const featuredStory = trustedStories[0];

  useEffect(() => {
    if (heroSlides.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveHeroSlide((current) => (current + 1) % heroSlides.length);
    }, 5500);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (window.sessionStorage.getItem(enquirySessionKey)) return;

    const showEnquiryAfterScroll = () => {
      if (window.scrollY < 120) return;
      window.sessionStorage.setItem(enquirySessionKey, "true");
      setPopup(true);
      window.removeEventListener("scroll", showEnquiryAfterScroll);
    };

    window.addEventListener("scroll", showEnquiryAfterScroll, {
      passive: true,
    });
    showEnquiryAfterScroll();
    return () => window.removeEventListener("scroll", showEnquiryAfterScroll);
  }, []);

  useEffect(() => {
    if (!popup) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [popup]);

  return (
    <>
      {popup && <EnquiryPopup close={() => setPopup(false)} />}
      <div className="home-premium-page">
      <section className="home-hero-premium relative min-h-[680px] overflow-hidden bg-navy sm:min-h-[720px]">
        {heroSlides.map((slide, index) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={index === 0 ? slide.alt : ""}
            aria-hidden={index !== 0}
            fill
            priority={index === 0}
            sizes="100vw"
            className={`object-cover transition-[opacity,transform] duration-[1400ms] ease-out ${slide.position} ${
              activeHeroSlide === index
                ? "scale-100 opacity-100"
                : "scale-[1.04] opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9, 18, 44,.78)_0%,rgba(9, 18, 44,.58)_38%,rgba(9, 18, 44,.18)_68%,transparent_100%)] sm:bg-[linear-gradient(90deg,rgba(9, 18, 44,.76)_0%,rgba(9, 18, 44,.5)_36%,rgba(9, 18, 44,.12)_65%,transparent_100%)]" />
        <div className="home-hero-premium__grid" aria-hidden="true" />
        <div className="home-hero-premium__halo home-hero-premium__halo--one" aria-hidden="true" />
        <div className="home-hero-premium__halo home-hero-premium__halo--two" aria-hidden="true" />
        <div className="home-hero-premium__runner home-hero-premium__runner--one" aria-hidden="true" />
        <div className="home-hero-premium__runner home-hero-premium__runner--two" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-navy/55 to-transparent" />
        <div className="section-shell relative z-10 flex min-h-[680px] items-start pt-8 text-white sm:min-h-[720px] sm:pt-10 lg:pt-12">
          <div className="home-hero-premium__copy max-w-[32rem] [text-shadow:0_2px_18px_rgba(0,0,0,.35)]">
            <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.18em] text-coral">
              <BadgeCheck className="size-4" /> Equipment for every fitness
              vision
            </p>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[1.02] sm:text-[3.5rem]">
              Stronger training starts with{" "}
              <span className="text-ember">the right equipment.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base font-semibold leading-8 text-white/80 sm:text-lg">
              From your first home workout to a complete commercial gym, build a
              space that inspires progress every day.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/categories">
                Explore Equipment <ArrowRight className="size-4" />
              </ButtonLink>
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/30 bg-navy/20 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-coral hover:bg-navy/40"
              >
                Plan Your Gym
              </Link>
            </div>
            <div className="home-hero-premium__trust mt-8 flex flex-wrap gap-5 text-sm font-bold text-white/75">
              <span className="flex items-center gap-2">
                <ShieldCheck className="size-5 text-ember" /> Quality selection
              </span>
              <span className="flex items-center gap-2">
                <Users className="size-5 text-ember" /> Expert guidance
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="size-5 text-ember" /> 9+ locations
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/10 bg-[#09122c] py-7">
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(16, 26, 56,.16),transparent_42%,rgba(225, 117, 100,.07))]" />
        <div className="spotlight-rail section-shell relative overflow-hidden rounded-2xl border border-white/10 bg-white/[.035] px-5 py-6 shadow-[0_18px_60px_rgba(0,0,0,.2)] sm:px-8">
          <div className="spotlight-rail__beam" aria-hidden="true" />
          <div className="relative z-10">
            <div className="spotlight-rail__intro text-center">
              <div className="flex items-center justify-center gap-3">
                <span className="spotlight-rail__spark grid size-9 shrink-0 place-items-center rounded-full bg-coral/15 text-coral ring-1 ring-coral/30">
                  <Sparkles className="size-4" />
                </span>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[.24em] text-coral">
                    Why choose Span Fitness
                  </p>
                </div>
              </div>
              <h2 className="mt-3 font-display text-2xl font-black sm:text-3xl">
                Built around your fitness goals.
              </h2>
            </div>
            <div className="mx-auto my-5 h-px max-w-4xl bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <div className="grid grid-cols-2 gap-y-5 sm:grid-cols-4">
              {[
                [BadgeCheck, "Multiple", "Premium Brands"],
                [MapPin, "9+", "Service Locations"],
                [Dumbbell, "Cardio + Strength", "Equipment Range"],
                [Users, "Customer", "Support"],
              ].map(([Icon, value, label], index) => {
                const StatIcon = Icon as typeof BadgeCheck;
                return (
                  <div
                    key={String(label)}
                    className={`spotlight-metric group flex min-w-0 items-center gap-3 px-2 sm:px-4 ${
                      index > 0 ? "sm:border-l sm:border-white/10" : ""
                    }`}
                  >
                    <span className="spotlight-metric__icon grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-ember/25 to-coral/10 text-coral ring-1 ring-white/10 transition group-hover:scale-105 group-hover:ring-coral/40">
                      <StatIcon className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <strong className="spotlight-metric__value block font-display text-lg font-black leading-tight text-white sm:text-xl">
                        {String(value)}
                      </strong>
                      <span className="spotlight-metric__label mt-0.5 block text-[10px] font-bold uppercase tracking-[.12em] text-white/45">
                        {String(label)}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="category-showcase relative overflow-hidden border-b border-white/10 py-20 sm:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#09122c_0%,#101a38_48%,#09122c_100%)]" />
        <div className="category-showcase__grid absolute inset-0 opacity-40" />
        <div className="category-showcase__orb category-showcase__orb--left" />
        <div className="category-showcase__orb category-showcase__orb--right" />
        <div className="absolute left-1/2 top-20 h-px w-[min(92%,980px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-coral/45 to-transparent" />
        <div className="section-shell relative">
          <div className="relative mx-auto mb-16 max-w-5xl text-center">
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-coral sm:w-16" />
              <p className="rounded-full border border-coral/25 bg-coral/10 px-4 py-2 text-[10px] font-black uppercase tracking-[.28em] text-coral">
                Explore Our Range
              </p>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-coral sm:w-16" />
            </div>
            <h2 className="relative font-display text-5xl font-black leading-[.95] tracking-[-.035em] sm:text-7xl lg:text-[5.5rem]">
              Find your perfect
              <span className="mt-2 block bg-gradient-to-r from-coral via-[#fff7f3] to-coral bg-clip-text italic text-transparent">
                training category.
              </span>
            </h2>
            <div className="mx-auto mt-7 max-w-3xl">
              <p className="text-base leading-8 text-white/60 sm:text-lg">
                From high-performance cardio and strength equipment to complete
                gym setups, discover solutions shaped around your space and goals.
              </p>
            </div>
          </div>
          <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((item) => (
              <CategoryCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="relative scroll-mt-28 overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,#09122c_0%,#101a38_55%,#872341_100%)]" />
        <div className="absolute -left-32 top-20 size-80 rounded-full bg-wine/25 blur-[110px]" />
        <div className="absolute -right-24 bottom-0 size-72 rounded-full bg-coral/15 blur-[100px]" />
        <div className="section-shell relative grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
          <div className="relative mx-auto w-full max-w-2xl lg:mx-0">
            <div className="absolute -left-4 -top-4 h-28 w-28 rounded-tl-[2.5rem] border-l border-t border-coral/60" />
            <div className="absolute -bottom-4 -right-4 h-28 w-28 rounded-br-[2.5rem] border-b border-r border-coral/60" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem_1rem_2.5rem_1rem] border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,.45)]">
              <Image
                src={images.showroom}
                alt="Span Fitness Equipments showroom"
                fill
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover transition duration-1000 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-8">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[.2em] text-coral">Visakhapatnam</p>
                  <p className="mt-1 font-display text-2xl font-black">Equipment guidance you can trust.</p>
                </div>
                <MapPin className="size-7 shrink-0 text-coral" />
              </div>
            </div>
            <div className="absolute left-5 top-5 z-10 rounded-2xl border border-coral/30 bg-[#fff7f3]/95 px-5 py-4 text-navy shadow-[0_18px_50px_rgba(0,0,0,.35)] backdrop-blur-sm sm:left-7 sm:top-7">
              <strong className="block font-display text-3xl font-black leading-none">15+</strong>
              <span className="mt-1 block text-[10px] font-black uppercase tracking-[.15em] text-ember">Years of guidance</span>
            </div>
          </div>

          <div className="pt-6 lg:pt-0">
            <div className="flex items-center gap-3">
              <span className="h-px w-12 bg-coral" />
              <p className="text-xs font-black uppercase tracking-[.24em] text-coral">About Span Fitness</p>
            </div>
            <h2 className="mt-6 max-w-xl font-display text-4xl font-black leading-[1.02] sm:text-6xl">
              Your space. Your goals.
              <span className="block bg-gradient-to-r from-coral to-[#fff7f3] bg-clip-text italic text-transparent">The right equipment.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/65">
              Led by <strong className="text-white">{business.owner}</strong>, we help homes, gyms and institutions compare equipment, plan layouts and make confident choices around space, usage and budget.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                [Building2, "Commercial gym planning"],
                [Dumbbell, "Home fitness solutions"],
                [ShieldCheck, "Carefully selected brands"],
                [MapPin, "Regional service support"],
              ].map(([Icon, label]) => {
                const I = Icon as typeof Building2;
                return (
                  <div key={String(label)} className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.055] p-4 transition hover:-translate-y-1 hover:border-coral/50 hover:bg-coral/10">
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-coral/10 text-coral ring-1 ring-coral/20 transition group-hover:bg-coral group-hover:text-white">
                      <I className="size-5" />
                    </span>
                    <b className="text-sm">{String(label)}</b>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/about">Discover Our Story <ArrowRight className="size-4" /></ButtonLink>
              <ButtonLink href={`tel:${business.phone}`} secondary><Phone className="size-4" /> Talk to Our Team</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="new-arrivals-showcase relative overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#09122c_0%,#872341_52%,#09122c_100%)]" />
        <div className="new-arrivals-bubble left-[4%] top-[15%] size-24" />
        <div className="new-arrivals-bubble new-arrivals-bubble--slow right-[7%] top-[10%] size-36" />
        <div className="new-arrivals-bubble new-arrivals-bubble--small left-[18%] top-[55%] size-12" />
        <div className="new-arrivals-bubble new-arrivals-bubble--reverse bottom-[8%] right-[18%] size-20" />
        <div className="absolute left-1/2 top-24 h-40 w-[70%] -translate-x-1/2 rounded-full bg-ember/10 blur-[90px]" />
        <div className="section-shell relative">
          <div className="mx-auto mb-14 max-w-4xl text-center">
            <div className="new-arrivals-badge inline-flex items-center gap-2 rounded-full border border-coral/30 bg-coral/10 px-4 py-2 text-[10px] font-black uppercase tracking-[.24em] text-coral">
              <Sparkles className="size-4" /> Just Landed
            </div>
            <h2 className="mt-6 font-display text-5xl font-black leading-[.98] tracking-[-.03em] sm:text-7xl">
              Fresh equipment.
              <span className="block bg-gradient-to-r from-coral via-[#fff7f3] to-coral bg-clip-text italic text-transparent">
                Stronger possibilities.
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
              Discover our latest cardio, strength and free-weight additions,
              selected for modern home and commercial training spaces.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {products
              .filter((item) => item.isNew)
              .slice(0, 6)
              .map((item, index) => (
                <div
                  key={item.slug}
                  className="new-arrival-item"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <NewArrivalCard item={item} index={index} />
                </div>
              ))}
          </div>
          <div className="mt-10 text-center">
            <ButtonLink href="/new-arrivals">
              Explore All New Arrivals <ArrowRight className="size-4" />
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="accessory-flow relative overflow-hidden pb-10 pt-16 sm:pb-12 sm:pt-20">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#09122c_0%,#101a38_54%,#09122c_100%)]" />
        <div className="accessory-flow__glow absolute left-1/2 top-16 h-52 w-[70%] -translate-x-1/2 rounded-full bg-coral/10 blur-[90px]" />
        <div className="section-shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-coral/25 bg-white/[.04] px-4 py-2 text-[10px] font-black uppercase tracking-[.24em] text-coral">
              <Sparkles className="size-4" /> Accessories
            </div>
            <h2 className="mt-5 font-display text-4xl font-black leading-tight sm:text-6xl">
              The finishing kit for a complete gym.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/58">
              Simple essentials, displayed cleanly, ready for strength, mobility, grip and everyday training.
            </p>
          </div>

          <div className="accessory-flow__rail relative mx-auto mt-12 max-w-6xl">
            <div className="accessory-flow__line" aria-hidden="true" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {homeAccessories.map(([item, label, image], index) => (
                <Link
                  href="/categories#accessories"
                  key={item}
                  className="accessory-flow__item group"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <span className="accessory-flow__thumb">
                    <Image
                      src={image}
                      alt={`${item} fitness accessories`}
                      fill
                      sizes="96px"
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />
                  </span>
                  <span>
                    <strong>{item}</strong>
                    <small>{label}</small>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <ButtonLink href="/categories#accessories">
              View All Accessories <ArrowRight className="size-4" />
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="motivation-strip relative overflow-hidden pb-16 pt-3 sm:pb-20 sm:pt-4">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#09122c_0%,#101a38_100%)]" />
        <div className="section-shell relative">
          <div className="motivation-strip__bar">
          {[
            "Your body can stand almost anything. It's your mind you have to convince.",
            "Fitness is about becoming better than you used to be.",
            "Invest in equipment that inspires stronger workouts.",
          ].map((quote) => (
            <div key={quote} className="motivation-strip__quote">
              <span className="motivation-strip__mark">
                <Sparkles className="size-4" />
              </span>
              <p>{quote}</p>
            </div>
          ))}
          </div>
        </div>
      </section>

      <section className="gallery-lens relative overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(140deg,#09122c_0%,#101a38_48%,#872341_100%)]" />
        <div className="gallery-lens__orb gallery-lens__orb--left" />
        <div className="gallery-lens__orb gallery-lens__orb--right" />
        <div className="section-shell relative">
          <div className="mx-auto mb-14 max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-coral/25 bg-coral/10 px-4 py-2 text-[10px] font-black uppercase tracking-[.24em] text-coral">
              <Sparkles className="size-4" /> Gallery
            </div>
            <h2 className="mt-5 font-display text-5xl font-black leading-[.98] tracking-[-.03em] sm:text-7xl">
              Spaces that make
              <span className="block bg-gradient-to-r from-coral via-[#fff7f3] to-coral bg-clip-text italic text-transparent">
                training feel alive.
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/58">
              A cleaner look at cardio zones, strength floors, compact home gyms and accessory setups.
            </p>
          </div>

          <div className="gallery-lens__stage">
            {galleryItems.slice(0, 10).map((item, index) => (
              <Link
                href={item.href}
                key={`${item.title}-${index}`}
                aria-label={`${item.title} gallery image`}
                className={`gallery-lens__card group gallery-lens__card--${index % 10}`}
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <Image
                  src={item.image}
                  alt={`${item.title} at Span Fitness Equipments`}
                  fill
                  sizes={index === 0 ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 22vw, 50vw"}
                  className="gallery-lens__image object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="gallery-lens__shine" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="why-vertical relative overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#09122c_0%,#101a38_50%,#070d20_100%)]" />
        <div className="why-vertical__glow why-vertical__glow--left" />
        <div className="why-vertical__glow why-vertical__glow--right" />
        <div className="section-shell relative">
          <div className="mx-auto mb-14 max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-coral/25 bg-coral/10 px-4 py-2 text-[10px] font-black uppercase tracking-[.24em] text-coral">
              <ShieldCheck className="size-4" /> Why Choose Us
            </div>
            <h2 className="mt-5 font-display text-5xl font-black leading-[.98] tracking-[-.03em] sm:text-7xl">
              Built to make your
              <span className="block bg-gradient-to-r from-coral via-[#fff7f3] to-coral bg-clip-text italic text-transparent">
                equipment choice easier.
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/58">
              From product selection to city-wise support, every step is shaped around confident buying and smoother setup.
            </p>
            <div className="why-vertical__summary mx-auto mt-8">
              {[
                ["Multiple", "Premium Brands"],
                ["9+", "Service Locations"],
                ["Cardio + Strength", "Equipment Range"],
              ].map(([value, label]) => (
                <span key={label}>
                  <strong>{value}</strong>
                  <small>{label}</small>
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
            <div className="why-vertical__timeline">
              {[
                [ShieldCheck, "Trusted Fitness Equipment Dealer", "Guidance for home, commercial and institutional gym requirements."],
                [BadgeCheck, "Multiple Premium Brands", "Compare reliable options across cardio, strength, functional and accessory categories."],
                [Dumbbell, "Wide Range of Gym Products", "Treadmills, bikes, machines, benches, free weights and daily training essentials."],
                [Building2, "Commercial & Home Gym Solutions", "Equipment choices matched to space, usage, budget and long-term goals."],
                [MessageCircle, "Easy Enquiry and Customer Support", "Quick help for specifications, availability, alternatives and next steps."],
                [MapPin, "Serving Multiple Cities", "Regional support across Andhra Pradesh and Telangana service locations."],
              ].map(([Icon, title, text], index) => {
                const I = Icon as typeof ShieldCheck;
                return (
                  <div
                    key={String(title)}
                    className="why-vertical__step group"
                    style={{ animationDelay: `${index * 120}ms` }}
                  >
                    <span className="why-vertical__node">
                      <I className="size-5" />
                    </span>
                    <div className="why-vertical__content">
                      <div>
                        <p className="why-vertical__eyebrow">Step 0{index + 1}</p>
                        <h3>{String(title)}</h3>
                        <p>{String(text)}</p>
                      </div>
                      <span className="why-vertical__arrow">
                        <ArrowRight className="size-4" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="why-vertical__locations">
              <div className="why-vertical__location-card">
                <div className="why-vertical__rings" aria-hidden="true" />
                <p className="text-[10px] font-black uppercase tracking-[.24em] text-coral">Service Locations</p>
                <h3 className="mt-3 font-display text-4xl font-black leading-tight">
                  9+ locations with quick enquiry support.
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/58">
                  Reach out for product suggestions, gym setup planning and availability support near your city.
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {business.locations.map((city, index) => (
                    <span
                      key={city}
                      className="why-vertical__city"
                      style={{ animationDelay: `${index * 70}ms` }}
                    >
                      {city}
                    </span>
                  ))}
                </div>
                <div className="why-vertical__mini-stats">
                  <span>
                    <strong>Home</strong>
                    <small>Gym Help</small>
                  </span>
                  <span>
                    <strong>Commercial</strong>
                    <small>Setup Guide</small>
                  </span>
                </div>
                <Link href="/contact" className="mt-8 inline-flex items-center rounded-md bg-white px-5 py-3 text-sm font-black text-navy transition hover:bg-coral hover:text-white">
                  Contact Our Team <ArrowRight className="ml-2 size-4" />
                </Link>
              </div>
              <div className="why-vertical__service-strip">
                {[
                  ["Quick", "Product Shortlist"],
                  ["Space", "Setup Guidance"],
                  ["City", "Availability Help"],
                ].map(([value, label]) => (
                  <span key={label}>
                    <strong>{value}</strong>
                    <small>{label}</small>
                  </span>
                ))}
              </div>
              <div className="why-vertical__service-fill">
                <span>Need support near your location?</span>
                <h3>Tell us your city, space size and equipment plan.</h3>
                <p>
                  We will help with a practical shortlist for home gyms, commercial floors, apartments, hotels and fitness studios.
                </p>
                <Link href="/contact" className="inline-flex items-center gap-2 font-black text-coral transition hover:translate-x-1">
                  Start Enquiry <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonial-showcase testimonial-experience relative overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_14%,rgba(225,117,100,.2),transparent_30%),radial-gradient(circle_at_78%_20%,rgba(255,247,243,.08),transparent_28%),linear-gradient(135deg,#070d20_0%,#101a38_48%,#09122c_100%)]" />
        <div className="testimonial-showcase__orb testimonial-showcase__orb--left" />
        <div className="testimonial-showcase__orb testimonial-showcase__orb--right" />
        <Quote className="testimonial-experience__quote testimonial-experience__quote--one" />
        <Quote className="testimonial-experience__quote testimonial-experience__quote--two" />
        <div className="section-shell relative">
          <div className="testimonial-experience__header">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-coral/25 bg-coral/10 px-4 py-2 text-[10px] font-black uppercase tracking-[.24em] text-coral">
                <Quote className="size-4" /> Testimonials
              </div>
              <h2 className="mt-5 font-display text-5xl font-black leading-[.98] tracking-[-.03em] sm:text-7xl">
                Trusted by Gym Owners
                <span className="block bg-gradient-to-r from-coral via-[#fff7f3] to-coral bg-clip-text italic text-transparent">
                  Across India
                </span>
              </h2>
            </div>
            <p>
              <strong>Real Stories. Real Transformations. Real Results.</strong>
              Customers choose Span Fitness for product quality, clear installation guidance,
              dependable support and equipment decisions that make business sense.
            </p>
          </div>

          <div className="testimonial-stats-grid">
            {testimonialStats.map(([value, label], index) => (
              <div key={label} className="testimonial-stat-card" style={{ animationDelay: `${index * 80}ms` }}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="testimonial-premium-grid">
            <article className="testimonial-spotlight-card">
              <div className="testimonial-spotlight-card__media">
                <Image
                  src={featuredStory.image}
                  alt={`${featuredStory.name} gym setup testimonial`}
                  fill
                  sizes="(min-width: 1024px) 36vw, 100vw"
                  className="object-cover object-[center_25%]"
                />
                <span>{featuredStory.badge}</span>
              </div>
              <div className="testimonial-spotlight-card__content">
                <div className="testimonial-card__stars" aria-label="5 star testimonial">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} className="size-4 fill-current" />
                  ))}
                </div>
                <h3>{featuredStory.result}</h3>
                <p>{featuredStory.quote}</p>
                <div className="testimonial-card__person">
                  <span>{featuredStory.name.slice(0, 1)}</span>
                  <div>
                    <strong>{featuredStory.name}</strong>
                    <small>{featuredStory.role} · {featuredStory.location}</small>
                  </div>
                </div>
                <div className="testimonial-spotlight-card__extras">
                  <div className="testimonial-spotlight-card__extras-row">
                    {testimonialStats.map(([value, label]) => (
                      <div key={label} className="testimonial-spotlight-card__mini-stat">
                        <strong>{value}</strong>
                        <small>{label}</small>
                      </div>
                    ))}
                  </div>
                  <div className="testimonial-spotlight-card__trust">
                    {testimonialTrust.slice(0, 3).map((item) => (
                      <span key={item}>
                        <CheckCircle2 className="size-3.5" /> {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>

            <article className="testimonial-transform-card">
              <div className="testimonial-transform-card__head">
                <span>Gym Transformation</span>
                <strong>Before / After Setup</strong>
              </div>
              <div className="testimonial-before-after">
                <div className="testimonial-before-after__label testimonial-before-after__label--before">Before</div>
                <div className="testimonial-before-after__label testimonial-before-after__label--after">After</div>
                <Image
                  src="/images/home/before.png"
                  alt="Gym transformation before and after Span Fitness equipment setup"
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
              <p>From an empty space to a fully equipped gym with premium cardio, strength and functional training setups.</p>
              <div className="testimonial-transform-card__footer">
                <h3 className="testimonial-transform-card__title">
                  We turn empty spaces into <span>elite fitness zones.</span>
                </h3>
                <p className="testimonial-transform-card__sub">
                  Every gym we equip is planned around your space, budget and usage — from compact home setups to full commercial floors.
                </p>
                <div className="testimonial-transform-card__chips">
                  {[
                    ["1000+", "Gym setups done"],
                    ["5000+", "Happy customers"],
                    ["9+", "Brand partners"],
                  ].map(([val, lbl]) => (
                    <div key={lbl} className="testimonial-transform-card__chip">
                      <strong>{val}</strong>
                      <small>{lbl}</small>
                    </div>
                  ))}
                </div>
                <div className="testimonial-transform-card__highlights">
                  {["Space Planning", "Brand Guidance", "After-Sales Support", "PAN India Delivery"].map((item) => (
                    <span key={item}><CheckCircle2 className="size-3.5" /> {item}</span>
                  ))}
                </div>
              </div>
            </article>



            <div className="testimonial-masonry">
              {trustedStories.slice(1).map((item, index) => (
                <article
                  key={`${item.name}-${item.badge}`}
                  className="testimonial-card testimonial-card--compact"
                  style={{ animationDelay: `${index * 110}ms` }}
                >
                  <div className="testimonial-card__topline">
                    <span>{item.badge}</span>
                    <small><MapPin className="size-3" /> {item.location}</small>
                  </div>
                  <div className="testimonial-card__stars" aria-label="5 star testimonial">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={starIndex} className="size-3.5 fill-current" />
                    ))}
                  </div>
                  <Quote className="testimonial-card__quote-icon" />
                  <p className="testimonial-card__quote">{item.quote}</p>
                  <div className="testimonial-card__person">
                    <span>{item.name.slice(0, 1)}</span>
                    <div>
                      <strong>{item.name}</strong>
                      <small>{item.role}</small>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="hidden">
            {testimonials.slice(0, 3).map((item, index) => (
              <article
                key={`${item.name}-${index}`}
                className="testimonial-card"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="testimonial-card__stars" aria-label="5 star testimonial">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} className="size-4 fill-current" />
                  ))}
                </div>
                <Quote className="testimonial-card__quote-icon" />
                <p className="testimonial-card__quote">{item.quote}</p>
                <div className="testimonial-card__person">
                  <span>{item.name.slice(0, 1)}</span>
                  <div>
                    <strong>{item.name}</strong>
                    <small>{item.role} · {item.location}</small>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="testimonial-trust-strip">
            {testimonialTrust.map((item) => (
              <span key={item}>
                <CheckCircle2 className="size-4" /> {item}
              </span>
            ))}
          </div>

          <div className="testimonial-marquee" aria-label="Customer gym names">
            <div>
              {[...testimonialMarquee, ...testimonialMarquee].map((item, index) => (
                <span key={`${item}-${index}`}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="brands" className="brand-board relative scroll-mt-28 overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#09122c_0%,#101a38_48%,#872341_100%)]" />
        <div className="brand-board__grain absolute inset-0" />
        <div className="brand-board__aurora brand-board__aurora--one" aria-hidden="true" />
        <div className="brand-board__aurora brand-board__aurora--two" aria-hidden="true" />
        <div className="brand-board__lux-grid" aria-hidden="true" />
        <div className="brand-board__shine" aria-hidden="true" />
        <div className="brand-board__spark brand-board__spark--one" aria-hidden="true" />
        <div className="brand-board__spark brand-board__spark--two" aria-hidden="true" />
        <div className="brand-board__spark brand-board__spark--three" aria-hidden="true" />
        <div className="brand-board__spotlight brand-board__spotlight--top" />
        <div className="brand-board__spotlight brand-board__spotlight--bottom" />
        <div className="brand-board__corner brand-board__corner--one" />
        <div className="brand-board__corner brand-board__corner--two" />
        <div className="section-shell relative">
          <div className="brand-board__panel">
            <div className="brand-board__panel-head">
              <p>Brand&apos;s We Deal</p>
            </div>
            <BrandLogoRail tone="dark" />
          </div>
        </div>
      </section>

      <section className="contact-highlight relative overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(225, 117, 100,.24),transparent_32%),radial-gradient(circle_at_82%_20%,rgba(255, 247, 243,.08),transparent_30%),linear-gradient(135deg,#09122c_0%,#101a38_54%,#872341_100%)]" />
        <div className="contact-highlight__grid absolute inset-0" />
        <div className="contact-highlight__sparkle contact-highlight__sparkle--one" />
        <div className="contact-highlight__sparkle contact-highlight__sparkle--two" />
        <div className="contact-highlight__sparkle contact-highlight__sparkle--three" />
        <div className="contact-highlight__ring contact-highlight__ring--one" />
        <div className="contact-highlight__ring contact-highlight__ring--two" />
        <div className="section-shell relative">
          <div className="contact-highlight__header mx-auto mb-12 max-w-4xl text-center">
            <div className="mx-auto grid size-24 place-items-center rounded-3xl border border-white/10 bg-[#fff7f3] p-3 shadow-[0_24px_70px_rgba(0,0,0,.32)]">
              <Image
                src="/span-fitness-logo.png"
                alt="Span Fitness Equipments"
                width={288}
                height={96}
                className="h-full w-full object-contain"
              />
            </div>
            <p className="mt-6 text-xs font-black uppercase tracking-widest text-coral">Get In Touch</p>
            <h2 className="mt-3 font-display text-5xl font-black leading-[.98] sm:text-7xl">
              Let&apos;s plan your
              <span className="block bg-gradient-to-r from-coral via-[#fff7f3] to-coral bg-clip-text italic text-transparent">
                perfect gym setup.
              </span>
            </h2>
          </div>
          <div className="contact-highlight__shell grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
            <div className="contact-highlight__info grid gap-4">
              {[
                [Users, business.owner, "Owner / Contact Person"],
                [Phone, phoneDisplay, "Phone"],
                [Mail, business.email, "Email"],
                [MapPin, business.address, "Address"],
              ].map(([Icon, value, label]) => {
                const I = Icon as typeof Phone;
                return (
                  <div key={String(label)} className="contact-highlight__info-card">
                    <I className="mb-3 size-7 text-coral" />
                    <p className="text-sm text-white/50">{String(label)}</p>
                    <p className="mt-1 break-words font-display text-lg font-black">
                      {String(value)}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="contact-highlight__form">
              <div className="grid gap-4">
                <input
                  placeholder="Your name"
                  className="h-12 rounded-md border border-white/10 bg-navy/70 px-4 outline-none transition focus:border-coral focus:bg-navy"
                />
                <input
                  placeholder="Phone number"
                  className="h-12 rounded-md border border-white/10 bg-navy/70 px-4 outline-none transition focus:border-coral focus:bg-navy"
                />
                <textarea
                  placeholder="Tell us what you need"
                  className="min-h-32 rounded-md border border-white/10 bg-navy/70 p-4 outline-none transition focus:border-coral focus:bg-navy"
                />
                <a
                  href={whatsappUrl()}
                  className="btn-shine flex min-h-12 items-center justify-center rounded-md bg-gradient-to-r from-ember to-coral px-5 font-black"
                >
                  Send Enquiry
                </a>
              </div>
              <Link
                href="/contact"
                className="contact-highlight__map mt-5"
              >
                <MapPin className="mx-auto size-8 text-coral" />
                <p className="mt-2 font-display text-xl font-black">
                  View contact page & map
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
