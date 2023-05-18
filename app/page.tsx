'use client'
import { signIn, signOut, useSession } from "next-auth/react"

export default function Home() {
  let email = "thebryan0210@gmail.com"
  const {data: session, status} = useSession();

  if(status === 'loading'){
    return <div>Loading...</div>
  }

  if(session){
    return (
      <div>
        Hello, {session.user?.email ?? session.user?.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  } else {
    return (
      <div>
        You are not logged in! <br />
        <button onClick={() => signIn('email', {email})}>Sign in</button>
      </div>
    );
  }
}
