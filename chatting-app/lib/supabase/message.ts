import { createClient } from "./client";

export async function insertMessage(text: string) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Ensure the user is authenticated before sending a message
    if (!user) {
        return { success: false, error: new Error("User not authenticated") };
    }

    // Insert the message text and the user's ID into the 'messages' table
    const { data, error } = await supabase
        .from("messages")
        .insert({
            text,
            user_id: user.id // <-- This is the new, required line
        });

    if (error) {
        console.error("Error inserting message:", error);
        return { success: false, error };
    }

    return { success: true, data };
}