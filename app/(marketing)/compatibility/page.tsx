import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { BreadcrumbJsonLd } from "@/components/shared/StructuredData";
import { SITE } from "@/lib/site";
import { whatsappLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Phone compatibility",
  description:
    "NFC works on virtually every modern phone. See the full list of compatible iPhones and Android devices — and how our QR backup covers the rest.",
  alternates: { canonical: "/compatibility" },
};

const phones = [
  { brand: "iPhone", supported: "XS, XR, 11, 12, 13, 14, 15, 16 (all variants)", notes: "iOS 14+ opens NFC tags automatically, no app required." },
  { brand: "Samsung Galaxy", supported: "S8 onwards, Note 8+, A-series A20+", notes: "NFC on by default in modern Android versions." },
  { brand: "Google Pixel", supported: "All models (Pixel 2 and later)", notes: "Works out of the box." },
  { brand: "Huawei", supported: "Most P and Mate series", notes: "Ensure NFC is enabled in settings." },
  { brand: "Xiaomi / Redmi", supported: "Mi 9+, Redmi Note 10 Pro+", notes: "Some budget models lack NFC — QR backup handles these." },
  { brand: "Oppo / OnePlus / Realme", supported: "Mid-range and flagship models from 2019 onwards", notes: "Check for NFC icon on the phone settings." },
];

export default function CompatibilityPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${SITE.url}/` },
        { name: "Compatibility", url: `${SITE.url}/compatibility` },
      ]} />

      <Section
        eyebrow="Compatibility"
        title={<>Works on <span className="gradient-text">98% of phones</span> in the UAE.</>}
        subtitle="NFC is built into virtually every modern smartphone. For the rest, our QR code backup on every card means no guest is ever left out."
      >
        <div className="mx-auto max-w-5xl overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-full text-sm">
            <thead className="bg-white/5 text-left text-white">
              <tr>
                <th className="px-5 py-4 font-semibold">Brand</th>
                <th className="px-5 py-4 font-semibold">Supported models</th>
                <th className="px-5 py-4 font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              {phones.map((p) => (
                <tr key={p.brand}>
                  <td className="px-5 py-4 font-semibold">{p.brand}</td>
                  <td className="px-5 py-4">{p.supported}</td>
                  <td className="px-5 py-4 text-white/60">{p.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section
        eyebrow="The QR fallback"
        title="Every card has a backup."
        subtitle="On the reverse side of every Tap4Reviews card, a branded QR code opens the exact same review page. So NFC-less phones, iPads, and screenshot-savvy tourists are all covered."
      >
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <div className="glass p-8">
            <h3 className="font-display text-xl">NFC side</h3>
            <p className="mt-2 text-sm text-white/70">Tap the top third of the card with the phone. Works inside leather covers, table stands, and cardholders.</p>
          </div>
          <div className="glass p-8">
            <h3 className="font-display text-xl">QR side</h3>
            <p className="mt-2 text-sm text-white/70">Branded QR code with a short tagline and a clear prompt. No apps required to scan — Camera app does it natively.</p>
          </div>
        </div>
      </Section>

      <Section eyebrow="Unsure?" title="Test your own phone.">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-white/70">
            We'll send you a free test link. Tap it on your card and we'll confirm it registered. If your phone doesn't support NFC, we'll let you know.
          </p>
          <a
            href={whatsappLink(SITE.whatsapp, "Hi, can I test NFC compatibility on my phone?")}
            className="btn-primary mt-6"
          >
            Request a test link
          </a>
        </div>
      </Section>
    </>
  );
}
