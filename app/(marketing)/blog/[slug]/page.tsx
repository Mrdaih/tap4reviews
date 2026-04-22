import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost } from "@/lib/posts";
import { BreadcrumbJsonLd } from "@/components/shared/StructuredData";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

const mdxComponents = {
  h2: (p: any) => <h2 className="mt-10 font-display text-2xl text-white" {...p} />,
  h3: (p: any) => <h3 className="mt-6 font-semibold text-white" {...p} />,
  p: (p: any) => <p className="mt-4 leading-relaxed text-white/80" {...p} />,
  a: (p: any) => <a className="text-gold underline-offset-4 hover:underline" {...p} />,
  ul: (p: any) => <ul className="mt-4 list-disc space-y-2 pl-6 text-white/80" {...p} />,
  ol: (p: any) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-white/80" {...p} />,
  blockquote: (p: any) => (
    <blockquote className="mt-6 border-l-2 border-gold pl-4 italic text-white/70" {...p} />
  ),
  code: (p: any) => <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm text-gold" {...p} />,
};

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) return notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${SITE.url}/` },
          { name: "Blog", url: `${SITE.url}/blog` },
          { name: post.title, url: `${SITE.url}/blog/${post.slug}` },
        ]}
      />
      <article className="container-x py-20">
        <div className="mx-auto max-w-3xl">
          <Link href="/blog" className="text-sm text-white/50 hover:text-white">← All posts</Link>
          <div className="mt-6 flex items-center gap-3 text-xs text-white/50">
            <span className="chip">{post.category}</span>
            <time>{new Date(post.date).toLocaleDateString("en-AE", { year: "numeric", month: "long", day: "numeric" })}</time>
            <span>·</span>
            <span>{post.readingMinutes} min read</span>
          </div>
          <h1 className="mt-4 h-display text-4xl sm:text-5xl">{post.title}</h1>
          <p className="mt-4 text-lg text-white/70">{post.excerpt}</p>
          <div className="divider-glow my-10" />
          <div className="text-white/80">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </div>
      </article>
    </>
  );
}
