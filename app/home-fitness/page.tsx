import { getPublicCategories, getPublicProducts } from "@/lib/public-content";
import { getPageMetadata } from "@/lib/seo";
import { seoFaqs } from "@/src/config/seo-content";
import { FitnessLandingPage, type FitnessLandingContent } from "../components/fitness-landing";
import { images } from "../data";
import { getFitnessLandingGroups } from "../fitness-pages";

const title = "Home Fitness Equipment in Visakhapatnam";
const description = "Build a compact home fitness space with treadmills, exercise bikes, benches, dumbbells, mats, resistance bands and strength equipment from Span Fitness Equipments.";

export const dynamic = "force-dynamic";

export function generateMetadata() {
  return getPageMetadata({
    title,
    description,
    path: "/home-fitness",
    image: images.home,
    keywords: [
      "home fitness equipment in Visakhapatnam",
      "home gym equipment",
      "treadmill for home",
      "home workout equipment",
      "Span Fitness Equipments",
    ],
  });
}

const content: FitnessLandingContent = {
  layoutVariant: "home-compact",
  categorySectionFirst: true,
  path: "/home-fitness",
  crumbLabel: "Home Fitness",
  title,
  description,
  eyebrow: "Home Fitness",
  heroTitle: "Build a serious workout space at home.",
  heroText: "Choose compact cardio, strength equipment and daily accessories that fit your room, routine and budget without making the space feel crowded.",
  heroImage: images.home,
  heroAlt: "Home gym equipment setup from Span Fitness Equipments",
  heroBadge: "Personal fitness spaces",
  audience: ["Homes", "Apartments", "Compact rooms", "Personal studios"],
  stats: [
    { value: "Compact", label: "Space Plans" },
    { value: "Cardio + Strength", label: "Home Options" },
    { value: "Guided", label: "Product Choice" },
  ],
  cards: [
    { title: "Room-first planning", text: "Shortlist equipment after checking available floor area, clearance and preferred workout style." },
    { title: "Cardio for routine", text: "Treadmills, exercise bikes and low-impact options for daily conditioning at home." },
    { title: "Strength without clutter", text: "Benches, dumbbells, resistance tools and compact multi gym choices for progressive training." },
    { title: "Finishing essentials", text: "Mats, gloves, bands, belts and accessories that make home workouts more complete." },
  ],
  equipmentLinksEyebrow: "Span Fitness Home Fitness",
  equipmentLinksTitle: "Home fitness subsections.",
  equipmentLinksBody: "Choose a Span Fitness subsection to view related home cardio and strength equipment guidance on this website.",
  equipmentGroups: getFitnessLandingGroups("home"),
  categorySlugs: ["home-gym-equipment", "cardio-equipment", "strength-equipment", "functional-training", "fitness-accessories"],
  categoryEyebrow: "Home Equipment Range",
  categoryTitle: "Everything needed for a balanced home setup.",
  categoryBody: "Explore home-friendly equipment categories, from cardio machines to strength tools and accessories that keep training practical.",
  productSlugs: [
    "performance-treadmill-x7",
    "studio-exercise-bike",
    "adjustable-training-bench",
    "rubber-dumbbell-set",
    "premium-yoga-mat",
    "resistance-band-kit",
    "cast-iron-kettlebell",
    "weightlifting-belt",
  ],
  productEyebrow: "Recommended Picks",
  productTitle: "Home fitness products to start with.",
  productBody: "These products are useful starting points for home buyers. Contact the team for current availability and comparable options.",
  planEyebrow: "Simple Setup Method",
  planTitle: "A home gym should feel easy to use every day.",
  planBody: "We help match equipment to space, user comfort and long-term training consistency before you invest.",
  steps: [
    { title: "Measure the room", text: "Share room size, door access and ceiling height so the shortlist fits properly." },
    { title: "Choose your training focus", text: "Prioritize weight loss, cardio, strength, mobility or a mixed routine." },
    { title: "Balance equipment and open space", text: "Keep enough clearance around machines for safer movement and maintenance access." },
    { title: "Add accessories wisely", text: "Use mats, dumbbells, bands and gloves to expand workouts without using much space." },
  ],
  formTitle: "Tell us about your home fitness space.",
  formText: "Send the room size, equipment interest and budget range. We will help shortlist practical options for your home.",
  formRequirement: "Home Fitness Equipment",
  ctaTitle: "Ready to plan your home fitness setup?",
  ctaText: "Share your room size and training goal. Span Fitness Equipments will help you choose a focused equipment mix.",
  faqs: seoFaqs.homeFitness,
};

export default async function HomeFitnessPage() {
  const [categories, products] = await Promise.all([getPublicCategories(), getPublicProducts()]);

  return <FitnessLandingPage content={content} categories={categories} products={products} />;
}
