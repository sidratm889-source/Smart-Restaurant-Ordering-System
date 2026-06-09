import React from "react";
export default function LiveDemo(){
    return(
        <section id = "livedemo">
        <main className = "bg-black min-h-[700px] rounded-s mx-auto mt-5">

          <h1 className = "text-white text-2xl text-center p-2 font 'Montserrat' ">Real-time preview</h1>
          <h2 className = "text-red-700 text-4xl text-center p-2">Watch RestoPro in action</h2>
          <p className = "text-white text-1xl text-center font 'Montserrat'"> A true demo restaurant. See how it operates by clicking around.</p>
       
       <img src="/scbella.PNG" className="w-210 h-120 mx-auto mt-8" alt="Live demo preview"></img>

         
          
        </main>
        </section>

    )
}