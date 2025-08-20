"use client";


import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/dist/server/api-utils";


export function LoginForm() {

   const handleLogin = async (provider: 'github' | 'google') => {
     const supabase = createClient();
     const { error } = await supabase.auth.signInWithOAuth({
       provider: provider,
      options: {
        // This is the key change: we redirect to a specific callback page
        redirectTo: `${window.location.origin}/auth/callback`,
      },
     });
 
     if (error) {
       console.error('Login error:', error.message);
     } 
   };

  return (
    <div className='' >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Diyah App</CardTitle>
          <CardDescription>
             <Button onClick={() => handleLogin('github')}>Login with Github</Button>
      <Button onClick={() => handleLogin('google')}>Login with Google</Button>
          </CardDescription>
        </CardHeader>
        <CardContent>
        
        </CardContent>
      </Card>
    </div>
  );
}
