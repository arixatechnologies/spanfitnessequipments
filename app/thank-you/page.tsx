import Link from "next/link";
import { CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { business, whatsappUrl } from "../data";

export const metadata = createMetadata({ title: "Thank You", description: "Your enquiry has been received by Span Fitness Equipments.", path: "/thank-you", noindex: true });

export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ requirement?: string }> }) {
  const { requirement } = await searchParams;
  return <section className="grid min-h-[70vh] place-items-center px-4 py-24"><div className="glass max-w-2xl rounded-3xl p-8 text-center sm:p-12"><CheckCircle2 className="mx-auto size-16 text-coral" /><p className="mt-6 text-xs font-black uppercase tracking-[.2em] text-coral">Enquiry Received</p><h1 className="mt-3 font-display text-4xl font-black sm:text-5xl">Thank you for contacting us.</h1><p className="mx-auto mt-5 max-w-xl leading-8 text-white/65">Our team will review your {requirement ? requirement.toLowerCase() : "fitness equipment requirement"} and contact you. For urgent assistance, call or WhatsApp us now.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><a href={`tel:${business.phone}`} className="inline-flex min-h-12 items-center gap-2 rounded-md bg-gradient-to-r from-ember to-coral px-6 font-bold"><Phone className="size-4" /> Call {business.phone}</a><a href={`tel:${business.customerCare}`} className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/20 px-6 font-bold"><Phone className="size-4" /> Call {business.customerCare}</a><a href={whatsappUrl(requirement || "my enquiry")} className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/20 px-6 font-bold"><MessageCircle className="size-4" /> WhatsApp</a><Link href="/" className="inline-flex min-h-12 items-center rounded-md border border-white/20 px-6 font-bold">Back Home</Link></div></div></section>;
}
