import { createBrowserClient } from "@supabase/ssr";

type BrowserClientOptions = {
  supabaseUrl: string;
  supabasePublishableKey: string;
};

export function createSupabaseBrowserClient({
  supabaseUrl,
  supabasePublishableKey
}: BrowserClientOptions) {
  return createBrowserClient(supabaseUrl, supabasePublishableKey);
}
