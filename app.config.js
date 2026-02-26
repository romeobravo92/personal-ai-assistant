// Load env: .env.build (from Vercel/build script), then .env.local, then .env
require('dotenv').config({ path: '.env.build' });
require('dotenv').config({ path: '.env.local' });
require('dotenv').config(); // .env as fallback

const existing = require('./app.json');

module.exports = {
  ...existing,
  extra: {
    supabaseUrl: process.env.SUPABASE_URL ?? '',
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY ?? '',
  },
};
