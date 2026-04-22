import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const signature = request.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !secret) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(rawBody, signature, secret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const supabase = createServiceClient();

    const productId = (session.metadata?.product as string | undefined) ?? null;
    const quantity = Number(session.metadata?.quantity ?? 1);
    const amount = (session.amount_total ?? 0) / 100;

    await supabase.from("orders").insert({
      stripe_session_id: session.id,
      product: productId,
      quantity,
      amount_aed: amount,
      status: "paid",
      shipping_address: session.shipping_details?.address ?? null,
    });
  }

  return NextResponse.json({ received: true });
}
