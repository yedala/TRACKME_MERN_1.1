import { useEffect, useRef, useState } from "react";

const useCheckIdleTime = (timeout,logOut)=>{
    const [isActive,setIsActive]=useState(true);
    const lastClickedTimeRef =useRef(Date.now());
    const timeoutRef = useRef(null);

    const resetTimer = ()=>{
        if(timeoutRef.current)clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(()=>{
            const currentTime = Date.now();
            const diff = currentTime - lastClickedTimeRef.current;
            if(diff>timeout){
                setIsActive(false);
                logOut();
            }
        },timeout)
    }
    const handleEvent=()=>{
        lastClickedTimeRef.current = Date.now();
        resetTimer();
    }

    useEffect(()=>{
        const events=['mousemove','mousedown','keydown','touchstart','scroll'];
        events.forEach((event)=>{
            window.addEventListener(event,handleEvent);
        });
        resetTimer();
        

        return ()=>{
            events.forEach((event)=>{
                window.removeEventListener(event,handleEvent);
            });
            if(timeoutRef.current){
                clearTimeout(timeoutRef.current)
            }
        }

    },[timeout,logOut]);

    return isActive;

}

export default useCheckIdleTime;