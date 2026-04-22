import type { Metadata } from "next";
import { LegalShell } from "@/components/marketing/LegalShell";

export const metadata: Metadata = {
  title: "Terms & conditions",
  description: "The terms that govern your use of Tap4Reviews and our cards.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsPage() {
  return (
    <LegalShell title="Terms &amp; conditions" updated="2026-04-23">
      <p>
        These terms govern your use of Tap4Reviews (“we”, “us”) services,
        including our physical NFC cards and the online dashboard at
        tap4reviews.com. By placing an order or creating an account, you agree
        to these terms.
      </p>

      <h2>1. The service</h2>
      <p>
        We manufacture and program NFC cards that redirect users to a Google
        review URL you provide. We also offer a dashboard for managing cards
        and viewing tap analytics.
      </p>

      <h2>2. Acceptable use</h2>
      <p>
        You agree to use our cards and dashboard lawfully. You will not use our
        service to:
      </p>
      <ul className="list-disc pl-6">
        <li>Send users to illegal, fraudulent, or misleading content.</li>
        <li>Solicit fake or paid reviews, which violates Google's policies.</li>
        <li>Attempt to reverse-engineer or duplicate our cards.</li>
      </ul>

      <h2>3. Google's review policies</h2>
      <p>
        Tap4Reviews is a tool for asking for honest feedback. We strongly
        discourage incentivising reviews or asking only happy customers to
        review — both violate Google's guidelines and may get your business
        page penalised.
      </p>

      <h2>4. Pricing &amp; payment</h2>
      <p>
        All prices are in AED and inclusive of 5% VAT where applicable.
        Payments are processed by Stripe. Orders are fulfilled once payment
        clears.
      </p>

      <h2>5. Delivery</h2>
      <p>
        We deliver within the UAE. Estimated delivery times are 2–3 working
        days for standard orders and 5–7 working days for custom branded
        orders.
      </p>

      <h2>6. Refunds</h2>
      <p>
        See our <a href="/refund-policy">refund policy</a>.
      </p>

      <h2>7. Liability</h2>
      <p>
        We are not responsible for outcomes dependent on third parties
        (including Google's review policies or phone manufacturers' NFC
        support). Our total liability for any claim is limited to the amount
        you paid for the order in question.
      </p>

      <h2>8. Account termination</h2>
      <p>
        We may suspend accounts that violate these terms or attempt to abuse
        the service. You may close your account at any time from the
        dashboard.
      </p>

      <h2>9. Governing law</h2>
      <p>
        These terms are governed by the laws of the United Arab Emirates.
        Disputes fall under the exclusive jurisdiction of the Dubai courts.
      </p>

      <h2>10. Changes</h2>
      <p>
        We may update these terms from time to time. Material changes will be
        announced to registered users by email.
      </p>
    </LegalShell>
  );
}
