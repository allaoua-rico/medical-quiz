import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY } from "react-native-dotenv";
import { Database } from "../types/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseUrl = "https://tgimpuabfxibhxqldwvy.supabase.co";

const options = {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
};

const supabase = createClient<Database>(supabaseUrl, SUPABASE_KEY, options);

export default supabase;
