"use client";

import { useActionState, useEffect } from "react";
import { Send } from "lucide-react";
import { submitLead, type LeadFormState } from "@/app/actions/leads";

const initialState: LeadFormState = {};

export function LeadForm({ requirement = "", sourcePage, compact = false }: { requirement?: string; sourcePage: string; compact?: boolean }) {
  const [state, formAction, pending] = useActionState(submitLead, initialState);
  const inputClass = "h-12 rounded-xl border border-white/10 bg-navy/70 px-4 text-white outline-none placeholder:text-white/35 focus:border-coral";

  useEffect(() => {
    if (state.redirectTo) window.location.assign(state.redirectTo);
  }, [state.redirectTo]);

  return <form action={formAction} className="grid gap-4">
    <input type="text" name="website" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px]" aria-hidden="true" />
    <input type="hidden" name="sourcePage" value={sourcePage} />
    <label className="grid gap-1 text-sm font-semibold">Name<input name="name" required maxLength={80} placeholder="Your name" className={inputClass} /></label>
    <label className="grid gap-1 text-sm font-semibold">Phone<input name="phone" required inputMode="tel" maxLength={20} placeholder="Phone number" className={inputClass} /></label>
    {!compact && <label className="grid gap-1 text-sm font-semibold">Email<input name="email" type="email" maxLength={160} placeholder="Email address (optional)" className={inputClass} /></label>}
    <label className="grid gap-1 text-sm font-semibold">Requirement<input name="requirement" required defaultValue={requirement} placeholder="What equipment do you need?" className={inputClass} /></label>
    <label className="grid gap-1 text-sm font-semibold">Message<textarea name="message" maxLength={2000} placeholder="Space, equipment, quantity or budget details" className="min-h-28 rounded-xl border border-white/10 bg-navy/70 p-4 text-white outline-none placeholder:text-white/35 focus:border-coral" /></label>
    {state.error && <p role="alert" className="rounded-lg border border-coral/40 bg-coral/10 p-3 text-sm text-white">{state.error}</p>}
    <button disabled={pending} className="btn-shine inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-gradient-to-r from-ember to-coral px-6 py-3 text-sm font-bold text-white shadow-glow disabled:opacity-60"><Send className="size-4" /> {pending ? "Sending..." : "Request Quote"}</button>
    <p className="text-xs leading-5 text-white/40">By submitting, you agree that our team may contact you about this enquiry.</p>
  </form>;
}
