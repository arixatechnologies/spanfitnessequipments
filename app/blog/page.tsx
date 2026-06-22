import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  Sparkles,
} from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { fallbackBlogPosts, type BlogPost } from "@/lib/blog-data";
import { getPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, itemListSchema, JsonLd, webPageSchema } from "@/lib/schema";

const title = "Fitness Equipment and Gym Setup Blog";
const description =
  "Read gym equipment buying guides, commercial gym setup advice, maintenance tips and local fitness equipment insights from Span Fitness Equipments.";

const blogVisuals = [
  "/images/blog/blog1.png",
  "/images/blog/blog2.png",
  "/images/blog/blog3.png",
  "/images/blog/blog4.png",
  "/images/blog/blog5.png",
  "/images/blog/blog6.png",
];

export const dynamic = "force-dynamic";

export function generateMetadata() {
  return getPageMetadata({ title, description, path: "/blog" });
}

function blogImage(post: BlogPost, index: number) {
  if (post.featuredImage && !post.featuredImage.includes("gym-equipment-guide.png")) return post.featuredImage;
  return blogVisuals[index % blogVisuals.length];
}

export default async function BlogPage() {
  const visiblePosts = fallbackBlogPosts.slice(0, 6);
  const heroPost = visiblePosts[0];
  const crumbs = [{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }];

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ name: title, description, path: "/blog", type: "Blog" }),
          breadcrumbSchema(crumbs),
          itemListSchema(
            title,
            "/blog",
            visiblePosts.map((post) => ({ name: post.title, path: `/blog/${post.slug}` })),
          ),
        ]}
      />
      <Breadcrumbs items={crumbs} />

      <section className="blog-hub-hero">
        <Image
          src={heroPost ? blogImage(heroPost, 0) : "/images/gallery/gallery1.jpg"}
          alt="Span Fitness blog knowledge hub"
          fill
          priority
          sizes="100vw"
          className="blog-hub-hero__image"
        />
        <div className="blog-hub-hero__veil" />
        <div className="blog-hub-hero__grid" />
        <div className="blog-hub-hero__orb blog-hub-hero__orb--one" />
        <div className="blog-hub-hero__orb blog-hub-hero__orb--two" />
        <div className="section-shell relative z-10 grid items-center gap-8 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="blog-hub-kicker">
              <BookOpenCheck className="size-4" /> Fitness Knowledge Hub
            </p>
            <h1>Practical gym equipment guides with real buying clarity.</h1>
            <p>
              Simple buying guides for home gyms, commercial gyms and fitness equipment planning.
            </p>
          </div>

          {heroPost && (
            <Link href={`/blog/${heroPost.slug}`} className="blog-spotlight-card">
              <span className="blog-spotlight-card__image">
                <Image
                  src={blogImage(heroPost, 0)}
                  alt={heroPost.featuredImageAlt}
                  fill
                  sizes="(min-width: 1024px) 520px, 100vw"
                  className="object-cover"
                />
              </span>
              <span className="blog-spotlight-card__content">
                <span className="blog-spotlight-card__tag">
                  <Sparkles className="size-4" /> Featured Guide
                </span>
                <strong>{heroPost.title}</strong>
                <small>{heroPost.excerpt}</small>
                <span className="blog-spotlight-card__meta">
                  Read guide
                  <ArrowRight className="ml-auto size-4" />
                </span>
              </span>
            </Link>
          )}
        </div>
      </section>

      <section id="blog-guides" className="blog-hub-board">
        <div className="blog-hub-board__glow blog-hub-board__glow--one" />
        <div className="blog-hub-board__glow blog-hub-board__glow--two" />
        <div className="section-shell relative z-10">
          <div className="blog-simple-head">
            <p className="blog-hub-kicker">
              <BookOpenCheck className="size-4" /> Latest Guides
            </p>
            <h2>Read our simple fitness equipment guides.</h2>
          </div>

          <div className="blog-simple-list">
            {visiblePosts.map((post, index) => (
              <article key={post.slug} className="blog-simple-card">
                <Link href={`/blog/${post.slug}`} className="blog-simple-card__image">
                  <Image
                    src={blogImage(post, index)}
                    alt={post.featuredImageAlt}
                    fill
                    sizes="(min-width: 1024px) 360px, 100vw"
                    className="object-cover"
                  />
                </Link>
                <div className="blog-simple-card__body">
                  <span>{post.category}</span>
                  <h2>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p>{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="blog-simple-card__link">
                    Read More <ArrowRight className="size-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
