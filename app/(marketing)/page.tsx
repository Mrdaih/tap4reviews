import Link from "next/link";
import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { TapDemo } from "@/components/ui/TapDemo";
import { FAQJsonLd, LocalBusinessJsonLd } from "@/components/shared/StructuredData";
import { SITE } from "@/lib/site";
import { formatAED, whatsappLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "NFC Google Review Cards for UAE Restaurants",
  description:
    "Turn every table into a 5-star review. Premium NFC cards that redirect customers to your Google review page with a single tap. Built in Dubai for UAE F&B.",
  alternates: { canonical: "/" },
};

const faqs = [
  {
    q: "What exactly does a Tap4Reviews card do?",
    a: "When a customer taps their phone on the card, it instantly opens your Google review page — no apps, no QR scanning. There's also a backup QR code for older phones.",
  },
  {
    q: "Do I need any hardware or a subscription?",
    a: "No hardware and no mandatory subscription. You buy the cards once and we program them to your review link. Upgrade to Pro anytime for analytics and multi-card management.",
  },
  {
    q: "How long does delivery take inside the UAE?",
    a: "Standard cards ship within 2–3 working days across the UAE. Custom-branded cards take 5–7 working days.",
  },
  {
    q: "Can I change the review link later?",
    a: "Yes — every card is programmable. Log in to your dashboard and update the redirect URL anytime, instantly.",
  },
  {
    q: "What phones support NFC?",
    a: "All iPhones from XS (2018) onwards and virtually every modern Android phone. For the rare exceptions, the QR code on the back always works.",
  },
];

export default function HomePage() {
  return (
    <>
      <LocalBusinessJsonLd />
      <FAQJsonLd faqs={faqs.map((f) => ({ q: f.q, a: typeof f.a === "string" ? f.a : "" }))} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-hero-glow">
        <div className="container-x pt-20 pb-16 sm:pt-28 sm:pb-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="chip mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald" /> Trusted by UAE restaurants
              </div>
              <h1 className="h-display text-4xl leading-[1.05] text-balance sm:text-6xl">
                Turn every table into a <span className="gradient-text">5-star review.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-white/70">
                Premium NFC cards that drop your guests straight onto your Google review page — one tap, zero friction. Built in Dubai for the UAE F&amp;B industry.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/pricing" className="btn-primary">
                  Get your cards →
                </Link>
                <Link href="/how-it-works" className="btn-secondary">
                  See how it works
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-white/50">
                <span>• NFC + QR dual mode</span>
                <span>• UAE-based support</span>
                <span>• Ships in 48h</span>
              </div>
            </div>
            <div className="relative">
              <TapDemo />
            </div>
          </div>
        </div>
        <div className="divider-glow" />
      </section>

      {/* STATS / SOCIAL PROOF */}
      <Section
        eyebrow="Built for hospitality"
        title={<>Reviews move the needle. <span className="gradient-text">We move reviews.</span></>}
        subtitle="Restaurants using Tap4Reviews see dramatic lifts in weekly Google review volume — without asking awkwardly."
      >
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { v: "4.1×", l: "More weekly reviews" },
            { v: "< 3s", l: "Tap to review" },
            { v: "98%", l: "Phone compatibility" },
            { v: "48h", l: "UAE delivery" },
          ].map((s) => (
            <div key={s.l} className="glass p-6 text-center">
              <div className="font-display text-3xl text-gold">{s.v}</div>
              <div className="mt-2 text-xs text-white/60">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
          {[
            { q: "We went from 6 reviews a week to 30 in a month. Staff love it because it doesn't feel pushy.", a: "Rania, Marina bistro owner" },
            { q: "Tourists especially — they tap, they review, they're gone. It just works.", a: "Mohammed, JBR café" },
            { q: "The dashboard lets me see which table is driving reviews. Smart idea.", a: "Priya, DIFC restaurant GM" },
          ].map((t, i) => (
            <blockquote key={i} className="glass p-6 text-sm text-white/80">
              <div className="mb-3 text-gold">★★★★★</div>
              <p className="leading-relaxed">“{t.q}”</p>
              <footer className="mt-4 text-xs text-white/50">— {t.a}</footer>
            </blockquote>
          ))}
        </div>
      </Section>

      {/* HOW IT WORKS PREVIEW */}
      <Section
        eyebrow="How it works"
        title={<>Three steps. <span className="gradient-text">No training required.</span></>}
      >
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {[
            { n: "01", t: "Order", d: "Pick your quantity and optional custom branding. We program each card to your Google review URL." },
            { n: "02", t: "Tap", d: "Place cards on tables or hand them with the bill. Guests tap their phone — that's it." },
            { n: "03", t: "Review", d: "Your Google review page opens instantly. No app, no login, no friction." },
          ].map((step) => (
            <div key={step.n} className="glass p-8">
              <div className="font-display text-3xl text-gold">{step.n}</div>
              <h3 className="mt-3 text-xl font-semibold">{step.t}</h3>
              <p className="mt-2 text-sm text-white/70">{step.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/how-it-works" className="btn-secondary">See full walkthrough</Link>
        </div>
      </Section>

      {/* PRICING PREVIEW */}
      <Section
        eyebrow="Pricing"
        title="Cards priced for growth, not hype."
        subtitle="Start with one, scale to a branded rollout. All prices in AED, VAT inclusive."
      >
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {[
            { name: "Single card", price: 149, desc: "Try it on one table or counter.", features: ["1 NFC + QR card", "Programmable redirect", "Dashboard access"] },
            { name: "5-Pack", price: 599, popular: true, desc: "Most popular — cover your core tables.", features: ["5 NFC + QR cards", "Programmable redirects", "Basic analytics"] },
            { name: "10-Pack", price: 1099, desc: "Full floor coverage.", features: ["10 NFC + QR cards", "Custom branding option", "Advanced analytics"] },
          ].map((p) => (
            <div
              key={p.name}
              className={`glass p-8 ${p.popular ? "ring-1 ring-gold shadow-gold" : ""}`}
            >
              {p.popular ? (
                <div className="mb-3 inline-block rounded-full bg-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink">Most popular</div>
              ) : null}
              <h3 className="font-display text-xl">{p.name}</h3>
              <p className="mt-1 text-sm text-white/60">{p.desc}</p>
              <div className="mt-6 font-display text-4xl text-white">
                {formatAED(p.price)}
              </div>
              <ul className="mt-6 space-y-2 text-sm text-white/70">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2"><span className="text-emerald">✓</span>{f}</li>
                ))}
              </ul>
              <Link href="/pricing" className={`mt-8 ${p.popular ? "btn-primary" : "btn-secondary"} w-full`}>
                Choose plan
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* TRUST BADGES */}
      <Section
        eyebrow="Why Tap4Reviews"
        title="Made for restaurants. Not a generic NFC shop."
      >
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
          {[
            { t: "Works with Google Reviews", d: "We program every card to your exact Google Place ID — no broken links, no guesswork." },
            { t: "NFC + QR dual mode", d: "Every card has a QR fallback on the back. Works on every phone, every time." },
            { t: "UAE-based support", d: "WhatsApp support from Dubai. Replies within minutes during working hours." },
          ].map((b) => (
            <div key={b.t} className="glass p-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-gold">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m5 12 5 5 9-10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-semibold">{b.t}</h3>
              <p className="mt-1 text-sm text-white/70">{b.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section eyebrow="FAQ" title="Questions, answered.">
        <Accordion items={faqs.map((f) => ({ q: f.q, a: f.a }))} />
        <div className="mt-8 text-center">
          <Link href="/faq" className="btn-ghost">Read all FAQs →</Link>
        </div>
      </Section>

      {/* CTA */}
      <section className="section">
        <div className="container-x">
          <div className="glass relative overflow-hidden p-10 text-center sm:p-16">
            <div className="pointer-events-none absolute inset-0 bg-hero-glow opacity-80" />
            <div className="relative">
              <h2 className="h-display text-3xl text-balance sm:text-5xl">
                Ready to turn taps into <span className="gradient-text">5-star reviews?</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-white/70">
                Order your cards in 60 seconds. We'll program them, ship them, and you start collecting reviews this week.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/pricing" className="btn-primary">Get your cards</Link>
                <a
                  href={whatsappLink(SITE.whatsapp, "Hi! I'd like to know more about Tap4Reviews.")}
                  className="btn-secondary"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
