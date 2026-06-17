"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CircleDot, LogOut } from "lucide-react";
import { logoutAction } from "@/app/admin/actions";
import { adminSections } from "@/src/config/site";

export function AdminNav() {
  const path = usePathname();
  if (path === "/admin/login") return null;
  const isActive = (href: string) => path === href || (href !== "/admin/blog" && path.startsWith(`${href}/`));
  return (
    <aside className="admin-sidebar p-5 lg:fixed lg:inset-y-0 lg:left-0 lg:w-72 lg:overflow-y-auto">
      <div className="admin-sidebar__glow" />
      <Link href="/admin" prefetch={false} className="relative block">
        <Image
          src="/span-fitness-logo-light.png"
          alt="Span Fitness"
          width={176}
          height={56}
          className="h-14 w-44 object-contain object-left"
        />
      </Link>
      <div className="admin-sidebar__status">
        <CircleDot className="size-3 text-coral" />
        <span>Admin CMS Online</span>
      </div>
      <nav className="relative mt-7 grid gap-1.5">
        <Link
          href="/admin"
          prefetch={false}
          className={`admin-nav-link ${path === "/admin" ? "admin-nav-link--active" : ""}`}
        >
          Dashboard
        </Link>
        {adminSections.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            prefetch={false}
            className={`admin-nav-link ${isActive(href) ? "admin-nav-link--active" : ""}`}
          >
            {label}
          </Link>
        ))}
      </nav>
      <form action={logoutAction} className="relative mt-8">
        <button className="admin-logout">
          <LogOut className="size-4" /> Log out
        </button>
      </form>
    </aside>
  );
}
