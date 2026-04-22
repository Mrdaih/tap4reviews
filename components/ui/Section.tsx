import { cn } from "@/lib/utils";

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className,
  align = "center",
}: {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  align?: "center" | "left";
}) {
  return (
    <section id={id} className={cn("section", className)}>
      <div className="container-x">
        {(eyebrow || title || subtitle) && (
          <div
            className={cn(
              "mx-auto mb-12 max-w-2xl",
              align === "center" ? "text-center" : "text-left ml-0",
            )}
          >
            {eyebrow ? (
              <div className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                {eyebrow}
              </div>
            ) : null}
            {title ? (
              <h2 className="h-display text-3xl text-balance sm:text-5xl">
                {title}
              </h2>
            ) : null}
            {subtitle ? (
              <p className="mt-4 text-base text-white/70 sm:text-lg">
                {subtitle}
              </p>
            ) : null}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
