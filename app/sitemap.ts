import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = SITE.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/pricing",
    "/how-it-works",
    "/compatibility",
    "/faq",
    "/about",
    "/contact",
    "/blog",
    "/refund-policy",
    "/privacy-policy",
    "/terms-and-conditions",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const posts: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...posts];
}
