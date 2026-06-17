import { ArrowRight, BadgePercent, Building2, Dumbbell, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqSection } from "@/components/seo/faq-section";
import { LeadForm } from "@/components/forms/lead-form";
import { getPublicOffers } from "@/lib/public-content";
import { getPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, JsonLd, webPageSchema } from "@/lib/schema";
import { seoFaqs } from "@/src/config/seo-content";
import { ButtonLink, CtaBand, PageHero } from "../components/site";
import { images, whatsappUrl } from "../data";

const title = "Gym Equipment Offers and Setup Packages";
const description = "Explore current gym setup consultation, strength equipment bundle and new fitness equipment enquiry offers from Span Fitness Equipments.";
const offerIcons = [Building2, Dumbbell, Sparkles] as const;
export const dynamic = "force-dynamic";
export function generateMetadata() { return getPageMetadata({ title, description, path: "/offers", image: images.setup }); }

export default async function OffersPage() {
  const offers = await getPublicOffers();
  const crumbs = [{ name: "Home", path: "/" }, { name: "Offers", path: "/offers" }];
  return <><JsonLd data={[webPageSchema({ name: title, description, path: "/offers" }), breadcrumbSchema(crumbs), faqSchema(seoFaqs.offers)]} /><Breadcrumbs items={crumbs} /><PageHero eyebrow="Current Offers" title="More value for your next fitness upgrade." description="Explore project support, equipment bundles and limited-period enquiry offers. Contact us for current product-wise details." image={images.setup} /><section className="py-24"><div className="section-shell grid gap-6 lg:grid-cols-3">{offers.map(({tag,title: offerTitle,text}, index) => { const Icon = offerIcons[index % offerIcons.length]; return <article key={offerTitle} className="relative overflow-hidden rounded-3xl border border-coral/25 bg-gradient-to-br from-wine/55 to-[#101a38] p-8"><BadgePercent className="absolute -right-5 -top-5 size-32 text-white/[0.04]" /><Icon className="size-9 text-coral" /><p className="mt-8 text-xs font-black uppercase tracking-widest text-coral">{tag}</p><h2 className="mt-3 font-display text-3xl font-black">{offerTitle}</h2><p className="mt-4 min-h-24 leading-7 text-white/60">{text}</p><ButtonLink href={whatsappUrl(offerTitle)}>Enquire Now <ArrowRight className="size-4" /></ButtonLink></article>; })}</div><p className="mt-8 text-center text-xs text-white/40">Offers and availability may vary by product, brand and enquiry date. Contact the store for current details.</p><div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-white/10 bg-[#101a38] p-6"><h2 className="mb-6 font-display text-3xl font-black">Request current offer details</h2><LeadForm requirement="Current Fitness Equipment Offers" sourcePage="/offers" compact /></div></section><FaqSection items={seoFaqs.offers} /><CtaBand title="Building a full gym?" text="Share the size of your space and project needs to discuss a tailored package." /></>;
}
