import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY } from "react-native-dotenv";
import { Database } from '../types/supabase'

const supabaseUrl = "https://tgimpuabfxibhxqldwvy.supabase.co";
// console.log("SUPABASE_KEY", SUPABASE_KEY);
const supabase = createClient<Database>(supabaseUrl, SUPABASE_KEY);

export default supabase;
