import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <div className="font-display text-7xl text-gold">404</div>
      <h1 className="mt-4 font-display text-3xl">Page not found</h1>
      <p className="mt-2 max-w-md text-white/60">
        That link didn't lead anywhere. Maybe try the homepage or WhatsApp us if you were chasing something specific.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn-primary">Back home</Link>
        <Link href="/contact" className="btn-secondary">Contact support</Link>
      </div>
    </div>
  );
}
