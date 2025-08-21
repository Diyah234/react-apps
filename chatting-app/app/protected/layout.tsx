// pages/ProtectedLayout.tsx
"use client"
import { AuthButton } from "@/components/auth-button";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { MdOutlineDarkMode } from "react-icons/md";
import { toggletheme } from "@/lib/redux/features/Theme";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";


export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.theme.darkmode)
  
   
  return (
    
    <main className={`${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'} min-h-screen flex flex-col items-center transition-colors duration-300`}>
      <div className="flex-1 w-full flex flex-col gap-10">
        <nav className="w-full flex justify-center border-b border-b-gray-700 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <h1 className="flex gap-5 items-center font-semibold text-lg text-white">
              <Link href="/">GlobalChat App</Link>
            </h1>
            <div className="flex items-center gap-3">
              <MdOutlineDarkMode onClick={() => dispatch(toggletheme())} className="cursor-pointer text-2xl" />
              {!hasEnvVars ? null : <AuthButton />}
              {/* This is a nice place for a user profile picture or other elements */}
            </div>
          </div>
        </nav>
        <div className="w-full max-w-3xl mx-auto p-4 md:p-6">
          {children}
        </div>
      </div>
    </main>
  );
}