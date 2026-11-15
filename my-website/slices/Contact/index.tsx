import type { Content } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";
import { getSettings } from "@/lib/settings";

export type ContactProps = SliceComponentProps<Content.ContactSlice>;

const Contact = async ({ slice }: ContactProps) => {
  const p = slice.primary;
  const settings = await getSettings();
  if (!settings) return null;
  const s = settings.data;

  const phone = s.phone ?? "";
  const digits = phone.replace(/\D/g, "");
  const telHref = digits ? `tel:${digits.length === 10 ? "+1" : "+"}${digits}` : undefined;

  return (
    <section
      className="contact pad"
      id="contact"
      style={{ background: "linear-gradient(var(--sky-xl),#fff)" }}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="wrap">
        <div className="c-info rv">
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
          <div style={{ marginTop: 22 }}>
            {phone && (
              <a className="row" href={telHref}>
                <i>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
                  </svg>
                </i>
                <div>
                  <small>{p.call_label}</small>
                  <b>{phone}</b>
                </div>
              </a>
            )}
            {s.email && (
              <a className="row" href={`mailto:${s.email}`}>
                <i>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-10 6L2 7" />
                  </svg>
                </i>
                <div>
                  <small>{p.email_label}</small>
                  <b>{s.email}</b>
                </div>
              </a>
            )}
          </div>
          {s.logo?.url && <img className="logo-b" src={s.logo.url} alt={s.logo.alt ?? ""} />}
        </div>

        <ContactForm
          toEmail={s.email ?? ""}
          heading={p.form_heading ?? ""}
          intro={p.form_intro ?? ""}
          submitLabel={p.submit_label ?? "Send"}
          finePrint={`${p.fine_print ?? ""} ${phone}.`.trim()}
        />
      </div>
    </section>
  );
};

export default Contact;
