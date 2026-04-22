import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { BreadcrumbJsonLd } from "@/components/shared/StructuredData";
import { ContactForm } from "@/components/marketing/ContactForm";
import { SITE } from "@/lib/site";
import { whatsappLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Tap4Reviews team in Dubai. WhatsApp, email, or the form — whichever is easiest.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `${SITE.url}/` },
        { name: "Contact", url: `${SITE.url}/contact` },
      ]} />

      <Section
        eyebrow="Contact"
        title="Talk to a human in Dubai."
        subtitle="We reply within minutes on WhatsApp during working hours (Sun–Thu, 9 AM – 7 PM GST). Email and form messages get a response within 24h."
      >
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <div className="glass p-6">
              <h3 className="font-semibold">WhatsApp (fastest)</h3>
              <p className="mt-1 text-sm text-white/70">Direct line to our support team.</p>
              <a
                href={whatsappLink(SITE.whatsapp, "Hi Tap4Reviews team!")}
                className="btn-primary mt-4"
              >
                Open WhatsApp
              </a>
            </div>
            <div className="glass p-6">
              <h3 className="font-semibold">Email</h3>
              <a href={`mailto:${SITE.email}`} className="mt-1 block text-sm text-gold">
                {SITE.email}
              </a>
            </div>
            <div className="glass p-6">
              <h3 className="font-semibold">Location</h3>
              <p className="mt-1 text-sm text-white/70">Dubai, United Arab Emirates</p>
              <p className="mt-2 text-sm text-white/70">Sun–Thu · 9 AM – 7 PM GST</p>
            </div>
          </div>

          <div className="glass p-6">
            <h3 className="font-semibold">Send us a message</h3>
            <p className="mt-1 text-sm text-white/60">We'll get back to you within a working day.</p>
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
