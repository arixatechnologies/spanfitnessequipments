import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, LayoutGrid, MapPin, MessageCircle, Phone, Ruler, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqSection, type FaqItem } from "@/components/seo/faq-section";
import { LeadForm } from "@/components/forms/lead-form";
import { breadcrumbSchema, faqSchema, itemListSchema, JsonLd, webPageSchema } from "@/lib/schema";
import { ProductCard } from "./cards";
import { ButtonLink, CtaBand, SectionTitle } from "./site";
import type { Category, Product } from "../data";
import { business, phoneDisplay, whatsappUrl } from "../data";

type Stat = {
  value: string;
  label: string;
};

type LandingCard = {
  title: string;
  text: string;
};

type PlanningStep = {
  title: string;
  text: string;
};

type EquipmentLink = {
  label: string;
  href: string;
  description: string;
};

type EquipmentLinkGroup = {
  title: string;
  href: string;
  description: string;
  items: EquipmentLink[];
};

export type FitnessLandingContent = {
  layoutVariant?: "home-compact";
  categorySectionFirst?: boolean;
  path: string;
  crumbLabel: string;
  title: string;
  description: string;
  eyebrow: string;
  heroTitle: string;
  heroText: string;
  heroImage: string;
  heroAlt: string;
  heroBadge: string;
  audience: string[];
  stats: Stat[];
  cards: LandingCard[];
  equipmentGroups?: EquipmentLinkGroup[];
  equipmentLinksEyebrow?: string;
  equipmentLinksTitle?: string;
  equipmentLinksBody?: string;
  categorySlugs: string[];
  categoryEyebrow: string;
  categoryTitle: string;
  categoryBody: string;
  productSlugs: string[];
  productEyebrow: string;
  productTitle: string;
  productBody: string;
  planEyebrow: string;
  planTitle: string;
  planBody: string;
  steps: PlanningStep[];
  formTitle: string;
  formText: string;
  formRequirement: string;
  ctaTitle: string;
  ctaText: string;
  faqs: FaqItem[];
};

const cardIcons = [Ruler, LayoutGrid, CheckCircle2, Sparkles] as const;

function pickBySlug<T extends { slug: string }>(items: T[], slugs: string[]) {
  const map = new Map(items.map((item) => [item.slug, item]));
  return slugs.map((slug) => map.get(slug)).filter((item): item is T => Boolean(item));
}

export function FitnessLandingPage({
  content,
  categories,
  products,
}: {
  content: FitnessLandingContent;
  categories: Category[];
  products: Product[];
}) {
  const focusCategories = pickBySlug(categories, content.categorySlugs);
  const featuredProducts = pickBySlug(products, content.productSlugs);
  const crumbs = [{ name: "Home", path: "/" }, { name: content.crumbLabel, path: content.path }];
  const equipmentListItems = (content.equipmentGroups || []).flatMap((group) => [
    { name: group.title, path: group.href },
    ...group.items.map((item) => ({ name: item.label, path: item.href })),
  ]);
  const listItems = [
    ...focusCategories.map((item) => ({ name: item.name, path: `/categories/${item.slug}` })),
    ...featuredProducts.map((item) => ({ name: item.name, path: `/products/${item.slug}` })),
    ...equipmentListItems,
  ];
  const homeCompact = content.layoutVariant === "home-compact";
  const equipmentGroupCount = content.equipmentGroups?.length || 0;
  const setupFlow = homeCompact
    ? ["Measure", "Shortlist", "Place", "Train"]
    : ["Map Zones", "Select Mix", "Install", "Support"];
  const panelFlow = homeCompact
    ? ["Room check", "Cardio zone", "Strength corner"]
    : ["Zone planning", "Member flow", "Durable picks", "Support-ready"];

  const equipmentLinksSection = Boolean(content.equipmentGroups?.length) ? (
    <section className={`fitness-link-range relative overflow-hidden py-20 sm:py-24${homeCompact ? " fitness-home-links-compact" : ""}`}>
      <div className="fitness-link-range__orb fitness-link-range__orb--left" />
      <div className="fitness-link-range__orb fitness-link-range__orb--right" />
      <div className="section-shell relative">
        <SectionTitle
          eyebrow={content.equipmentLinksEyebrow || "Equipment Links"}
          title={content.equipmentLinksTitle || "Explore linked equipment ranges."}
          body={content.equipmentLinksBody}
        />
        <div className="grid gap-5 lg:grid-cols-2">
          {content.equipmentGroups?.map((group, groupIndex) => (
            <article
              key={`${group.title}-${group.href}`}
              className={`fitness-link-group${equipmentGroupCount % 2 === 1 && groupIndex === equipmentGroupCount - 1 ? " fitness-link-group--wide" : ""}${group.items.length === 2 ? " fitness-link-group--two-items" : ""}`}
              style={{ animationDelay: `${groupIndex * 90}ms` }}
            >
              <Link href={group.href} className="fitness-link-group__header group">
                <span className="fitness-link-card__number">{String(groupIndex + 1).padStart(2, "0")}</span>
                <span>
                  <span className="fitness-link-card__label">{group.title}</span>
                  <span className="fitness-link-card__description">{group.description}</span>
                </span>
                <ArrowRight className="fitness-link-group__arrow size-5 transition group-hover:translate-x-1" />
              </Link>
              <div className="fitness-link-grid">
                {group.items.map((item, itemIndex) => (
                  <Link
                    key={`${item.label}-${item.href}`}
                    href={item.href}
                    className="fitness-link-card group"
                    style={{ animationDelay: `${(groupIndex * 4 + itemIndex) * 45}ms` }}
                  >
                    <span className="fitness-link-card__label">{item.label}</span>
                    <span className="fitness-link-card__description">{item.description}</span>
                    <span className="fitness-link-card__action">
                      View Span Fitness page <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  ) : null;

  const categorySection = (
    <section className="fitness-category-section bg-white/[0.025] py-20 sm:py-24">
      <div className="section-shell">
        <SectionTitle eyebrow={content.categoryEyebrow} title={content.categoryTitle} body={content.categoryBody} />
        {focusCategories.length ? (
          <div className={`fitness-category-grid${focusCategories.length === 5 ? " fitness-category-grid--balanced" : ""}`}>
            {focusCategories.map((category, index) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="fitness-category-tile group"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <div className="fitness-category-tile__image">
                  <Image src={category.image} alt={`${category.name} from Span Fitness Equipments`} fill sizes="(min-width: 1024px) 28vw, 100vw" className="object-cover" />
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-black uppercase tracking-[.18em] text-coral">{category.tagline}</p>
                  <h3 className="mt-2 font-display text-2xl font-black">{category.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/58">{category.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.14em] text-coral">
                    View category <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-white/60">
            Category details are available on enquiry.
          </div>
        )}
      </div>
    </section>
  );

  return (
    <div className={`fitness-page-shell${homeCompact ? " fitness-page-shell--home-compact" : " fitness-page-shell--gym"}`}>
      <div className="fitness-page-shell__ambient fitness-page-shell__ambient--one" />
      <div className="fitness-page-shell__ambient fitness-page-shell__ambient--two" />
      <div className="fitness-page-shell__grid" />
      <div className="fitness-page-shell__runner" />
      <JsonLd
        data={[
          webPageSchema({ name: content.title, description: content.description, path: content.path, type: "CollectionPage" }),
          breadcrumbSchema(crumbs),
          itemListSchema(content.title, content.path, listItems),
          faqSchema(content.faqs),
        ]}
      />
      <Breadcrumbs items={crumbs} />

      <section className={`fitness-landing-hero${homeCompact ? " fitness-home-hero" : " fitness-gym-hero"}`}>
        <Image src={content.heroImage} alt={content.heroAlt} fill priority sizes="100vw" className="fitness-landing-hero__image" />
        <div className="fitness-landing-hero__veil" />
        <div className="fitness-landing-hero__mesh" />
        <div className="fitness-landing-hero__orb fitness-landing-hero__orb--one" />
        <div className="fitness-landing-hero__orb fitness-landing-hero__orb--two" />
        <div className={`section-shell relative z-10 grid items-center gap-8 lg:grid-cols-[1.05fr_.95fr]${homeCompact ? " fitness-home-hero__grid" : ""}`}>
          <div>
            <p className="fitness-landing-kicker"><Sparkles className="size-4" /> {content.eyebrow}</p>
            <h1 className="mt-6 max-w-4xl font-display text-4xl font-black leading-[.98] sm:text-6xl lg:text-7xl">
              {content.heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">{content.heroText}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact">Plan Your Setup <ArrowRight className="size-4" /></ButtonLink>
              <ButtonLink href={whatsappUrl(content.formRequirement)} secondary>
                <MessageCircle className="size-4" /> WhatsApp
              </ButtonLink>
            </div>
          </div>

          <div className="fitness-landing-panel">
            <p className="fitness-landing-panel__badge">{content.heroBadge}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {content.stats.map((stat) => (
                <div key={`${stat.value}-${stat.label}`} className="fitness-landing-stat">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {content.audience.map((item) => (
                <span key={item} className="fitness-audience-chip">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-6 grid gap-3 text-sm text-white/64">
              <a href={`tel:${business.phone}`} className="fitness-contact-line">
                <Phone className="size-4 text-coral" /> Call {phoneDisplay}
              </a>
              <span className="fitness-contact-line">
                <MapPin className="size-4 text-coral" /> {business.address}
              </span>
            </div>
            <div className={homeCompact ? "fitness-home-blueprint" : "fitness-zone-map"}>
              {panelFlow.map((item) => (
                  <span key={item}>
                    <CheckCircle2 className="size-3.5" />
                    {item}
                  </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`fitness-solution-rail-section py-12 sm:py-14${homeCompact ? " fitness-home-solution-compact" : ""}`}>
        <div className="section-shell">
          <div className="fitness-solution-rail">
            {content.cards.map((card, index) => {
              const Icon = cardIcons[index % cardIcons.length];
              return (
                <article key={card.title} className="fitness-solution-card" style={{ animationDelay: `${index * 80}ms` }}>
                  <span className="fitness-solution-card__index">0{index + 1}</span>
                  <span className="fitness-solution-card__icon">
                    <Icon className="size-5" />
                  </span>
                  <h2>{card.title}</h2>
                  <p>{card.text}</p>
                </article>
              );
            })}
          </div>
          <div className={homeCompact ? "fitness-home-flow" : "fitness-zone-flow"}>
            {setupFlow.map((item, index) => (
                <span key={item}>
                  <strong>{String(index + 1).padStart(2, "0")}</strong>
                  {item}
                </span>
            ))}
          </div>
        </div>
      </section>

      {content.categorySectionFirst ? (
        <>
          {categorySection}
          {equipmentLinksSection}
        </>
      ) : (
        <>
          {equipmentLinksSection}
          {categorySection}
        </>
      )}

      <section className="fitness-products-section py-20 sm:py-24">
        <div className="section-shell">
          <SectionTitle eyebrow={content.productEyebrow} title={content.productTitle} body={content.productBody} />
          {featuredProducts.length ? (
            <div className="fitness-product-grid">
              {featuredProducts.map((product) => <ProductCard key={product.slug} item={product} />)}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-white/60">
              Product options are available on enquiry. Contact our team for the current range.
            </div>
          )}
        </div>
      </section>

      <section className={`fitness-plan-section py-20 sm:py-24${homeCompact ? " fitness-home-plan-compact" : ""}`}>
        <div className="section-shell grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <SectionTitle eyebrow={content.planEyebrow} title={content.planTitle} body={content.planBody} />
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/contact">Request Guidance</ButtonLink>
              <ButtonLink href={`tel:${business.phone}`} secondary>Call {phoneDisplay}</ButtonLink>
            </div>
            {homeCompact && (
              <div className="fitness-home-room-card">
                <span>Planning Snapshot</span>
                <p>Best home setups keep one machine zone, one strength corner and enough walking clearance for daily use.</p>
              </div>
            )}
          </div>
          <ol className="fitness-plan-list">
            {content.steps.map((step, index) => (
              <li key={step.title} className="fitness-plan-step" style={{ animationDelay: `${index * 85}ms` }}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`fitness-enquiry-section py-20 sm:py-24${homeCompact ? " fitness-home-enquiry-compact" : ""}`}>
        <div className="section-shell grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
          <div className="fitness-enquiry-copy">
            <p className="fitness-landing-kicker">Quick Enquiry</p>
            <h2>{content.formTitle}</h2>
            <p>{content.formText}</p>
            <a href={whatsappUrl(content.formRequirement)} className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[.14em] text-coral">
              Message on WhatsApp <ArrowRight className="size-4" />
            </a>
          </div>
          <div className="fitness-form-card">
            <LeadForm requirement={content.formRequirement} sourcePage={content.path} compact />
          </div>
        </div>
      </section>

      <FaqSection items={content.faqs} />
      <CtaBand title={content.ctaTitle} text={content.ctaText} />
    </div>
  );
}
