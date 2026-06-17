import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, MessageCircle } from "lucide-react";
import type { Brand, Category, Product } from "../data";
import { whatsappUrl } from "../data";

export function CategoryCard({ item }: { item: Category }) {
  const cardThemes: Record<string, string> = {
    "cardio-equipment": "from-[#fff8f3] via-[#f7ece8] to-[#edd9d5]",
    "strength-equipment": "from-[#f5efeb] via-[#eee4e2] to-[#e8d4d8]",
    "commercial-gym-setup": "from-[#fff4ec] via-[#f6e5df] to-[#ebd2cc]",
    "home-gym-equipment": "from-[#f7f1ed] via-[#efe6df] to-[#e7d8cf]",
    "functional-training": "from-[#fff2ee] via-[#f4dfdc] to-[#e8cdd1]",
    "fitness-accessories": "from-[#f8eee9] via-[#f0dfda] to-[#e5cfd0]"
  };
  const accentThemes: Record<string, string> = {
    "cardio-equipment": "bg-coral",
    "strength-equipment": "bg-wine",
    "commercial-gym-setup": "bg-ember",
    "home-gym-equipment": "bg-[#b76855]",
    "functional-training": "bg-[#d65d55]",
    "fitness-accessories": "bg-[#9f3b51]"
  };

  return (
    <Link href={`/categories/${item.slug}`} className={`group relative overflow-hidden rounded-2xl border border-white/60 bg-gradient-to-br p-6 text-navy shadow-[0_24px_65px_rgba(0,0,0,.3)] transition duration-500 hover:-translate-y-2 hover:border-white hover:shadow-[0_28px_75px_rgba(190,49,68,.26)] ${cardThemes[item.slug] || "from-[#fff8f3] to-[#ead9d4]"}`}>
      <span className={`absolute inset-x-0 top-0 h-1 ${accentThemes[item.slug] || "bg-coral"}`} />
      <span className={`absolute -right-14 -top-14 size-36 rounded-full opacity-10 blur-2xl transition duration-500 group-hover:scale-125 group-hover:opacity-20 ${accentThemes[item.slug] || "bg-coral"}`} />
      <div className="flex min-h-40 items-start gap-5">
        <div className="min-w-0 flex-1 pt-2">
          <p className="text-[10px] font-black uppercase tracking-[.18em] text-ember">{item.tagline}</p>
          <h3 className="mt-3 font-display text-2xl font-black leading-tight">{item.name}</h3>
        </div>
        <div className="category-image-glow relative h-36 w-36 shrink-0 rounded-[3.5rem_1rem_3.5rem_1rem] sm:h-40 sm:w-40">
          <div className="image-zoom absolute inset-[3px] overflow-hidden rounded-[3.3rem_.85rem_3.3rem_.85rem] shadow-[0_16px_38px_rgba(9,18,44,.32)]">
            <Image src={item.image} alt={`${item.name} from Span Fitness Equipments`} fill sizes="160px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/25 to-transparent" />
          </div>
        </div>
      </div>
      <p className="mt-5 min-h-[5rem] text-sm leading-7 text-navy/65">{item.description}</p>
      <div className="mt-5 flex items-center justify-between border-t border-navy/10 pt-5">
        <span className="text-xs font-black uppercase tracking-[.15em] text-navy/45">View Equipment</span>
        <span className="grid size-9 place-items-center rounded-full border border-ember/25 bg-white/60 text-ember shadow-sm transition group-hover:translate-x-1 group-hover:bg-ember group-hover:text-white"><ArrowRight className="size-4" /></span>
      </div>
    </Link>
  );
}

export function ProductCard({ item }: { item: Product }) {
  return <article className="gradient-border image-zoom group overflow-hidden rounded-lg bg-[#101a38] transition hover:-translate-y-2 hover:shadow-coral"><Link href={`/products/${item.slug}`} className="relative block h-60 overflow-hidden"><Image src={item.image} alt={`${item.name} fitness equipment`} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />{item.isNew && <span className="absolute left-4 top-4 rounded-md bg-coral px-3 py-1 text-[10px] font-black uppercase tracking-widest">New Arrival</span>}</Link><div className="p-6"><p className="text-xs font-bold uppercase tracking-widest text-coral">{item.brand.replaceAll("-", " ")}</p><Link href={`/products/${item.slug}`}><h3 className="mt-2 font-display text-xl font-black transition hover:text-coral">{item.name}</h3></Link><p className="mt-3 min-h-14 text-sm leading-7 text-white/60">{item.short}</p><div className="mt-5 flex items-center gap-3"><Link href={`/products/${item.slug}`} className="inline-flex rounded-md bg-white px-4 py-3 text-sm font-black text-navy transition hover:bg-coral hover:text-white">View Details <ArrowRight className="ml-2 size-4" /></Link><a href={whatsappUrl(item.name)} aria-label={`Enquire about ${item.name}`} className="ml-auto text-white/60 hover:text-coral"><MessageCircle className="size-5" /></a></div></div></article>;
}

export function NewArrivalCard({ item, index }: { item: Product; index: number }) {
  const detailHref = `/new-arrivals#${item.slug}`;

  return (
    <article className="new-arrival-card group relative pt-5">
      <span className="new-arrival-card__number absolute right-5 top-0 z-20 font-display text-5xl font-black text-white/[.07]">
        0{index + 1}
      </span>
      <Link href={detailHref} className="new-arrival-card__media relative block h-64 overflow-hidden rounded-[1.25rem_4.5rem_1.25rem_1.25rem]">
        <div className="new-arrival-card__fit-frame" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="absolute inset-[2px] overflow-hidden rounded-[1.15rem_4.35rem_1.15rem_1.15rem] bg-navy">
          <Image src={item.image} alt={`${item.name} fitness equipment`} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="new-arrival-card__image object-cover transition duration-700 group-hover:scale-[1.045]" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-transparent to-transparent" />
          <div className="new-arrival-card__scan" aria-hidden="true" />
        </div>
        <span className="new-arrival-card__tag absolute left-4 top-4 z-10 rounded-full border border-white/25 bg-ember px-3 py-1.5 text-[9px] font-black uppercase tracking-[.18em] text-white shadow-glow">
          New
        </span>
      </Link>
      <div className="relative z-10 -mt-7 ml-4 mr-4 rounded-[1.35rem_.75rem_1.35rem_.75rem] border border-white/10 bg-[#101a38]/95 p-4 shadow-[0_20px_55px_rgba(0,0,0,.4)] backdrop-blur-md">
        <p className="text-[10px] font-black uppercase tracking-[.18em] text-coral">{item.brand.replaceAll("-", " ")}</p>
        <Link href={detailHref}><h3 className="mt-1.5 font-display text-xl font-black leading-tight transition group-hover:text-coral">{item.name}</h3></Link>
        <p className="arrival-card__desc mt-2 text-sm leading-5 text-white/55">{item.short}</p>
        <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
          <Link href={detailHref} className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.12em] text-white transition hover:text-coral">View Details <ArrowRight className="size-4" /></Link>
          <a href={whatsappUrl(item.name)} aria-label={`Enquire about ${item.name}`} className="grid size-9 place-items-center rounded-full border border-coral/25 bg-coral/10 text-coral transition hover:bg-coral hover:text-white"><MessageCircle className="size-4" /></a>
        </div>
      </div>
    </article>
  );
}

export function BrandCard({ item }: { item: Brand }) {
  return <div className="group grid min-h-32 place-items-center rounded-md border border-white/10 bg-gradient-to-br from-white/[.14] to-white/[.035] p-5 text-center shadow-[0_18px_44px_rgba(0,0,0,.2)] transition hover:-translate-y-1 hover:border-coral/60"><div><h3 className="font-display text-2xl font-black">{item.name}</h3><span className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-coral">Available at Span Fitness <BadgeCheck className="size-3" /></span></div></div>;
}
