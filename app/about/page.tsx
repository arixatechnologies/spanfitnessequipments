import Image from "next/image";
import { BadgeCheck, Building2, HeartHandshake, MapPin, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqSection } from "@/components/seo/faq-section";
import { getPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, JsonLd, webPageSchema } from "@/lib/schema";
import { seoFaqs } from "@/src/config/seo-content";
import { CtaBand, SectionTitle } from "../components/site";
import { brands, business, images } from "../data";

const title = "About Span Fitness Equipments";
const description = "Learn about Span Fitness Equipments, owner A Senthil Kumar, our Visakhapatnam showroom, service locations, equipment range and customer-first approach.";
export function generateMetadata() { return getPageMetadata({ title, description, path: "/about", image: images.showroom }); }

export default function AboutPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "About", path: "/about" }];
  const whyItems = [
    [Users, "Owner-led guidance", `Speak with ${business.owner} and a team that understands the equipment.`],
    [ShieldCheck, "Careful product selection", "Options considered for durability, purpose and expected usage."],
    [Building2, "Complete setup support", "Help choosing an equipment mix for commercial and shared spaces."],
    [HeartHandshake, "Customer-first service", "Clear answers and responsive support throughout the buying journey."],
    [BadgeCheck, "Multiple trusted brands", "Compare products across established fitness equipment names."],
    [MapPin, "Regional reach", "Serving customers across multiple cities in Andhra Pradesh and Telangana."],
  ] as const;

  return (
    <>
      <JsonLd data={[webPageSchema({ name: title, description, path: "/about", type: "AboutPage" }), breadcrumbSchema(crumbs), faqSchema(seoFaqs.about)]} />
      <Breadcrumbs items={crumbs} />

      <section className="about-hero relative overflow-hidden">
        <Image src={images.showroom} alt="" fill priority sizes="100vw" className="about-hero__image" />
        <div className="about-hero__veil" />
        <div className="about-hero__grid" />
        <div className="about-hero__orb about-hero__orb--one" />
        <div className="about-hero__orb about-hero__orb--two" />
        <div className="section-shell relative z-10">
          <div className="about-hero__content">
            <p className="about-hero__eyebrow"><Sparkles className="size-4" /> Our Story</p>
            <h1>Fitness equipment guidance built on trust.</h1>
            <p>A local business helping homes, gyms, apartments and institutions build better training spaces across Andhra Pradesh and Telangana.</p>
            <div className="about-hero__stats">
              <span><strong>{business.experience}</strong><small>Guidance</small></span>
              <span><strong>10+</strong><small>Locations</small></span>
              <span><strong>Premium</strong><small>Brands</small></span>
            </div>
          </div>
        </div>
      </section>

      <section className="about-story relative overflow-hidden py-20 sm:py-24">
        <div className="about-story__glow" />
        <div className="section-shell grid items-center gap-12 lg:grid-cols-2">
          <div className="about-story__media">
            <Image src={images.showroom} alt="Span Fitness Equipments showroom in Seethampeta, Visakhapatnam" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="about-story__copy">
            <SectionTitle eyebrow="Who We Are" title="More than a product counter." body={`Span Fitness Equipments is led by ${business.owner}. With ${business.experience}, the business focuses on understanding each customer's space, usage and budget before recommending equipment.`} />
            <p className="leading-8 text-white/62">We support individual buyers and larger projects with cardio machines, strength equipment, free weights, accessories and complete gym setup planning. Our goal is dependable choices, clear communication and responsive enquiry support.</p>
          </div>
        </div>
      </section>

      <section className="about-why relative overflow-hidden py-20 sm:py-24">
        <div className="about-why__mesh" />
        <div className="section-shell relative">
          <div className="about-why__header">
            <p>Why Customers Choose Us</p>
            <h2>Practical experience. Personal attention.</h2>
          </div>
          <div className="about-why__grid">
            {whyItems.map(([Icon, heading, text], index) => {
              const I = Icon as typeof Users;
              return (
                <article key={heading} className="about-why__card" style={{ animationDelay: `${index * 90}ms` }}>
                  <span className="about-why__icon"><I className="size-5" /></span>
                  <span className="about-why__count">0{index + 1}</span>
                  <h3>{heading}</h3>
                  <p>{text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="section-shell grid gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow="Service Area" title="Supporting fitness spaces across the region." />
            <div className="service-location-cloud">{business.locations.map((city, index) => <span key={city} className="service-location-chip" style={{ animationDelay: `${index * 65}ms` }}><MapPin className="size-3.5" />{city}</span>)}</div>
          </div>
          <div>
            <SectionTitle eyebrow="Brand Network" title="More ways to find the right fit." />
            <div className="about-brand-grid">{brands.map((brand, index) => <div key={brand.slug} className="about-brand-tile" style={{ animationDelay: `${index * 80}ms` }}>{brand.name}</div>)}</div>
          </div>
        </div>
      </section>

      <FaqSection items={seoFaqs.about} />
      <CtaBand title="Visit, call or message us." text="Tell us what you are building and we will help you begin with a focused equipment shortlist." />
    </>
  );
}
