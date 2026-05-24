import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nusdttnfrvjmbnvkyain.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_QjjsY3n0Q06fX6VxgE0hJg_viqAIPJv';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
