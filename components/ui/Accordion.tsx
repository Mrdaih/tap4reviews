"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function Accordion({
  items,
}: {
  items: { q: string; a: React.ReactNode }[];
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl divide-y divide-white/5 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-medium text-white">{item.q}</span>
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 transition",
                  isOpen && "rotate-45 border-gold text-gold",
                )}
              >
                +
              </span>
            </button>
            <div
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-6 text-sm leading-relaxed text-white/70">{item.a}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
