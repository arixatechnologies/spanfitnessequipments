import type { Metadata } from "next";
import { Check, MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqSection } from "@/components/seo/faq-section";
import { LeadForm } from "@/components/forms/lead-form";
import { getPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, itemListSchema, JsonLd, webPageSchema } from "@/lib/schema";
import { ProductCard } from "../../components/cards";
import { ButtonLink, CtaBand, PageHero, SectionTitle } from "../../components/site";
import { categories, findCategory, products, whatsappUrl } from "../../data";

export function generateStaticParams() { return categories.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const item = findCategory((await params).slug);
  return item ? getPageMetadata({ title: item.name, description: item.description, path: `/categories/${item.slug}`, image: item.image }) : {};
}
export default async function CategoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const category = findCategory((await params).slug);
  if (!category) notFound();
  const related = products.filter(item => item.category === category.slug);
  const crumbs = [{ name: "Home", path: "/" }, { name: "Categories", path: "/categories" }, { name: category.name, path: `/categories/${category.slug}` }];
  const faqs = [{ question: `How do I choose the right ${category.name.toLowerCase()}?`, answer: "Start with available space, expected users, training goals, daily usage and budget. Our team can help shortlist suitable configurations." }, { question: `Can I request a quote for ${category.name.toLowerCase()}?`, answer: "Yes. Submit the category enquiry form with your quantity, space and preferred equipment details." }];
  return <><JsonLd data={[webPageSchema({ name: category.name, description: category.description, path: `/categories/${category.slug}` }), breadcrumbSchema(crumbs), itemListSchema(category.name, `/categories/${category.slug}`, related.map((item) => ({ name: item.name, path: `/products/${item.slug}` }))), faqSchema(faqs)]} /><Breadcrumbs items={crumbs} /><PageHero eyebrow="Equipment Category" title={category.name} description={category.description} image={category.image} />
    <section className="py-20"><div className="section-shell grid gap-10 lg:grid-cols-[1.1fr_.9fr]"><div><SectionTitle eyebrow={category.tagline} title="Equipment selected around your space and goals." body="Our team can help compare configurations, intended usage and available options before you choose." /><div className="flex flex-wrap gap-3"><ButtonLink href="/contact">Request a Quote</ButtonLink><ButtonLink href={whatsappUrl(category.name)} secondary><MessageCircle className="size-4" /> WhatsApp</ButtonLink></div></div><div className="rounded-3xl border border-white/10 bg-white/5 p-7"><h2 className="font-display text-2xl font-black">Category highlights</h2><div className="mt-5 grid gap-4">{category.features.map(feature => <div key={feature} className="flex items-center gap-3 text-white/70"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-coral/15 text-coral"><Check className="size-4" /></span>{feature}</div>)}</div></div></div></section>
    <section className="bg-white/[0.025] py-24"><div className="section-shell"><SectionTitle eyebrow="Products" title={`Explore ${category.name}`} />{related.length ? <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{related.map(item => <ProductCard key={item.slug} item={item} />)}</div> : <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center"><p className="text-white/60">Product options are available on enquiry. Contact our team for the current range.</p></div>}</div></section>
    <section className="py-20"><div className="section-shell grid gap-10 lg:grid-cols-2"><div><SectionTitle eyebrow="Category Enquiry" title={`Get a quote for ${category.name}`} body="Share your space, quantity and preferred equipment so our team can suggest relevant options." /></div><div className="rounded-2xl border border-white/10 bg-[#101a38] p-6"><LeadForm requirement={category.name} sourcePage={`/categories/${category.slug}`} compact /></div></div></section>
    <FaqSection items={faqs} /><CtaBand title={`Need help with ${category.name.toLowerCase()}?`} />
  </>;
}
