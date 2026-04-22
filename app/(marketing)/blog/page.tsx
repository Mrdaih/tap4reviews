import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { BreadcrumbJsonLd } from "@/components/shared/StructuredData";
import { getAllPosts } from "@/lib/posts";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tactics, playbooks, and essays on Google reviews, NFC technology, and growing a restaurant in the UAE.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${SITE.url}/` },
          { name: "Blog", url: `${SITE.url}/blog` },
        ]}
      />
      <Section
        eyebrow="Blog"
        title={<>Playbooks for <span className="gradient-text">UAE restaurants.</span></>}
        subtitle="Short, opinionated essays on reviews, growth, and the tech that quietly moves the needle."
      >
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="glass group flex flex-col overflow-hidden transition hover:-translate-y-1"
            >
              <div className="aspect-[16/9] bg-gradient-to-br from-gold/20 to-ink-700 p-6">
                <span className="chip">{p.category}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-lg font-semibold text-white group-hover:text-gold">{p.title}</h2>
                <p className="mt-2 flex-1 text-sm text-white/60">{p.excerpt}</p>
                <div className="mt-4 flex items-center gap-3 text-xs text-white/40">
                  <time>{new Date(p.date).toLocaleDateString("en-AE", { year: "numeric", month: "short", day: "numeric" })}</time>
                  <span>·</span>
                  <span>{p.readingMinutes} min read</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
