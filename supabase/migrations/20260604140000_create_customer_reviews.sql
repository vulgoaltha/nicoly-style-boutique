-- Migration: create customer_reviews table
-- Created: 2026-06-04

create table if not exists public.customer_reviews (
  id            uuid primary key default gen_random_uuid(),
  order_id      uuid references public.orders(id) on delete set null,
  product_id    uuid references public.products(id) on delete set null,
  customer_name text not null,
  customer_photo text,
  rating        smallint not null check (rating between 1 and 5),
  comment       text not null,
  city          text,
  state         text,
  approved      boolean not null default false,
  created_at    timestamptz not null default now()
);

-- Index for fast public query (approved only)
create index if not exists idx_customer_reviews_approved
  on public.customer_reviews (approved, created_at desc);

-- Index for admin listing
create index if not exists idx_customer_reviews_created
  on public.customer_reviews (created_at desc);

-- Row Level Security
alter table public.customer_reviews enable row level security;

-- Public: anyone can read approved reviews
create policy "Public read approved reviews"
  on public.customer_reviews for select
  using (approved = true);

-- Admin: full access (uses the existing is_admin helper or service role)
create policy "Admin full access"
  on public.customer_reviews for all
  using (
    exists (
      select 1 from public.user_roles
      where user_id = auth.uid()
        and role = 'admin'
    )
  );

-- Allow insert from anon (customers submitting reviews)
create policy "Anyone can insert review"
  on public.customer_reviews for insert
  with check (true);
