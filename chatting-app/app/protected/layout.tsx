// pages/ProtectedLayout.tsx
import { AuthButton } from "@/components/auth-button";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";


export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
   
  return (
    
    <main className="bg-gray-900 text-gray-200 min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-10">
        <nav className="w-full flex justify-center border-b border-b-gray-700 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <h1 className="flex gap-5 items-center font-semibold text-lg text-white">
              <Link href="/">Global Chat</Link>
            </h1>
            <div className="flex items-center gap-3">
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