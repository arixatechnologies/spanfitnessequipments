import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Dumbbell, RotateCcw, Shield, Sparkles, Waves, Weight } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqSection } from "@/components/seo/faq-section";
import { getPublicCategories, getPublicProducts } from "@/lib/public-content";
import { getPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, itemListSchema, JsonLd, webPageSchema } from "@/lib/schema";
import { seoFaqs } from "@/src/config/seo-content";
import { CtaBand } from "../components/site";

const title = "Fitness Equipment Categories";
const description = "Explore cardio equipment, strength machines, commercial gym setup equipment, home gym products, functional training equipment and fitness accessories in Visakhapatnam.";
const heroImage = "/images/categories/catagories%20bg.png";

export const dynamic = "force-dynamic";
export function generateMetadata() {
  return getPageMetadata({ title, description, path: "/categories", image: heroImage });
}

export default async function CategoriesPage() {
  const [categories, products] = await Promise.all([getPublicCategories(), getPublicProducts()]);
  const accessories = products.filter((item) => (item.accessory || item.category === "fitness-accessories") && item.slug !== "training-gloves");
  const allFaqs = [...seoFaqs.categories, ...seoFaqs.accessories];
  const crumbs = [{ name: "Home", path: "/" }, { name: "Categories", path: "/categories" }];

  return (
    <div className="categories-lux-page">
      <div className="categories-lux-page__mesh" />
      <div className="categories-lux-page__orb categories-lux-page__orb--one" />
      <div className="categories-lux-page__orb categories-lux-page__orb--two" />
      <div className="categories-lux-page__runner" />
      <JsonLd
        data={[
          webPageSchema({ name: title, description, path: "/categories", type: "CollectionPage" }),
          breadcrumbSchema(crumbs),
          itemListSchema(title, "/categories", [
            ...categories.map((item) => ({ name: item.name, path: `/categories/${item.slug}` })),
            ...accessories.map((item) => ({ name: item.name, path: `/products/${item.slug}` })),
          ]),
          faqSchema(allFaqs),
        ]}
      />
      <Breadcrumbs items={crumbs} />

      <section
        className="categories-lux-hero"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(255, 247, 243, 0.96) 0%, rgba(255, 247, 243, 0.9) 42%, rgba(255, 247, 243, 0.62) 70%, rgba(255, 247, 243, 0.42) 100%), url(${heroImage})`,
        }}
      >
        <div className="section-shell">
          <div className="categories-lux-hero__copy">
            <p className="categories-lux-kicker">
              <Sparkles className="size-4" /> Equipment Categories
            </p>
            <h1>
              Find equipment by
              <span> the way you train.</span>
            </h1>
            <p>
              A compact guide to cardio, strength, home gym, commercial setup, functional training and accessories without scrolling through oversized sections.
            </p>
            <div className="categories-lux-hero__chips">
              <span>{categories.length} Core Categories</span>
              <span>Cardio + Strength</span>
              <span>Setup Guidance</span>
            </div>
          </div>
        </div>
      </section>

      <section className="categories-lux-grid-section">
        <div className="section-shell">
          <div className="categories-lux-heading">
            <p>Product Categories</p>
            <h2>Compact choices. Clear direction.</h2>
          </div>
          <div className="categories-lux-grid">
            {categories.map((item, index) => (
              <Link key={item.slug} href={`/categories/${item.slug}`} className="categories-lux-card group" style={{ animationDelay: `${index * 70}ms` }}>
                <span className="categories-lux-card__line" />
                <div className="categories-lux-card__media">
                  <Image src={item.image} alt={`${item.name} from Span Fitness Equipments`} fill sizes="(min-width: 1024px) 18vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="categories-lux-card__copy">
                  <p>{item.tagline}</p>
                  <h3>{item.name}</h3>
                  <span>{item.description}</span>
                  <div className="categories-lux-card__features">
                    {item.features.slice(0, 2).map((feature) => (
                      <small key={feature}>
                        <CheckCircle2 className="size-3.5" /> {feature}
                      </small>
                    ))}
                  </div>
                </div>
                <b>
                  View <ArrowRight className="size-4" />
                </b>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="accessories" className="categories-accessory-studio scroll-mt-28">
        <div className="section-shell">
          <div className="categories-lux-heading categories-lux-heading--split">
            <div>
              <p>Fitness Accessories</p>
              <h2>Small essentials, strong workouts.</h2>
            </div>
            <span>Free weights, mats, bands, belts and practical add-ons for home and commercial spaces.</span>
          </div>

          <div className="categories-accessory-icons">
            {[
              [Dumbbell, "Dumbbells"],
              [Weight, "Plates"],
              [Waves, "Mats"],
              [RotateCcw, "Bands & Ropes"],
              [Shield, "Belts"],
            ].map(([Icon, label], index) => {
              const I = Icon as typeof Dumbbell;
              return (
                <div key={String(label)} className="categories-accessory-chip" style={{ animationDelay: `${index * 55}ms` }}>
                  <I className="size-4" />
                  <span>{String(label)}</span>
                </div>
              );
            })}
          </div>

          {accessories.length ? (
            <div className="categories-accessory-products">
              {accessories.map((item, index) => (
                <Link key={item.slug} href={`/products/${item.slug}`} className="categories-accessory-product group" style={{ animationDelay: `${index * 55}ms` }}>
                  <span className="categories-accessory-product__image">
                    <Image src={item.image} alt={`${item.name} fitness accessory`} fill sizes="96px" className="object-cover transition duration-500 group-hover:scale-110" />
                  </span>
                  <span className="categories-accessory-product__copy">
                    <small>{item.brand.replaceAll("-", " ")}</small>
                    <strong>{item.name}</strong>
                    <em>{item.short}</em>
                  </span>
                  <ArrowRight className="size-4 text-coral transition group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="categories-empty-state">
              <p>Accessory options are available on enquiry. Contact our team for the current range.</p>
            </div>
          )}
        </div>
      </section>

      <FaqSection items={allFaqs} />
      <CtaBand title="Need equipment or accessories in quantity?" text="Enquire about category options, accessory packages and complete gym setup requirements." />
    </div>
  );
}
