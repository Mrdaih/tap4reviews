import { NextResponse, type NextRequest } from "next/server";
import { getStripe, PRODUCT_CATALOG } from "@/lib/stripe";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";

async function readProduct(request: NextRequest): Promise<string | null> {
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const body = await request.json().catch(() => ({}));
    return typeof body.product === "string" ? body.product : null;
  }
  const form = await request.formData().catch(() => null);
  const value = form?.get("product");
  return typeof value === "string" ? value : null;
}

export async function POST(request: NextRequest) {
  const productId = await readProduct(request);
  if (!productId || !(productId in PRODUCT_CATALOG)) {
    return NextResponse.json({ error: "Unknown product" }, { status: 400 });
  }

  const product = PRODUCT_CATALOG[productId];
  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "aed",
          product_data: { name: product.name },
          unit_amount: product.unit_amount,
        },
        quantity: 1,
      },
    ],
    shipping_address_collection: { allowed_countries: ["AE"] },
    metadata: { product: productId, quantity: String(product.quantity) },
    success_url: `${SITE.url}/dashboard?order=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE.url}/pricing?canceled=1`,
  });

  if (!session.url) {
    return NextResponse.json({ error: "Could not create checkout session" }, { status: 500 });
  }

  return NextResponse.redirect(session.url, { status: 303 });
}
