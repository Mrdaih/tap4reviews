import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { BreadcrumbJsonLd } from "@/components/shared/StructuredData";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Tap4Reviews was built by restaurant operators for restaurant operators — a product of the AskDaih hospitality consulting practice in Dubai.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${SITE.url}/` },
        { name: "About", url: `${SITE.url}/about` },
      ]} />

      <Section
        eyebrow="About"
        title={<>Built by operators. <span className="gradient-text">For operators.</span></>}
        subtitle="We know restaurants because we run them, advise them, and eat in them every day."
      >
        <div className="mx-auto max-w-3xl space-y-6 text-white/75">
          <p>
            Tap4Reviews started inside <strong>AskDaih</strong>, a Dubai-based hospitality consulting practice. Over years of working with UAE F&amp;B operators, one pattern kept showing up in every dashboard, every audit, every strategy review: <em>Google reviews were the single cheapest, highest-leverage growth channel — and nobody had a clean way to collect them at scale.</em>
          </p>
          <p>
            Asking guests to write a review feels awkward. QR codes get ignored. Emailed follow-ups don't happen. Staff forget. So review volume stayed low — while competitors with 2,000 reviews quietly took the traffic.
          </p>
          <p>
            We built Tap4Reviews to fix that with the simplest possible interface: a card, a tap, a review. No app, no login, no friction. Just the same NFC technology that already powers your Apple Pay, now pointed at the one place in the guest journey that moves the needle.
          </p>
          <p>
            Today, Tap4Reviews is used by restaurants, cafés, clinics, and salons across the Emirates. We're a small team based in Dubai, available on WhatsApp, and obsessed with the unglamorous details — chip quality, card durability, link speed, support response time.
          </p>
        </div>
      </Section>

      <Section eyebrow="Mission" title="Help UAE hospitality win — one review at a time.">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {[
            { t: "Operator-first", d: "Every feature we build is tested in real restaurants before it ships." },
            { t: "No dark patterns", d: "No subscriptions hidden behind cards. No locked chips. Clean, honest product." },
            { t: "UAE-native", d: "Priced in AED. Shipped from Dubai. Support in your timezone, on WhatsApp." },
          ].map((m) => (
            <div key={m.t} className="glass p-6">
              <h3 className="font-semibold">{m.t}</h3>
              <p className="mt-1 text-sm text-white/70">{m.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Team" title="Small team, long hours, strong coffee.">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {[
            { name: "Founding team", role: "Operators + product" },
            { name: "AskDaih advisory", role: "Hospitality strategy" },
            { name: "UAE logistics", role: "Printing + fulfillment" },
          ].map((p) => (
            <div key={p.name} className="glass p-6 text-center">
              <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-gold to-ink" />
              <h3 className="mt-4 font-semibold">{p.name}</h3>
              <p className="text-sm text-white/60">{p.role}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/contact" className="btn-primary">Work with us</Link>
        </div>
      </Section>
    </>
  );
}
