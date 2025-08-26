// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fqedkwxwamuwdxxtozcw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxZWRrd3h3YW11d2R4eHRvemN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNDQ2NDIsImV4cCI6MjA3MTcyMDY0Mn0.wB2Y76t_1ZI0zH2LXavzIXMW1ksFRqrhLVmQm_KcrZw"; // anon key only
export const supabase = createClient(supabaseUrl, supabaseKey);
