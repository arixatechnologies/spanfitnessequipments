import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqSection } from "@/components/seo/faq-section";
import { getPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, itemListSchema, JsonLd, webPageSchema } from "@/lib/schema";
import { seoFaqs } from "@/src/config/seo-content";
import { CategoryCard } from "../components/cards";
import { CtaBand, PageHero } from "../components/site";
import { categories, images } from "../data";

const title = "Fitness Equipment Categories";
const description = "Explore cardio equipment, strength machines, commercial gym setup equipment, home gym products, functional training equipment and fitness accessories in Visakhapatnam.";
export function generateMetadata() { return getPageMetadata({ title, description, path: "/categories", image: images.gym }); }

export default function CategoriesPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Categories", path: "/categories" }];
  return <><JsonLd data={[webPageSchema({ name: title, description, path: "/categories", type: "CollectionPage" }), breadcrumbSchema(crumbs), itemListSchema(title, "/categories", categories.map((item) => ({ name: item.name, path: `/categories/${item.slug}` }))), faqSchema(seoFaqs.categories)]} /><Breadcrumbs items={crumbs} /><PageHero eyebrow="Equipment Categories" title="Find equipment by the way you train." description="Browse complete categories for cardio, strength, commercial setups, home gyms, functional training and everyday accessories." image={images.gym} /><section className="py-24"><div className="section-shell grid gap-6 md:grid-cols-2 lg:grid-cols-3">{categories.map(item => <CategoryCard key={item.slug} item={item} />)}</div></section><FaqSection items={seoFaqs.categories} /><CtaBand /></>;
}
