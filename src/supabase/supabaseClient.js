// Configuration liée à ton Project ID : ivceprcnfxzxtdsxvmvr
const SUPABASE_URL = 'https://ivceprcnfxzxtdsxvmvr.supabase.co';

// Remplacer par la clé ANON disponible sur ton tableau de bord Supabase
// Idéalement, cette clé sera placée dans un fichier .env plus tard
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; 

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
