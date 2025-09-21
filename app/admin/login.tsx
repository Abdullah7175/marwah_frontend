import { useEffect } from "react";


export default function Login(){

    

    useEffect(()=>{
        window.open('/dashboard/home');
    },[])



   return(<div className="w-full flex bg-white">hello</div>) 
}