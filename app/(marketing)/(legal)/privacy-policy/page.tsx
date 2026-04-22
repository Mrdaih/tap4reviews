import type { Metadata } from "next";
import { LegalShell } from "@/components/marketing/LegalShell";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Tap4Reviews collects, uses, and protects your data.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalShell title="Privacy policy" updated="2026-04-23">
      <p>
        Tap4Reviews respects your privacy. This policy explains what we collect,
        why we collect it, and how you can control it. We operate from Dubai,
        UAE, and comply with the UAE Personal Data Protection Law (PDPL).
      </p>

      <h2>1. What we collect</h2>
      <ul className="list-disc pl-6">
        <li><strong>Account data:</strong> name, email, phone, restaurant name.</li>
        <li><strong>Card data:</strong> the Google review URLs you configure.</li>
        <li><strong>Tap analytics:</strong> timestamp, approximate country derived from IP, and anonymous device type. We do not collect personal information about your customers who tap cards.</li>
        <li><strong>Payment data:</strong> processed securely by Stripe; we never store raw card numbers.</li>
      </ul>

      <h2>2. How we use it</h2>
      <ul className="list-disc pl-6">
        <li>To fulfill and ship your orders.</li>
        <li>To operate your dashboard and analytics.</li>
        <li>To send transactional emails (order confirmations, account notifications).</li>
        <li>To respond to support requests via email and WhatsApp.</li>
      </ul>

      <h2>3. Who we share with</h2>
      <p>We only share data with service providers who help us run the product:</p>
      <ul className="list-disc pl-6">
        <li>Supabase — authentication and database hosting.</li>
        <li>Stripe — payment processing.</li>
        <li>Resend — transactional email delivery.</li>
        <li>Vercel — site hosting.</li>
      </ul>
      <p>We do not sell your data. We do not share customer tap data with advertisers.</p>

      <h2>4. Data retention</h2>
      <p>
        Account and order data is retained for as long as you have an active
        account, plus 7 years for tax and accounting compliance. Tap analytics
        beyond 24 months are automatically aggregated and anonymised.
      </p>

      <h2>5. Your rights</h2>
      <p>
        You can request a copy of your data, correct inaccuracies, or request
        deletion at any time by emailing hello@tap4reviews.com.
      </p>

      <h2>6. Cookies</h2>
      <p>
        We use essential cookies for authentication and a single analytics
        cookie (Google Analytics 4) with IP anonymisation enabled. You can
        disable analytics cookies in your browser.
      </p>

      <h2>7. Security</h2>
      <p>
        All traffic is encrypted in transit. Passwords are never stored in
        plaintext. We use Supabase row-level security to ensure you only ever
        see your own data.
      </p>

      <h2>8. Contact</h2>
      <p>
        Any privacy questions: hello@tap4reviews.com.
      </p>
    </LegalShell>
  );
}
