export const business = {
  name: "Span Fitness Equipments",
  owner: "A Senthil Kumar",
  phone: "9703344483",
  customerCare: "9980875446",
  email: "spanfitnessequipments@gmail.com",
  address: "Door No. 50-81-26, Span Fitness Equipments, Main Road, Seethammapeta Junction, Visakhapatnam - 530016, Andhra Pradesh",
  experience: "15+ years of fitness equipment guidance",
  locations: [
    "Srikakulam", "Vizianagaram", "Visakhapatnam", "Kakinada", "Vijayawada",
    "Hyderabad", "Ongole", "Nellore", "Cuddapah", "Ananthapuramu"
  ]
};

export const phoneDisplay = `${business.phone} / ${business.customerCare}`;

export const images = {
  hero: "/hero-storefront-new.png",
  showroom: "/about-showroom.png",
  treadmill: "/images/new-arrivals/performance-treadmill-x7-new-arrival.png",
  strength: "/images/new-arrivals/heavy-duty-multi-gym-new-arrival.png",
  setup: "/images/categories/commercial-gym-setup-premium.png",
  home: "/images/categories/home-gym-equipment-premium.png",
  functional: "/images/categories/functional-training-premium.png",
  accessories: "/images/categories/fitness-accessories-premium.png",
  dumbbells: "/images/products/rubber-dumbbell-set.png",
  weightPlates: "/images/categories/weight%20plates.png",
  bike: "/images/products/studio-exercise-bike.png",
  bench: "/images/products/strength-training-bench.png",
  gym: "/images/gallery/gallery1.jpg",
  rope: "/images/accessories/fitness-accessories-dumbbells.png",
  resistanceBand: "/images/products/resistance%20band%20kit.png",
  yoga: "/images/products/Premium%20yoga%20mat.png",
  arrivals: {
    performanceTreadmill: "/images/new-arrivals/performance-treadmill-x7-new-arrival.png",
    commercialElliptical: "/images/new-arrivals/commercial-elliptical-pro-new-arrival.png",
    studioBike: "/images/new-arrivals/studio-exercise-bike-new-arrival.png",
    multiGym: "/images/new-arrivals/heavy-duty-multi-gym-new-arrival.png",
    trainingBench: "/images/new-arrivals/adjustable-training-bench-new-arrival.png",
    dumbbellSet: "/images/new-arrivals/rubber-dumbbell-set-new-arrival.png"
  }
};

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  features: string[];
};

export const categories: Category[] = [
  {
    slug: "cardio-equipment",
    name: "Cardio Equipment",
    tagline: "Build endurance with every session.",
    description: "Treadmills, exercise bikes, ellipticals and cross trainers selected for smooth performance, dependable construction and daily use.",
    image: images.treadmill,
    features: ["Commercial and home-use options", "Modern consoles", "Multiple motor capacities", "Installation guidance"]
  },
  {
    slug: "strength-equipment",
    name: "Strength Equipment",
    tagline: "Engineered for stronger training floors.",
    description: "Selectorized machines, benches, racks, multi gyms, multi play station equipment and free-weight solutions for complete strength zones.",
    image: images.strength,
    features: ["Heavy-duty frames", "Multi play station options", "Space planning support", "Wide exercise variety"]
  },
  {
    slug: "commercial-gym-setup",
    name: "Commercial Gym Setup",
    tagline: "From empty floor to complete fitness destination.",
    description: "End-to-end equipment planning for gyms, apartments, hotels, institutions and professional training studios.",
    image: images.setup,
    features: ["Layout guidance", "Equipment mix planning", "Multiple brand choices", "Delivery and setup coordination"]
  },
  {
    slug: "home-gym-equipment",
    name: "Home Gym Equipment",
    tagline: "Serious workouts, closer to home.",
    description: "Compact cardio and strength equipment designed to make the most of personal fitness spaces.",
    image: images.home,
    features: ["Space-efficient choices", "Easy-to-use equipment", "Solutions for varied budgets", "Personal consultation"]
  },
  {
    slug: "functional-training",
    name: "Functional Training",
    tagline: "Move better. Train without limits.",
    description: "Kettlebells, battle ropes, resistance tools, medicine balls and versatile equipment for functional zones.",
    image: images.functional,
    features: ["Studio-ready essentials", "Scalable training options", "Conditioning equipment", "Mobility and recovery tools"]
  },
  {
    slug: "fitness-accessories",
    name: "Fitness Accessories",
    tagline: "The essentials behind every great workout.",
    description: "Dumbbells, plates, mats, belts, rods, ropes and everyday gym essentials.",
    image: images.accessories,
    features: ["Broad weight selection", "Home and commercial use", "Training and safety essentials", "Bulk enquiry support"]
  }
];

export type Product = {
  slug: string;
  name: string;
  category: string;
  brand: string;
  image: string;
  short: string;
  description: string;
  features: string[];
  isNew?: boolean;
  accessory?: boolean;
};

export const products: Product[] = [
  { slug: "performance-treadmill-x7", name: "Performance Treadmill X7", category: "cardio-equipment", brand: "welcare", image: images.arrivals.performanceTreadmill, short: "A refined treadmill for energetic home and commercial cardio.", description: "A performance-focused treadmill with a spacious running area, intuitive controls and workout modes suited to regular training.", features: ["Cushioned running deck", "Speed and incline controls", "Workout display", "Emergency safety key"], isNew: true },
  { slug: "commercial-elliptical-pro", name: "Commercial Elliptical Pro", category: "cardio-equipment", brand: "hercules-fitness", image: images.arrivals.commercialElliptical, short: "Low-impact, full-body cardio with a smooth stride.", description: "A durable elliptical trainer designed for consistent use in fitness centers, apartment gyms and premium home spaces.", features: ["Smooth elliptical path", "Multiple resistance levels", "Ergonomic handles", "Performance console"], isNew: true },
  { slug: "studio-exercise-bike", name: "Studio Exercise Bike", category: "cardio-equipment", brand: "reebok", image: images.arrivals.studioBike, short: "Responsive indoor cycling for daily conditioning.", description: "A stable exercise bike with adjustable riding geometry and resistance for varied fitness levels.", features: ["Adjustable seat", "Resistance control", "Stable frame", "Compact footprint"], isNew: true },
  { slug: "heavy-duty-multi-gym", name: "Heavy Duty Multi Gym", category: "strength-equipment", brand: "firm", image: images.arrivals.multiGym, short: "Multiple strength stations in an efficient footprint.", description: "A versatile multi gym for presses, pulls and lower-body exercises, ideal for clubs and institutional fitness rooms.", features: ["Multiple exercise stations", "Protective weight stack", "Heavy-duty upholstery", "Commercial frame"], isNew: true },
  { slug: "multi-play-station-equipment", name: "Multi Play Station Equipment", category: "strength-equipment", brand: "hercules-fitness", image: images.strength, short: "Multi-user strength station for busy commercial training floors.", description: "A multi play station setup helps clubs combine cable work, pulleys, presses and strength stations in one organized footprint for multiple users.", features: ["Multiple workout stations", "Commercial-grade frame", "Cable and pulley training", "Space-efficient strength zone"] },
  { slug: "adjustable-training-bench", name: "Adjustable Training Bench", category: "strength-equipment", brand: "accuniq", image: images.arrivals.trainingBench, short: "Stable support for presses, rows and free-weight work.", description: "A dependable adjustable bench with multiple backrest positions for varied strength exercises.", features: ["Multiple incline positions", "Dense supportive padding", "Transport wheels", "Reinforced steel frame"], isNew: true },
  { slug: "rubber-dumbbell-set", name: "Rubber Dumbbell Set", category: "fitness-accessories", brand: "firm", image: images.arrivals.dumbbellSet, short: "Durable free weights for home and commercial racks.", description: "Comfortable, hard-wearing dumbbells available across weight ranges for progressive strength training.", features: ["Knurled grip", "Rubber-coated heads", "Multiple weights available", "Rack options"], accessory: true, isNew: true },
  { slug: "cast-iron-kettlebell", name: "Cast Iron Kettlebell", category: "functional-training", brand: "accuniq", image: images.functional, short: "A versatile essential for power and conditioning.", description: "Balanced kettlebells for swings, carries, squats and full-body functional training.", features: ["Comfortable handle", "Stable base", "Multiple weights", "Durable finish"], accessory: true },
  { slug: "premium-yoga-mat", name: "Premium Yoga Mat", category: "fitness-accessories", brand: "reebok", image: images.yoga, short: "Supportive grip for mobility, yoga and floor work.", description: "A comfortable exercise mat for stretching, yoga, bodyweight training and recovery sessions.", features: ["Textured grip", "Comfortable cushioning", "Easy-roll design", "Simple to maintain"], accessory: true },
  { slug: "resistance-band-kit", name: "Resistance Band Kit", category: "functional-training", brand: "welcare", image: images.resistanceBand, short: "Portable resistance for strength and mobility.", description: "A practical resistance kit for warm-ups, assisted movements, rehabilitation and full-body workouts.", features: ["Multiple resistance levels", "Portable design", "Full-body applications", "Home and studio use"], accessory: true },
  { slug: "olympic-weight-plates", name: "Olympic Weight Plates", category: "fitness-accessories", brand: "hercules-fitness", image: images.weightPlates, short: "Reliable plates for progressive barbell training.", description: "Commercial-ready weight plates made for regular strength training and organized gym floors.", features: ["Multiple weight options", "Easy-grip design", "Durable coating", "Olympic bar compatibility"], accessory: true },
  { slug: "training-gloves", name: "Training Gloves", category: "fitness-accessories", brand: "reebok", image: images.accessories, short: "Grip and palm support for confident lifting.", description: "Breathable training gloves designed to improve grip and comfort during strength workouts.", features: ["Padded palm", "Adjustable wrist closure", "Breathable construction", "Secure grip"], accessory: true },
  { slug: "weightlifting-belt", name: "Weightlifting Belt", category: "fitness-accessories", brand: "firm", image: images.accessories, short: "Core support for demanding strength sessions.", description: "A supportive gym belt for lifters who want a secure fit during squats, deadlifts and heavy compound work.", features: ["Supportive profile", "Secure buckle", "Multiple sizes", "Comfortable inner finish"], accessory: true }
];

export type Brand = { slug: string; name: string; summary: string; description: string; specialties: string[] };

export const brands: Brand[] = [
  { slug: "welcare", name: "Welcare", summary: "Popular cardio and home-fitness solutions.", description: "Welcare offers approachable fitness equipment for home users and everyday cardio routines, with practical feature sets across treadmills and training essentials.", specialties: ["Treadmills", "Home fitness", "Cardio equipment"] },
  { slug: "hercules-fitness", name: "Hercules Fitness", summary: "Robust equipment for demanding fitness spaces.", description: "Hercules Fitness is known for sturdy cardio and strength options suited to active gyms, institutions and committed home users.", specialties: ["Commercial cardio", "Strength equipment", "Gym essentials"] },
  { slug: "reebok", name: "Reebok", summary: "Globally recognized fitness and training products.", description: "Reebok fitness products bring recognizable design and training-focused functionality to cardio, studio and accessory categories.", specialties: ["Exercise bikes", "Studio equipment", "Accessories"] },
  { slug: "firm", name: "Firm", summary: "Practical strength and free-weight equipment.", description: "Firm provides dependable equipment choices for strength zones, from multi gyms and benches to everyday free weights.", specialties: ["Multi gyms", "Benches", "Free weights"] },
  { slug: "accuniq", name: "Accuniq", summary: "Performance-led strength and functional choices.", description: "Accuniq products support progressive strength and functional training with equipment suited to varied workout spaces.", specialties: ["Strength benches", "Functional equipment", "Kettlebells"] },
  { slug: "other-premium-brands", name: "Other Premium Brands", summary: "More choices matched to your space and budget.", description: "Our wider supplier network helps us recommend equipment based on use, available area, service requirements and investment range.", specialties: ["Custom sourcing", "Multiple budgets", "Project-specific options"] }
];

export const navItems = [
  ["Home", "/"], ["About", "/about"], ["Home Fitness", "/home-fitness"], ["Gym Fitness", "/gym-fitness"], ["Categories", "/categories"],
  ["New Arrivals", "/new-arrivals"], ["Offers", "/offers"], ["Blog", "/blog"], ["Contact", "/contact"]
] as const;

export function whatsappUrl(subject = "gym equipment") {
  return `https://wa.me/91${business.customerCare}?text=${encodeURIComponent(`Hello Span Fitness Equipments, I would like to enquire about ${subject}.`)}`;
}

export function findCategory(slug: string) {
  return categories.find((item) => item.slug === slug);
}

export function findProduct(slug: string) {
  return products.find((item) => item.slug === slug);
}

export function findBrand(slug: string) {
  return brands.find((item) => item.slug === slug);
}
