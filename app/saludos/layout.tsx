'use client'
import { useSession } from "next-auth/react"

export default function RootLayout({ children}: { children: React.ReactNode }) {
    
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
            <h5>Largate</h5>
        </>
    }
    
}