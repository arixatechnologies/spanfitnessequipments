import { Dumbbell, Hand, RotateCcw, Shield, Waves, Weight } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqSection } from "@/components/seo/faq-section";
import { getPublicProducts } from "@/lib/public-content";
import { getPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, itemListSchema, JsonLd, webPageSchema } from "@/lib/schema";
import { seoFaqs } from "@/src/config/seo-content";
import { ProductCard } from "../components/cards";
import { CtaBand, PageHero, SectionTitle } from "../components/site";
import { images } from "../data";

const title = "Gym Accessories in Visakhapatnam";
const description = "Shop dumbbells, gloves, mats, resistance bands, weight plates, kettlebells, gym belts, skipping ropes and fitness accessories from Span Fitness Equipments.";
export const dynamic = "force-dynamic";
export function generateMetadata() { return getPageMetadata({ title, description, path: "/accessories", image: images.accessories }); }

export default async function AccessoriesPage() {
  const products = await getPublicProducts();
  const accessories = products.filter(item => item.accessory);
  const crumbs = [{ name: "Home", path: "/" }, { name: "Accessories", path: "/accessories" }];
  return <><JsonLd data={[webPageSchema({ name: title, description, path: "/accessories", type: "CollectionPage" }), breadcrumbSchema(crumbs), itemListSchema(title, "/accessories", accessories.map((item) => ({ name: item.name, path: `/products/${item.slug}` }))), faqSchema(seoFaqs.accessories)]} /><Breadcrumbs items={crumbs} /><PageHero eyebrow="Fitness Essentials" title="Small equipment. Big training possibilities." description="Complete your gym with free weights, mats, gloves, bands, belts and functional accessories for every workout zone." image={images.accessories} /><section className="py-20"><div className="section-shell"><SectionTitle eyebrow="Accessory Range" title="Everyday essentials for home and commercial gyms." /><div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">{[[Dumbbell,"Dumbbells"],[Weight,"Plates"],[Hand,"Gloves"],[Waves,"Mats"],[RotateCcw,"Bands & Ropes"],[Shield,"Belts"]].map(([Icon,label]) => { const I=Icon as typeof Dumbbell; return <div key={String(label)} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center"><I className="mx-auto size-7 text-coral" /><p className="mt-3 text-sm font-bold">{String(label)}</p></div> })}</div></div></section><section className="bg-white/[0.025] py-24"><div className="section-shell grid gap-6 md:grid-cols-2 lg:grid-cols-3">{accessories.map(item => <ProductCard key={item.slug} item={item} />)}</div></section><FaqSection items={seoFaqs.accessories} /><CtaBand title="Need accessories in quantity?" text="Enquire about weight ranges, available variants and accessory packages for new gym setups." /></>;
}
