import { NextResponse, type NextRequest } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Fallback redirect when the card is not found or the lookup fails.
const FALLBACK_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tap4reviews.com";

export async function GET(
  request: NextRequest,
  { params }: { params: { cardId: string } },
) {
  const cardId = params.cardId;
  const supabase = createServiceClient();

  // Look up by serial_number OR id (cards can be tapped by either).
  const { data: card } = await supabase
    .from("cards")
    .select("id, redirect_url, is_active")
    .or(`id.eq.${cardId},serial_number.eq.${cardId}`)
    .maybeSingle();

  if (!card || !card.is_active) {
    return NextResponse.redirect(FALLBACK_URL, { status: 302 });
  }

  const ipCountry =
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry") ??
    null;
  const userAgent = request.headers.get("user-agent") ?? null;

  // Fire-and-forget analytics write — do not block the redirect.
  queueMicrotask(async () => {
    try {
      await supabase.from("taps").insert({
        card_id: card.id,
        user_agent: userAgent,
        ip_country: ipCountry,
      });
      const { error: rpcError } = await supabase.rpc("increment_tap_count", {
        card_row: card.id,
      });
      if (rpcError) {
        await supabase
          .from("cards")
          .update({ last_tapped_at: new Date().toISOString() })
          .eq("id", card.id);
      }
    } catch {
      /* ignore analytics errors */
    }
  });

  return NextResponse.redirect(card.redirect_url, { status: 302 });
}
