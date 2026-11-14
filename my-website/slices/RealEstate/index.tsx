import type { CSSProperties } from "react";
import type { Content } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import Icon from "@/components/Icon";

export type RealEstateProps = SliceComponentProps<Content.RealEstateSlice>;

const RealEstate = ({ slice }: RealEstateProps) => {
  const p = slice.primary;
  const style = p.bg_photo?.url
    ? ({ "--bg": `url("${p.bg_photo.url}")` } as CSSProperties)
    : undefined;
  return (
    <section
      className="home pad"
      id="home"
      style={style}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="wrap">
        <div className="rv">
          {p.eyebrow && <span className="eyebrow gold">{p.eyebrow}</span>}
          <PrismicRichText
            field={p.heading}
            components={{
              heading2: ({ children }) => <h2>{children}</h2>,
              em: ({ children }) => <em>{children}</em>,
            }}
          />
          <PrismicRichText
            field={p.body}
            components={{ paragraph: ({ children }) => <p className="l">{children}</p> }}
          />
          <div style={{ marginTop: 30, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a className="btn gold lg" href="#contact">
              {p.button_label}
            </a>
          </div>
          {p.small_note && <p className="note-small">{p.small_note}</p>}
        </div>
        <div className="keys rv d1">
          {p.keys.map((k, i) => (
            <div className="key" key={i}>
              <Icon name={k.icon} />
              <div>
                <b>{k.title}</b>
                <span>{k.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RealEstate;
