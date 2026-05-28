import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

// Remplacement direct des variables par leurs valeurs textuelles
const SUPABASE_URL = 'https://ivceprcnfxzxtdsxvmvr.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable__lC9nlZFRY2xE4NgvMi0oA_dTWUStVn'; 

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
