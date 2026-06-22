import { getPublicCategories, getPublicProducts } from "@/lib/public-content";
import { getPageMetadata } from "@/lib/seo";
import { seoFaqs } from "@/src/config/seo-content";
import { FitnessLandingPage, type FitnessLandingContent } from "../components/fitness-landing";
import { images } from "../data";
import { getFitnessLandingGroups } from "../fitness-pages";

const title = "Gym Fitness Equipment and Commercial Gym Setup";
const description = "Plan commercial gym fitness spaces with cardio machines, strength equipment, multi play station equipment, free weights and accessories from Span Fitness Equipments.";

export const dynamic = "force-dynamic";

export function generateMetadata() {
  return getPageMetadata({
    title,
    description,
    path: "/gym-fitness",
    image: images.setup,
    keywords: [
      "gym fitness equipment",
      "commercial gym equipment in Visakhapatnam",
      "commercial gym setup",
      "multi play station equipment",
      "gym equipment dealer",
    ],
  });
}

const content: FitnessLandingContent = {
  categorySectionFirst: true,
  path: "/gym-fitness",
  crumbLabel: "Gym Fitness",
  title,
  description,
  eyebrow: "Gym Fitness",
  heroTitle: "Plan a complete gym that trains every member well.",
  heroText: "Build cardio, strength, free-weight, functional and accessory zones with equipment selected around space, usage, safety and long-term performance.",
  heroImage: images.setup,
  heroAlt: "Commercial gym equipment setup from Span Fitness Equipments",
  heroBadge: "Commercial and shared fitness spaces",
  audience: ["Commercial gyms", "Apartments", "Hotels", "Studios", "Institutions"],
  stats: [
    { value: "Cardio + Strength", label: "Core Zones" },
    { value: "Multi", label: "Station Options" },
    { value: "10+", label: "Service Locations" },
  ],
  cards: [
    { title: "Cardio zones", text: "Treadmills, bikes, ellipticals and cross trainers arranged for smooth member flow." },
    { title: "Strength floors", text: "Selectorized machines, benches, racks, free weights and multi play station equipment." },
    { title: "Functional areas", text: "Conditioning and movement equipment for studios, turf zones and group workouts." },
    { title: "Setup guidance", text: "Equipment mix planning for usage level, space, budget and future expansion." },
  ],
  equipmentLinksEyebrow: "Span Fitness Gym Fitness",
  equipmentLinksTitle: "Gym fitness subsections.",
  equipmentLinksBody: "Open a Span Fitness subsection for commercial cardio, strength and body analyser guidance without leaving this website.",
  equipmentGroups: getFitnessLandingGroups("gym"),
  categorySlugs: ["commercial-gym-setup", "cardio-equipment", "strength-equipment", "functional-training", "fitness-accessories"],
  categoryEyebrow: "Commercial Equipment Range",
  categoryTitle: "Create clear zones for every training need.",
  categoryBody: "Browse the core categories used in commercial gyms, apartments, hotels, institutions and premium studios.",
  productSlugs: [
    "performance-treadmill-x7",
    "commercial-elliptical-pro",
    "studio-exercise-bike",
    "heavy-duty-multi-gym",
    "multi-play-station-equipment",
    "adjustable-training-bench",
    "rubber-dumbbell-set",
    "olympic-weight-plates",
  ],
  productEyebrow: "Gym Equipment Picks",
  productTitle: "Equipment for active training floors.",
  productBody: "Use these as a starting point for planning cardio, strength and accessory zones. Ask for current options and project combinations.",
  planEyebrow: "Gym Setup Flow",
  planTitle: "A good gym layout starts before equipment selection.",
  planBody: "The right plan balances user movement, machine spacing, training variety and service access.",
  steps: [
    { title: "Map the floor", text: "Share dimensions, entry points, power points and expected user count." },
    { title: "Define training zones", text: "Separate cardio, selectorized strength, free weights, functional training and accessory areas." },
    { title: "Select equipment mix", text: "Choose products by usage intensity, durability, maintenance needs and investment range." },
    { title: "Plan delivery and setup", text: "Coordinate equipment movement, placement and future expansion space before ordering." },
  ],
  formTitle: "Tell us about your gym project.",
  formText: "Share the space type, size, city and required zones. We will help shortlist a practical commercial equipment mix.",
  formRequirement: "Commercial Gym Fitness Equipment",
  ctaTitle: "Planning a new commercial gym?",
  ctaText: "Send your floor size, usage level and budget. Span Fitness Equipments can help shape the equipment plan.",
  faqs: seoFaqs.gymFitness,
};

export default async function GymFitnessPage() {
  const [categories, products] = await Promise.all([getPublicCategories(), getPublicProducts()]);

  return <FitnessLandingPage content={content} categories={categories} products={products} />;
}
