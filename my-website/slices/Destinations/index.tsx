import type { CSSProperties } from "react";
import type { Content } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";

export type DestinationsProps = SliceComponentProps<Content.DestinationsSlice>;

const Destinations = ({ slice }: DestinationsProps) => {
  const p = slice.primary;
  return (
    <section
      className="pad"
      id="destinations"
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

        <div className="dest-grid">
          {p.tiles.map((t, i) => {
            const size = t.size === "big" || t.size === "wide" ? ` ${t.size}` : "";
            const style = t.photo?.url
              ? ({ "--bg": `url("${t.photo.url}")` } as CSSProperties)
              : undefined;
            return (
              <a
                href="#contact"
                className={`dest${size} rv d${i % 4}`}
                style={style}
                key={i}
              >
                <div className="in">
                  {t.small_label && <small>{t.small_label}</small>}
                  <h3>{t.title}</h3>
                  <p>{t.description}</p>
                </div>
              </a>
            );
          })}
        </div>

        {p.photo_note && <p className="dest-note">{p.photo_note}</p>}
      </div>
    </section>
  );
};

export default Destinations;
