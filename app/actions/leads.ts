"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { insertLocalRow } from "@/lib/admin-store";
import { createClient } from "@/lib/supabase/server";
import { leadSchema } from "@/lib/validators";

export type LeadFormState = { error?: string };
const attempts = new Map<string, { count: number; resetAt: number }>();

async function sendLeadEmail(lead: { name: string; phone: string; email: string; requirement: string; message: string; sourcePage: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;
  if (!apiKey || !to) return;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Span Fitness Website <onboarding@resend.dev>",
      to: [to],
      subject: `New website enquiry: ${lead.requirement}`,
      text: `Name: ${lead.name}\nPhone: ${lead.phone}\nEmail: ${lead.email || "Not provided"}\nRequirement: ${lead.requirement}\nMessage: ${lead.message}\nSource: ${lead.sourcePage}`
    })
  });
}

export async function submitLead(_: LeadFormState, formData: FormData): Promise<LeadFormState> {
  const parsed = leadSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message || "Please check your details." };

  const headerStore = await headers();
  const ip = headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const key = createHash("sha256").update(ip).digest("hex");
  const now = Date.now();
  const entry = attempts.get(key);
  if (entry && entry.resetAt > now && entry.count >= 5) return { error: "Too many enquiries were submitted. Please call or WhatsApp us." };
  attempts.set(key, entry && entry.resetAt > now ? { ...entry, count: entry.count + 1 } : { count: 1, resetAt: now + 15 * 60_000 });

  const lead = parsed.data;
  const supabase = await createClient();
  if (supabase) {
    const { error } = await supabase.from("contact_leads").insert({
      name: lead.name,
      phone: lead.phone,
      email: lead.email || null,
      requirement: lead.requirement,
      product_id: lead.productId || null,
      message: lead.message || null,
      source_page: lead.sourcePage,
      ip_hash: key,
      status: "new"
    });
    if (error) return { error: "We could not save your enquiry. Please call or WhatsApp us directly." };
  } else {
    await insertLocalRow("contact_leads", {
      name: lead.name,
      phone: lead.phone,
      email: lead.email || null,
      requirement: lead.requirement,
      product_id: lead.productId || null,
      message: lead.message || null,
      source_page: lead.sourcePage,
      ip_hash: key,
      status: "new",
    });
  }

  try { await sendLeadEmail(lead); } catch {}
  redirect(`/thank-you?requirement=${encodeURIComponent(lead.requirement)}`);
}
