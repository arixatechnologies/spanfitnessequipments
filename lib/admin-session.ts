import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const adminCookieName = "span_admin_session";
const sessionMaxAge = 60 * 60 * 8;
const fallbackAdminEmail = "spanfitnessequipments@gmail.com";
const fallbackAdminPassword = "Span@123";
const fallbackSessionSecret = "SpanFitnessAdminSession@123";

function getAdminEmail() {
  return process.env.ADMIN_EMAIL || fallbackAdminEmail;
}

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || fallbackAdminPassword;
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || fallbackSessionSecret;
}

function signSession(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("hex");
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  if (leftBuffer.length !== rightBuffer.length) return false;
  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function isEnvAdminConfigured() {
  return Boolean(getAdminEmail() && getAdminPassword() && getSessionSecret());
}

export function hasEnvAdminCookie(cookieValue?: string) {
  return Boolean(cookieValue);
}

export function validateEnvAdminCredentials(email: string, password: string) {
  if (!isEnvAdminConfigured()) return false;
  return safeCompare(email.trim().toLowerCase(), getAdminEmail().trim().toLowerCase()) && safeCompare(password, getAdminPassword());
}

export async function signInEnvAdmin(email: string) {
  const issuedAt = Date.now().toString();
  const emailToken = Buffer.from(email.trim().toLowerCase(), "utf8").toString("base64url");
  const value = `${emailToken}.${issuedAt}`;
  const cookieStore = await cookies();

  cookieStore.set(adminCookieName, `${value}.${signSession(value)}`, {
    httpOnly: true,
    maxAge: sessionMaxAge,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function signOutEnvAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(adminCookieName);
}

export async function hasEnvAdminSessionCookie() {
  const cookieStore = await cookies();
  return hasEnvAdminCookie(cookieStore.get(adminCookieName)?.value);
}

export async function getEnvAdminUser() {
  if (!isEnvAdminConfigured()) return null;

  const cookieStore = await cookies();
  const session = cookieStore.get(adminCookieName)?.value;
  if (!session) return null;

  const parts = session.split(".");
  if (parts.length !== 3) return null;

  const [emailToken, issuedAt, signature] = parts;
  const value = `${emailToken}.${issuedAt}`;
  const age = Date.now() - Number(issuedAt);
  const email = Buffer.from(emailToken, "base64url").toString("utf8");

  if (!Number.isFinite(age) || age < 0 || age > sessionMaxAge * 1000) return null;
  if (!safeCompare(signature, signSession(value))) return null;
  if (!safeCompare(email, getAdminEmail().trim().toLowerCase())) return null;

  return {
    id: "env-admin",
    email,
    profile: {
      full_name: "Span Fitness Admin",
      role: "admin",
    },
  };
}
