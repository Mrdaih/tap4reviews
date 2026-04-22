"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-ink-800/70 backdrop-blur-xl">
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold text-ink shadow-gold">
            T4
          </span>
          <span>{SITE.name}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/dashboard" className="btn-ghost">
            Sign in
          </Link>
          <Link href="/pricing" className="btn-primary">
            Get cards
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={cn("block h-0.5 w-5 bg-white transition", open && "translate-y-1 rotate-45")} />
          <span className={cn("absolute h-0.5 w-5 bg-white transition", open && "opacity-0")} />
          <span className={cn("block h-0.5 w-5 bg-white transition", open && "-translate-y-1 -rotate-45")} />
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/5 bg-ink-800 md:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-white/80 hover:bg-white/5"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2">
              <Link href="/dashboard" className="btn-secondary flex-1" onClick={() => setOpen(false)}>
                Sign in
              </Link>
              <Link href="/pricing" className="btn-primary flex-1" onClick={() => setOpen(false)}>
                Get cards
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
