import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { cacheTagPrismicPages, getPreviewRef } from "@prismicio/next";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";

export default async function Page() {
  const page = await getPage(await getPreviewRef());

  return (
    <>
      <Header />
      <main id="top">
        <SliceZone slices={page.data.slices} components={components} />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}

async function getPage(ref?: string) {
  "use cache";
  cacheLife("max");
  const client = createClient();
  const page = await client.getSingle("homepage", { ref }).catch(() => notFound());
  cacheTagPrismicPages([page]);
  return page;
}
