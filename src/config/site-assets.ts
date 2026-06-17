export type SiteAsset = {
  path: string;
  purpose: string;
  alt: string;
  usage: string;
};

export const siteAssets = {
  homeHero: { path: "/hero-storefront-new.png", purpose: "Home hero", alt: "Span Fitness Equipments showroom in Visakhapatnam", usage: "Home hero, 1600x1000 WebP recommended" },
  homeShowcase: { path: "/images/home/premium-fitness-equipment-showcase.png", purpose: "Product showcase", alt: "Premium cardio and strength fitness equipment", usage: "Home feature section" },
  about: { path: "/about-showroom.png", purpose: "About showroom", alt: "Span Fitness Equipments showroom and equipment display", usage: "About page" },
  cardio: { path: "/images/categories/cardio-treadmill-equipment.png", purpose: "Cardio category", alt: "Commercial treadmill and cardio equipment", usage: "Category cards and detail page" },
  strength: { path: "/images/categories/strength-training-machine.png", purpose: "Strength category", alt: "Commercial strength training machine", usage: "Category cards and detail page" },
  commercialSetup: { path: "/images/categories/commercial-gym-equipment-setup.png", purpose: "Commercial setup", alt: "Complete commercial gym equipment setup", usage: "Commercial setup pages" },
  homeGym: { path: "/images/categories/home-gym-equipment.png", purpose: "Home gym", alt: "Space-efficient home gym equipment", usage: "Home gym category" },
  functional: { path: "/images/categories/functional-training-equipment.png", purpose: "Functional training", alt: "Functional training equipment and accessories", usage: "Functional training category" },
  accessories: { path: "/images/accessories/fitness-accessories-dumbbells.png", purpose: "Accessories", alt: "Dumbbells and premium fitness accessories", usage: "Accessories listing" },
  treadmill: { path: "/images/products/commercial-treadmill.png", purpose: "Treadmill product", alt: "Commercial treadmill for gym cardio training", usage: "Product pages" },
  elliptical: { path: "/images/products/commercial-elliptical.png", purpose: "Elliptical product", alt: "Commercial elliptical cross trainer", usage: "Product pages" },
  multiGym: { path: "/images/products/multi-gym-machine.png", purpose: "Multi gym product", alt: "Heavy duty multi gym strength machine", usage: "Product pages" },
  dumbbells: { path: "/images/products/rubber-dumbbell-set.png", purpose: "Dumbbell product", alt: "Rubber dumbbell set for strength training", usage: "Product pages" },
  exerciseBike: { path: "/images/products/studio-exercise-bike.png", purpose: "Exercise bike", alt: "Studio exercise bike for cardio workouts", usage: "Product pages" },
  bench: { path: "/images/products/strength-training-bench.png", purpose: "Strength bench", alt: "Adjustable strength training bench", usage: "Product pages" },
  brands: { path: "/images/brands/fitness-equipment-brands.png", purpose: "Brands", alt: "Fitness equipment brands available at Span Fitness", usage: "Home page brands section" },
  contact: { path: "/images/contact/span-fitness-contact-cta.png", purpose: "Contact CTA", alt: "Contact Span Fitness Equipments for gym setup", usage: "Contact call to action" },
  og: { path: "/images/og/span-fitness-equipment-og-image.png", purpose: "Social sharing", alt: "Span Fitness Equipments", usage: "1200x630 Open Graph image" },
  blog: { path: "/images/blog/gym-equipment-guide.png", purpose: "Blog placeholder", alt: "Fitness equipment buying and gym setup guide", usage: "Blog cards and article hero" }
} satisfies Record<string, SiteAsset>;
