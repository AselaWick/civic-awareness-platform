// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://avhejmbqrlpzcgarzcjv.supabase.co'; // Replace with your actual URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2aGVqbWJxcmxwemNnYXJ6Y2p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwNjk0OTcsImV4cCI6MjA3MjY0NTQ5N30.mLTtC7v6rlNErMosNIR463fEZJDClPSnkwvorzykJ4A'; // Replace with your actual anon key

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
