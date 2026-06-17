export type BlogFaq = { question: string; answer: string };

export type BlogPost = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  featuredImage: string;
  featuredImageAlt: string;
  metaTitle: string;
  metaDescription: string;
  status: "draft" | "published";
  featured: boolean;
  publishedAt: string;
  updatedAt: string;
  faqs: BlogFaq[];
};

const topics = [
  ["Best Fitness Equipment for Commercial Gyms", "best-fitness-equipment-for-commercial-gyms", "Gym Setup", "A practical checklist for selecting cardio, strength and functional equipment for a commercial gym."],
  ["How to Choose the Right Treadmill for Your Gym", "how-to-choose-the-right-treadmill-for-your-gym", "Buying Guides", "Compare motor capacity, running area, cushioning and expected daily use before choosing a treadmill."],
  ["Commercial Gym Setup Guide for Beginners", "commercial-gym-setup-guide-for-beginners", "Gym Setup", "Plan your gym layout, equipment mix, budget and installation in a practical sequence."],
  ["Home Gym Equipment Buying Guide", "home-gym-equipment-buying-guide", "Buying Guides", "Choose space-efficient home gym equipment around your goals, room size and training habits."],
  ["Cardio vs Strength Equipment: What Should You Buy First?", "cardio-vs-strength-equipment-what-should-you-buy-first", "Buying Guides", "Decide whether cardio or strength equipment should lead your first equipment purchase."],
  ["Best Gym Accessories for Daily Workouts", "best-gym-accessories-for-daily-workouts", "Buying Guides", "Useful accessories that improve workout variety, organization and comfort."],
  ["Why Quality Fitness Equipment Matters", "why-quality-fitness-equipment-matters", "Buying Guides", "Quality equipment supports safer movement, reliable performance and a better member experience."],
  ["How to Maintain Gym Equipment for Long Life", "how-to-maintain-gym-equipment-for-long-life", "Equipment Care", "A simple maintenance routine for cardio machines, strength equipment and accessories."],
  ["Fitness Equipment Dealer in Visakhapatnam", "fitness-equipment-dealer-in-visakhapatnam", "Local Fitness", "How a local fitness equipment dealer can support product selection, delivery and gym setup."],
  ["Gym Setup Ideas for Fitness Centers and Studios", "gym-setup-ideas-for-fitness-centers-and-studios", "Gym Setup", "Layout and equipment ideas for efficient fitness centers, personal training studios and apartment gyms."]
] as const;

export const fallbackBlogPosts: BlogPost[] = topics.map(([title, slug, category, excerpt], index) => ({
  title,
  slug,
  category,
  excerpt,
  content: `${excerpt}\n\nStart by defining the users, available floor area and expected training style. A balanced equipment plan normally combines cardio, strength, free-weight and functional options without overcrowding the room.\n\nChoose equipment for expected daily use, service access and long-term ownership. Span Fitness Equipments helps customers compare practical options for commercial gyms, studios, institutions and home fitness spaces across Visakhapatnam and surrounding service locations.\n\nBefore ordering, confirm dimensions, electrical requirements, delivery access and safe operating clearance. A clear plan reduces avoidable changes during installation and leaves space for future expansion.`,
  author: "Span Fitness Equipments",
  featuredImage: "/images/blog/gym-equipment-guide.png",
  featuredImageAlt: title,
  metaTitle: title,
  metaDescription: excerpt,
  status: "published",
  featured: index < 3,
  publishedAt: `2026-05-${String(index * 3 + 1).padStart(2, "0")}T09:00:00+05:30`,
  updatedAt: `2026-05-${String(index * 3 + 1).padStart(2, "0")}T09:00:00+05:30`,
  faqs: index === 0 ? [{ question: "What equipment should a commercial gym buy first?", answer: "Begin with core cardio machines, essential strength stations, benches, racks, dumbbells and functional accessories." }] : []
}));
