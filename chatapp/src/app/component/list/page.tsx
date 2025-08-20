"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/lib/store';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

// Define a type for the user data
interface User {
 id: string;
 username: string;
 avatar: string;
 email: string;
 createdAt?: any; // Optional for sorting
}

interface UserListProps {
 onChatSelect?: (chatId: string) => void; // Optional callback for navigation
}

const UserList: React.FC<UserListProps> = ({ onChatSelect }) => {
 const { currentUser, isLoading } = useSelector((state: RootState) => state.user);
 const [users, setUsers] = useState<User[]>([]);
 const [loadingUsers, setLoadingUsers] = useState(true);
 const [error, setError] = useState<string>('');
 const [creatingChat, setCreatingChat] = useState<string>(''); // Track which chat is being created

 useEffect(() => {
  // Only fetch users if the current user is authenticated and data is loaded
  if (!currentUser || isLoading) {
   // If not ready, stop the loading state here.
   setLoadingUsers(false);
   return;
  }

  try {
   // Create a query to get all users except the current user
   const q = query(
    collection(db, "users"),
    where("id", "!=", currentUser.id),
   );

   // Set up a real-time listener for the user list
   const unsub = onSnapshot(
    q, 
    (querySnapshot) => {
     const usersArray: User[] = [];
     querySnapshot.forEach((doc) => {
      usersArray.push({
       id: doc.id,
       ...doc.data()
      } as User);
     });
     setUsers(usersArray);
     setLoadingUsers(false);
     setError('');
     console.log("Users fetched:", usersArray);
    },
    (error) => {
     console.error("Error fetching users:", error);
     setError("Failed to load users");
     setLoadingUsers(false);
    }
   );

   // Clean up the listener when the component unmounts
   return () => {
    unsub();
   };
  } catch (err) {
   console.error("Error setting up user listener:", err);
   setError("Failed to load users");
   setLoadingUsers(false);
  }
 }, [currentUser, isLoading]);

 const createNewChat = async (otherUser: User) => {
  if (!currentUser || creatingChat) return;
  
  setCreatingChat(otherUser.id);
  
  try {
   const chatIds = [currentUser.id, otherUser.id].sort();
   const chatId = chatIds.join("_");
   const chatDocRef = doc(db, "chats", chatId);
   const chatDocSnap = await getDoc(chatDocRef);

   if (!chatDocSnap.exists()) {
    // Create new chat document
    await setDoc(chatDocRef, {
     messages: [],
     createdAt: new Date(),
     participants: [currentUser.id, otherUser.id]
    });

    const currentUserDocRef = doc(db, "userchats", currentUser.id);
    const otherUserDocRef = doc(db, "userchats", otherUser.id);
    
    // Ensure userchats documents exist for both users, creating if they don't
    await setDoc(currentUserDocRef, { chats: [] }, { merge: true });
    await setDoc(otherUserDocRef, { chats: [] }, { merge: true });

    const chatData = {
     chatId,
     lastMessage: "",
     receiverId: otherUser.id,
     receiverInfo: {
      username: otherUser.username,
      avatar: otherUser.avatar
     },
     updatedAt: Date.now(),
    };

    const otherUserChatData = {
     chatId,
     lastMessage: "",
     receiverId: currentUser.id,
     receiverInfo: {
      username: currentUser.username,
      avatar: currentUser.avatar
     },
     updatedAt: Date.now(),
    };

    await updateDoc(currentUserDocRef, {
     chats: arrayUnion(chatData),
    });

    await updateDoc(otherUserDocRef, {
     chats: arrayUnion(otherUserChatData),
    });
   }

   // Navigate to the chat if callback is provided
   if (onChatSelect) {
    onChatSelect(chatId);
   }

  } catch (err) {
   console.error("Error creating new chat:", err);
   setError("Failed to create chat");
  } finally {
   setCreatingChat('');
  }
 };

 // Loading state
 if (isLoading || loadingUsers) {
  return (
   <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    <span className="ml-3 text-gray-600">Loading users...</span>
   </div>
  );
 }

 // Error state
 if (error) {
  return (
   <div className="p-4 text-center">
    <p className="text-red-500 mb-2">{error}</p>
    <button 
     onClick={() => window.location.reload()} 
     className="text-blue-500 hover:underline text-sm"
    >
     Retry
    </button>
   </div>
  );
 }

 // Empty state
 if (users.length === 0) {
  return (
   <div className="p-8 text-center">
    <div className="text-gray-400 mb-2">
     <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
     </svg>
    </div>
    <p className="text-gray-500">No other users found.</p>
    <p className="text-gray-400 text-sm mt-1">New users will appear here automatically.</p>
   </div>
  );
 }

 return (
  <div className="space-y-2">
   <h3 className="text-lg font-semibold text-gray-800 mb-4">Start a Chat</h3>
   {users.map((user) => (
    <div
     key={user.id}
     className={`
      flex flex-row items-center gap-4 p-3 rounded-2xl px-4 cursor-pointer 
      transition-all duration-200 transform hover:scale-[1.02]
      ${creatingChat === user.id 
       ? 'bg-blue-100 cursor-wait' 
       : 'bg-[#F7F7F8] hover:bg-gray-200 hover:shadow-md'
      }
     `}
     onClick={() => createNewChat(user)}
    >
     <div className="relative">
      <Image 
       src={user.avatar} 
       alt={user.username} 
       width={40} 
       height={40} 
       className="rounded-full object-cover border-2 border-gray-200" 
       onError={(e) => {
        // Fallback if image fails to load
        const target = e.target as HTMLImageElement;
        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=random`;
       }}
      />
      {creatingChat === user.id && (
       <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-full">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
       </div>
      )}
     </div>
     <div className="flex-1 min-w-0">
      <h3 className="text-base font-bold text-gray-800 truncate">
       {user.username}
      </h3>
      <p className="text-xs text-gray-500 truncate">
       {user.email}
      </p>
     </div>
     <div className="text-gray-400">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
     </div>
    </div>
   ))}
  </div>
 );
};

export default UserList;
