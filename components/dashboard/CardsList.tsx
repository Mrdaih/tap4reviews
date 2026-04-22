"use client";

import Link from "next/link";
import { useState } from "react";

type Card = {
  id: string;
  serial_number: string;
  redirect_url: string;
  is_active: boolean;
  label: string | null;
  tap_count: number;
  last_tapped_at: string | null;
  created_at: string;
};

export function CardsList({ initialCards }: { initialCards: Card[] }) {
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [editing, setEditing] = useState<string | null>(null);
  const [draftUrl, setDraftUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save(id: string) {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/cards/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ redirect_url: draftUrl }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Could not save.");
      }
      const { card } = await res.json();
      setCards((prev) => prev.map((c) => (c.id === id ? { ...c, ...card } : c)));
      setEditing(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function toggle(id: string, next: boolean) {
    await fetch(`/api/cards/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: next }),
    });
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, is_active: next } : c)));
  }

  if (cards.length === 0) {
    return (
      <div className="glass p-10 text-center">
        <h3 className="font-display text-xl">No cards yet</h3>
        <p className="mt-2 text-sm text-white/60">
          Once your first order is fulfilled, your cards will appear here for you to manage.
        </p>
        <Link href="/pricing" className="btn-primary mt-6 inline-flex">Order your first pack</Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {error ? <div className="text-sm text-red-400">{error}</div> : null}
      {cards.map((c) => {
        const isEditing = editing === c.id;
        return (
          <div key={c.id} className="glass p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-widest text-white/40">Serial</div>
                <div className="font-mono text-sm">{c.serial_number}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`chip ${c.is_active ? "text-emerald" : "text-white/50"}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${c.is_active ? "bg-emerald" : "bg-white/30"}`} />
                  {c.is_active ? "Active" : "Inactive"}
                </span>
                <button onClick={() => toggle(c.id, !c.is_active)} className="btn-ghost text-xs">
                  {c.is_active ? "Deactivate" : "Activate"}
                </button>
                <Link href={`/dashboard/cards/${c.id}`} className="btn-secondary text-xs">Analytics</Link>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto]">
              <div>
                <div className="text-xs uppercase tracking-widest text-white/40">Redirect URL</div>
                {isEditing ? (
                  <div className="mt-1 flex gap-2">
                    <input
                      className="w-full rounded-lg border border-white/10 bg-ink-900/60 px-3 py-2 text-sm"
                      value={draftUrl}
                      onChange={(e) => setDraftUrl(e.target.value)}
                    />
                    <button disabled={saving} onClick={() => save(c.id)} className="btn-primary text-xs">
                      {saving ? "Saving…" : "Save"}
                    </button>
                    <button onClick={() => setEditing(null)} className="btn-ghost text-xs">Cancel</button>
                  </div>
                ) : (
                  <div className="mt-1 flex items-center gap-3">
                    <a href={c.redirect_url} target="_blank" rel="noreferrer" className="truncate text-sm text-gold hover:underline">
                      {c.redirect_url}
                    </a>
                    <button
                      onClick={() => {
                        setEditing(c.id);
                        setDraftUrl(c.redirect_url);
                      }}
                      className="btn-ghost text-xs"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
              <div className="text-right text-sm">
                <div className="text-xs uppercase tracking-widest text-white/40">Taps</div>
                <div className="mt-1 font-display text-2xl text-gold">{c.tap_count}</div>
                {c.last_tapped_at ? (
                  <div className="text-xs text-white/50">
                    Last: {new Date(c.last_tapped_at).toLocaleDateString()}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
