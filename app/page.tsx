import HomeClient from "./home-client";
import { FaqSection } from "@/components/seo/faq-section";
import { faqSchema, JsonLd, webPageSchema } from "@/lib/schema";
import { getPageMetadata } from "@/lib/seo";
import { seoFaqs } from "@/src/config/seo-content";

const description = "Span Fitness Equipments is a gym equipment dealer in Visakhapatnam supplying commercial gym machines, home gym equipment, treadmills and fitness accessories.";

export function generateMetadata() {
  return getPageMetadata({ title: "Gym Equipment Dealer in Visakhapatnam", description, path: "/" });
}

export default function HomePage() {
  return <><JsonLd data={[webPageSchema({ name: "Gym Equipment Dealer in Visakhapatnam", description, path: "/", type: "HomePage" }), faqSchema(seoFaqs.home)]} /><HomeClient /><FaqSection items={seoFaqs.home} /></>;
}
