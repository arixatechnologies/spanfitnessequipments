"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Footer, Header } from "@/app/components/site";
import type { Category } from "@/app/data";
import { FloatingActions } from "./floating-actions";

export function SiteChrome({ children, footerCategories }: { children: React.ReactNode; footerCategories?: Category[] }) {
  const pathname = usePathname();
  const [transitioning, setTransitioning] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const clearTransition = () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setTransitioning(false), 260);
    };

    clearTransition();

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;

    const shouldShowLoader = (anchor: HTMLAnchorElement) => {
      if (anchor.target && anchor.target !== "_self") return false;
      if (anchor.hasAttribute("download")) return false;

      const nextUrl = new URL(anchor.href, window.location.href);
      const currentUrl = new URL(window.location.href);

      if (nextUrl.origin !== currentUrl.origin) return false;
      if (nextUrl.pathname === currentUrl.pathname && nextUrl.search === currentUrl.search) return false;
      return true;
    };

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");
      if (!anchor || !(anchor instanceof HTMLAnchorElement)) return;
      if (!shouldShowLoader(anchor)) return;

      setTransitioning(true);
    };

    const handlePopState = () => setTransitioning(true);

    document.addEventListener("click", handleClick, true);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [pathname]);

  if (pathname.startsWith("/admin")) return <>{children}</>;

  return (
    <>
      <Header />
      {transitioning && <PageTransitionLoader />}
      <main>{children}</main>
      <Footer categories={footerCategories} />
      <FloatingActions />
    </>
  );
}

function PageTransitionLoader() {
  return (
    <div className="page-loader page-loader--transition" role="status" aria-live="polite">
      <div className="page-loader__panel">
        <div className="page-loader__ring" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p>Loading Span Fitness</p>
      </div>
    </div>
  );
}
