# Das Tailors - Supabase, Prisma, Google OAuth & Vercel Setup Guide

This guide walks you through connecting your **Supabase** backend, running **Prisma** database migrations & seeds, setting up **Google OAuth**, and deploying to **Vercel**.

---

## 1. Supabase Setup

### A. Create Project
1. Log in to [Supabase](https://supabase.com).
2. Click **New Project** and name it (e.g. `DasTailors`).
3. Choose a region close to your users (e.g., `Mumbai / ap-south-1`) and set a strong database password (keep this password handy!).

### B. Get API Keys
1. In the Supabase Dashboard, go to **Project Settings** > **API**.
2. Copy:
   - **Project URL** -> `NEXT_PUBLIC_SUPABASE_URL`
   - **Project API Keys** (`anon` `public`) -> `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### C. Get Database Connection Strings (Prisma)
1. In the Supabase Dashboard, go to **Project Settings** > **Database** > **Connection string**.
2. Under **Connection pooling** (port `6543` / Mode: `Transaction`), copy the URI:
   - Format: `postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true`
   - Set as `DATABASE_URL`.
3. Under **Direct connection** (port `5432`), copy the URI:
   - Format: `postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres`
   - Set as `DIRECT_URL`.

---

## 2. Google OAuth Setup

### A. Google Cloud Console
1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create or select your project.
3. Go to **APIs & Services** > **OAuth consent screen**:
   - Choose **External** (or Internal for Google Workspace).
   - Fill in App Name ("Das Tailors") and developer contact emails.
4. Go to **APIs & Services** > **Credentials**:
   - Click **Create Credentials** > **OAuth Client ID**.
   - Application type: **Web application**.
   - Name: `Das Tailors Web`.
   - **Authorized redirect URIs**: Add your Supabase callback URL:
     ```
     https://<YOUR-PROJECT-REF>.supabase.co/auth/v1/callback
     ```
   - Click **Create** and copy your **Client ID** and **Client Secret**.

### B. Enable Google in Supabase
1. In Supabase Dashboard, go to **Authentication** > **Providers** > **Google**.
2. Toggle **Enable Google provider**.
3. Paste:
   - **Client ID** from Google
   - **Client Secret** from Google
4. Click **Save**.

### C. Supabase Redirect URL Configuration
1. In Supabase Dashboard, go to **Authentication** > **URL Configuration**.
2. Under **Site URL**, set:
   - Local: `http://localhost:3000`
   - Production: `https://your-app.vercel.app`
3. Under **Redirect URLs**, add:
   - `http://localhost:3000/auth/callback`
   - `https://*.vercel.app/auth/callback`
   - `https://your-custom-domain.com/auth/callback` (if using custom domain)

---

## 3. Local Environment & Database Migration

1. In the project root, open `.env.local` and paste your actual credentials:
   ```env
   DATABASE_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
   DIRECT_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"

   NEXT_PUBLIC_SUPABASE_URL="https://[REF].supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

2. **Push the schema to your Supabase PostgreSQL database**:
   ```bash
   npm run db:push
   ```

3. **Migrate your existing receipts & users from `storage.json`**:
   ```bash
   npm run db:seed
   ```

4. **Start the local dev server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` to test Google sign-in and receipt management!

---

## 4. Deploying to Vercel

1. Push your repository to GitHub / GitLab / Bitbucket.
2. In [Vercel](https://vercel.com), click **Add New Project** and import your repo.
3. In **Environment Variables**, add:
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_APP_URL` (set to your Vercel URL, e.g. `https://your-app.vercel.app`)
4. Click **Deploy**.

> **Note**: `prisma generate` runs automatically during deployment via `postinstall` script in `package.json`.
