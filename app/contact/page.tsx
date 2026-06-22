import Image from "next/image";
import type { CSSProperties } from "react";
import {
  ArrowRight,
  Building2,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqSection } from "@/components/seo/faq-section";
import { LeadForm } from "@/components/forms/lead-form";
import { getPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, JsonLd, webPageSchema } from "@/lib/schema";
import { seoFaqs } from "@/src/config/seo-content";
import { ButtonLink } from "../components/site";
import { business, images, whatsappUrl } from "../data";

const title = "Contact Span Fitness Equipments";
const description =
  "Contact Span Fitness Equipments for commercial gym equipment, home fitness equipment, gym setup support and branch location details across Andhra Pradesh and Telangana.";

type BranchLocation = {
  city: string;
  address: string;
  landmark?: string;
  note?: string;
};

const branches: BranchLocation[] = [
  {
    city: "Srikakulam",
    address: "Door No. 17-88, Ground Floor, KIMS Hospital Road, Ambedkar Junction, Srikakulam - 532001, Andhra Pradesh.",
    landmark: "Opposite KIMS Hospital",
  },
  {
    city: "Vizianagaram",
    address: "Opp. LIC Building, beside TVS Showroom, Vizianagaram, Andhra Pradesh - 535003.",
  },
  {
    city: "Visakhapatnam",
    address: "Door No. 50-81-26, Span Fitness Equipments, Main Road, Seethammapeta Junction, Visakhapatnam - 530016, Andhra Pradesh.",
  },
  {
    city: "Kakinada",
    address: "D.No. 2-1-60, First Floor, Koppana Complex, near Bhanugudi Junction, Kakinada - 533003, Andhra Pradesh.",
  },
  {
    city: "Vijayawada",
    address:
      "No. 106, Church of South India Complex, Near Indira Gandhi Municipal Stadium Road, Bishop High School Compound, Kasturibaipet, Vijayawada - 520010.",
  },
  {
    city: "Hyderabad",
    address: "First Floor, Building No. 83/1, opposite Pakwaan Grand Restaurant, Gachibowli, Rai Durg, Telangana - 500032.",
  },
  {
    city: "Ongole",
    address: "Door No. 37-1-404/C5, Near Ramya Foods, Bhagya Nagar, Trunk Road, Ongole - 523001.",
  },
  {
    city: "Nellore",
    address: "Grand Trunk Road, Trunk Road, Nellore - 524001.",
    landmark: "Opposite VRC Grounds / near Gandhi Statue",
  },
  {
    city: "Cuddapah / Kadapa",
    address: "Span Fitness Cuddapah Kadapa Andhra Pradesh",
    note: "Exact full address is pending confirmation. This opens a Google Maps search for the Kadapa branch.",
  },
  {
    city: "Ananthapuramu / Anantapur",
    address: "No. 15/27, KFC Upstairs, Subhash Road, Opposite Anantapur Club, Anantapur - 515001.",
  },
];

const planningSteps = ["Share space details", "Choose equipment type", "Get location support", "Finalize your shortlist"];

function mapUrl(branch: BranchLocation) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${branch.city} ${branch.address}`)}`;
}

export function generateMetadata() {
  return getPageMetadata({ title, description, path: "/contact", image: images.showroom });
}

export default function ContactPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }];
  const mainBranch = branches.find((branch) => branch.city === "Visakhapatnam") || branches[0];

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ name: title, description, path: "/contact", type: "ContactPage" }),
          breadcrumbSchema(crumbs),
          faqSchema(seoFaqs.contact),
        ]}
      />
      <Breadcrumbs items={crumbs} />

      <section className="contact-page-hero">
        <Image
          src={images.showroom}
          alt="Span Fitness Equipments contact and showroom"
          fill
          priority
          sizes="100vw"
          className="contact-page-hero__image"
        />
        <div className="contact-page-hero__veil" />
        <div className="contact-page-hero__grid" />
        <div className="contact-page-hero__orb contact-page-hero__orb--one" />
        <div className="contact-page-hero__orb contact-page-hero__orb--two" />
        <div className="section-shell relative z-10 grid items-center gap-8 lg:grid-cols-[1.02fr_.98fr]">
          <div>
            <p className="contact-page-kicker">
              <Sparkles className="size-4" /> Contact Span Fitness
            </p>
            <h1>Let us help plan your fitness equipment requirement.</h1>
            <p>
              Call, WhatsApp, email or visit a nearby branch for commercial gym equipment, home fitness equipment,
              accessories and complete gym setup guidance.
            </p>
            <div className="contact-page-hero__actions">
              <ButtonLink href={`tel:${business.phone}`}>
                Call Now <Phone className="size-4" />
              </ButtonLink>
              <ButtonLink href={whatsappUrl("fitness equipment and branch location support")} secondary>
                <MessageCircle className="size-4" /> WhatsApp
              </ButtonLink>
            </div>
          </div>

          <div className="contact-hero-card">
            <span className="contact-hero-card__badge">
              <Building2 className="size-4" /> Main Showroom
            </span>
            <h2>Visakhapatnam</h2>
            <p>{mainBranch.address}</p>
            <div className="contact-hero-card__quick">
              <a href={`tel:${business.phone}`}>
                <Phone className="size-4" /> {business.phone}
              </a>
              <a href={`tel:${business.customerCare}`}>
                <Phone className="size-4" /> {business.customerCare}
              </a>
              <a href={`mailto:${business.email}`}>
                <Mail className="size-4" /> {business.email}
              </a>
            </div>
            <a href={mapUrl(mainBranch)} target="_blank" rel="noreferrer" className="contact-hero-card__map">
              Open Visakhapatnam Location <Navigation className="size-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="contact-page-body">
        <div className="contact-page-body__glow contact-page-body__glow--one" />
        <div className="contact-page-body__glow contact-page-body__glow--two" />
        <div className="section-shell relative z-10">
          <div className="contact-page-main-grid">
            <div className="contact-page-form-card">
              <p className="contact-page-kicker">
                <Send className="size-4" /> Send Enquiry
              </p>
              <h2>Share your requirement.</h2>
              <p>
                Tell us the product, city and setup need. Our team will guide you quickly.
              </p>
              <LeadForm sourcePage="/contact" compact />
            </div>

            <div className="contact-page-plan-card">
              <p className="contact-page-kicker">
                <Clock3 className="size-4" /> How We Help
              </p>
              <h2>Quick, clear support.</h2>
              <div className="contact-page-plan-card__steps">
                {planningSteps.map((step, index) => (
                  <span key={step}>
                    <strong>{String(index + 1).padStart(2, "0")}</strong>
                    {step}
                  </span>
                ))}
              </div>
              <a href={whatsappUrl("nearest Span Fitness branch and equipment guidance")} className="contact-page-plan-card__cta">
                Ask for nearest branch <ArrowRight className="size-4" />
              </a>
            </div>
          </div>

          <div className="contact-branches-head">
            <div>
              <p className="contact-page-kicker">
                <MapPin className="size-4" /> Branch Locations
              </p>
              <h2>Choose your nearest branch.</h2>
            </div>
            <p>
              Tap the location button to open the branch directly on Google Maps.
            </p>
          </div>

          <div className="contact-branch-route">
            {branches.map((branch, index) => (
              <a
                key={branch.city}
                href={mapUrl(branch)}
                target="_blank"
                rel="noreferrer"
                className="contact-branch-card"
                style={{ "--branch-delay": `${index * 55}ms` } as CSSProperties}
              >
                <span className="contact-branch-card__node">
                  <MapPin className="size-4" />
                </span>
                <h3>{branch.city}</h3>
                <span className="contact-branch-card__action">
                  Location <Navigation className="size-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={seoFaqs.contact} />
    </>
  );
}
