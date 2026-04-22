"use client";

import { motion } from "framer-motion";

export function TapDemo() {
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-xl">
      {/* Radiating rings */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute h-40 w-40 rounded-full border border-gold/20"
            initial={{ scale: 0.6, opacity: 0.6 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
          />
        ))}
      </div>

      {/* Card */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute left-4 top-6 w-48 rotate-[-10deg] rounded-2xl border border-white/10 bg-gradient-to-br from-ink-700 to-ink-900 p-4 shadow-glass sm:w-60"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Tap4Reviews</span>
          <span className="h-2 w-2 rounded-full bg-emerald" />
        </div>
        <div className="mt-10 text-xs text-white/50">Leave us a 5-star Google review</div>
        <div className="mt-3 flex items-center gap-1 text-gold">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="m12 2 2.9 6.9 7.5.6-5.7 4.9 1.7 7.3L12 17.8 5.6 21.7l1.7-7.3L1.6 9.5l7.5-.6z" />
            </svg>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <div className="h-10 w-10 rounded-lg bg-white/10" />
          <div className="text-[10px] text-white/50">NFC + QR dual mode</div>
        </div>
      </motion.div>

      {/* Phone */}
      <motion.div
        animate={{ y: [0, -14, -14, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, times: [0, 0.45, 0.55, 1], ease: "easeInOut" }}
        className="absolute right-4 bottom-0 w-44 rounded-[28px] border border-white/10 bg-ink-900 p-2 shadow-glass sm:w-56"
      >
        <div className="overflow-hidden rounded-[22px] bg-white">
          <div className="flex items-center gap-2 px-3 py-2 text-[10px] text-ink-700">
            <span className="h-2 w-2 rounded-full bg-red-400" />
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="h-2 w-2 rounded-full bg-emerald" />
            <span className="ml-auto font-medium">google.com/maps</span>
          </div>
          <div className="space-y-3 p-4">
            <div className="h-3 w-24 rounded bg-ink-100" />
            <div className="h-2 w-full rounded bg-ink-100" />
            <div className="h-2 w-4/5 rounded bg-ink-100" />
            <div className="flex items-center gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="m12 2 2.9 6.9 7.5.6-5.7 4.9 1.7 7.3L12 17.8 5.6 21.7l1.7-7.3L1.6 9.5l7.5-.6z" />
                </svg>
              ))}
            </div>
            <div className="mt-2 rounded-lg bg-emerald/10 px-3 py-2 text-xs font-medium text-emerald">
              Review submitted
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
