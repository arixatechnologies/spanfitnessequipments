import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = { name: string; path?: string };

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return <nav aria-label="Breadcrumb" className="border-b border-white/10 bg-white/[.025]"><ol className="section-shell flex flex-wrap items-center gap-2 py-3 text-xs text-white/50">{items.map((item, index) => <li key={`${item.name}-${index}`} className="flex items-center gap-2">{index > 0 && <ChevronRight className="size-3 text-white/25" />}{item.path && index < items.length - 1 ? <Link href={item.path} className="hover:text-coral">{item.name}</Link> : <span aria-current={index === items.length - 1 ? "page" : undefined}>{item.name}</span>}</li>)}</ol></nav>;
}
