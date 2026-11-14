import { getPreviewRef } from "@prismicio/next";
import { getSettings } from "@/lib/settings";
import NavBar from "./NavBar";

export default async function Header() {
  const settings = await getSettings(await getPreviewRef());
  const d = settings?.data;
  const phone = d?.phone ?? "";
  const email = d?.email ?? "";

  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <div className="l">
            <span className="tag">{d?.tagline}</span>
          </div>
          <div className="r">
            {phone && <a href={`tel:${phone.replace(/[^\d+]/g, "")}`}>{phone}</a>}
            {email && <a href={`mailto:${email}`}>{email}</a>}
          </div>
        </div>
      </div>
      <NavBar
        brandName={d?.brand_name ?? ""}
        brandSubtitle={d?.brand_subtitle ?? ""}
        logoUrl={d?.logo?.url ?? null}
        logoAlt={d?.logo?.alt ?? ""}
        buttonLabel={d?.nav_button_label ?? "Book Travel"}
      />
    </>
  );
}
