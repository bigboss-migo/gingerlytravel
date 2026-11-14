import type { Content } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";

export type TestimonialsProps = SliceComponentProps<Content.TestimonialsSlice>;

const Testimonials = ({ slice }: TestimonialsProps) => {
  const p = slice.primary;
  return (
    <section
      className="testi pad"
      id="reviews"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="wrap">
        <div className="center rv">
          {p.eyebrow && <span className="eyebrow gold">{p.eyebrow}</span>}
          <PrismicRichText
            field={p.title}
            components={{
              heading2: ({ children }) => <h2 className="title">{children}</h2>,
              em: ({ children }) => <em>{children}</em>,
            }}
          />
          <PrismicRichText
            field={p.lead}
            components={{ paragraph: ({ children }) => <p className="lead">{children}</p> }}
          />
        </div>
        <div className="t-grid">
          {p.reviews.map((r, i) => (
            <div className={`t-card rv d${i % 4}`} key={i}>
              {r.tag && <span className="ex">{r.tag}</span>}
              <p>&ldquo;{r.quote}&rdquo;</p>
              <div className="stars" aria-label={`${r.stars ?? "5"} out of 5 stars`}>
                {"\u2605".repeat(Number(r.stars ?? 5))}
              </div>
              <div className="who">{r.who}</div>
            </div>
          ))}
        </div>
        {p.footnote && <p className="t-note">{p.footnote}</p>}
      </div>
    </section>
  );
};

export default Testimonials;
