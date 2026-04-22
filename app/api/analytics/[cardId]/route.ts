import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function GET(
  _request: NextRequest,
  { params }: { params: { cardId: string } },
) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: card } = await supabase
    .from("cards")
    .select("id")
    .eq("id", params.cardId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!card) return NextResponse.json({ error: "Card not found" }, { status: 404 });

  const since = new Date();
  since.setDate(since.getDate() - 30);

  const { data: taps, error } = await supabase
    .from("taps")
    .select("tapped_at, ip_country, user_agent")
    .eq("card_id", card.id)
    .gte("tapped_at", since.toISOString())
    .order("tapped_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const byDay = new Map<string, number>();
  for (const t of taps ?? []) {
    const day = t.tapped_at.slice(0, 10);
    byDay.set(day, (byDay.get(day) ?? 0) + 1);
  }
  const series = Array.from(byDay, ([date, count]) => ({ date, count })).sort((a, b) =>
    a.date < b.date ? -1 : 1,
  );

  return NextResponse.json({
    total: taps?.length ?? 0,
    series,
    recent: (taps ?? []).slice(0, 20),
  });
}
