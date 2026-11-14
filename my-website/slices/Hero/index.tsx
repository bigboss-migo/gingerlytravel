import type { CSSProperties } from "react";
import { cacheLife } from "next/cache";
import type { Content } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import { cacheTagPrismicPages, getPreviewRef } from "@prismicio/next";
import { createClient } from "@/prismicio";

type HeroProps = SliceComponentProps<Content.HeroSlice>;

const icon = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export default async function Hero({ slice }: HeroProps) {
  const settings = await getSettings(await getPreviewRef());
  const { primary } = slice;
  const logo = settings?.data.logo;
  const portraitStyle = primary.portrait.url
    ? ({ "--bg": `url("${primary.portrait.url}")` } as CSSProperties)
    : undefined;

  return (
    <section
      className="hero"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="wrap">
        <div>
          <span className="eyebrow gold">{primary.eyebrow}</span>
          <PrismicRichText
            field={primary.headline}
            components={{
              heading1: ({ children }) => <h1>{children}</h1>,
              em: ({ children }) => <span className="o">{children}</span>,
              strong: ({ children }) => <span className="s">{children}</span>,
            }}
          />
          <p className="sub">{primary.subtext}</p>
          <div className="ctas">
            <a className="btn primary lg" href="#contact">
              {primary.primary_button_label}
            </a>
            <a className="btn ghost lg" href="#ebook">
              <svg {...icon}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>{" "}
              {primary.secondary_button_label}
            </a>
          </div>
          <div className="home-hook">
            <svg {...icon}>
              <path d="m3 11 9-8 9 8M5 10v10h14V10M10 20v-6h4v6" />
            </svg>
            <span>
              <b>{primary.hook_bold}</b> {primary.hook_text}
            </span>
          </div>
        </div>

        <div className="hero-art">
          <div
            className="port"
            role="img"
            aria-label={primary.portrait.alt ?? "Portrait"}
            style={portraitStyle}
          />
          {logo?.url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="logo" src={logo.url} alt={logo.alt ?? ""} />
          )}
          <div className="badge">
            <i>
              <svg width="18" height="18" {...icon}>
                <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
              </svg>
            </i>
            <span>
              <b>{primary.badge_title}</b>
              {primary.badge_subtitle}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

async function getSettings(ref?: string) {
  "use cache";
  cacheLife("max");
  const client = createClient();
  const settings = await client
    .getSingle("settings", { ref })
    .catch(() => null);
  if (settings) cacheTagPrismicPages([settings]);
  return settings;
}
