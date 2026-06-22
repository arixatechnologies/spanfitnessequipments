import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { getPublicProducts } from "@/lib/public-content";
import { getPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, itemListSchema, JsonLd, webPageSchema } from "@/lib/schema";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, MessageCircle, Sparkles } from "lucide-react";
import { ButtonLink, CtaBand } from "../components/site";
import { images, whatsappUrl } from "../data";

const title = "New Fitness Equipment Arrivals";
const description = "Discover new treadmills, ellipticals, exercise bikes, multi gyms, benches and fitness accessories at Span Fitness Equipments in Visakhapatnam.";
export const dynamic = "force-dynamic";
export function generateMetadata() { return getPageMetadata({ title, description, path: "/new-arrivals", image: images.treadmill }); }

export default async function NewArrivalsPage() {
  const products = await getPublicProducts();
  const arrivals = products.filter(item => item.isNew);
  const crumbs = [{ name: "Home", path: "/" }, { name: "New Arrivals", path: "/new-arrivals" }];

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ name: title, description, path: "/new-arrivals", type: "CollectionPage" }),
          breadcrumbSchema(crumbs),
          itemListSchema(title, "/new-arrivals", arrivals.map((item) => ({ name: item.name, path: `/new-arrivals#${item.slug}` })))
        ]}
      />
      <Breadcrumbs items={crumbs} />
      <section className="fresh-equipment-hero">
        <Image
          src={images.arrivals.performanceTreadmill}
          alt="Fresh fitness equipment arrivals at Span Fitness Equipments"
          fill
          priority
          sizes="100vw"
          className="fresh-equipment-hero__image"
        />
        <div className="fresh-equipment-hero__veil" />
        <div className="fresh-equipment-hero__grid" />
        <div className="fresh-equipment-hero__orb fresh-equipment-hero__orb--one" />
        <div className="fresh-equipment-hero__orb fresh-equipment-hero__orb--two" />
        <div className="section-shell relative z-10 grid items-center gap-8 lg:grid-cols-[1.04fr_.96fr]">
          <div>
            <p className="fresh-equipment-hero__kicker">
              <Sparkles className="size-4" /> Fresh Equipment
            </p>
            <h1>New arrivals for stronger training spaces.</h1>
            <p>
              Explore recent cardio, strength and accessory additions, with quick enquiry support for specifications and availability.
            </p>
            <div className="fresh-equipment-hero__actions">
              <ButtonLink href="#fresh-arrivals-list">
                View Arrivals <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink href={whatsappUrl("New Fitness Equipment Arrivals")} secondary>
                <MessageCircle className="size-4" /> Enquire Now
              </ButtonLink>
            </div>
          </div>

          <div className="fresh-equipment-hero__panel">
            <div className="fresh-equipment-hero__panel-head">
              <span>
                <BadgeCheck className="size-4" /> Just Landed
              </span>
              <strong>{arrivals.length}</strong>
            </div>
            <div className="fresh-equipment-hero__mini-list">
              {arrivals.slice(0, 3).map((item, index) => (
                <Link key={item.slug} href={`#${item.slug}`} className="fresh-equipment-hero__mini-card">
                  <span className="fresh-equipment-hero__mini-image">
                    <Image src={item.image} alt={`${item.name} new arrival`} fill sizes="96px" className="object-cover" />
                  </span>
                  <span>
                    <small>0{index + 1} / {item.brand.replaceAll("-", " ")}</small>
                    <b>{item.name}</b>
                  </span>
                  <ArrowRight className="size-4" />
                </Link>
              ))}
            </div>
            <div className="fresh-equipment-hero__chips">
              <span>Cardio</span>
              <span>Strength</span>
              <span>Accessories</span>
            </div>
          </div>
        </div>
      </section>
      <section id="fresh-arrivals-list" className="bg-[#fff7f3] py-20 text-navy">
        <div className="section-shell space-y-8">
          {arrivals.map((item, index) => (
            <article
              id={item.slug}
              key={item.slug}
              className="scroll-mt-28 overflow-hidden rounded-[2rem] border border-white bg-white shadow-[0_24px_70px_rgba(9, 18, 44,.12)]"
            >
              <div className="grid gap-0 lg:grid-cols-[.95fr_1.05fr]">
                <div className="relative min-h-72 overflow-hidden bg-navy sm:min-h-96">
                  <Image
                    src={item.image}
                    alt={`${item.name} new arrival fitness equipment`}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/45 via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full border border-white/25 bg-coral px-4 py-2 text-[10px] font-black uppercase tracking-[.22em] text-white shadow-glow">
                    Just Landed
                  </span>
                </div>
                <div className="relative p-6 sm:p-8 lg:p-10">
                  <span className="absolute right-6 top-5 font-display text-6xl font-black text-coral/10">0{index + 1}</span>
                  <p className="text-xs font-black uppercase tracking-[.22em] text-coral">{item.brand.replaceAll("-", " ")}</p>
                  <h2 className="mt-3 max-w-xl font-display text-3xl font-black leading-tight sm:text-4xl">{item.name}</h2>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-navy/65">{item.description}</p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {item.features.map(feature => (
                      <span key={feature} className="rounded-full border border-coral/15 bg-coral/5 px-4 py-3 text-sm font-bold text-navy/75">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href={`/products/${item.slug}`} className="inline-flex items-center rounded-md bg-navy px-5 py-3 text-sm font-black text-white transition hover:bg-coral">
                      Full Product Page <ArrowRight className="ml-2 size-4" />
                    </Link>
                    <a href={whatsappUrl(item.name)} className="inline-flex items-center rounded-md border border-coral/25 bg-white px-5 py-3 text-sm font-black text-coral transition hover:border-coral hover:bg-coral hover:text-white">
                      <MessageCircle className="mr-2 size-4" /> Enquire Now
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBand title="Seen something that fits?" text="Ask our team about product specifications, availability, delivery and comparable options." />
    </>
  );
}
