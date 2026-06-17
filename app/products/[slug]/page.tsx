import type { Metadata } from "next";
import Image from "next/image";
import { Check, MessageCircle, Phone } from "lucide-react";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqSection } from "@/components/seo/faq-section";
import { LeadForm } from "@/components/forms/lead-form";
import { absoluteUrl, getPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, JsonLd, webPageSchema } from "@/lib/schema";
import { siteConfig } from "@/src/config/site";
import { ProductCard } from "../../components/cards";
import { ButtonLink, SectionTitle } from "../../components/site";
import { business, findBrand, findCategory, findProduct, products, whatsappUrl } from "../../data";

export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const item = findProduct((await params).slug);
  return item ? getPageMetadata({ title: item.name, description: `${item.short} Enquire with Span Fitness Equipments in Visakhapatnam for specifications and availability.`, path: `/products/${item.slug}`, image: item.image }) : {};
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = findProduct((await params).slug);
  if (!product) notFound();
  const category = findCategory(product.category);
  const brand = findBrand(product.brand);
  const related = products.filter(item => item.slug !== product.slug && (item.category === product.category || item.brand === product.brand)).slice(0, 3);
  const crumbs = [{ name: "Home", path: "/" }, { name: "Categories", path: "/categories" }, ...(category ? [{ name: category.name, path: `/categories/${category.slug}` }] : []), { name: product.name, path: `/products/${product.slug}` }];
  const faqs = [
    { question: `Is ${product.name} available now?`, answer: "Availability can change. Submit the product enquiry form or contact Span Fitness Equipments for current stock and comparable options." },
    { question: `Can you provide specifications and delivery details for ${product.name}?`, answer: "Yes. Share your location and intended use so the team can confirm relevant specifications, delivery and setup information." }
  ];
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${absoluteUrl(`/products/${product.slug}`)}#product`,
    name: product.name,
    sku: product.slug.toUpperCase(),
    mpn: product.slug.toUpperCase(),
    description: product.description,
    image: [absoluteUrl(product.image)],
    brand: { "@type": "Brand", name: brand?.name || product.brand },
    category: category?.name,
    url: absoluteUrl(`/products/${product.slug}`),
    audience: { "@type": "Audience", audienceType: product.accessory ? "Home and commercial fitness users" : "Home gyms, commercial gyms and fitness facilities" },
    additionalProperty: product.features.map((feature) => ({ "@type": "PropertyValue", name: "Feature", value: feature })),
    seller: { "@id": `${siteConfig.url}/#organization` },
    potentialAction: { "@type": "QuoteAction", target: absoluteUrl(`/contact?product=${product.slug}`), name: `Request a quote for ${product.name}` }
  };
  return <><JsonLd data={[webPageSchema({ name: product.name, description: product.short, path: `/products/${product.slug}`, type: "ItemPage" }), productSchema, breadcrumbSchema(crumbs), faqSchema(faqs)]} /><Breadcrumbs items={crumbs} />
    <section className="py-16 sm:py-24"><div className="section-shell"><div className="grid items-center gap-10 lg:grid-cols-2"><div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-white/5"><Image src={product.image} alt={`${product.name} from Span Fitness Equipments`} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />{product.isNew && <span className="absolute left-5 top-5 rounded-full bg-coral px-4 py-2 text-xs font-black uppercase tracking-widest">New Arrival</span>}</div><div><p className="text-xs font-black uppercase tracking-[0.2em] text-coral">{brand?.name ?? product.brand}</p><h1 className="mt-4 font-display text-4xl font-black leading-tight sm:text-6xl">{product.name}</h1><p className="mt-5 text-lg leading-8 text-white/65">{product.description}</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{product.features.map(feature => <div key={feature} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 text-sm"><Check className="size-4 shrink-0 text-coral" />{feature}</div>)}</div><div className="mt-8 flex flex-wrap gap-3"><ButtonLink href={whatsappUrl(product.name)}><MessageCircle className="size-4" /> Enquire on WhatsApp</ButtonLink><ButtonLink href={`tel:${business.phone}`} secondary><Phone className="size-4" /> Call Now</ButtonLink></div></div></div></div></section>
    <section className="bg-white/[0.025] py-24"><div className="section-shell grid gap-10 lg:grid-cols-[1fr_.8fr]"><div><SectionTitle eyebrow="Request Product Details" title={`Enquire about ${product.name}`} body="Ask about availability, suitable configurations, delivery and setup." /><div className="flex flex-wrap gap-3"><ButtonLink href={`tel:${business.phone}`}>Call Now</ButtonLink><ButtonLink href={whatsappUrl(product.name)} secondary>WhatsApp Enquiry</ButtonLink></div></div><div className="rounded-2xl border border-white/10 bg-[#101a38] p-6"><LeadForm requirement={product.name} sourcePage={`/products/${product.slug}`} compact /></div></div></section>
    <section className="py-24"><div className="section-shell"><SectionTitle eyebrow="You May Also Like" title="Related equipment" /><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{related.map(item => <ProductCard key={item.slug} item={item} />)}</div></div></section>
    <FaqSection items={faqs} />
  </>;
}
