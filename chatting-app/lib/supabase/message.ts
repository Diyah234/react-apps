import { createClient } from "@/lib/supabase/client";

// Define a type for the data returned from the database query, including the profile
interface MessageWithProfile {
    id: string;
    text: string;
    user_id: string;
    created_at: string;
    reply_to: string | null; // Use null for no reply
    mentions: string[] | null; // Use null for no mentions
    profiles: {
        name: string;
        email: string;
        avatar_url?: string;
    } | null;
}

// Define the shape of the object to be inserted into the database
interface MessageInsertData {
    text: string;
    user_id: string;
    reply_to?: string;
    mentions?: string[];
}

// Define the return type for the function itself
interface InsertMessageResult {
    success: boolean;
    error?: object | string; // Use a more specific type than 'any'
    data?: MessageWithProfile | null;
}

export async function insertMessage(
    text: string, 
    replyTo?: string, 
    mentions?: string[]
): Promise<InsertMessageResult> {
    const supabase = createClient();
    
    try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
            return { success: false, error: 'User not authenticated' };
        }

        const messageData: MessageInsertData = {
            text,
            user_id: user.id,
        };

        if (replyTo) {
            messageData.reply_to = replyTo;
        }

        if (mentions && mentions.length > 0) {
            messageData.mentions = mentions;
        }

        const { data, error } = await supabase
            .from('messages')
            .insert([messageData])
            .select('*, profiles(name, email, avatar_url)')
            .single();

        if (error) {
            console.error('Error inserting message:', error);
            // Return the specific error object
            return { success: false, error: error };
        }

        // Cast the returned data to our defined type
        return { success: true, data: data as MessageWithProfile };
    } catch (error) {
        console.error('Unexpected error in insertMessage:', error);
        // You can't be sure of the error type, but you can check it or cast it
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
        return { success: false, error: 'An unknown error occurred' };
    }
}