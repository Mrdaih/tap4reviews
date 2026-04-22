import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  cover?: string;
  author?: string;
  readingMinutes: number;
};

export type Post = PostMeta & { content: string };

function readPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  return files.map((file) => {
    const slug = file.replace(/\.(mdx|md)$/, "");
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const words = content.split(/\s+/).length;
    const readingMinutes = Math.max(1, Math.round(words / 220));
    return {
      slug,
      title: data.title ?? slug,
      excerpt: data.excerpt ?? "",
      category: data.category ?? "General",
      date: data.date ?? "1970-01-01",
      cover: data.cover,
      author: data.author ?? "Tap4Reviews team",
      readingMinutes,
      content,
    } satisfies Post;
  });
}

export function getAllPosts(): Post[] {
  return readPosts().sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return readPosts().find((p) => p.slug === slug);
}
