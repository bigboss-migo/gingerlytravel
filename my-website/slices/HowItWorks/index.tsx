import type { Content } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";

export type HowItWorksProps = SliceComponentProps<Content.HowItWorksSlice>;

const HowItWorks = ({ slice }: HowItWorksProps) => {
  const p = slice.primary;
  return (
    <section
      className="pad"
      id="how"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="wrap">
        <div className="center rv">
          {p.eyebrow && <span className="eyebrow">{p.eyebrow}</span>}
          <PrismicRichText
            field={p.title}
            components={{
              heading2: ({ children }) => <h2 className="title">{children}</h2>,
              em: ({ children }) => <em>{children}</em>,
            }}
          />
        </div>
        <div className="steps">
          {p.steps.map((s, i) => (
            <div className={`step rv d${i % 4}`} key={i}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
