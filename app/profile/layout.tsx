'use client' 
import { useSession } from "next-auth/react" 
import { useRouter } from "next/navigation"; 

export default function RootLayout({ children}: { children: React.ReactNode }) { 
    const router = useRouter(); 
    console.log(router); 
    const {data: session, status} = useSession(); 
    if(status=='loading'){ 
        return <>Loading...</> 
    } 
    if(session){ 
        return <> 
            <h3>Bienvenido {session.user?.name} </h3> 
            {children} 
        </> 
    }else{ 
        return <>
            <button type="button" onClick={() => router.push('/')}>
                Dashboard
            </button>
        </>
    } 
} 