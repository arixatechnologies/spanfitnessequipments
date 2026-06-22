import { images } from "./data";

export type FitnessProgramKey = "home" | "gym";

export type FitnessDetailItem = {
  label: string;
  slug: string;
  summary: string;
  description: string;
  highlights: string[];
};

export type FitnessDetailGroup = {
  label: string;
  slug: string;
  summary: string;
  description: string;
  highlights: string[];
  items: FitnessDetailItem[];
};

export type FitnessProgram = {
  key: FitnessProgramKey;
  basePath: string;
  crumbLabel: string;
  eyebrow: string;
  image: string;
  imageAlt: string;
  groups: FitnessDetailGroup[];
};

export type FitnessDetail =
  | {
      type: "group";
      program: FitnessProgram;
      group: FitnessDetailGroup;
      item?: undefined;
      path: string;
      label: string;
      summary: string;
      description: string;
      highlights: string[];
    }
  | {
      type: "item";
      program: FitnessProgram;
      group: FitnessDetailGroup;
      item: FitnessDetailItem;
      path: string;
      label: string;
      summary: string;
      description: string;
      highlights: string[];
    };

export const fitnessPrograms: Record<FitnessProgramKey, FitnessProgram> = {
  home: {
    key: "home",
    basePath: "/home-fitness",
    crumbLabel: "Home Fitness",
    eyebrow: "Span Fitness Home Fitness",
    image: images.home,
    imageAlt: "Home fitness equipment setup from Span Fitness Equipments",
    groups: [
      {
        label: "Cardio",
        slug: "cardio",
        summary: "Home cardio equipment for daily stamina, weight management and low-impact training.",
        description:
          "Span Fitness helps home buyers choose cardio machines around room size, workout routine, comfort and long-term usage. The focus is on equipment that feels practical every day instead of taking over the room.",
        highlights: ["Space-friendly cardio options", "Walking, cycling and low-impact routines", "Guidance based on room size and user comfort"],
        items: [
          {
            label: "Treadmill",
            slug: "treadmill",
            summary: "Walking and running machines for regular home workouts.",
            description:
              "Home treadmills are useful for daily walking, jogging and controlled cardio training. Span Fitness can help compare motor capacity, deck size, cushioning and folding options based on your space.",
            highlights: ["Daily walking and jogging", "Foldable and room-friendly options", "Comfort-focused deck and cushioning guidance"],
          },
          {
            label: "Elliptical Trainer",
            slug: "elliptical-trainer",
            summary: "Low-impact cross trainers for smooth full-body cardio.",
            description:
              "Elliptical trainers support cardio training with reduced joint impact compared with running. They suit homes where users want smooth movement, upper-body handles and steady endurance work.",
            highlights: ["Low-impact cardio", "Full-body movement", "Good choice for mixed-age home users"],
          },
          {
            label: "Bikes",
            slug: "bikes",
            summary: "Indoor cycling choices for compact home fitness routines.",
            description:
              "Exercise bikes are easy to place, simple to use and effective for regular cardio. Span Fitness can suggest bike styles based on posture preference, resistance level and available floor area.",
            highlights: ["Compact footprint", "Simple everyday cardio", "Useful for interval and steady cycling"],
          },
          {
            label: "Up Right Bike",
            slug: "up-right-bike",
            summary: "Upright cycling equipment for active cardio in a smaller footprint.",
            description:
              "Upright bikes give a familiar cycling posture and help keep the workout area compact. They are useful for home users who want regular cardio without a large machine.",
            highlights: ["Active cycling posture", "Small-space friendly", "Good for steady fitness routines"],
          },
          {
            label: "Recumbent Bike",
            slug: "recumbent-bike",
            summary: "Comfort-focused cardio bikes with back-supported seating.",
            description:
              "Recumbent bikes provide seated cardio with back support and easier entry. They can suit users who prefer a relaxed posture, controlled movement and lower joint stress.",
            highlights: ["Back-supported seating", "Comfortable cardio sessions", "Useful for controlled low-impact workouts"],
          },
          {
            label: "AI Bikes",
            slug: "ai-bikes",
            summary: "Smart bike options for guided indoor cycling sessions.",
            description:
              "AI bike options can support guided workouts, tracking and more engaging home cycling. Span Fitness can help you decide whether smart features are worth it for your routine.",
            highlights: ["Guided cycling support", "Training feedback options", "Engaging home cardio experience"],
          },
        ],
      },
      {
        label: "Strength",
        slug: "strength",
        summary: "Home strength equipment for resistance training without unnecessary clutter.",
        description:
          "Strength equipment for homes should be useful, compact and safe to move around. Span Fitness helps balance benches, compact stations and accessories with enough open space for training.",
        highlights: ["Compact resistance training", "Benches and home gym stations", "Practical setup guidance"],
        items: [
          {
            label: "Home Gym",
            slug: "home-gym",
            summary: "Compact multi-exercise stations for home strength training.",
            description:
              "Home gym stations combine multiple strength movements into one organized footprint. They are useful when you want guided resistance training without building a full free-weight area.",
            highlights: ["Multiple exercises in one station", "Controlled strength movements", "Good for compact home training rooms"],
          },
          {
            label: "Benches",
            slug: "benches",
            summary: "Training benches for presses, rows, dumbbell work and support exercises.",
            description:
              "A good bench expands home strength training with dumbbells, bodyweight work and supported movements. Span Fitness can help select flat, incline or adjustable bench styles.",
            highlights: ["Presses and dumbbell work", "Flat, incline and adjustable styles", "Useful companion for free weights"],
          },
        ],
      },
    ],
  },
  gym: {
    key: "gym",
    basePath: "/gym-fitness",
    crumbLabel: "Gym Fitness",
    eyebrow: "Span Fitness Gym Fitness",
    image: images.setup,
    imageAlt: "Commercial gym equipment setup from Span Fitness Equipments",
    groups: [
      {
        label: "Cardio",
        slug: "cardio",
        summary: "Commercial cardio equipment for active gym floors, studios and shared fitness spaces.",
        description:
          "A gym cardio zone needs durable machines, clear movement space and a balanced mix for different training preferences. Span Fitness helps plan cardio equipment around expected usage and floor flow.",
        highlights: ["Commercial cardio zone planning", "Member-friendly equipment mix", "Spacing and usage guidance"],
        items: [
          {
            label: "Stair Climber",
            slug: "stair-climber",
            summary: "High-intensity climbing machines for conditioning zones.",
            description:
              "Stair climbers create demanding cardio workouts in a vertical movement pattern. They work well in gyms that want a premium conditioning option beyond treadmills and bikes.",
            highlights: ["High-intensity conditioning", "Premium cardio zone appeal", "Strong lower-body endurance focus"],
          },
          {
            label: "Treadmill",
            slug: "treadmill",
            summary: "Commercial treadmills built for repeated member usage.",
            description:
              "Gym treadmills should be selected around deck comfort, motor strength, stability and daily usage. Span Fitness can help match options to commercial, apartment or institutional needs.",
            highlights: ["Running and walking zones", "Commercial usage planning", "Deck size and durability guidance"],
          },
          {
            label: "Elliptical Trainer",
            slug: "elliptical-trainer",
            summary: "Commercial cross trainers for low-impact cardio workouts.",
            description:
              "Elliptical trainers give members a low-impact cardio option with full-body movement. They are useful for gyms that serve mixed fitness levels and want smoother alternatives to running.",
            highlights: ["Low-impact member option", "Full-body cardio movement", "Useful for mixed fitness levels"],
          },
          {
            label: "Bikes",
            slug: "bikes",
            summary: "Commercial bike options for cycling and cardio floors.",
            description:
              "Gym bike choices can include upright, recumbent and studio-style formats. Span Fitness can help arrange bike options based on intensity, comfort and available space.",
            highlights: ["Upright and recumbent options", "Studio cycling support", "Compact cardio additions"],
          },
          {
            label: "Rower",
            slug: "rower",
            summary: "Rowing machines for strength-endurance and conditioning.",
            description:
              "Rowers add full-body conditioning and are especially useful for functional zones. They combine cardio output with pulling strength and can fit well in performance-focused gyms.",
            highlights: ["Full-body conditioning", "Functional training fit", "Strength-endurance focus"],
          },
          {
            label: "Non-Motorised",
            slug: "non-motorised",
            summary: "Non-motorised treadmill options for performance training.",
            description:
              "Non-motorised treadmills are driven by user effort and suit performance, sprint and conditioning zones. They can add a premium training feel for serious gym users.",
            highlights: ["User-powered cardio", "Sprint and conditioning work", "Performance training appeal"],
          },
          {
            label: "Rehab",
            slug: "rehab",
            summary: "Controlled cardio options for careful movement support.",
            description:
              "Rehab-focused cardio equipment supports controlled, lower-impact movement. These choices can be useful for wellness spaces, physiotherapy-style zones and guided training areas.",
            highlights: ["Controlled movement support", "Low-impact training", "Useful for wellness and recovery zones"],
          },
        ],
      },
      {
        label: "Strength",
        slug: "strength",
        summary: "Commercial strength equipment for selectorized, plate-loaded and free-weight training zones.",
        description:
          "A complete strength floor should cover guided machines, free weights, benches, racks and functional cable options. Span Fitness helps shape that mix around users, floor space and budget.",
        highlights: ["Selectorized and plate-loaded zones", "Benches, racks and cable systems", "Planning for member flow and safety"],
        items: [
          {
            label: "Power Rack",
            slug: "power-rack",
            summary: "Power racks for compound lifts and serious strength training.",
            description:
              "Power racks anchor free-weight zones for squats, presses and pulling movements. They require clear spacing, safety planning and strong accessory pairing.",
            highlights: ["Squat and press support", "Free-weight zone anchor", "Safety and spacing guidance"],
          },
          {
            label: "Pin Loaded",
            slug: "pin-loaded",
            summary: "Selectorized machines for guided strength workouts.",
            description:
              "Pin-loaded equipment is easy for members to adjust and supports controlled strength training. It is useful for gyms that need approachable machines across major muscle groups.",
            highlights: ["Easy weight selection", "Guided movement paths", "Member-friendly strength training"],
          },
          {
            label: "Plate Loaded",
            slug: "plate-loaded",
            summary: "Plate-loaded machines for heavier progressive training.",
            description:
              "Plate-loaded machines provide a strong training feel for serious strength users. They work well beside free-weight areas and can support heavier progressive loading.",
            highlights: ["Heavy strength training", "Progressive loading", "Pairs well with free weights"],
          },
          {
            label: "Multi Gym",
            slug: "multi-gym",
            summary: "Multi-station strength solutions for several exercise options.",
            description:
              "Multi gym systems combine several exercise stations into one efficient unit. They are useful for apartments, studios and commercial gyms that need more training options in less space.",
            highlights: ["Multiple stations", "Space-efficient strength zone", "Good for shared fitness spaces"],
          },
          {
            label: "Smith & Functional Trainer & Crossover",
            slug: "smith-functional-trainer-crossover",
            summary: "Smith, cable and functional trainer systems for versatile strength zones.",
            description:
              "Smith machines, functional trainers and cable crossover systems add guided bar work and cable-based movement variety. They are ideal for gyms that want flexible strength programming.",
            highlights: ["Cable movement variety", "Guided Smith training", "Flexible strength programming"],
          },
          {
            label: "Cross Fit",
            slug: "cross-fit",
            summary: "Functional training equipment for conditioning and performance areas.",
            description:
              "Cross training zones support dynamic movement, conditioning and group-style workouts. Equipment should be selected around durability, open floor area and safe movement flow.",
            highlights: ["Conditioning workouts", "Functional movement zones", "Durable training tools"],
          },
          {
            label: "Benches & Racks",
            slug: "benches-racks",
            summary: "Benches and racks for free-weight strength areas.",
            description:
              "Benches and racks organize dumbbell, barbell and support movements. They are essential for a serious strength zone and should be matched to available floor space.",
            highlights: ["Free-weight support", "Flat, incline and adjustable benches", "Organized strength floor"],
          },
          {
            label: "Pilates",
            slug: "pilates",
            summary: "Pilates equipment for controlled strength, mobility and studio training.",
            description:
              "Pilates equipment supports controlled strength, posture and mobility sessions. It can fit premium studios, wellness zones and specialized training spaces.",
            highlights: ["Controlled movement training", "Studio and wellness fit", "Mobility and posture support"],
          },
        ],
      },
      {
        label: "Body Analyser",
        slug: "body-analyser",
        summary: "Body analysis equipment for fitness assessment and progress tracking.",
        description:
          "Body analyser equipment helps gyms, studios and wellness spaces add measurable progress checks. It can support member onboarding, transformation programs and trainer consultations.",
        highlights: ["Fitness assessment support", "Member progress tracking", "Useful for consultations"],
        items: [
          {
            label: "BCA",
            slug: "bca",
            summary: "Body composition analyser options for professional fitness checks.",
            description:
              "BCA equipment helps measure body composition indicators for fitness tracking. It can improve consultations by giving trainers and members a clearer progress reference.",
            highlights: ["Body composition checks", "Progress tracking support", "Useful for trainer consultations"],
          },
        ],
      },
    ],
  },
};

export function fitnessGroupPath(program: FitnessProgram, group: FitnessDetailGroup) {
  return `${program.basePath}/${group.slug}`;
}

export function fitnessItemPath(program: FitnessProgram, group: FitnessDetailGroup, item: FitnessDetailItem) {
  return `${fitnessGroupPath(program, group)}/${item.slug}`;
}

export function getFitnessStaticParams(key: FitnessProgramKey) {
  const program = fitnessPrograms[key];
  return program.groups.flatMap((group) => [
    { slug: [group.slug] },
    ...group.items.map((item) => ({ slug: [group.slug, item.slug] })),
  ]);
}

export function getFitnessDetail(key: FitnessProgramKey, segments: string[]): FitnessDetail | null {
  if (!segments.length || segments.length > 2) return null;
  const program = fitnessPrograms[key];
  const group = program.groups.find((entry) => entry.slug === segments[0]);
  if (!group) return null;

  if (segments.length === 1) {
    const path = fitnessGroupPath(program, group);
    return {
      type: "group",
      program,
      group,
      path,
      label: group.label,
      summary: group.summary,
      description: group.description,
      highlights: group.highlights,
    };
  }

  const item = group.items.find((entry) => entry.slug === segments[1]);
  if (!item) return null;

  const path = fitnessItemPath(program, group, item);
  return {
    type: "item",
    program,
    group,
    item,
    path,
    label: item.label,
    summary: item.summary,
    description: item.description,
    highlights: item.highlights,
  };
}

export function getAllFitnessPaths() {
  return (Object.keys(fitnessPrograms) as FitnessProgramKey[]).flatMap((key) => {
    const program = fitnessPrograms[key];
    return program.groups.flatMap((group) => [
      fitnessGroupPath(program, group),
      ...group.items.map((item) => fitnessItemPath(program, group, item)),
    ]);
  });
}

export function getFitnessLandingGroups(key: FitnessProgramKey) {
  const program = fitnessPrograms[key];
  return program.groups.map((group) => ({
    title: group.label,
    href: fitnessGroupPath(program, group),
    description: group.summary,
    items: group.items.map((item) => ({
      label: item.label,
      href: fitnessItemPath(program, group, item),
      description: item.summary,
    })),
  }));
}
