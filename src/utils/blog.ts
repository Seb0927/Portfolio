import { getCollection, type CollectionEntry } from "astro:content";
import { getRelativeLocaleUrl } from "astro:i18n";
import type { Lang } from "@/i18n/ui";

export type BlogEntry = CollectionEntry<"blog">;

/**
 * Localized blog URLs without the trailing slash `getRelativeLocaleUrl`
 * emits, matching the convention used by the Navbar and LanguageSwitcher.
 */
function localizedPath(lang: Lang, path: string): string {
  return getRelativeLocaleUrl(lang, path).replace(/\/$/, "") || "/";
}

export function blogIndexUrl(lang: Lang): string {
  return localizedPath(lang, "blog");
}

export function blogPostUrl(lang: Lang, slug: string): string {
  return localizedPath(lang, `blog/${slug}`);
}

/** Published posts for a locale, newest first. */
export async function getBlogPosts(lang: Lang): Promise<BlogEntry[]> {
  const posts = await getCollection(
    "blog",
    ({ id, data }) => id.startsWith(`${lang}/`) && !data.draft,
  );

  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Entry id is `"<locale>/<slug>"`; the route param is just the slug. */
export function blogSlug(entry: BlogEntry): string {
  return entry.id.slice(entry.id.indexOf("/") + 1);
}

/**
 * Long date for the current locale. Formatted in UTC so an ISO
 * `YYYY-MM-DD` frontmatter date never shifts a day in western timezones.
 */
export function formatBlogDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === "es" ? "es" : "en", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}
