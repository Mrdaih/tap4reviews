import Link from "next/link";
import { SITE } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-white/5 bg-ink-900">
      <div className="container-x grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold text-ink">T4</span>
            {SITE.name}
          </div>
          <p className="mt-4 text-sm text-white/60">
            NFC-powered Google review cards for UAE restaurants. Based in Dubai, shipped across the Emirates.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Product</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
            <li><Link href="/how-it-works" className="hover:text-white">How it works</Link></li>
            <li><Link href="/compatibility" className="hover:text-white">Compatibility</Link></li>
            <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Company</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Legal</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link href="/refund-policy" className="hover:text-white">Refund policy</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-white">Privacy policy</Link></li>
            <li><Link href="/terms-and-conditions" className="hover:text-white">Terms &amp; conditions</Link></li>
          </ul>
          <div className="mt-4 flex gap-3 text-white/50">
            <a href={SITE.social.instagram} aria-label="Instagram" className="hover:text-white">Instagram</a>
            <a href={SITE.social.linkedin} aria-label="LinkedIn" className="hover:text-white">LinkedIn</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="container-x flex flex-col items-start justify-between gap-3 py-6 text-xs text-white/50 sm:flex-row sm:items-center">
          <div>© {year} {SITE.name}. All rights reserved.</div>
          <div>
            Powered by{" "}
            <a href="https://askdaih.com" className="text-gold hover:text-gold-300">
              AskDaih
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
