import { CtaBand, PageHero } from "../components/site";
import { business, images } from "../data";

export const metadata = {
  title: "Terms & Conditions",
  description: "Terms and Conditions for using the Span Fitness Equipments website and enquiry services.",
};

const termItems = [
  ["Website Use", "By using this website, you agree to use it only for lawful enquiries related to fitness equipment, accessories, gym setup and related services."],
  ["Product Information", "Product images, descriptions, features, availability and pricing may change without prior notice. Final details should be confirmed directly with our team before purchase."],
  ["Enquiries And Quotations", "Submitting an enquiry does not create a confirmed order. Quotations, delivery timelines, installation details and payment terms are confirmed separately."],
  ["Payments And Orders", "Any purchase, advance payment, cancellation, warranty or service condition will follow the terms communicated at the time of order confirmation."],
  ["External Links", "The website may include links to WhatsApp, social media, maps or third-party services. Span Fitness Equipments is not responsible for third-party website content or policies."],
  ["Contact", `For questions about these terms, contact ${business.name} at ${business.email} or call ${business.phone}.`],
] as const;

export default function TermsAndConditionsPage() {
  return (
    <>
      <PageHero eyebrow="Terms & Conditions" title="Website terms for enquiries and product information." description="Please read these terms before using the Span Fitness Equipments website or submitting an enquiry." image={images.setup} />
      <section className="py-20 sm:py-24">
        <div className="section-shell max-w-4xl">
          <div className="grid gap-5">
            {termItems.map(([title, text]) => (
              <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <h2 className="font-display text-2xl font-black">{title}</h2>
                <p className="mt-3 leading-8 text-white/62">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="Planning a fitness equipment purchase?" text="Speak with our team to confirm product options, availability and setup details." />
    </>
  );
}
