/**
 * Writes env vars to .env.build so the Expo build (app.config.js) can read them.
 * Vercel injects SUPABASE_URL and SUPABASE_ANON_KEY at build time; this ensures
 * they're available when Metro loads app.config.js.
 */
const fs = require('fs');
const path = require('path');

const vars = {
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
};

const lines = Object.entries(vars)
  .filter(([, v]) => v != null && v !== '')
  .map(([k, v]) => `${k}=${String(v).trim()}`);

const outPath = path.join(__dirname, '..', '.env.build');
fs.writeFileSync(outPath, lines.join('\n') + '\n', 'utf8');
console.log('Wrote', lines.length, 'env var(s) to .env.build');
