insert into public.product_categories (name, slug, description, status, featured, sort_order)
values
  ('Cardio Equipment', 'cardio-equipment', 'Treadmills, bikes, ellipticals and cross trainers.', 'published', true, 1),
  ('Strength Equipment', 'strength-equipment', 'Machines, benches, racks and free weights.', 'published', true, 2),
  ('Commercial Gym Setup', 'commercial-gym-setup', 'Complete equipment planning for professional gyms.', 'published', true, 3),
  ('Home Gym Equipment', 'home-gym-equipment', 'Space-efficient equipment for personal fitness.', 'published', true, 4),
  ('Functional Training', 'functional-training', 'Conditioning and functional training essentials.', 'published', true, 5),
  ('Fitness Accessories', 'fitness-accessories', 'Everyday training and safety accessories.', 'published', true, 6)
on conflict (slug) do nothing;

insert into public.brands (name, slug, description, specialties, status, featured, sort_order)
values
  ('Welcare', 'welcare', 'Popular cardio and home fitness solutions.', '["Treadmills","Home fitness","Cardio equipment"]', 'published', true, 1),
  ('Hercules Fitness', 'hercules-fitness', 'Robust equipment for demanding fitness spaces.', '["Commercial cardio","Strength equipment"]', 'published', true, 2),
  ('Reebok', 'reebok', 'Recognized fitness and training products.', '["Exercise bikes","Studio equipment","Accessories"]', 'published', true, 3),
  ('Firm', 'firm', 'Practical strength and free-weight equipment.', '["Multi gyms","Benches","Free weights"]', 'published', true, 4),
  ('Accuniq', 'accuniq', 'Performance-led strength and functional choices.', '["Strength benches","Functional equipment"]', 'published', true, 5)
on conflict (slug) do nothing;

insert into public.blog_categories (name, slug, description)
values
  ('Buying Guides', 'buying-guides', 'Practical fitness equipment buying advice.'),
  ('Gym Setup', 'gym-setup', 'Commercial and home gym planning resources.'),
  ('Equipment Care', 'equipment-care', 'Maintenance guidance for long equipment life.'),
  ('Local Fitness', 'local-fitness', 'Fitness equipment guidance for Andhra Pradesh.')
on conflict (slug) do nothing;

insert into public.blog_posts
  (title, slug, excerpt, content, category_id, featured_image, featured_image_alt, meta_title, meta_description, status, featured, published_at, faqs)
select
  seed.title, seed.slug, seed.excerpt, seed.content, c.id,
  '/images/blog/gym-equipment-guide.png',
  seed.title,
  seed.title,
  seed.excerpt,
  'published',
  seed.featured,
  seed.published_at,
  seed.faqs::jsonb
from (values
  ('Best Fitness Equipment for Commercial Gyms','best-fitness-equipment-for-commercial-gyms','A practical checklist for selecting cardio, strength and functional equipment for a commercial gym.','A successful commercial gym needs a balanced equipment mix. Start with dependable cardio machines, core selectorized strength stations, free weights and a functional training zone. Match the quantity of each machine to expected member traffic, available floor area and maintenance capacity. Span Fitness Equipments helps gym owners compare suitable options, plan clear circulation and build in phases when required.','gym-setup',true,'2026-05-01'::timestamptz,'[{"question":"What equipment does a commercial gym need first?","answer":"Begin with treadmills or bikes, essential strength stations, benches, racks, dumbbells and functional accessories."}]'),
  ('How to Choose the Right Treadmill for Your Gym','how-to-choose-the-right-treadmill-for-your-gym','Compare motor capacity, running area, cushioning and expected daily use before choosing a treadmill.','The right treadmill depends on who will use it and how often. Commercial facilities should prioritize duty cycle, frame stability, running deck size and service support. Home users can focus on space, workout features and convenient storage. Always confirm user weight guidance and electrical requirements before installation.','buying-guides',true,'2026-05-04'::timestamptz,'[]'),
  ('Commercial Gym Setup Guide for Beginners','commercial-gym-setup-guide-for-beginners','Plan your gym layout, equipment mix, budget and installation in a practical sequence.','Begin with your target audience, floor plan and business model. Divide the space into cardio, strength, free-weight, functional and recovery zones. Allow safe movement around machines and avoid purchasing too many similar stations at launch. A phased equipment plan can protect cash flow while leaving room for growth.','gym-setup',true,'2026-05-07'::timestamptz,'[]'),
  ('Home Gym Equipment Buying Guide','home-gym-equipment-buying-guide','Choose space-efficient home gym equipment around your goals, room size and training habits.','Measure the available room and identify your main training goal before buying. A compact treadmill or bike supports cardio, while adjustable dumbbells, a bench and resistance tools cover many strength movements. Select equipment you will use consistently and leave enough clearance for safe workouts.','buying-guides',false,'2026-05-10'::timestamptz,'[]'),
  ('Cardio vs Strength Equipment: What Should You Buy First?','cardio-vs-strength-equipment-what-should-you-buy-first','Decide whether cardio or strength equipment should lead your first equipment purchase.','Cardio equipment supports endurance and easy-to-follow workouts. Strength equipment supports muscle development, stability and long-term progression. Most balanced spaces need both, but your first purchase should reflect your users and core offering. Studios can begin with their specialty and add complementary equipment later.','buying-guides',false,'2026-05-13'::timestamptz,'[]'),
  ('Best Gym Accessories for Daily Workouts','best-gym-accessories-for-daily-workouts','Useful accessories that improve workout variety, organization and comfort.','Dumbbells, resistance bands, mats, ropes, gloves and belts are versatile additions to most fitness spaces. Choose durable materials, suitable weight ranges and storage that keeps the workout floor organized. Accessories are also an efficient way to expand exercise variety without large machines.','buying-guides',false,'2026-05-16'::timestamptz,'[]'),
  ('Why Quality Fitness Equipment Matters','why-quality-fitness-equipment-matters','Quality equipment supports safer movement, reliable performance and a better member experience.','Fitness equipment is used repeatedly under load. Stable construction, considered movement paths and replaceable wear components matter for both safety and ownership cost. Evaluate product suitability, service access and expected usage instead of making a decision on appearance alone.','buying-guides',false,'2026-05-19'::timestamptz,'[]'),
  ('How to Maintain Gym Equipment for Long Life','how-to-maintain-gym-equipment-for-long-life','A simple maintenance routine for cardio machines, strength equipment and accessories.','Wipe equipment after use, inspect cables and fasteners, keep moving parts clean and follow manufacturer lubrication guidance. Place cardio machines on stable surfaces with suitable power protection. Maintain a service log so small wear issues are addressed before they become expensive failures.','equipment-care',false,'2026-05-22'::timestamptz,'[]'),
  ('Fitness Equipment Dealer in Visakhapatnam','fitness-equipment-dealer-in-visakhapatnam','How a local fitness equipment dealer can support product selection, delivery and gym setup.','Span Fitness Equipments supplies cardio machines, strength equipment, accessories and gym setup equipment from Visakhapatnam. Local guidance helps customers compare equipment for available space, budget and expected use, with support across major cities in Andhra Pradesh and Telangana.','local-fitness',false,'2026-05-25'::timestamptz,'[]'),
  ('Gym Setup Ideas for Fitness Centers and Studios','gym-setup-ideas-for-fitness-centers-and-studios','Layout and equipment ideas for efficient fitness centers, personal training studios and apartment gyms.','Create clear training zones and preserve open floor space for movement. Place popular cardio equipment where the room feels open, group strength machines logically and keep free weights near mirrors and storage. Use lighting, flooring and signage to make the space easier to navigate.','gym-setup',false,'2026-05-28'::timestamptz,'[]')
) as seed(title,slug,excerpt,content,category_slug,featured,published_at,faqs)
join public.blog_categories c on c.slug = seed.category_slug
on conflict (slug) do nothing;

insert into public.faqs (question, answer, page_path, status, featured, sort_order)
values
  ('Do you supply commercial gym equipment?', 'Yes. Span Fitness Equipments supplies cardio, strength, free-weight and functional equipment for commercial gyms and institutions.', '/', 'published', true, 1),
  ('Do you help plan a complete gym setup?', 'Yes. We can help shortlist equipment based on floor area, expected users, training goals and budget.', '/', 'published', true, 2),
  ('Which locations do you serve?', 'We support enquiries across Visakhapatnam and multiple cities in Andhra Pradesh and Telangana.', '/contact', 'published', true, 3);
