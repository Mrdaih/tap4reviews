import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LoginForm } from "@/components/dashboard/LoginForm";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { next?: string; mode?: string };
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) redirect(searchParams.next ?? "/dashboard");

  return (
    <div className="min-h-screen bg-ink-900 bg-hero-glow">
      <div className="container-x flex min-h-screen items-center justify-center py-16">
        <div className="glass w-full max-w-md p-8">
          <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold text-ink">T4</span>
            {SITE.name}
          </Link>
          <h1 className="mt-6 h-display text-2xl">
            {searchParams.mode === "signup" ? "Create your account" : "Sign in"}
          </h1>
          <p className="mt-1 text-sm text-white/60">
            Manage your cards, view tap analytics, and update redirect URLs.
          </p>
          <div className="mt-6">
            <LoginForm initialMode={searchParams.mode === "signup" ? "signup" : "signin"} next={searchParams.next ?? "/dashboard"} />
          </div>
        </div>
      </div>
    </div>
  );
}
