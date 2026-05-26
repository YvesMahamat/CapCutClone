import { createClient } from '@supabase/supabase-js';

// Remplace ces valeurs par l'URL et la clé 'anon' que tu as vues sur ton tableau de bord Supabase
const SUPABASE_URL = 'https://ivceprcnfxztdsxvmvr.supabase.co';
const SUPABASE_ANON_KEY = 'TA_CLE_ANON_ICI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
