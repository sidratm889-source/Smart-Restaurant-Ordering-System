import React from "react";

type Props = {
 toggleMenu: () => void;
}


 
    export default function AdminHeader({toggleMenu}: Props){
    return (
       <div>
            <header className = "z-index fixed top-0 left-0 right-0 z-50 bg-[#1b1b1b]  text-white gap-10 relative flex items-center justify-center min-h-[80px] px-4">
                <button onClick = {toggleMenu} ><img src = "/icons8-menu-bar-30.png" alt = "menu" className = "color-red-800 w-[45px] h-[40px] mr-45" ></img></button>
                <h2 className = " text-white text-1xl  mr-25">Elra Restaurant/Manager Dashboard</h2>
              
        <h3 className = "text-white text-1xl ml-100">Mahira Amir</h3> 
        
        </header>
        </div>
    );

}