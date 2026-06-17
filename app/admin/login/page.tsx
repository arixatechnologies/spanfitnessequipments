import { LoginForm } from "@/components/admin/login-form";
import Image from "next/image";

export const metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <section className="admin-shell grid min-h-screen place-items-center px-4 py-10">
      <div className="admin-login-card w-full max-w-md">
        <Image
          src="/span-fitness-logo-light.png"
          alt="Span Fitness Equipments"
          width={208}
          height={64}
          className="h-16 w-52 object-contain object-left"
        />
        <p className="mt-8 text-xs font-black uppercase tracking-widest text-coral">
          Secure CMS
        </p>
        <h1 className="mt-2 font-display text-4xl font-black">Admin login</h1>
        <p className="mt-3 text-sm leading-6 text-white/55">
          Sign in to manage website content, enquiries, media, SEO and product updates.
        </p>
        <LoginForm />
      </div>
    </section>
  );
}
