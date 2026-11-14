import { cacheLife } from "next/cache";
import { cacheTagPrismicPages } from "@prismicio/next";
import { createClient } from "@/prismicio";

export async function getSettings(ref?: string) {
  "use cache";
  cacheLife("max");
  const client = createClient();
  const settings = await client
    .getSingle("settings", { ref })
    .catch(() => null);
  if (settings) cacheTagPrismicPages([settings]);
  return settings;
}
