"use client";
import Link from "next/link";

type Props = {
    isopen: boolean;
    toggleMenu: () => void;
};

export default function SidePanel({isopen, toggleMenu}: Props){

    return(
        isopen &&(
        <aside className = "   bottom: 0 z-index bg-[#202023ec] text-white  h-full h-screen w-60">
           <div>
              
            <h2 className ="p-8 mr-20 pt-30"> OVERVIEW</h2>
            <Link  className = "ml-5 p-1 flex items-center gap-2" href = "/admin/dashboard"><img src = "/icons8-dashboard-48.png" className = "w-5 h-5" alt="Dashboard icon" />Dashboard</Link><br></br>
              <div className = "flex flex-col">
  

              <Link className = "ml-8"  href = "/admin/Restuarants" onClick = {toggleMenu}>🍽️ Restuarants</Link><br></br>
              <Link className = "ml-8 p-1 flex items-center gap-1" href = "/admin/subscriptions" onClick = {toggleMenu}><img src = "/invoice_12872371.png" className = "w-5 h-5" alt = "subscriptions icon"/>Subscriptions</Link>

              </div>
                              

              <h2 className = "p-4 ml-3">Platform</h2>
             
              <Link className = "ml-7 p-1 flex items-center gap-2" href = "/admin/revenue" onClick = {toggleMenu}><img src =  "/icons8-total-sales-50.png" className = "w-5 h-5" alt = "pending approval"/>Revenue</Link><br></br>
              <Link className = "ml-7 p-1 flex items-center gap-2" href = "/admin/setting" onClick = {toggleMenu}><img src =  "/icons8-settings-50.png" className = "w-5 h-5" alt = "pending approval Setting"/>Setting</Link>   
            </div>
           
          

        </aside> 
        )
        )}



 