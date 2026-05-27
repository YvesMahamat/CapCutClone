import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';

const URL_PROJET = 'https://ivceprcnfxzxtdsxvmvr.supabase.co';

export const supabase = createClient(URL_PROJET, SUPABASE_ANON_KEY);
