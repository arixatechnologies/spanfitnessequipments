import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle, Phone, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqSection } from "@/components/seo/faq-section";
import { LeadForm } from "@/components/forms/lead-form";
import { breadcrumbSchema, faqSchema, itemListSchema, JsonLd, webPageSchema } from "@/lib/schema";
import { ButtonLink, CtaBand, SectionTitle } from "./site";
import { business, phoneDisplay, whatsappUrl } from "../data";
import {
  fitnessGroupPath,
  fitnessItemPath,
  type FitnessDetail,
} from "../fitness-pages";

export function FitnessDetailPage({ detail }: { detail: FitnessDetail }) {
  const { program, group } = detail;
  const groupPath = fitnessGroupPath(program, group);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: program.crumbLabel, path: program.basePath },
    { name: group.label, path: groupPath },
    ...(detail.type === "item" ? [{ name: detail.item.label, path: detail.path }] : []),
  ];
  const childLinks = group.items.map((item) => ({
    name: item.label,
    path: fitnessItemPath(program, group, item),
    summary: item.summary,
  }));
  const siblingLinks = detail.type === "item"
    ? group.items
        .filter((item) => item.slug !== detail.item.slug)
        .map((item) => ({
          name: item.label,
          path: fitnessItemPath(program, group, item),
          summary: item.summary,
        }))
    : program.groups
        .filter((entry) => entry.slug !== group.slug)
        .map((entry) => ({
          name: entry.label,
          path: fitnessGroupPath(program, entry),
          summary: entry.summary,
        }));
  const detailFaqs = [
    {
      question: `Can Span Fitness help choose ${detail.label.toLowerCase()} equipment?`,
      answer:
        "Yes. Share your available space, intended users, training goal and budget range so Span Fitness Equipments can suggest suitable options.",
    },
    {
      question: `How can I request details for ${detail.label.toLowerCase()}?`,
      answer:
        `Use the enquiry form, WhatsApp the team, or call ${phoneDisplay}. The team can discuss availability, specifications and suitable alternatives.`,
    },
    {
      question: `Is ${detail.label.toLowerCase()} suitable for ${program.key === "home" ? "home use" : "commercial fitness spaces"}?`,
      answer:
        program.key === "home"
          ? "Yes, if the equipment matches your room size, workout routine and usage frequency. The team can compare compact and heavy-duty choices."
          : "Yes, when selected around expected footfall, member profile, floor space and service needs. The team can suggest practical commercial options.",
    },
    {
      question: `Can I combine ${detail.label.toLowerCase()} with other equipment?`,
      answer:
        "Yes. Span Fitness Equipments can help combine cardio, strength, benches, accessories and support products into a more complete setup plan.",
    },
  ];
  const relatedLinks = detail.type === "group" ? childLinks : siblingLinks;
  const pageTitle = `${detail.label} ${program.crumbLabel}`;

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ name: pageTitle, description: detail.summary, path: detail.path, type: "CollectionPage" }),
          breadcrumbSchema(crumbs),
          itemListSchema(pageTitle, detail.path, relatedLinks.map(({ name, path }) => ({ name, path }))),
          faqSchema(detailFaqs),
        ]}
      />
      <Breadcrumbs items={crumbs} />

      <section className="fitness-detail-hero relative overflow-hidden py-16 sm:py-24">
        <Image src={program.image} alt={program.imageAlt} fill priority sizes="100vw" className="object-cover opacity-25" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9, 18, 44,.96),rgba(9, 18, 44,.84)_48%,rgba(9, 18, 44,.5)),linear-gradient(180deg,rgba(9, 18, 44,.25),#09122c)]" />
        <div className="absolute -left-24 top-10 size-80 rounded-full bg-coral/18 blur-[110px]" />
        <div className="absolute -right-24 bottom-0 size-80 rounded-full bg-white/8 blur-[120px]" />
        <div className="section-shell relative grid items-center gap-8 lg:grid-cols-[1fr_.78fr]">
          <div>
            <p className="fitness-landing-kicker">
              <Sparkles className="size-4" /> {program.eyebrow}
            </p>
            <h1 className="mt-6 max-w-4xl font-display text-4xl font-black leading-[.98] sm:text-6xl lg:text-7xl">
              {detail.label}
              <span className="block bg-gradient-to-r from-coral via-[#fff7f3] to-coral bg-clip-text italic text-transparent">
                {program.crumbLabel}
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">{detail.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact">Request Quote <ArrowRight className="size-4" /></ButtonLink>
              <ButtonLink href={whatsappUrl(pageTitle)} secondary>
                <MessageCircle className="size-4" /> WhatsApp
              </ButtonLink>
            </div>
          </div>

          <div className="fitness-detail-panel">
            <p className="text-[10px] font-black uppercase tracking-[.22em] text-coral">
              {detail.type === "group" ? "Subsection Overview" : group.label}
            </p>
            <h2 className="mt-3 font-display text-3xl font-black">{detail.summary}</h2>
            <div className="mt-6 grid gap-3">
              {detail.highlights.map((highlight) => (
                <span key={highlight} className="fitness-detail-point">
                  <CheckCircle2 className="size-4 shrink-0 text-coral" />
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {detail.type === "group" ? (
        <section className="py-20 sm:py-24">
          <div className="section-shell">
            <SectionTitle
              eyebrow={`${program.crumbLabel} Subsection`}
              title={`${detail.label} equipment under Span Fitness.`}
              body="Open any option below to view dedicated Span Fitness guidance for that equipment type."
            />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {childLinks.map((item, index) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="fitness-detail-link-card group"
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <span className="fitness-link-card__number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="fitness-link-card__label">{item.name}</span>
                  <span className="fitness-link-card__description">{item.summary}</span>
                  <span className="fitness-link-card__action">
                    View Span Fitness page <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-20 sm:py-24">
          <div className="section-shell grid gap-8 lg:grid-cols-[.92fr_1.08fr]">
            <div>
              <SectionTitle
                eyebrow={`${group.label} Guidance`}
                title={`How ${detail.label} fits your ${program.key === "home" ? "home fitness space" : "gym floor"}.`}
                body={detail.summary}
              />
              <div className="flex flex-wrap gap-3">
                <ButtonLink href={`tel:${business.phone}`}>
                  <Phone className="size-4" /> Call {phoneDisplay}
                </ButtonLink>
                <ButtonLink href={whatsappUrl(pageTitle)} secondary>WhatsApp Details</ButtonLink>
              </div>
            </div>
            <div className="fitness-detail-panel">
              <h2 className="font-display text-3xl font-black">What to consider</h2>
              <div className="mt-5 grid gap-3">
                {[...detail.highlights, ...group.highlights.slice(0, 2)].map((point) => (
                  <span key={point} className="fitness-detail-point">
                    <CheckCircle2 className="size-4 shrink-0 text-coral" />
                    {point}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {siblingLinks.length ? (
        <section className="bg-white/[0.025] py-20 sm:py-24">
          <div className="section-shell">
            <SectionTitle
              eyebrow="Related Span Fitness Pages"
              title={detail.type === "group" ? "Other fitness subsections." : `More ${group.label.toLowerCase()} options.`}
              body="Keep browsing within Span Fitness to compare related equipment guidance."
            />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {siblingLinks.map((item) => (
                <Link key={item.path} href={item.path} className="fitness-related-chip group">
                  <span>
                    <strong>{item.name}</strong>
                    <small>{item.summary}</small>
                  </span>
                  <ArrowRight className="size-4 text-coral transition group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="py-20 sm:py-24">
        <div className="section-shell grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
          <div className="fitness-enquiry-copy">
            <p className="fitness-landing-kicker">Span Fitness Enquiry</p>
            <h2>Ask about {detail.label}.</h2>
            <p>
              Share your location, space size and expected usage. Span Fitness Equipments will help you compare suitable options and next steps.
            </p>
            <a href={whatsappUrl(pageTitle)} className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[.14em] text-coral">
              Message on WhatsApp <ArrowRight className="size-4" />
            </a>
          </div>
          <div className="fitness-form-card">
            <LeadForm requirement={pageTitle} sourcePage={detail.path} compact />
          </div>
        </div>
      </section>

      <FaqSection items={detailFaqs} />
      <CtaBand title={`Need help choosing ${detail.label.toLowerCase()}?`} text="Tell us your space, training goal and budget range. We will help shortlist practical equipment choices." />
    </>
  );
}
