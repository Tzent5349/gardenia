import { Progress } from "@/components/ui/progress";

import { useEffect, useState } from "react";

export default function ScrollProgress (){

    useEffect(()=>{

        const handleScroll = ()=>{
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollY = window.scrollY;
            
            const scrollPercent = (scrollY / (documentHeight - windowHeight))*100 
    
            setScrollPercentage(scrollPercent)
            console.log(scrollPercent)
        }
    
    
        window.addEventListener("scroll", handleScroll);
    
        return()=>{
            window.removeEventListener("scroll", handleScroll)
        }
    
      },[])
    const [scrollPercentage, setScrollPercentage] = useState(0);
    return(
        <>
        <Progress value={scrollPercentage}/>
        </>
    )
}