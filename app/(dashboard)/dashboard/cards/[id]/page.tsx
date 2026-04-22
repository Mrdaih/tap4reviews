import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { AnalyticsChart } from "@/components/dashboard/AnalyticsChart";
import { CardQRCode } from "@/components/dashboard/CardQRCode";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function CardDetail({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: card } = await supabase
    .from("cards")
    .select("id, serial_number, redirect_url, is_active, label, tap_count, created_at")
    .eq("id", params.id)
    .eq("user_id", user!.id)
    .maybeSingle();

  if (!card) return notFound();

  const since = new Date();
  since.setDate(since.getDate() - 30);

  const { data: taps } = await supabase
    .from("taps")
    .select("tapped_at")
    .eq("card_id", card.id)
    .gte("tapped_at", since.toISOString());

  const byDay = new Map<string, number>();
  for (let i = 0; i < 30; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    byDay.set(d.toISOString().slice(0, 10), 0);
  }
  for (const t of taps ?? []) {
    const day = t.tapped_at.slice(0, 10);
    byDay.set(day, (byDay.get(day) ?? 0) + 1);
  }
  const series = Array.from(byDay, ([date, count]) => ({ date, count })).sort((a, b) =>
    a.date < b.date ? -1 : 1,
  );

  const tapUrl = `${SITE.url}/api/tap/${card.serial_number}`;

  return (
    <div className="container-x py-10">
      <Link href="/dashboard" className="text-sm text-white/50 hover:text-white">← All cards</Link>
      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-white/40">Serial</div>
          <h1 className="mt-1 h-display text-3xl font-mono">{card.serial_number}</h1>
          <a href={card.redirect_url} target="_blank" rel="noreferrer" className="mt-2 block text-sm text-gold hover:underline">
            {card.redirect_url}
          </a>
        </div>
        <div className="glass p-4 text-right">
          <div className="text-xs uppercase tracking-widest text-white/40">Total taps (30d)</div>
          <div className="mt-1 font-display text-4xl text-gold">{taps?.length ?? 0}</div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="glass p-6">
          <h2 className="font-display text-xl">Taps per day</h2>
          <div className="mt-4 h-[280px]">
            <AnalyticsChart series={series} />
          </div>
        </div>

        <div className="glass flex flex-col items-center p-6">
          <h2 className="self-start font-display text-xl">QR code</h2>
          <p className="mt-1 self-start text-xs text-white/50">Encodes the tap endpoint for this card.</p>
          <div className="mt-6">
            <CardQRCode value={tapUrl} />
          </div>
          <div className="mt-4 break-all text-center text-xs text-white/50">{tapUrl}</div>
        </div>
      </div>
    </div>
  );
}
