-- Profiles (extends Supabase Auth)
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  timezone text default 'UTC',
  motivation_schedule text, -- e.g. 'morning', 'evening', 'random'
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Reminders
create table public.reminders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  due_at timestamptz not null,
  recurrence text, -- optional: 'daily', 'weekly', etc.
  completed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Feelings entries
create table public.feelings_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  content text not null,
  mood_tag text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Feelings threads (Q&A for "root cause")
create table public.feelings_threads (
  id uuid primary key default gen_random_uuid(),
  entry_id uuid not null references public.feelings_entries (id) on delete cascade,
  messages jsonb not null default '[]', -- [{ role: 'assistant'|'user', content: string }]
  summary text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Behavioral patterns (user- or system-tagged)
create table public.behavioral_patterns (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  name text not null,
  kind text, -- e.g. 'sleep', 'mood', 'trigger'
  created_at timestamptz default now()
);

-- Tactics (what helped)
create table public.tactics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  name text not null,
  pattern_id uuid references public.behavioral_patterns (id) on delete set null,
  created_at timestamptz default now()
);

-- Ideas
create table public.ideas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  content text not null,
  status text not null default 'captured', -- captured | brainstorming | planning | done
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Idea sessions (brainstorm/plan output)
create table public.idea_sessions (
  id uuid primary key default gen_random_uuid(),
  idea_id uuid not null references public.ideas (id) on delete cascade,
  kind text not null, -- 'brainstorm' | 'plan'
  content jsonb not null, -- conversation or structured plan
  created_at timestamptz default now()
);

-- RLS: enable and policies (user sees only own data)
alter table public.profiles enable row level security;
alter table public.reminders enable row level security;
alter table public.feelings_entries enable row level security;
alter table public.feelings_threads enable row level security;
alter table public.behavioral_patterns enable row level security;
alter table public.tactics enable row level security;
alter table public.ideas enable row level security;
alter table public.idea_sessions enable row level security;

create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);

create policy "reminders_all_own" on public.reminders for all using (auth.uid() = user_id);
create policy "feelings_entries_all_own" on public.feelings_entries for all using (auth.uid() = user_id);
create policy "feelings_threads_all_via_entry" on public.feelings_threads for all
  using (exists (select 1 from public.feelings_entries e where e.id = entry_id and e.user_id = auth.uid()));
create policy "behavioral_patterns_all_own" on public.behavioral_patterns for all using (auth.uid() = user_id);
create policy "tactics_all_own" on public.tactics for all using (auth.uid() = user_id);
create policy "ideas_all_own" on public.ideas for all using (auth.uid() = user_id);
create policy "idea_sessions_all_via_idea" on public.idea_sessions for all
  using (exists (select 1 from public.ideas i where i.id = idea_id and i.user_id = auth.uid()));

-- Trigger: create profile on first signup (auth.users insert)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
