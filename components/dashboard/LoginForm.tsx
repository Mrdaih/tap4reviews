"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function LoginForm({
  initialMode,
  next,
}: {
  initialMode: "signin" | "signup";
  next: string;
}) {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setInfo(null);
    const supabase = createClient();
    const result =
      mode === "signin"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });
    const { data, error: err } = result;
    setLoading(false);
    if (err) return setError(err.message);
    if (mode === "signup" && !data.session) {
      setInfo("Check your email to confirm your account.");
      return;
    }
    router.replace(next);
    router.refresh();
  }

  async function handleGoogle() {
    const supabase = createClient();
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}` },
    });
  }

  const inputCls =
    "w-full rounded-lg border border-white/10 bg-ink-900/60 px-3 py-2.5 text-sm outline-none focus:border-gold/60";

  return (
    <div>
      <button onClick={handleGoogle} className="btn-secondary w-full">
        Continue with Google
      </button>
      <div className="my-4 flex items-center gap-3 text-xs uppercase tracking-widest text-white/40">
        <span className="h-px flex-1 bg-white/10" /> or <span className="h-px flex-1 bg-white/10" />
      </div>
      <form onSubmit={handleEmail} className="space-y-3">
        <div>
          <label className="text-xs text-white/60">Email</label>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="text-xs text-white/60">Password</label>
          <input required type="password" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Working…" : mode === "signin" ? "Sign in" : "Create account"}
        </button>
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        {info ? <p className="text-sm text-emerald">{info}</p> : null}
      </form>
      <div className="mt-4 text-center text-xs text-white/60">
        {mode === "signin" ? (
          <>
            New here?{" "}
            <button onClick={() => setMode("signup")} className="text-gold hover:underline">
              Create an account
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button onClick={() => setMode("signin")} className="text-gold hover:underline">
              Sign in
            </button>
          </>
        )}
      </div>
    </div>
  );
}
