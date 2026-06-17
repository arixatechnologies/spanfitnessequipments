import { AdminNav } from "@/components/admin/admin-nav";

export const metadata = { robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-shell min-h-screen"><AdminNav /><div className="relative lg:pl-72">{children}</div></div>;
}
