import type { CSSProperties } from "react";
import type { Content } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";

export type SpotlightProps = SliceComponentProps<Content.SpotlightSlice>;

const bg = (url?: string | null): CSSProperties | undefined =>
  url ? ({ "--bg": `url("${url}")` } as CSSProperties) : undefined;

const Spotlight = ({ slice }: SpotlightProps) => {
  const p = slice.primary;
  return (
    <section
      className="about pad"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="wrap">
        <div className="about-img rv">
          <div
            className="main"
            role="img"
            aria-label={p.main_photo?.alt ?? ""}
            style={bg(p.main_photo?.url)}
          />
          <div
            className="mini"
            role="img"
            aria-label={p.mini_photo?.alt ?? ""}
            style={bg(p.mini_photo?.url)}
          />
          {p.signature && <div className="sig script">{p.signature}</div>}
        </div>
        <div className="rv d1">
          {p.eyebrow && <span className="eyebrow">{p.eyebrow}</span>}
          <PrismicRichText
            field={p.heading}
            components={{
              heading2: ({ children }) => <h2 className="title">{children}</h2>,
              em: ({ children }) => <em>{children}</em>,
            }}
          />
          <PrismicRichText field={p.body} />
          {p.pillars.length > 0 && (
            <div className="pillars">
              {p.pillars.map((x, i) => (
                <div className="pillar" key={i}>
                  <b>{x.title}</b>
                  <span>{x.text}</span>
                </div>
              ))}
            </div>
          )}
          {p.button_label && (
            <div style={{ marginTop: 30 }}>
              <a className="btn outline" href="#contact">
                {p.button_label}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Spotlight;
