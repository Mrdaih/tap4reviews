-- Tap4Reviews schema
-- Run this in the Supabase SQL editor after creating a new project.
-- Safe to re-run: uses IF NOT EXISTS and policy replacement patterns.

create extension if not exists "pgcrypto";

-- =========================================================
-- Profiles (extends auth.users)
-- =========================================================
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  restaurant_name text,
  phone text,
  email text,
  google_place_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Profiles: owner can read" on public.profiles;
create policy "Profiles: owner can read"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Profiles: owner can update" on public.profiles;
create policy "Profiles: owner can update"
  on public.profiles for update
  using (auth.uid() = id);

drop policy if exists "Profiles: owner can insert" on public.profiles;
create policy "Profiles: owner can insert"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =========================================================
-- NFC Cards
-- =========================================================
create table if not exists public.cards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  serial_number text unique not null,
  redirect_url text not null,
  is_active boolean not null default true,
  label text,
  tap_count integer not null default 0,
  last_tapped_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists cards_user_id_idx on public.cards(user_id);
create index if not exists cards_serial_idx on public.cards(serial_number);

alter table public.cards enable row level security;

drop policy if exists "Cards: owner can read" on public.cards;
create policy "Cards: owner can read"
  on public.cards for select
  using (auth.uid() = user_id);

drop policy if exists "Cards: owner can update" on public.cards;
create policy "Cards: owner can update"
  on public.cards for update
  using (auth.uid() = user_id);

drop policy if exists "Cards: owner can insert" on public.cards;
create policy "Cards: owner can insert"
  on public.cards for insert
  with check (auth.uid() = user_id);

-- =========================================================
-- Tap events (analytics)
-- =========================================================
create table if not exists public.taps (
  id uuid primary key default gen_random_uuid(),
  card_id uuid not null references public.cards(id) on delete cascade,
  tapped_at timestamptz not null default now(),
  user_agent text,
  ip_country text
);

create index if not exists taps_card_id_idx on public.taps(card_id);
create index if not exists taps_tapped_at_idx on public.taps(tapped_at desc);

-- Atomic tap_count increment used by /api/tap
create or replace function public.increment_tap_count(card_row uuid)
returns void language plpgsql security definer as $$
begin
  update public.cards
     set tap_count = tap_count + 1,
         last_tapped_at = now()
   where id = card_row;
end;
$$;

alter table public.taps enable row level security;

drop policy if exists "Taps: owner can read" on public.taps;
create policy "Taps: owner can read"
  on public.taps for select
  using (
    exists (
      select 1 from public.cards c
      where c.id = taps.card_id and c.user_id = auth.uid()
    )
  );

-- Tap inserts are performed only by the service role via /api/tap.

-- =========================================================
-- Orders
-- =========================================================
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  stripe_session_id text unique,
  product text,
  quantity integer not null default 1,
  amount_aed numeric(10, 2) not null,
  status text not null default 'pending',
  shipping_address jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_user_id_idx on public.orders(user_id);

alter table public.orders enable row level security;

drop policy if exists "Orders: owner can read" on public.orders;
create policy "Orders: owner can read"
  on public.orders for select
  using (auth.uid() = user_id);

-- =========================================================
-- Blog posts (optional — MDX is primary source; DB is a fallback/CMS)
-- =========================================================
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  content text not null,
  excerpt text,
  cover_image text,
  category text,
  author text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.posts enable row level security;

drop policy if exists "Posts: public can read published" on public.posts;
create policy "Posts: public can read published"
  on public.posts for select
  using (published = true);
