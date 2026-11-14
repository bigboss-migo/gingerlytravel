"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#destinations", label: "Destinations" },
  { href: "#home", label: "Real Estate" },
  { href: "#group", label: "Group Trips" },
  { href: "#ebook", label: "Free Ebook" },
  { href: "#about", label: "Meet Carolyn" },
];

type Props = {
  brandName: string;
  brandSubtitle: string;
  logoUrl: string | null;
  logoAlt: string;
  buttonLabel: string;
};

export default function NavBar({
  brandName,
  brandSubtitle,
  logoUrl,
  logoAlt,
  buttonLabel,
}: Props) {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${stuck ? " stuck" : ""}`} id="nav">
      <div className="wrap">
        <a className="brand" href="#top">
          {logoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt={logoAlt} />
          )}
          <span>
            <b>{brandName}</b>
            <small>{brandSubtitle}</small>
          </span>
        </a>
        <button
          className="burger"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav
          className={`links${open ? " open" : ""}`}
          id="links"
          onClick={(e) => {
            if ((e.target as HTMLElement).tagName === "A") setOpen(false);
          }}
        >
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
          <a className="btn primary" href="#contact">
            {buttonLabel}
          </a>
        </nav>
      </div>
    </header>
  );
}
