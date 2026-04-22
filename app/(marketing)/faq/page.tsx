import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { FAQJsonLd, BreadcrumbJsonLd } from "@/components/shared/StructuredData";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description:
    "Everything about Tap4Reviews — how the cards work, compatibility, delivery, billing, custom branding, and support.",
  alternates: { canonical: "/faq" },
};

const categories: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "General",
    items: [
      {
        q: "What is Tap4Reviews?",
        a: "Tap4Reviews is a UAE-based service that provides NFC-enabled cards preprogrammed with your restaurant's Google review URL. When a customer taps their phone on the card, it opens your review page instantly.",
      },
      {
        q: "What is NFC?",
        a: "NFC (Near-Field Communication) is a short-range wireless technology built into virtually every modern smartphone. It's the same tech used for Apple Pay and Samsung Pay.",
      },
      {
        q: "Do I need an app?",
        a: "No. Neither you nor your customers need an app. NFC tags open pages directly in the phone's default browser.",
      },
      {
        q: "Is this service only for restaurants?",
        a: "Our product is built for restaurants and cafés, but it works equally well for salons, clinics, retail stores, and any business that benefits from Google reviews.",
      },
    ],
  },
  {
    title: "Setup & usage",
    items: [
      {
        q: "How do you program the cards?",
        a: "You share your Google review URL (the link that opens your business on Google Maps with the 'Write a review' option). We encode that into the NFC chip on each card and print a matching QR code on the back.",
      },
      {
        q: "Can I change the review link later?",
        a: "Yes. Log in to your dashboard and update the redirect URL for any card. The change is instant.",
      },
      {
        q: "Where should I place the cards?",
        a: "Best results come from table stands at eye level, or slipping the card into the bill folder at payment time. Cards work through most leather covers and thin menus.",
      },
      {
        q: "How do I train my staff?",
        a: "One line works: 'Loved it? Tap here.' The card's design and QR backup do the rest.",
      },
    ],
  },
  {
    title: "Technical",
    items: [
      {
        q: "What phones support NFC?",
        a: "All iPhones from XS (2018) onwards, and nearly all Android phones from 2019 onwards. For exceptions, the QR code on the back always works.",
      },
      {
        q: "How long does the NFC chip last?",
        a: "Typical NFC chips are rated for 100,000+ read cycles. In real restaurant use, that's years of daily taps.",
      },
      {
        q: "Are the cards waterproof?",
        a: "The standard cards are spill-resistant. For humid or wet environments we offer a fully laminated finish — ask us about it.",
      },
      {
        q: "Can I see analytics?",
        a: "Yes. Every tap is logged to your dashboard, showing counts per card and per day. Advanced analytics (device, time-of-day heatmap) are included with larger packs.",
      },
    ],
  },
  {
    title: "Billing & delivery",
    items: [
      {
        q: "How fast is delivery?",
        a: "Standard cards ship within 2–3 working days across the UAE. Custom-branded orders take 5–7 working days.",
      },
      {
        q: "Do you ship outside the UAE?",
        a: "Right now we ship within the UAE only. International orders can be arranged on request — contact us via WhatsApp.",
      },
      {
        q: "What is your refund policy?",
        a: "If your cards arrive defective or the NFC chip fails on first use, we'll replace them free of charge. See our refund policy for full terms.",
      },
      {
        q: "What payment methods do you accept?",
        a: "Credit and debit cards via Stripe (AED). Bank transfer available for larger branded orders — contact us to set it up.",
      },
      {
        q: "Do you invoice with VAT?",
        a: "Yes. All prices are VAT inclusive and we issue a compliant UAE VAT invoice for every order.",
      },
    ],
  },
];

export default function FAQPage() {
  const allItems = categories.flatMap((c) => c.items);
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${SITE.url}/` },
        { name: "FAQ", url: `${SITE.url}/faq` },
      ]} />
      <FAQJsonLd faqs={allItems} />

      <Section
        eyebrow="FAQ"
        title="Questions, answered."
        subtitle="Still stuck? WhatsApp us — we reply within minutes during working hours."
      >
        <div className="mx-auto max-w-3xl space-y-10">
          {categories.map((c) => (
            <div key={c.title}>
              <h2 className="mb-4 font-display text-2xl">{c.title}</h2>
              <Accordion items={c.items} />
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
