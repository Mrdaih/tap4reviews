import { createClient } from "@/lib/supabase/server";
import { SettingsForm } from "@/components/dashboard/SettingsForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("restaurant_name, phone, email, google_place_id")
    .eq("id", user!.id)
    .maybeSingle();

  return (
    <div className="container-x py-10">
      <h1 className="h-display text-3xl">Settings</h1>
      <p className="mt-1 text-sm text-white/60">Update your restaurant details and default Google review link.</p>
      <div className="mt-8 max-w-xl">
        <SettingsForm
          email={user!.email ?? ""}
          initial={{
            restaurant_name: profile?.restaurant_name ?? "",
            phone: profile?.phone ?? "",
            google_place_id: profile?.google_place_id ?? "",
          }}
        />
      </div>
    </div>
  );
}
