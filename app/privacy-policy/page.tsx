import { CtaBand, PageHero } from "../components/site";
import { business, images } from "../data";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Span Fitness Equipments website enquiries, contact details and service communication.",
};

const policyItems = [
  ["Information We Collect", "We may collect your name, phone number, email address, location, requirement details and messages submitted through enquiry forms, WhatsApp links, calls or email."],
  ["How We Use Information", "We use enquiry information to respond to your request, suggest suitable fitness equipment, share quotations, plan delivery or setup support, and improve our website experience."],
  ["Sharing Of Information", "We do not sell your personal information. Details may be shared only with trusted service partners when required for delivery, installation, support or legal compliance."],
  ["Cookies And Analytics", "The website may use basic cookies or analytics tools to understand page performance and improve usability. You can control cookie settings from your browser."],
  ["Data Security", "We take reasonable care to protect submitted information, but no online transmission or storage method can be guaranteed to be completely secure."],
  ["Contact", `For privacy questions, contact ${business.name} at ${business.email} or call ${business.phone}.`],
] as const;

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero eyebrow="Privacy Policy" title="How we handle your enquiry information." description="This page explains how Span Fitness Equipments collects, uses and protects information shared through this website." image={images.showroom} />
      <section className="py-20 sm:py-24">
        <div className="section-shell max-w-4xl">
          <div className="grid gap-5">
            {policyItems.map(([title, text]) => (
              <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <h2 className="font-display text-2xl font-black">{title}</h2>
                <p className="mt-3 leading-8 text-white/62">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="Need help with your enquiry?" text="Contact Span Fitness Equipments for equipment guidance, quotations and gym setup support." />
    </>
  );
}
