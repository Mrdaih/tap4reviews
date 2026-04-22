import { createClient } from "@/lib/supabase/server";
import { formatAED } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: orders } = await supabase
    .from("orders")
    .select("id, product, quantity, amount_aed, status, created_at")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

  return (
    <div className="container-x py-10">
      <h1 className="h-display text-3xl">Orders</h1>
      <p className="mt-1 text-sm text-white/60">Every order you've placed with Tap4Reviews.</p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
        <table className="min-w-full text-sm">
          <thead className="bg-white/5 text-left text-white">
            <tr>
              <th className="px-5 py-4 font-semibold">Date</th>
              <th className="px-5 py-4 font-semibold">Product</th>
              <th className="px-5 py-4 font-semibold">Quantity</th>
              <th className="px-5 py-4 font-semibold">Amount</th>
              <th className="px-5 py-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-white/80">
            {(orders ?? []).map((o) => (
              <tr key={o.id}>
                <td className="px-5 py-4">{new Date(o.created_at).toLocaleDateString()}</td>
                <td className="px-5 py-4">{o.product ?? "—"}</td>
                <td className="px-5 py-4">{o.quantity}</td>
                <td className="px-5 py-4">{formatAED(Number(o.amount_aed))}</td>
                <td className="px-5 py-4">
                  <span className={`chip ${o.status === "paid" ? "text-emerald" : ""}`}>{o.status}</span>
                </td>
              </tr>
            ))}
            {(!orders || orders.length === 0) && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-white/50">No orders yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
