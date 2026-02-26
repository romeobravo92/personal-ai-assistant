# Personal AI Assistant

Cross-platform assistant (iOS, Android, web) for reminders, motivation, feelings journaling, pattern tracking, and idea brainstorming. Syncs via Supabase; advice grounded in Havamal and Jocko Willink.

## Setup

1. **Clone and install**
   ```bash
   cd personal-ai-assistant && npm install
   ```

2. **Supabase**
   - Create a project at [supabase.com](https://supabase.com).
   - Copy `.env.example` to `.env.local` and set:
     - `SUPABASE_URL` — Project URL (Settings → API)
     - `SUPABASE_ANON_KEY` — anon public key
   - Apply the database schema: in the Supabase dashboard go to **SQL Editor**, run the SQL in `supabase/migrations/20250225000000_initial_schema.sql` (creates tables and RLS; also creates a trigger that inserts a profile row when a user signs up).

3. **Run**
   ```bash
   npm run web    # browser (PC/macOS)
   npm run ios    # iOS simulator
   npm run android # Android emulator
   ```

## Deploy (Vercel)

1. **Push the app to GitHub** (if you haven’t already).

2. **Import on Vercel**
   - Go to [vercel.com](https://vercel.com) → **Add New** → **Project**.
   - Import the repo (or the `personal-ai-assistant` folder if the repo is the whole workspace).
   - Set **Root Directory** to `personal-ai-assistant` if the repo root is the parent folder.

3. **Configure build**
   - **Build Command:** `npm run build` (or leave blank; `vercel.json` sets it).
   - **Output Directory:** `dist`.
   - **Install Command:** `npm install`.

4. **Environment variables** (required for auth)
   - In the project → **Settings** → **Environment Variables**, add:
     - `SUPABASE_URL` = your Supabase project URL
     - `SUPABASE_ANON_KEY` = your Supabase anon key
   - Add them for **Production** (and Preview if you want).

5. **Deploy**
   - Click **Deploy**. The first build will run; when it finishes, open the generated URL (e.g. `https://personal-ai-assistant-xxx.vercel.app`).

**Deploy from CLI (optional)**

```bash
cd personal-ai-assistant
npm i -g vercel
vercel
# follow prompts; set SUPABASE_URL and SUPABASE_ANON_KEY when asked or in Vercel dashboard
```

## Stack

- **Expo** (React Native) — iOS, Android, web
- **Supabase** — Auth, Postgres, Realtime, Edge Functions
- **AI** — OpenAI/Anthropic via Edge Functions (Havamal + Jocko-informed advice)
