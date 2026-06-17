import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, Youtube } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqSection } from "@/components/seo/faq-section";
import { LeadForm } from "@/components/forms/lead-form";
import { getPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, JsonLd, webPageSchema } from "@/lib/schema";
import { seoFaqs } from "@/src/config/seo-content";
import { ButtonLink, PageHero } from "../components/site";
import { business, images, whatsappUrl } from "../data";

const title = "Contact Our Gym Equipment Store in Visakhapatnam";
const description = "Contact Span Fitness Equipments in Seethampeta, Visakhapatnam for commercial gym equipment, home gym equipment, treadmill and fitness accessory enquiries.";
export function generateMetadata() { return getPageMetadata({ title, description, path: "/contact", image: images.showroom }); }

export default function ContactPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }];
  return <><JsonLd data={[webPageSchema({ name: title, description, path: "/contact", type: "ContactPage" }), breadcrumbSchema(crumbs), faqSchema(seoFaqs.contact)]} /><Breadcrumbs items={crumbs} /><PageHero eyebrow="Contact Span Fitness" title="Let's plan your equipment requirement." description="Call, message or visit our Visakhapatnam showroom for product guidance, availability and gym setup enquiries." image={images.showroom} />
    <section className="py-24"><div className="section-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"><div className="grid gap-4">
      {[[Phone,"Call us",business.phone,`tel:${business.phone}`],[MessageCircle,"WhatsApp",business.customerCare,whatsappUrl()],[Mail,"Email",business.email,`mailto:${business.email}`],[MapPin,"Visit our store",business.address,"https://maps.google.com/?q=Seethampeta+Main+Road+Visakhapatnam"]].map(([Icon,label,value,href]) => { const I=Icon as typeof Phone; return <a key={String(label)} href={String(href)} className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-coral/60"><I className="size-7 text-coral" /><p className="mt-4 text-xs font-bold uppercase tracking-widest text-white/40">{String(label)}</p><p className="mt-2 break-words font-display text-xl font-bold leading-7">{String(value)}</p></a> })}
      <div className="flex gap-3" aria-label="Social profiles coming soon">{[Instagram,Facebook,Youtube].map((Icon,index) => <span key={index} title={`${["Instagram","Facebook","YouTube"][index]} profile`} className="grid size-12 place-items-center rounded-full border border-white/10 text-white/40"><Icon className="size-5" /></span>)}</div>
      <div className="flex flex-wrap gap-3"><ButtonLink href={`tel:${business.phone}`}>Call Now</ButtonLink><ButtonLink href={whatsappUrl("a fitness equipment requirement")} secondary>WhatsApp Enquiry</ButtonLink></div>
    </div><div className="rounded-3xl border border-white/10 bg-[#101a38] p-6 sm:p-9"><h2 className="font-display text-3xl font-black">Send an enquiry</h2><p className="mb-8 mt-3 text-white/55">Your request is saved securely and sent to our team when email notifications are configured.</p><LeadForm sourcePage="/contact" /></div></div>
    <a href="https://maps.google.com/?q=Seethampeta+Main+Road+Visakhapatnam" className="mt-8 grid min-h-72 place-items-center rounded-3xl border border-white/10 bg-gradient-to-br from-wine/70 to-navy p-8 text-center"><div><MapPin className="mx-auto size-10 text-coral" /><h2 className="mt-4 font-display text-3xl font-black">Find us in Seethampeta</h2><p className="mt-2 text-white/65">{business.address}</p></div></a></section>
    <FaqSection items={seoFaqs.contact} />
  </>;
}
