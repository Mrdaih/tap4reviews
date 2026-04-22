import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

  const patch: Record<string, unknown> = {};
  if (typeof body.redirect_url === "string") {
    try {
      new URL(body.redirect_url);
    } catch {
      return NextResponse.json({ error: "redirect_url must be a valid URL" }, { status: 400 });
    }
    patch.redirect_url = body.redirect_url;
  }
  if (typeof body.is_active === "boolean") patch.is_active = body.is_active;
  if (typeof body.label === "string") patch.label = body.label;

  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  patch.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("cards")
    .update(patch)
    .eq("id", params.id)
    .eq("user_id", user.id)
    .select()
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Card not found" }, { status: 404 });
  return NextResponse.json({ card: data });
}
