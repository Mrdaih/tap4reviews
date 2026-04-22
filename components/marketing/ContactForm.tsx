"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Could not send message.");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  }

  const inputCls =
    "w-full rounded-lg border border-white/10 bg-ink-900/60 px-3 py-2.5 text-sm text-white outline-none focus:border-gold/60";

  return (
    <form onSubmit={onSubmit} className="mt-4 space-y-3">
      <div>
        <label className="text-xs text-white/60">Name</label>
        <input required name="name" className={inputCls} />
      </div>
      <div>
        <label className="text-xs text-white/60">Email</label>
        <input required type="email" name="email" className={inputCls} />
      </div>
      <div>
        <label className="text-xs text-white/60">Restaurant / business</label>
        <input name="business" className={inputCls} />
      </div>
      <div>
        <label className="text-xs text-white/60">Message</label>
        <textarea required name="message" rows={4} className={inputCls} />
      </div>
      <button type="submit" disabled={status === "sending"} className="btn-primary w-full">
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "sent" ? (
        <p className="text-sm text-emerald">Thanks — we'll get back to you shortly.</p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-red-400">{error}</p>
      ) : null}
    </form>
  );
}
