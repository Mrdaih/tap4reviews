import { SITE } from "@/lib/site";

export function LegalShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="container-x py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="h-display text-4xl sm:text-5xl">{title}</h1>
        <p className="mt-3 text-sm text-white/50">Last updated: {updated}</p>
        <div className="prose prose-invert mt-10 max-w-none space-y-4 text-white/75 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-white [&_h3]:mt-6 [&_h3]:font-semibold [&_h3]:text-white [&_a]:text-gold">
          {children}
        </div>
        <hr className="my-12 border-white/10" />
        <p className="text-sm text-white/50">
          Questions? Contact us at{" "}
          <a href={`mailto:${SITE.email}`} className="text-gold">
            {SITE.email}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
