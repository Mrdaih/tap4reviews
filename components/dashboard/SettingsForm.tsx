"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function SettingsForm({
  email,
  initial,
}: {
  email: string;
  initial: { restaurant_name: string; phone: string; google_place_id: string };
}) {
  const [values, setValues] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, ...values, updated_at: new Date().toISOString() });
    setSaving(false);
    setStatus(error ? error.message : "Saved.");
  }

  async function resetPassword() {
    const supabase = createClient();
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/dashboard/settings`,
    });
    setStatus(error ? error.message : "Check your email for reset instructions.");
  }

  const inputCls =
    "w-full rounded-lg border border-white/10 bg-ink-900/60 px-3 py-2.5 text-sm outline-none focus:border-gold/60";

  return (
    <form onSubmit={save} className="space-y-4">
      <div>
        <label className="text-xs text-white/60">Email</label>
        <input value={email} disabled className={`${inputCls} opacity-60`} />
      </div>
      <div>
        <label className="text-xs text-white/60">Restaurant name</label>
        <input
          value={values.restaurant_name}
          onChange={(e) => setValues((v) => ({ ...v, restaurant_name: e.target.value }))}
          className={inputCls}
        />
      </div>
      <div>
        <label className="text-xs text-white/60">Phone</label>
        <input
          value={values.phone}
          onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
          className={inputCls}
        />
      </div>
      <div>
        <label className="text-xs text-white/60">Default Google Place ID</label>
        <input
          value={values.google_place_id}
          onChange={(e) => setValues((v) => ({ ...v, google_place_id: e.target.value }))}
          className={inputCls}
          placeholder="ChIJ…"
        />
      </div>
      <div className="flex items-center gap-3">
        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? "Saving…" : "Save"}
        </button>
        <button type="button" onClick={resetPassword} className="btn-ghost">
          Reset password
        </button>
      </div>
      {status ? <p className="text-sm text-white/70">{status}</p> : null}
    </form>
  );
}
