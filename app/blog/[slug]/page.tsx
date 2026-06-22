import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Clock3, UserRound } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { getBlogPost, getBlogPosts } from "@/lib/data";
import { absoluteUrl, getPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, JsonLd } from "@/lib/schema";
import { CtaBand } from "@/app/components/site";

const blogFaqFillers = [
  {
    question: "Can Span Fitness help me choose equipment after reading this guide?",
    answer:
      "Yes. Share your space, goals and budget so Span Fitness Equipments can suggest practical cardio, strength, accessory or setup options.",
  },
  {
    question: "Can I request a quotation for the equipment mentioned?",
    answer:
      "Yes. Use the contact page or WhatsApp enquiry option with the equipment names, quantity, city and intended usage.",
  },
  {
    question: "Do you support both home gym and commercial gym requirements?",
    answer:
      "Yes. Span Fitness Equipments supports home gyms, commercial gyms, studios, apartments, hotels, schools and corporate wellness spaces.",
  },
  {
    question: "Can the team suggest alternatives if a product is unavailable?",
    answer:
      "Yes. Availability may vary, so the team can suggest comparable products or setup combinations based on your requirement.",
  },
];

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return (await getBlogPosts()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  return getPageMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/${slug}`,
    image: post.featuredImage,
    type: "article",
  });
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();
  const posts = await getBlogPosts();
  const related = posts
    .filter((item) => item.slug !== slug && item.category === post.category)
    .slice(0, 3);
  const words = post.content.trim().split(/\s+/).length;
  const postFaqs = [...post.faqs, ...blogFaqFillers.filter((faq) => !post.faqs.some((item) => item.question === faq.question))].slice(0, 4);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: absoluteUrl(post.featuredImage),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Span Fitness Equipments",
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/span-fitness-logo.png"),
      },
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };
  const faqSchema = postFaqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: postFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];
  return (
    <>
      <JsonLd
        data={[
          articleSchema,
          breadcrumbSchema(crumbs),
          ...(faqSchema ? [faqSchema] : []),
        ]}
      />
      <Breadcrumbs items={crumbs} />
      <article>
        <header className="border-b border-white/10 py-20">
          <div className="section-shell max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[.2em] text-coral">
              {post.category}
            </p>
            <h1 className="mt-4 font-display text-4xl font-black leading-tight sm:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/65">
              {post.excerpt}
            </p>
            <div className="mt-7 flex flex-wrap gap-5 text-sm text-white/45">
              <span className="flex items-center gap-2">
                <UserRound className="size-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <CalendarDays className="size-4" />
                {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                  dateStyle: "long",
                })}
              </span>
              <span className="flex items-center gap-2">
                <Clock3 className="size-4" />
                {Math.max(2, Math.ceil(words / 200))} min read
              </span>
            </div>
          </div>
          <div className="section-shell mt-10 max-w-5xl">
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-white/10">
              <Image
                src={post.featuredImage}
                alt={post.featuredImageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </header>
        <div className="section-shell grid max-w-6xl gap-12 py-20 lg:grid-cols-[1fr_280px]">
          <div className="max-w-3xl">
            {post.content.split("\n\n").map((paragraph) => (
              <p
                key={paragraph.slice(0, 50)}
                className="mb-7 text-base leading-8 text-white/70"
              >
                {paragraph}
              </p>
            ))}
            {postFaqs.length > 0 && (
              <section className="mt-14">
                <h2 className="font-display text-3xl font-black">
                  Frequently asked questions
                </h2>
                <div className="mt-6 grid gap-4">
                  {postFaqs.map((faq) => (
                    <div
                      key={faq.question}
                      className="rounded-2xl border border-white/10 bg-white/5 p-6"
                    >
                      <h3 className="font-display text-xl font-black">
                        {faq.question}
                      </h3>
                      <p className="mt-3 leading-7 text-white/60">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
          <aside>
            <div className="sticky top-32 rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs font-black uppercase tracking-widest text-coral">
                Quick Summary
              </p>
              <p className="mt-4 text-sm leading-7 text-white/60">
                {post.excerpt}
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 font-bold text-coral"
              >
                Request equipment advice <ArrowRight className="size-4" />
              </Link>
            </div>
          </aside>
        </div>
      </article>
      {related.length > 0 && (
        <section className="bg-white/[.025] py-16">
          <div className="section-shell">
            <h2 className="font-display text-3xl font-black">Related guides</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="rounded-2xl border border-white/10 bg-[#101a38] p-6 hover:border-coral/50"
                >
                  <p className="text-xs font-bold text-coral">
                    {item.category}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-black">
                    {item.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <CtaBand
        title="Need equipment advice for your space?"
        text="Share your floor area, users and budget for a focused equipment shortlist."
      />
    </>
  );
}
