import { asLink, isFilled, type Content } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import Icon from "@/components/Icon";

export type EbookProps = SliceComponentProps<Content.EbookSlice>;

const Ebook = ({ slice }: EbookProps) => {
  const p = slice.primary;
  const pdfUrl = isFilled.link(p.pdf) ? asLink(p.pdf) : null;
  return (
    <section
      className="ebook pad"
      id="ebook"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="wrap">
        <div className="cover-wrap rv">
          {p.cover?.url && <img src={p.cover.url} alt={p.cover.alt ?? ""} />}
          <div className="free">
            <span>
              {p.badge_top}
              <b>{p.badge_bottom}</b>
            </span>
          </div>
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
          <PrismicRichText
            field={p.intro}
            components={{ paragraph: ({ children }) => <p className="lead">{children}</p> }}
          />
          <ul>
            {p.bullets.map((b, i) => (
              <li key={i}>{b.text}</li>
            ))}
          </ul>
          {pdfUrl && (
            <a className="btn primary lg" href={pdfUrl} download>
              <Icon name="download" /> {p.button_label}
            </a>
          )}
          {p.meta_line && <p className="meta">{p.meta_line}</p>}
        </div>
      </div>
    </section>
  );
};

export default Ebook;
