import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (_stripe) return _stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set. Add it to your environment before using Stripe.");
  }
  _stripe = new Stripe(key, {
    apiVersion: "2025-02-24.acacia",
    typescript: true,
  });
  return _stripe;
}

export const PRODUCT_CATALOG: Record<
  string,
  { name: string; unit_amount: number; quantity: number }
> = {
  single: { name: "Tap4Reviews — Single Card", unit_amount: 14900, quantity: 1 },
  pack5: { name: "Tap4Reviews — 5-Pack", unit_amount: 59900, quantity: 5 },
  pack10: { name: "Tap4Reviews — 10-Pack", unit_amount: 109900, quantity: 10 },
};
