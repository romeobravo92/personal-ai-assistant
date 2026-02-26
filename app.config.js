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
