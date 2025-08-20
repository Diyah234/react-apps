// app/auth/callback/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  console.log("1. GET request received at /auth/callback");

  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  console.log(`2. URL Origin: ${origin}`);
  console.log(`3. Auth Code received: ${code ? 'Yes' : 'No'}`);

  let next = searchParams.get('next') ?? '/protected' 
  // We'll set the default to '/protected' for simplicity, to make sure it's redirecting to the right place.
  if (!next.startsWith('/')) {
    next = '/'
  }

  if (code) {
    console.log("4. Code exists. Creating Supabase server client.");
    const supabase = await createClient()
    
    console.log("5. Attempting to exchange code for session.");
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('*** 🚨 ERROR 🚨 ***:', error.message);
      console.log("6. Redirecting to error page.");
      // Redirect to a specific error page with the code exchange error
      return NextResponse.redirect(`${origin}/auth/auth-code-error?message=${error.message}`)
    }

    console.log("7. Code exchange successful. Preparing final redirect.");
    const forwardedHost = request.headers.get('x-forwarded-host')
    const isLocalEnv = process.env.NODE_ENV === 'development'

    if (isLocalEnv) {
      console.log(`8. Local environment detected. Redirecting to: ${origin}${next}`);
      return NextResponse.redirect(`${origin}${next}`)
    } else if (forwardedHost) {
      console.log(`8. Production environment. Redirecting to: https://${forwardedHost}${next}`);
      return NextResponse.redirect(`https://${forwardedHost}${next}`)
    } else {
      console.log(`8. Production environment. No forwarded host. Redirecting to: ${origin}${next}`);
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  console.log("9. No code found. Redirecting to auth-code-error page.");
  // Redirect to an error page if no code is present
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}