"use client";

/* eslint-disable @next/next/no-html-link-for-pages -- Admin CMS navigation intentionally uses hard page loads to avoid RSC router fetch failures. */
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  BadgeCheck,
  BadgePercent,
  CircleDot,
  CircleHelp,
  Dumbbell,
  ImagePlus,
  Images,
  Inbox,
  LayoutDashboard,
  LogOut,
  MessageSquareQuote,
  Newspaper,
  Package,
  SearchCheck,
  Settings,
  Sparkles,
  Tags
} from "lucide-react";
import { logoutAction } from "@/app/admin/actions";
import { adminSections } from "@/src/config/site";

const sectionIcons: Record<string, typeof LayoutDashboard> = {
  "/admin/products": Package,
  "/admin/categories": Tags,
  "/admin/brands": BadgeCheck,
  "/admin/accessories": Dumbbell,
  "/admin/offers": BadgePercent,
  "/admin/gallery": Images,
  "/admin/blog": Newspaper,
  "/admin/faqs": CircleHelp,
  "/admin/testimonials": MessageSquareQuote,
  "/admin/leads": Inbox,
  "/admin/media": ImagePlus,
  "/admin/settings": Settings,
  "/admin/seo": SearchCheck
};

export function AdminNav() {
  const path = usePathname();
  if (path === "/admin/login") return null;
  const isActive = (href: string) => path === href || (href !== "/admin/blog" && path.startsWith(`${href}/`));
  return (
    <aside className="admin-sidebar p-5 lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:flex lg:w-72 lg:flex-col lg:overflow-hidden">
      <div className="admin-sidebar__glow" />
      <div className="admin-sidebar__brand">
        <a href="/admin" className="relative block">
          <Image
            src="/span-fitness-logo-light.png"
            alt="Span Fitness"
            width={176}
            height={56}
            className="h-14 w-44 object-contain object-left"
          />
        </a>
        <span className="admin-sidebar__brand-badge">
          <Sparkles className="size-3.5" />
          Control Suite
        </span>
      </div>
      <div className="admin-sidebar__status">
        <CircleDot className="size-3 text-coral" />
        <span>Admin CMS Online</span>
      </div>
      <div className="admin-sidebar__section-title">Navigation</div>
      <div className="admin-sidebar__scroll mt-3">
        <nav className="grid gap-1.5 pb-2">
          <a href="/admin" className={`admin-nav-link ${path === "/admin" ? "admin-nav-link--active" : ""}`}>
            <span className="admin-nav-link__icon">
              <LayoutDashboard className="size-4" />
            </span>
            <span className="admin-nav-link__label">Dashboard</span>
          </a>
          {adminSections.map(([label, href]) => {
            const Icon = sectionIcons[href] ?? CircleDot;

            return (
              <a
                key={href}
                href={href}
                className={`admin-nav-link ${isActive(href) ? "admin-nav-link--active" : ""}`}
              >
                <span className="admin-nav-link__icon">
                  <Icon className="size-4" />
                </span>
                <span className="admin-nav-link__label">{label}</span>
              </a>
            );
          })}
        </nav>
      </div>
      <form action={logoutAction} className="relative mt-4 shrink-0">
        <button className="admin-logout">
          <LogOut className="size-4" /> Log out
        </button>
      </form>
    </aside>
  );
}
