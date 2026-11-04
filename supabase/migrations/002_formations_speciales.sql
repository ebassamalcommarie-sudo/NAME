-- Autorise les formations spéciales (ex. « special-avatar-ia ») en plus des 4 packs.
-- À coller une seule fois dans Supabase > SQL Editor > New query > Run.
alter table public.orders drop constraint if exists orders_product_id_check;
alter table public.enrollments drop constraint if exists enrollments_pack_id_check;
