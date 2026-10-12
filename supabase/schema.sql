-- Schéma de la base Airgé Agency.
-- À coller une seule fois dans Supabase > SQL Editor > New query > Run.

-- Commandes (une ligne par tentative de paiement)
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  email text not null,
  product_id text not null check (product_id in ('pack-1', 'pack-2', 'pack-3', 'pack-4', 'bundle')),
  amount integer not null check (amount > 0),
  currency text not null default 'XAF',
  reference text not null unique,
  provider_reference text unique,
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed')),
  created_at timestamptz not null default now(),
  paid_at timestamptz
);
create index if not exists orders_user_id_idx on public.orders (user_id);
create index if not exists orders_status_idx on public.orders (status, created_at desc);

-- Accès aux packs (créé automatiquement après un paiement confirmé)
create table if not exists public.enrollments (
  user_id uuid not null references auth.users (id) on delete cascade,
  pack_id text not null check (pack_id in ('pack-1', 'pack-2', 'pack-3', 'pack-4')),
  order_id uuid references public.orders (id) on delete set null,
  created_at timestamptz not null default now(),
  primary key (user_id, pack_id)
);

-- Progression des élèves (vidéos terminées)
create table if not exists public.lesson_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  lesson_id text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

-- Sécurité : chaque élève ne voit que ses propres données.
-- Les commandes et les accès ne sont modifiés que par le serveur (clé secrète).
alter table public.orders enable row level security;
alter table public.enrollments enable row level security;
alter table public.lesson_progress enable row level security;

drop policy if exists "orders: lecture par le propriétaire" on public.orders;
create policy "orders: lecture par le propriétaire" on public.orders
  for select using (auth.uid() = user_id);

drop policy if exists "enrollments: lecture par le propriétaire" on public.enrollments;
create policy "enrollments: lecture par le propriétaire" on public.enrollments
  for select using (auth.uid() = user_id);

drop policy if exists "progress: lecture par le propriétaire" on public.lesson_progress;
create policy "progress: lecture par le propriétaire" on public.lesson_progress
  for select using (auth.uid() = user_id);

drop policy if exists "progress: ajout par le propriétaire" on public.lesson_progress;
create policy "progress: ajout par le propriétaire" on public.lesson_progress
  for insert with check (auth.uid() = user_id);

drop policy if exists "progress: suppression par le propriétaire" on public.lesson_progress;
create policy "progress: suppression par le propriétaire" on public.lesson_progress
  for delete using (auth.uid() = user_id);
