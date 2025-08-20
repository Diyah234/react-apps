
import { createClient } from "./client";

export async function insertMessage(text: string) {
  const supabase = createClient();
  const { data, error } = await supabase.from("messages").insert({ text });

  if (error) {
    console.error("Error inserting message:", error);
    return { success: false, error };
  }

  return { success: true, data };
}