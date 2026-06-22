const brandLogoItems = [
  { slug: "kaesun", name: "kaesun", sub: "P.W.R." },
  { slug: "proiron", name: "PROIRON", sub: "THE SPORT AUTHORITY" },
  { slug: "accuniq", name: "ACCUNIQ", sub: "P.W.R." },
  { slug: "firm", name: "FIRM", sub: "" },
  { slug: "body-charger", name: "BODY CHARGER", sub: "Your Health, We Care" },
  { slug: "snaicle", name: "snaicle", sub: "" },
  { slug: "reebok", name: "Reebok", sub: "P.W.R." },
] as const;

function BrandMark({ slug }: { slug: string }) {
  return (
    <span className={`brand-logo__mark brand-logo__mark--${slug}`} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

export function BrandLogoRail({ className = "", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <div className={`brand-logo-rail brand-logo-rail--${tone} ${className}`} role="list" aria-label="Fitness equipment brands">
      {brandLogoItems.map((brand, index) => (
        <div
          key={brand.slug}
          role="listitem"
          className={`brand-logo brand-logo--${brand.slug}`}
          style={{ animationDelay: `${index * 85}ms` }}
        >
          <BrandMark slug={brand.slug} />
          <span className="brand-logo__text">
            <span className="brand-logo__word">{brand.name}</span>
            {brand.sub && <span className="brand-logo__sub">{brand.sub}</span>}
          </span>
        </div>
      ))}
    </div>
  );
}
