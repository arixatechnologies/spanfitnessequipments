"use client";

import { useActionState } from "react";
import { LogIn } from "lucide-react";
import { loginAction } from "@/app/admin/actions";

export function LoginForm() {
  const initialState: { error?: string } = {};
  const [state, action, pending] = useActionState(loginAction, initialState);
  return <form action={action} className="mt-8 grid gap-4"><label className="grid gap-2 text-sm font-bold">Email<input name="email" type="email" required className="admin-input h-12" /></label><label className="grid gap-2 text-sm font-bold">Password<input name="password" type="password" required minLength={8} className="admin-input h-12" /></label>{state.error && <p className="admin-alert text-sm">{state.error}</p>}<button disabled={pending} className="admin-primary-btn mt-2 h-12 w-full"><LogIn className="size-4" />{pending ? "Signing in..." : "Sign in"}</button></form>;
}
