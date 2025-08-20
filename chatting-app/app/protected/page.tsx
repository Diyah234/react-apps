"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { useEffect, useState, KeyboardEvent, useRef, } from "react";
import { clearUser, setUser } from "@/lib/redux/features/UserSlice";
import { AiOutlineSend } from "react-icons/ai";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import EmojiPicker from 'emoji-picker-react';
import { insertMessage } from "@/lib/supabase/message";
import Image from "next/image";

// Define a type for the fetched messages to ensure type safety
interface Message {
    id: string;
    text: string;
    created_at: string;
    user: string; // This is the user ID (UUID)
    profiles: {  // This is the joined user profile data
        name: string;
        email: string;
        avatar_url?: string;
    };
}

export default function ProtectedPage() {
    const router = useRouter();
    const supabase = createClient();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);
    const [isChecking, setIsChecking] = useState(true);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const channelRef = useRef(null);
    const chatContainerRef = useRef<HTMLDivElement>(null); // Ref for scrolling
    // Removed usersData state as we're getting user info directly from message.profiles

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                dispatch(setUser(session.user));
            } else {
                dispatch(clearUser());
                router.push("/auth/login");
            }
            setIsChecking(false);
        };

        if (!user) {
            checkSession();
        } else {
            setIsChecking(false);
        }

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (event === "SIGNED_IN" && session?.user) {
                    dispatch(setUser(session.user));
                } else if (event === "SIGNED_OUT") {
                    dispatch(clearUser());
                    router.push("/auth/login");
                }
            }
        );

        return () => subscription.unsubscribe();
    }, [dispatch, router, supabase, user]);

    const realTimeSubscription = () => {
        const channel = supabase.channel('messages');
        channel.on('postgres_changes', {
                event: "INSERT",
                schema: "public",
                table: "messages"
            },
            async (payload) => {
                console.log('changes received', payload);
                // Updated query to include avatar_url with correct field name
                const { data, error } = await supabase
                    .from('messages')
                    .select('*, profiles(name, email, avatar_url)')
                    .eq('id', payload.new.id)
                    .single();

                if (error) {
                    console.error("Error fetching new message:", error);
                } else if (data) {
                    setMessages((prevMessages) => [...prevMessages, data as Message]);
                }
            }
        ).subscribe((status) => {
            if (status !== 'SUBSCRIBED')
                return;
            console.log('realtime connection established');
        });
        return channel;
    };

    useEffect(() => {
        const fetchMessages = async () => {
            // Updated query to include avatar_url with correct field name
            const { data, error } = await supabase
                .from('messages')
                .select('*, profiles(name, email, avatar_url)')
                .order('created_at', { ascending: true });

            if (error) {
                console.error("Error fetching messages:", error);
            } else if (data) {
                setMessages(data as Message[]);
                console.log("Fetched messages:", data);
            }
        };

        if (user) {
            fetchMessages();
            channelRef.current = realTimeSubscription();
        }
        
        return () => {
            channelRef.current?.unsubscribe();
        };

    }, [user, supabase]);

    // Effect to auto-scroll to the bottom when messages change
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);


    if (isChecking) {
        return (
            <div className="flex-1 w-full flex items-center justify-center bg-gray-900">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-100"></div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    const userName = user.user_metadata?.full_name || user.user_metadata?.name || user.email;
    const userUrl = user.user_metadata?.avatar_url || '';
    const userInitial = userName.charAt(0).toUpperCase();

    const handleSubmit = async () => {
        const text = message.trim();
        if (!text) return;

        console.log("Attempting to send message:", text);

        const { success, error } = await insertMessage(text);
        if (success) {
            setMessage('');
            console.log("Message sent successfully!");
        } else {
            console.error("Failed to send message:", error);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="flex flex-col h-[85vh] md:h-[90vh] bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700">
            {/* Chat Messages Container */}
            <div ref={chatContainerRef} className="p-5 flex-1 overflow-y-auto flex flex-col gap-5">
                {messages.map((msg) => {
                    // Formatting the timestamp
                    const messageDate = new Date(msg.created_at);
                    const formattedTime = messageDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                    
                    // The user ID is in the 'user' field (not user_id)
                    const messageUserId = msg.user;
                    
                    // Determine if the message was sent by the current user
                    const isCurrentUser = messageUserId === user.id;
                    
                    // Get the other user's avatar and initial from profiles
                    const otherUserAvatar = msg.profiles?.avatar_url;
                    const otherUserInitial = msg.profiles?.name?.charAt(0).toUpperCase() || 'A';

                    return (
                        <div
                            key={msg.id}
                            className={`flex flex-row gap-2 items-start ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                        >
                            {!isCurrentUser && (
                                <div className="flex-shrink-0">
                                    {otherUserAvatar ? (
                                        <Image
                                            src={otherUserAvatar}
                                            alt={`${msg.profiles?.name || 'User'} avatar`}
                                            width={32}
                                            height={32}
                                            className="w-8 h-8 rounded-full"
                                        />
                                    ) : (
                                        <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-md font-bold">
                                            {otherUserInitial}
                                        </div>
                                    )}
                                </div>
                            )}
                            <div className={`p-3 rounded-2xl max-w-xs md:max-w-md lg:max-w-lg ${
                                isCurrentUser 
                                    ? 'bg-blue-600 rounded-tr-none' 
                                    : 'bg-gray-700 rounded-tl-none'
                            }`}>
                                <div className="flex flex-row items-center justify-between gap-4">
                                    <h1 className="text-xs font-semibold text-gray-300">
                                        {isCurrentUser ? 'You' : msg.profiles?.name || 'Anonymous'}
                                    </h1>
                                    <span className="text-xs text-gray-400">
                                        {formattedTime}
                                    </span>
                                </div>
                                <p className="text-white mt-1">{msg.text}</p>
                            </div>
                            {isCurrentUser && (
                                <div className="flex-shrink-0">
                                    {userUrl ? (
                                        <Image
                                            src={userUrl}
                                            alt="Your avatar"
                                            width={32}
                                            height={32}
                                            className="w-8 h-8 rounded-full"
                                        />
                                    ) : (
                                        <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-md font-bold">
                                            {userInitial}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Input Bar */}
            <div className="p-4 border-t border-gray-700 bg-gray-800">
                <div className="flex flex-row items-center gap-4">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="w-full pl-4 pr-16 py-3 border border-gray-600 rounded-full focus:outline-none focus:border-blue-500 bg-gray-700 text-white placeholder-gray-400"
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            onKeyDown={handleKeyDown}
                        />
                        <button
                            onClick={() => setOpen(prev => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl text-gray-400 hover:text-blue-500 transition-colors"
                        >
                            <MdOutlineEmojiEmotions />
                        </button>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white rounded-full p-3 px-5 flex items-center gap-2 font-semibold hover:bg-blue-700 transition-colors"
                    >
                        <AiOutlineSend />
                        <span className="hidden sm:inline">Send</span>
                    </button>
                </div>
                {open && <EmojiPicker onEmojiClick={(emoji) => console.log(emoji.emoji)} className='relative mt-4' />}
            </div>
        </div>
    );
}