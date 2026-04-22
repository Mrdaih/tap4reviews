import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SITE } from "@/lib/site";
import { SignOutButton } from "@/components/dashboard/SignOutButton";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-ink-900">
      <header className="border-b border-white/5 bg-ink-800/80 backdrop-blur">
        <div className="container-x flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold text-ink">T4</span>
              {SITE.name}
            </Link>
            <nav className="hidden gap-4 text-sm md:flex">
              <Link href="/dashboard" className="text-white/80 hover:text-white">Cards</Link>
              <Link href="/dashboard/orders" className="text-white/80 hover:text-white">Orders</Link>
              <Link href="/dashboard/settings" className="text-white/80 hover:text-white">Settings</Link>
            </nav>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-white/50 md:inline">{user.email}</span>
            <SignOutButton />
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
