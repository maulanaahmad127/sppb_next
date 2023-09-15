import { useRouter } from "next/router";
import { useEffect } from "react";

export default function signOut () {
    const router = useRouter();
    
    useEffect(() => {
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        router.push('/signin')
    
      }, [])
  
}