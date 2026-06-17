export type FaqItem = { question: string; answer: string };

export function FaqSection({ title = "Frequently asked questions", items }: { title?: string; items: FaqItem[] }) {
  return (
    <section className="faq-showcase relative overflow-hidden py-16 sm:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(225,117,100,.16),transparent_32%),linear-gradient(180deg,#09122c_0%,#101a38_100%)]" />
      <div className="faq-showcase__orb faq-showcase__orb--one" />
      <div className="faq-showcase__orb faq-showcase__orb--two" />
      <div className="section-shell relative max-w-5xl">
        <div className="faq-showcase__header">
          <span className="faq-showcase__badge">Quick Answers</span>
          <h2>{title}</h2>
          <p>Clear answers for equipment choices, availability, setup planning and support.</p>
        </div>
        <div className="faq-showcase__list">
          {items.map((item, index) => (
            <details
              key={item.question}
              className="faq-showcase__item group"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <summary>
                <span>{item.question}</span>
                <b>+</b>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
