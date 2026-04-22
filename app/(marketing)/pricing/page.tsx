import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { ProductJsonLd, BreadcrumbJsonLd } from "@/components/shared/StructuredData";
import { formatAED, whatsappLink } from "@/lib/utils";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing — NFC Review Cards in AED",
  description:
    "Transparent pricing on NFC Google review cards for UAE restaurants. Single card, 5-pack, 10-pack and custom branded orders. Prices in AED, VAT inclusive.",
  alternates: { canonical: "/pricing" },
};

const products = [
  {
    id: "single",
    name: "Single Card",
    price: 149,
    desc: "Perfect for testing on one counter or table.",
    features: [
      "1 NFC + QR card",
      "Programmable redirect URL",
      "Dashboard access",
      "Ships in 2–3 working days",
    ],
  },
  {
    id: "pack5",
    name: "5-Pack",
    price: 599,
    popular: true,
    desc: "Cover your core dining tables.",
    features: [
      "5 NFC + QR cards",
      "Programmable redirects",
      "Basic tap analytics",
      "Priority UAE delivery",
    ],
  },
  {
    id: "pack10",
    name: "10-Pack",
    price: 1099,
    desc: "Full floor coverage for a busy venue.",
    features: [
      "10 NFC + QR cards",
      "Optional custom branding",
      "Advanced analytics + export",
      "Priority WhatsApp support",
    ],
  },
  {
    id: "branded",
    name: "Custom Branded Pack",
    price: 1999,
    desc: "Your logo, colours, tableware-safe finish.",
    features: [
      "Starts at 20 cards",
      "Full custom print + chip programming",
      "Dedicated account manager",
      "5–7 working days lead time",
    ],
    ctaLabel: "Get a quote",
    customCta: true,
  },
];

export default function PricingPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${SITE.url}/` },
        { name: "Pricing", url: `${SITE.url}/pricing` },
      ]} />
      {products.map((p) => (
        <ProductJsonLd
          key={p.id}
          name={`Tap4Reviews ${p.name}`}
          description={p.desc}
          price={p.price}
          image={`${SITE.url}/images/card-${p.id}.png`}
        />
      ))}

      <Section
        eyebrow="Pricing"
        title={<>Choose the pack that fits <span className="gradient-text">your floor.</span></>}
        subtitle="Every card ships programmed to your Google review URL. All prices in AED, VAT inclusive."
      >
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <div
              key={p.id}
              className={`glass flex flex-col p-7 ${p.popular ? "ring-1 ring-gold shadow-gold" : ""}`}
            >
              {p.popular ? (
                <div className="mb-3 inline-block self-start rounded-full bg-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink">
                  Most popular
                </div>
              ) : null}
              <h3 className="font-display text-xl">{p.name}</h3>
              <p className="mt-1 min-h-[44px] text-sm text-white/60">{p.desc}</p>
              <div className="mt-5 font-display text-4xl">{formatAED(p.price)}</div>
              <div className="mt-1 text-xs text-white/50">
                {p.id === "branded" ? "starting price" : "one-time"}
              </div>
              <ul className="mt-6 flex-1 space-y-2 text-sm text-white/75">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-emerald">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              {p.customCta ? (
                <a
                  href={whatsappLink(SITE.whatsapp, `Hi, I'd like a quote for the ${p.name}.`)}
                  className="btn-secondary mt-8"
                >
                  {p.ctaLabel}
                </a>
              ) : (
                <form action="/api/checkout" method="POST" className="mt-8">
                  <input type="hidden" name="product" value={p.id} />
                  <button
                    type="submit"
                    className={`${p.popular ? "btn-primary" : "btn-secondary"} w-full`}
                  >
                    Buy {p.name.toLowerCase()}
                  </button>
                </form>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Comparison"
        title="Why pay more than a generic NFC card?"
        subtitle="Because the card is the easy part. What matters is what happens after the tap."
      >
        <div className="mx-auto max-w-5xl overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-full text-sm">
            <thead className="bg-white/5 text-left text-white">
              <tr>
                <th className="px-5 py-4 font-semibold">&nbsp;</th>
                <th className="px-5 py-4 font-semibold">Tap4Reviews</th>
                <th className="px-5 py-4 font-semibold">Generic NFC card</th>
                <th className="px-5 py-4 font-semibold">Manual ask</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/70">
              {[
                ["Programmed to your Google review URL", "✓", "Self-serve", "—"],
                ["QR code backup", "✓", "Rare", "—"],
                ["Dashboard + tap analytics", "✓", "—", "—"],
                ["Updateable redirect anytime", "✓", "Sometimes", "—"],
                ["UAE-based support", "✓ WhatsApp", "—", "—"],
                ["Custom branded option", "✓", "Maybe", "—"],
              ].map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className={`px-5 py-4 ${j === 1 ? "text-gold" : ""}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section eyebrow="Not sure which pack?" title="Talk to us.">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-white/70">
            We'll help you size the right order for your venue — no pressure, no upsell.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <a
              href={whatsappLink(SITE.whatsapp, "Hi, I need help picking a Tap4Reviews pack.")}
              className="btn-primary"
            >
              WhatsApp us
            </a>
            <Link href="/contact" className="btn-secondary">
              Send a message
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
