import { asLink } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { getPreviewRef } from "@prismicio/next";
import { getSettings } from "@/lib/settings";

export default async function Footer() {
  const settings = await getSettings(await getPreviewRef());
  const d = settings?.data;
  const phone = d?.phone ?? "";
  const email = d?.email ?? "";
  const tel = `tel:${phone.replace(/[^\d+]/g, "")}`;
  const siteByUrl = d ? asLink(d.site_by_link) : null;

  return (
    <>
      <footer>
        <div className="wrap">
          <div>
            {d?.logo?.url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="fl" src={d.logo.url} alt={d.logo.alt ?? ""} />
            )}
            <p
              style={{
                marginTop: 14,
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontStyle: "italic",
                color: "#f1e3be",
                fontSize: 18,
              }}
            >
              {d?.tagline}
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            <a href="#services">Services</a>
            <a href="#destinations">Destinations</a>
            <a href="#home">Real Estate</a>
            <a href="#group">Group Trips</a>
            <a href="#ebook">Free Ebook</a>
          </div>
          <div>
            <h4>Contact</h4>
            {phone && <a href={tel}>{phone}</a>}
            {email && <a href={`mailto:${email}`}>{email}</a>}
          </div>
          <div className="legal">
            <span>{d?.legal_name}</span>
            {siteByUrl && (
              <span>
                Site by{" "}
                <a href={siteByUrl} target="_blank" rel="noopener">
                  {d?.site_by_label}
                </a>
              </span>
            )}
          </div>
          {d?.photo_credits && d.photo_credits.length > 0 && (
            <div className="cred">
              <PrismicRichText
                field={d.photo_credits}
                components={{ paragraph: ({ children }) => <>{children}</> }}
              />
            </div>
          )}
        </div>
      </footer>
      <div className="mbar">
        <a className="c" href={tel}>
          Call Lynette
        </a>
        <a className="b" href="#contact">
          {d?.nav_button_label ?? "Book Travel"}
        </a>
      </div>
    </>
  );
}
