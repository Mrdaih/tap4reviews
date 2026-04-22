import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { CardsList } from "@/components/dashboard/CardsList";

export const dynamic = "force-dynamic";

export default async function DashboardHome() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: cards } = await supabase
    .from("cards")
    .select("id, serial_number, redirect_url, is_active, label, tap_count, last_tapped_at, created_at")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

  const totalTaps = (cards ?? []).reduce((acc, c) => acc + (c.tap_count ?? 0), 0);
  const activeCards = (cards ?? []).filter((c) => c.is_active).length;

  return (
    <div className="container-x py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="h-display text-3xl">Your cards</h1>
          <p className="mt-1 text-sm text-white/60">Manage redirect URLs, track taps, and export analytics.</p>
        </div>
        <Link href="/pricing" className="btn-primary">Order more</Link>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="glass p-5">
          <div className="text-xs uppercase tracking-widest text-white/50">Active cards</div>
          <div className="mt-2 font-display text-3xl">{activeCards}</div>
        </div>
        <div className="glass p-5">
          <div className="text-xs uppercase tracking-widest text-white/50">Total taps</div>
          <div className="mt-2 font-display text-3xl">{totalTaps}</div>
        </div>
        <div className="glass p-5">
          <div className="text-xs uppercase tracking-widest text-white/50">Account</div>
          <div className="mt-2 truncate text-sm text-white/80">{user!.email}</div>
        </div>
      </div>

      <div className="mt-10">
        <CardsList initialCards={cards ?? []} />
      </div>
    </div>
  );
}
