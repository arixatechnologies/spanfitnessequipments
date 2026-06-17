import { ButtonLink } from "./components/site";

export default function NotFound() {
  return <section className="grid min-h-[60vh] place-items-center px-4 text-center"><div><p className="text-sm font-black uppercase tracking-[0.2em] text-coral">404</p><h1 className="mt-4 font-display text-5xl font-black">This page could not be found.</h1><p className="mt-4 text-white/60">The product or page may have moved.</p><div className="mt-7"><ButtonLink href="/">Return Home</ButtonLink></div></div></section>;
}
