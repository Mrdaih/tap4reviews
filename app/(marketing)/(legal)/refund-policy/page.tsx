import type { Metadata } from "next";
import { LegalShell } from "@/components/marketing/LegalShell";

export const metadata: Metadata = {
  title: "Refund policy",
  description: "Tap4Reviews refund and replacement policy for UAE orders.",
  alternates: { canonical: "/refund-policy" },
};

export default function RefundPolicyPage() {
  return (
    <LegalShell title="Refund policy" updated="2026-04-23">
      <p>
        We stand behind every card we ship. If your order arrives defective, or
        an NFC chip fails to read on first use, we will replace it at no cost to
        you. This policy is in line with standard UAE consumer protection
        practice.
      </p>

      <h2>1. Eligible returns</h2>
      <p>
        You may request a refund or replacement within 14 days of delivery for:
      </p>
      <ul className="list-disc pl-6">
        <li>Cards that arrive physically damaged.</li>
        <li>NFC chips that do not read on a compatible phone.</li>
        <li>Orders delivered incorrectly (wrong quantity or wrong artwork).</li>
      </ul>

      <h2>2. Non-refundable items</h2>
      <p>
        Custom-branded orders where printing has already started cannot be
        refunded, but we will happily replace any defective units.
      </p>

      <h2>3. How to request a refund</h2>
      <p>
        WhatsApp us on the number listed in the footer, or email
        hello@tap4reviews.com with a short description and a photo of the
        issue. We aim to respond within one working day.
      </p>

      <h2>4. Refund method</h2>
      <p>
        Approved refunds are issued to the original payment method within 5–10
        working days, depending on your bank.
      </p>

      <h2>5. Shipping costs</h2>
      <p>
        For defective or incorrect orders, we cover return shipping within the
        UAE. For change-of-mind cancellations of undispatched orders, shipping
        fees are non-refundable.
      </p>
    </LegalShell>
  );
}
