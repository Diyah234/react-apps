"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { FaGoogle, FaGithub } from 'react-icons/fa'; // Import icons from react-icons


// This is the Page component that contains the LoginForm
export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}

// This is the enhanced LoginForm component
export function LoginForm() {
  const handleLogin = async (provider: 'github' | 'google') => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error('Login error:', error.message);
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto shadow-lg">
      <CardHeader className="text-center space-y-2 pt-6">
        <CardTitle className="text-3xl font-bold tracking-tight">
          Welcome to GlobalChat App
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Sign in to get started
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 px-6 pb-4">
        <Button 
          onClick={() => handleLogin('github')}
          variant="outline"
          className="w-full flex items-center gap-3 p-6 text-base font-semibold transition-all duration-200 hover:bg-muted"
        >
          <FaGithub className="h-5 w-5" />
          Continue with Github
        </Button>
        <Button 
          onClick={() => handleLogin('google')}
          variant="outline"
          className="w-full flex items-center gap-3 p-6 text-base font-semibold transition-all duration-200 hover:bg-muted"
        >
          <FaGoogle className="h-5 w-5" />
          Continue with Google
        </Button>
      </CardContent>
      <CardFooter className="px-6 pb-6">
        <div className="text-center text-xs text-muted-foreground w-full">
          <p>By continuing, you agree to our <a href="#" className="underline hover:text-foreground">Terms of Service</a> and <a href="#" className="underline hover:text-foreground">Privacy Policy</a>.</p>
        </div>
      </CardFooter>
    </Card>
  );
}