const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://spanfitnessequipments.com";

export const siteConfig = {
  name: "Span Fitness Equipments",
  legalName: "Span Fitness Equipments",
  url: configuredUrl.replace(/\/$/, ""),
  description:
    "Premium commercial gym equipment, home gym equipment, cardio machines, strength equipment and fitness accessories in Visakhapatnam.",
  owner: "A Senthil Kumar",
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || "9703344483",
  customerCare: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9980875446",
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/spanfitnes/",
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "spanfitnessequipments@gmail.com",
  address: "D. 50-81-26, Seethampeta Main Road, Visakhapatnam - 530016",
  locality: "Visakhapatnam",
  region: "Andhra Pradesh",
  postalCode: "530016",
  country: "IN",
  locations: [
    "Srikakulam",
    "Vizianagaram",
    "Visakhapatnam",
    "Kakinada",
    "Vijayawada",
    "Hyderabad",
    "Ongole",
    "Nellore",
    "Cuddapah",
    "Ananthapuramu"
  ],
  brands: ["Welcare", "Hercules Fitness", "Reebok", "Firm", "Accuniq"],
  keywords: [
    "fitness equipment store in Visakhapatnam",
    "gym equipment dealer in Visakhapatnam",
    "commercial gym equipment",
    "home gym equipment",
    "home fitness equipment",
    "gym fitness equipment",
    "multi play station equipment",
    "fitness accessories",
    "treadmill dealer",
    "gym setup equipment",
    "fitness equipment dealer in Andhra Pradesh",
    "gym equipment supplier",
    "Span Fitness Equipments"
  ]
} as const;

export const adminSections = [
  ["Products", "/admin/products"],
  ["Categories", "/admin/categories"],
  ["Brands", "/admin/brands"],
  ["Accessories", "/admin/accessories"],
  ["Offers", "/admin/offers"],
  ["Gallery", "/admin/gallery"],
  ["Blog Posts", "/admin/blog"],
  ["FAQs", "/admin/faqs"],
  ["Testimonials", "/admin/testimonials"],
  ["Leads", "/admin/leads"],
  ["Media", "/admin/media"],
  ["Settings", "/admin/settings"],
  ["SEO", "/admin/seo"]
] as const;
