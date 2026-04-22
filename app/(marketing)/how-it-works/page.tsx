import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { BreadcrumbJsonLd } from "@/components/shared/StructuredData";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "From order to review in five simple steps. See how Tap4Reviews cards turn every customer phone into a 5-star review engine.",
  alternates: { canonical: "/how-it-works" },
};

const steps = [
  {
    n: "01",
    t: "Order your cards",
    d: "Pick a pack size and — if you want — add your branding. Pay in AED, no subscription, no hidden fees.",
    icon: "📦",
  },
  {
    n: "02",
    t: "We program each card",
    d: "You share your Google review URL or Place ID. We program every NFC chip and print the QR fallback on the back.",
    icon: "🧠",
  },
  {
    n: "03",
    t: "Place cards on tables",
    d: "Stand them up on tables, slip them into the bill folder, or keep them at the counter. They work anywhere a phone can reach.",
    icon: "🍽️",
  },
  {
    n: "04",
    t: "Guest taps → review opens",
    d: "No app, no scan, no account. The customer's phone opens your Google review page in under 3 seconds.",
    icon: "📱",
  },
  {
    n: "05",
    t: "Track results",
    d: "Log in to your dashboard to see taps per card, per day, per week. Know which tables convert best.",
    icon: "📈",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${SITE.url}/` },
        { name: "How it works", url: `${SITE.url}/how-it-works` },
      ]} />

      <Section
        eyebrow="How it works"
        title={<>From order to review in <span className="gradient-text">five steps.</span></>}
        subtitle="No apps. No training. No tech debt. Just cards that turn taps into reviews."
      >
        <div className="mx-auto max-w-4xl space-y-4">
          {steps.map((s, i) => (
            <div key={s.n} className="glass grid gap-4 p-6 sm:grid-cols-[80px_1fr_80px] sm:items-center">
              <div className="font-display text-3xl text-gold">{s.n}</div>
              <div>
                <h3 className="text-xl font-semibold">{s.t}</h3>
                <p className="mt-1 text-sm text-white/70">{s.d}</p>
              </div>
              <div className="hidden text-4xl sm:block text-right">{s.icon}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Watch it in action"
        title="30 seconds. One tap. One review."
      >
        <div className="mx-auto max-w-3xl">
          <div className="glass aspect-video flex items-center justify-center">
            <div className="text-center text-white/60">
              <div className="text-5xl">▶</div>
              <div className="mt-3 text-sm">Demo video coming soon</div>
            </div>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Best practices"
        title="What the top-performing restaurants do."
      >
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
          {[
            { t: "Place at eye level", d: "Cards stood on a small stand outperform cards lying flat. Eye contact = action." },
            { t: "Pair with the bill", d: "Best moment to ask is when the guest is already reaching for their phone to pay." },
            { t: "Say one line to the guest", d: "“Loved it? Tap here.” That's all. Don't over-explain NFC — it feels magical when it just works." },
          ].map((t) => (
            <div key={t.t} className="glass p-6">
              <h3 className="font-semibold">{t.t}</h3>
              <p className="mt-1 text-sm text-white/70">{t.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/pricing" className="btn-primary">Get your cards →</Link>
        </div>
      </Section>
    </>
  );
}
