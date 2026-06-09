import React from "react";
import Link from "next/link";



export default function Header(){
    return(
        
        <header className = " fixed bg-black text-white gap-10 relative flex items-center justify-center min-h-[80px] px-4">
            <nav className = "flex items-center gap-15">
                <Link href = "/#features" className = "Link">Feature</Link>
        
        <Link href = "/#HiW" className = "Link">How it works</Link>
        <Link href = "/#livedemo" className = "Link">Demo</Link>
        </nav>
        <div className = "absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
        <Link href = "/#login"> <button className = "button">Log In</button></Link>
        <Link href = "/#signup-login"><button className = "button">Get Started Free</button> </Link> 
        </div>
        </header>
       
       
        );
}