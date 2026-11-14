import type { Content } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import Icon from "@/components/Icon";

export type ServicesProps = SliceComponentProps<Content.ServicesSlice>;

const Services = ({ slice }: ServicesProps) => {
  const p = slice.primary;
  return (
    <section
      className="services pad"
      id="services"
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
          <PrismicRichText
            field={p.lead}
            components={{ paragraph: ({ children }) => <p className="lead">{children}</p> }}
          />
        </div>

        <div className="grid4">
          {p.cards.map((c, i) => (
            <div className={`card rv d${i % 4}`} key={i}>
              <div className="ic">
                <Icon name={c.icon} />
              </div>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
            </div>
          ))}
        </div>

        <div className="anything rv">
          <PrismicRichText
            field={p.callout_heading}
            components={{
              heading3: ({ children }) => <h3>{children}</h3>,
              em: ({ children }) => <em>{children}</em>,
            }}
          />
          <a className="btn gold" href="#contact">
            {p.callout_button_label}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
