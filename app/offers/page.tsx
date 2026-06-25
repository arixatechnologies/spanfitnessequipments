import Image from "next/image";
import type { CSSProperties } from "react";
import {
  ArrowRight,
  BadgePercent,
  Building2,
  CheckCircle2,
  Clock3,
  Dumbbell,
  Gift,
  Home,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqSection } from "@/components/seo/faq-section";
import { LeadForm } from "@/components/forms/lead-form";
import { getPublicOffers } from "@/lib/public-content";
import { getPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, JsonLd, webPageSchema } from "@/lib/schema";
import { seoFaqs } from "@/src/config/seo-content";
import { ButtonLink, CtaBand } from "../components/site";
import { whatsappUrl } from "../data";

const title = "Gym Equipment Offers and Setup Packages";
const description =
  "Explore current gym setup consultation, strength equipment bundle and new fitness equipment enquiry offers from Span Fitness Equipments.";

const offerImages = {
  hero: "/images/categories/commercial-gym-setup-premium.png",
  commercial: "/images/categories/commercial-gym-equipment-setup.png",
  home: "/images/categories/home-gym-equipment-premium.png",
  accessories: "/images/categories/fitness-accessories-premium.png",
  strength: "/images/categories/strength-equipment-premium.png",
  cardio: "/images/categories/cardio-equipment-premium.png",
  multiGym: "/images/products/multi-gym-machine.png",
  showroom: "/images/gallery/gallery1.jpg",
  bench: "/images/products/strength-training-bench.png",
};
const offerIcons = [Building2, Dumbbell, Sparkles, Zap, Home, PackageCheck, Gift, Wrench] as const;
const highlightPoints = ["Space planning", "Brand guidance", "Bundle shortlists", "After-sales support"];
const dealSteps = [
  "Share your space size and usage",
  "Choose home, commercial or institutional setup",
  "Get a focused equipment and discount shortlist",
];
const heroBadges = ["Up to 25% OFF", "Free Installation", "Limited Time Offer", "Combo Savings"];
const heroStats = [
  { value: "1000+", label: "Gym Installations" },
  { value: "9+", label: "Brand Stores" },
  { value: "5000+", label: "Happy Customers" },
];
const offerVisuals = [
  { image: "/images/offers/image1.png", label: "Complete Setup", accent: "coral", popular: true },
  { image: "/images/offers/image2.png", label: "Strength package", accent: "wine", popular: true },
  { image: "/images/offers/image3.png", label: "New arrival", accent: "amber", popular: false },
  { image: "/images/offers/image4.png", label: "Cardio upgrade", accent: "blue", popular: false },
  { image: "/images/offers/image5.png", label: "Home gym", accent: "green", popular: true },
  { image: "/images/offers/image6.png", label: "Setup value", accent: "coral", popular: false },
  { image: "/images/offers/image7.png", label: "Accessories", accent: "wine", popular: false },
];
const featuredOffers = [
  {
    title: "Commercial Gym Package",
    description: "Complete gym floor package value.",
    badge: "Up to 25% OFF",
    cta: "Get Quote",
    image: "/images/offers/image1.png",
    href: whatsappUrl("Commercial Gym Package offer"),
    accent: "coral",
  },
  {
    title: "Home Gym Combo",
    description: "Cardio and strength starter kit.",
    badge: "Combo Savings",
    cta: "View Offer",
    image: "/images/offers/image2.png",
    href: whatsappUrl("Home Gym Combo offer"),
    accent: "green",
  },
  {
    title: "Multi Gym Offer",
    description: "Multi-station strength bundle.",
    badge: "Free Installation",
    cta: "Enquire Now",
    image: "/images/offers/image3.png",
    href: whatsappUrl("Multi Gym Offer"),
    accent: "amber",
  },
  {
    title: "Accessories Bundle",
    description: "Training essentials package.",
    badge: "Buy More Save More",
    cta: "View Offer",
    image: "/images/offers/image4.png",
    href: whatsappUrl("Accessories Bundle offer"),
    accent: "wine",
  },
] as const;
const offerBadges = ["Up to 25% OFF", "Combo Savings", "Limited Time Offer", "Free Installation", "Buy More Save More"] as const;
const offerCtas = ["View Offer", "Get Quote", "Enquire Now"] as const;
const offerLines = [
  "Premium package value for planned equipment purchases.",
  "Smart savings on cardio, strength and setup support.",
  "Limited-period benefit for selected fitness equipment.",
  "Extra value when you combine products in one enquiry.",
] as const;
const trustBenefits = [
  { icon: MessageCircle, title: "Free Consultation", text: "Discuss space, budget and equipment goals before shortlisting." },
  { icon: Wrench, title: "Expert Installation", text: "Setup guidance for placement, usage flow and delivery planning." },
  { icon: ShieldCheck, title: "Genuine Brands", text: "Reliable brand options across cardio, strength and accessories." },
  { icon: PackageCheck, title: "After-Sales Support", text: "Service conversations stay part of the purchase journey." },
  { icon: Truck, title: "PAN India Delivery", text: "Delivery discussion for projects, stores and city requirements." },
  { icon: CheckCircle2, title: "Warranty Support", text: "Ask for product-wise warranty and support details before buying." },
];

export const dynamic = "force-dynamic";

export function generateMetadata() {
  return getPageMetadata({ title, description, path: "/offers", image: offerImages.hero });
}

export default async function OffersPage() {
  const offers = await getPublicOffers();
  const crumbs = [{ name: "Home", path: "/" }, { name: "Offers", path: "/offers" }];

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ name: title, description, path: "/offers" }),
          breadcrumbSchema(crumbs),
          faqSchema(seoFaqs.offers),
        ]}
      />
      <Breadcrumbs items={crumbs} />

      <section className="offers-showcase">
        <Image
          src={offerImages.hero}
          alt="Span Fitness commercial gym equipment offer setup"
          fill
          priority
          sizes="100vw"
          className="offers-showcase__image"
        />
        <div className="offers-showcase__veil" />
        <div className="offers-showcase__grid" />
        <div className="offers-showcase__orb offers-showcase__orb--one" />
        <div className="offers-showcase__orb offers-showcase__orb--two" />
        <div className="section-shell relative z-10 grid items-center gap-8 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="offers-showcase__kicker">
              <BadgePercent className="size-4" /> Current Offers & Discounts
            </p>
            <h1>Offers, discounts and package value for your fitness upgrade.</h1>
            <p>
              Explore equipment bundles, selected product discounts, setup support and enquiry benefits
              for home gyms, commercial gyms, apartments, hotels and professional training spaces.
            </p>
            <div className="offers-showcase__actions">
              <ButtonLink href="#offer-board">
                Explore Offers <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink href={whatsappUrl("current fitness equipment offers")} secondary>
                <MessageCircle className="size-4" /> WhatsApp Offers
              </ButtonLink>
            </div>
            <div className="offers-showcase__stats">
              {heroStats.map((item) => (
                <span key={item.label}>
                  <strong>{item.value}</strong>
                  <small>{item.label}</small>
                </span>
              ))}
            </div>
          </div>

          <div className="offers-showcase__visual">
            <div className="offers-showcase__glow" />
            <div className="offers-showcase__collage">
              <span className="offers-showcase__photo offers-showcase__photo--main">
                <Image src={offerImages.commercial} alt="Premium commercial gym equipment package offer" fill sizes="(min-width: 1024px) 46vw, 100vw" className="object-cover" />
              </span>
              <span className="offers-showcase__photo offers-showcase__photo--small">
                <Image src="/images/offers/off1.png" alt="Gym equipment offer" fill sizes="260px" className="object-cover" />
              </span>
              <span className="offers-showcase__photo offers-showcase__photo--wide">
                <Image src="/images/offers/off2.png" alt="Fitness equipment offer" fill sizes="320px" className="object-cover" />
              </span>
              <div className="offers-showcase__badges">
                {heroBadges.map((badge, index) => (
                  <span key={badge} style={{ "--badge-delay": `${index * 110}ms` } as CSSProperties}>
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="offers-showcase__feature">
              <div className="offers-showcase__feature-head">
                <span>
                  <Sparkles className="size-4" /> Deal Finder
                </span>
                <strong>Save</strong>
              </div>
              <h2>Find the right discount path before you buy.</h2>
              <p>
                Tell us your space, users and budget. We will help you compare products, bundles and
                setup-ready options with practical guidance.
              </p>
              <div className="offers-showcase__pulse">
                {highlightPoints.map((point) => (
                  <span key={point}>{point}</span>
                ))}
              </div>
              <div className="offers-showcase__steps">
                {dealSteps.map((step) => (
                  <span key={step}>
                    <CheckCircle2 className="size-4" /> {step}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="offer-board" className="offers-board">
        <div className="offers-board__spark offers-board__spark--one" />
        <div className="offers-board__spark offers-board__spark--two" />
        <div className="section-shell relative z-10">
          <div className="offers-board__head">
            <div>
              <p className="offers-showcase__kicker">
                <Clock3 className="size-4" /> Limited Enquiry Benefits
              </p>
              <h2>Offers & discounts made easy to choose.</h2>
            </div>
            <p>
              Image-first cards, clear savings and quick enquiry buttons for home gyms,
              commercial gyms, multi gyms and accessories.
            </p>
          </div>

          <div className="offers-featured-grid">
            {featuredOffers.map((item, index) => (
              <article
                key={item.title}
                className={`offers-feature-card offers-feature-card--${item.accent}`}
                style={{ "--feature-delay": `${index * 75}ms` } as CSSProperties}
              >
                <Image src={item.image} alt={`${item.title} offer`} fill sizes="(min-width: 1024px) 25vw, 100vw" className="object-cover" />
                <span className="offers-feature-card__veil" />
                <span className="offers-feature-card__badge">{item.badge}</span>
                <div className="offers-feature-card__content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <a href={item.href}>
                    {item.cta} <ArrowRight className="size-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="offers-board__grid">
            {offers.map(({ tag, title: offerTitle, text }, index) => {
              const Icon = offerIcons[index % offerIcons.length];
              const visual = offerVisuals[index % offerVisuals.length];
              const badge = offerBadges[index % offerBadges.length];
              const cta = offerCtas[index % offerCtas.length];
              const line = offerLines[index % offerLines.length] || text;
              return (
                <article
                  key={offerTitle}
                  className={`offers-ticket offers-ticket--${visual.accent}${visual.popular ? " offers-ticket--popular" : ""}`}
                  style={{ "--offer-delay": `${index * 70}ms` } as CSSProperties}
                >
                  <span className="offers-ticket__number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="offers-ticket__deal">{badge}</span>
                  {visual.popular && <span className="offers-ticket__ribbon">Most Popular</span>}
                  <BadgePercent className="offers-ticket__watermark" />
                  <div className="offers-ticket__media">
                    <Image src={visual.image} alt={`${visual.label} offer`} fill sizes="(min-width: 1024px) 18vw, 100vw" className="object-cover" />
                  </div>
                  <div className="offers-ticket__body">
                    <div className="offers-ticket__icon">
                      <Icon className="size-5" />
                    </div>
                    <p>{tag}</p>
                    <h3>{offerTitle}</h3>
                    <span className="offers-ticket__line" />
                    <small>{line}</small>
                    <a href={whatsappUrl(offerTitle)} className="offers-ticket__link">
                      {cta} <ArrowRight className="size-4" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="offers-board__note">
            <ShieldCheck className="size-5" />
            <span>Offers and availability may vary by product, brand and enquiry date. Contact the store for current details.</span>
          </div>

          <div className="offers-trust-grid">
            {trustBenefits.map(({ icon: Icon, title: benefitTitle, text }, index) => (
              <div key={benefitTitle} className="offers-trust-card" style={{ "--trust-delay": `${index * 65}ms` } as CSSProperties}>
                <span><Icon className="size-5" /></span>
                <strong>{benefitTitle}</strong>
                <p>{text}</p>
              </div>
            ))}
          </div>

          <div className="offers-enquiry">
            <div>
              <p className="offers-showcase__kicker">
                <PackageCheck className="size-4" /> Quick Offer Request
              </p>
              <h2>Request current offer details</h2>
              <p>
                Share what you are planning and we will guide you with a focused equipment shortlist,
                package direction and current offer details.
              </p>
            </div>
            <div className="offers-enquiry__form">
              <LeadForm requirement="Current Fitness Equipment Offers" sourcePage="/offers" compact />
            </div>
          </div>
        </div>
      </section>

      <FaqSection items={seoFaqs.offers} />
      <CtaBand title="Building a full gym?" text="Share the size of your space and project needs to discuss a tailored package." />
    </>
  );
}
