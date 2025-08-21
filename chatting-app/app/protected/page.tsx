"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { useEffect, useState, KeyboardEvent, useRef, useCallback } from "react";
import { clearUser, setUser } from "@/lib/redux/features/UserSlice";
import { AiOutlineSend } from "react-icons/ai";
import { MdOutlineEmojiEmotions, MdReply } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { insertMessage } from "@/lib/supabase/message";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { RealtimeChannel } from "@supabase/supabase-js";

interface Message {
  id: string;
  text: string;
  created_at: string;
  user_id: string;
  profiles: {
    name: string;
    email: string;
    avatar_url?: string;
  };
  isOptimistic?: boolean;
  reply_to?: string;
  replied_message?: {
    id: string;
    text: string;
    user_name: string;
  };
  mentions?: string[]; // Array of user IDs who were mentioned
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
}

export default function ProtectedPage() {
  const router = useRouter();
  const supabase = createClient();
  const user = useSelector((state: RootState) => state.user.user);
  const [isChecking, setIsChecking] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [showMentions, setShowMentions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
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

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        dispatch(setUser(session.user));
      } else if (event === "SIGNED_OUT") {
        dispatch(clearUser());
        router.push("/auth/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [dispatch, router, supabase, user]);

  const realTimeSubscription = useCallback(() => {
  const channel = supabase
    .channel("messages-realtime")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
      },
      async (payload) => {
        console.log("New message received:", payload);
        try {
          // Fetch the main message and its profile
          const { data, error } = await supabase
            .from("messages")
            .select("*, profiles(name, email, avatar_url)")
            .eq("id", payload.new.id)
            .single();

          if (error) {
            console.error("Error fetching new message:", error);
            return;
          }

          if (data) {
            const newMessage: Message = data as Message;

            // If the message has a reply_to ID, fetch the replied message's details
            if (newMessage.reply_to) {
              const { data: repliedData } = await supabase
                .from("messages")
                .select("text, profiles(name)")
                .eq("id", newMessage.reply_to)
                .single();

              // Fix: Access profiles as an array (Supabase joins return arrays)
              if (repliedData && repliedData.profiles && Array.isArray(repliedData.profiles) && repliedData.profiles.length > 0) {
                newMessage.replied_message = {
                  id: newMessage.reply_to,
                  text: repliedData.text,
                  user_name: repliedData.profiles[0].name || "Anonymous",
                };
              }
            }

            setMessages((prevMessages) => {
              // Remove the optimistic message with the same user ID
              const withoutOptimistic = prevMessages.filter(
                (msg) => !(msg.isOptimistic && msg.user_id === newMessage.user_id)
              );

              // Check if the real message already exists to prevent duplicates
              const exists = withoutOptimistic.some((msg) => msg.id === newMessage.id);
              if (exists) return prevMessages;

              // Add the new message to the list
              return [...withoutOptimistic, newMessage];
            });
          }
        } catch (err) {
          console.error("Error in realtime handler:", err);
        }
      }
    )
    .subscribe();

  return channel;
}, [supabase]);

  useEffect(() => {
   const fetchMessages = async () => {
  const { data, error } = await supabase
    .from("messages")
    .select("*, profiles(name, email, avatar_url)")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching messages:", error);
  } else if (data) {
    const messagesWithReplies: Message[] = [];
    for (const msg of data) {
      const newMessage: Message = msg as Message;
      if (newMessage.reply_to) {
        const { data: repliedData } = await supabase
          .from("messages")
          .select("text, profiles(name)")
          .eq("id", newMessage.reply_to)
          .single();

        // Fix: Access profiles as an array (Supabase joins return arrays)
        if (repliedData && repliedData.profiles && Array.isArray(repliedData.profiles) && repliedData.profiles.length > 0) {
          newMessage.replied_message = {
            id: newMessage.reply_to,
            text: repliedData.text,
            user_name: repliedData.profiles[0].name || "Anonymous",
          };
        }
      }
      messagesWithReplies.push(newMessage);
    }
    setMessages(messagesWithReplies);
  }
};
      

    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, name, email, avatar_url");

      if (error) {
        console.error("Error fetching users:", error);
      } else if (data) {
        setUsers(data as User[]);
      }
    };

    if (user) {
      fetchMessages();
      fetchUsers();
      channelRef.current = realTimeSubscription();
    }

    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
      }
    };
  }, [user, supabase, realTimeSubscription]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
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

  const userName =
    user.user_metadata?.full_name || user.user_metadata?.name || user.email;
  const userUrl = user.user_metadata?.avatar_url || "";
  const userInitial = userName.charAt(0).toUpperCase();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (showMentions) {
      if (e.key === "Escape") {
        setShowMentions(false);
        return;
      }
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const text = message.trim();
    if (!text) return;

    const mentions = extractMentions(text);
    const optimisticId = uuidv4();

    // Add optimistic message immediately
    const optimisticMessage: Message = {
      id: optimisticId,
      text,
      created_at: new Date().toISOString(),
      user_id: user.id,
      profiles: {
        name: userName,
        email: user.email || "",
        avatar_url: userUrl,
      },
      isOptimistic: true,
      reply_to: replyingTo?.id,
      replied_message: replyingTo
        ? {
            id: replyingTo.id,
            text: replyingTo.text,
            user_name: replyingTo.profiles.name || "Anonymous",
          }
        : undefined,
      mentions,
    };

    // Show message immediately
    setMessages((prev) => [...prev, optimisticMessage]);
    setMessage(""); // Clear input immediately
    setReplyingTo(null); // Clear reply state
    setShowMentions(false);

    // Send to database (you'll need to update your insertMessage function)
    const { success, error } = await insertMessage(
      text,
      replyingTo?.id,
      mentions
    );

    if (!success) {
      console.error("Failed to send message:", error);
      // Remove optimistic message on error
      setMessages((prev) => prev.filter((msg) => msg.id !== optimisticId));
      setMessage(text); // Restore message to input
      if (replyingTo) setReplyingTo(replyingTo); // Restore reply state
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cursorPos = e.target.selectionStart || 0;

    setMessage(value);
    setCursorPosition(cursorPos);

    // Check for @ mentions
    const lastAtIndex = value.lastIndexOf("@", cursorPos - 1);
    if (lastAtIndex !== -1) {
      const textAfterAt = value.substring(lastAtIndex + 1, cursorPos);
      if (!textAfterAt.includes(" ") && textAfterAt.length >= 0) {
        setMentionQuery(textAfterAt);
        setShowMentions(true);
      } else {
        setShowMentions(false);
      }
    } else {
      setShowMentions(false);
    }
  };

  const handleMentionSelect = (user: User) => {
    const lastAtIndex = message.lastIndexOf("@", cursorPosition - 1);
    const beforeMention = message.substring(0, lastAtIndex);
    const afterMention = message.substring(cursorPosition);
    const newMessage = `${beforeMention}@${user.name} ${afterMention}`;

    setMessage(newMessage);
    setShowMentions(false);
    setMentionQuery("");

    // Focus back to input
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

const extractMentions = (text: string): string[] => {
  const mentionRegex = /@(\w+)/g;
  const mentions: string[] = []; // Add explicit typing
  let match: RegExpExecArray | null; // Add explicit typing

  while ((match = mentionRegex.exec(text)) !== null) {
    const mentionedUser = users.find((u) => u.name === match![1]);
    if (mentionedUser) {
      mentions.push(mentionedUser.id);
    }
  }

  return mentions;
};

  const renderMessageText = (text: string) => {
    const mentionRegex = /@(\w+)/g;
    const parts = text.split(mentionRegex);

    return parts.map((part, index) => {
      if (index % 2 === 1) {
        // This is a mention
        const mentionedUser = users.find((u) => u.name === part);
        const isMentioningCurrentUser = mentionedUser?.id === user.id;

        return (
          <span
            key={index}
            className={`font-semibold ${
              isMentioningCurrentUser
                ? "bg-yellow-400/20 text-yellow-300 px-1 rounded"
                : "text-blue-400"
            }`}
          >
            @{part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="flex flex-col h-[85vh] md:h-[90vh] bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out;
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
      <div
        ref={chatContainerRef}
        className="p-5 flex-1 overflow-y-auto flex flex-col gap-5"
      >
        {messages.map((msg) => {
          const messageDate = new Date(msg.created_at);
          const formattedTime = messageDate.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          });

          const messageUserId = msg.user_id;
          const isCurrentUser = messageUserId === user.id;

          const otherUserAvatar = msg.profiles?.avatar_url;
          const otherUserInitial =
            msg.profiles?.name?.charAt(0).toUpperCase() || "A";
          const hasMentions = msg.mentions?.includes(user.id);

          return (
            <div
              key={msg.id}
              className={`flex flex-row gap-2 items-start group ${
                isCurrentUser ? "justify-end" : "justify-start"
              } ${
                msg.isOptimistic ? "opacity-70 animate-pulse" : "opacity-100"
              } ${
                hasMentions
                  ? "bg-yellow-400/5 border-l-4 border-yellow-400 pl-2"
                  : ""
              } animate-fade-in-up transition-all duration-300 ease-in-out relative`}
              style={{
                animation: msg.isOptimistic
                  ? "fadeInUp 0.3s ease-out, pulse 2s infinite"
                  : "fadeInUp 0.3s ease-out",
              }}
            >
              {!isCurrentUser && (
                <div className="flex-shrink-0">
                  {otherUserAvatar ? (
                    <Image
                      src={otherUserAvatar}
                      alt={`${msg.profiles?.name || "User"} avatar`}
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
              <div
                className={`p-3 rounded-2xl max-w-xs md:max-w-md lg:max-w-lg transform transition-all duration-200 hover:scale-105 relative ${
                  isCurrentUser
                    ? "bg-blue-600 rounded-tr-none hover:bg-blue-700"
                    : "bg-gray-700 rounded-tl-none hover:bg-gray-600"
                }`}
              >
                {/* Reply indicator */}
                {msg.replied_message && (
                  <div className="mb-2 p-2 bg-black/20 rounded border-l-4 border-blue-400">
                    <p className="text-xs text-blue-400 font-semibold">
                      {msg.replied_message.user_name}
                    </p>
                    <p className="text-xs text-gray-300 truncate">
                      {msg.replied_message.text}
                    </p>
                  </div>
                )}

                <div className="flex flex-row items-center justify-between gap-4">
                  <h1 className="text-xs font-semibold text-gray-300">
                    {isCurrentUser ? "You" : msg.profiles?.name || "Anonymous"}
                  </h1>
                  <span className="text-xs text-gray-400">
                    {formattedTime}
                    {msg.isOptimistic && (
                      <span className="ml-1 animate-spin">⏳</span>
                    )}
                  </span>
                </div>
                <p className="text-white mt-1">{renderMessageText(msg.text)}</p>

                {/* Mobile-friendly menu button */}
                <button
                  onClick={() =>
                    setSelectedMessageId(
                      selectedMessageId === msg.id ? null : msg.id
                    )
                  }
                  className={`absolute -top-2 ${
                    isCurrentUser ? "-left-8" : "-right-8"
                  } p-1.5 bg-gray-600 text-white rounded-full transition-all duration-200 hover:bg-gray-500 hover:scale-110 ${
                    selectedMessageId === msg.id
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100 md:opacity-0"
                  }`}
                >
                  <BsThreeDotsVertical className="w-3 h-3" />
                </button>

                {/* Action menu */}
                {selectedMessageId === msg.id && (
                  <div
                    className={`absolute top-8 ${
                      isCurrentUser ? "left-0" : "right-0"
                    } bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-10 min-w-32 animate-fade-in-up`}
                  >
                    <button
                      onClick={() => {
                        setReplyingTo(msg);
                        setSelectedMessageId(null);
                      }}
                      className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 flex items-center gap-2 text-sm"
                    >
                      <MdReply className="w-4 h-4" />
                      Reply
                    </button>
                  </div>
                )}
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

      <div className="p-4 border-t border-gray-700 bg-gray-800">
        {/* Reply indicator */}
        {replyingTo && (
          <div className="mb-3 p-3 bg-gray-700 rounded-lg border-l-4 border-blue-500 animate-fade-in-up">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs text-blue-400 font-semibold mb-1">
                  Replying to{" "}
                  {replyingTo.user_id === user.id
                    ? "yourself"
                    : replyingTo.profiles?.name || "Anonymous"}
                </p>
                <p className="text-sm text-gray-300 truncate">
                  {replyingTo.text}
                </p>
              </div>
              <button
                onClick={() => setReplyingTo(null)}
                className="ml-2 p-1 text-gray-400 hover:text-white transition-colors"
              >
                <IoClose className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-row items-center gap-4">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              placeholder={
                replyingTo
                  ? `Replying to ${replyingTo.profiles?.name || "Anonymous"}...`
                  : "Type a message..."
              }
              className="w-full pl-4 pr-16 py-3 border border-gray-600 rounded-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-gray-700 text-white placeholder-gray-400 transition-all duration-200"
              onChange={handleInputChange}
              value={message}
              onKeyDown={handleKeyDown}
              onBlur={() => {
                // Delay hiding mentions to allow for click
                setTimeout(() => setShowMentions(false), 200);
              }}
            />

            {/* Mention suggestions */}
            {showMentions && (
              <div className="absolute bottom-full left-0 right-12 bg-gray-800 border border-gray-600 rounded-lg shadow-xl max-h-40 overflow-y-auto mb-2 animate-fade-in-up">
                {users
                  .filter(u =>
                    // Check that u exists and u.name is a non-empty string
                    u && u.name && u.name.toLowerCase().includes(mentionQuery.toLowerCase()) &&
                    u.id !== user.id
                  )
                  .slice(0, 5)
                  .map((u) => (
                    <button
                      key={u.id}
                      onClick={() => handleMentionSelect(u)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center gap-3 text-white"
                    >
                      {u.avatar_url ? (
                        <Image
                          src={u.avatar_url}
                          alt={`${u.name} avatar`}
                          width={24}
                          height={24}
                          className="w-6 h-6 rounded-full"
                        />
                      ) : (
                        <div className="bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className="text-sm">{u.name}</span>
                    </button>
                  ))}
                {users.filter(u =>
                    u && u.name && u.name.toLowerCase().includes(mentionQuery.toLowerCase()) &&
                    u.id !== user.id
                  ).length === 0 && (
                    <div className="px-4 py-2 text-gray-400 text-sm">
                      No users found
                    </div>
                  )}
              </div>
            )}
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl text-gray-400 hover:text-blue-500 transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <MdOutlineEmojiEmotions />
            </button>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white rounded-full p-3 px-5 flex items-center gap-2 font-semibold hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <AiOutlineSend />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
        {open && (
          <div className="animate-fade-in-up">
            <EmojiPicker
              onEmojiClick={(emoji) => {
                setMessage((prev) => prev + emoji.emoji);
              }}
              className="relative mt-4"
            />
          </div>
        )}
      </div>
    </div>
  );
}