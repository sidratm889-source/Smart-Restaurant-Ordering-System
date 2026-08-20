import React from "react";

type Props = {
 toggleMenu: () => void;
}


 
    export default function AdminHeader({toggleMenu}: Props){
    return (
        <header className = " z-index bg-[#202023ec]  fixed top-0 left-0 right-0 z-50 text-white gap-10 relative flex items-center justify-center min-h-[80px] px-4">
        <button onClick = {toggleMenu} ><img src = "/icons8-menu-bar-30.png" alt = "menu" className = " w-[45px] h-[40px] mr-80" ></img> </button>
        <h2 className = " text-white text-2xl  mr-10 justify-between">Admin Dashboard</h2>
        <h3 className = "text-white text-1xl ml-100">Maham Roy</h3>      
        </header>
    );

}