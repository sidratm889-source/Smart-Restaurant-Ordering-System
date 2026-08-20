"use client";
import Link from "next/link";

type Props = {
    isOpen: boolean;
    toggleMenu: () => void;
};
export default function ResSidePanel({isOpen, toggleMenu}: Props){
    return(
        isOpen &&(
            <aside className = "bottom: 0 z-index bg-black text-white h-full h-screen w-60">
                <div>
                <h2 className = "p-8 mt-20 ml-6">OVERVIEW</h2>
                    <Link  className = "ml-5 p-1 flex items-center gap-2" href = "/restaurantadmin/admindashboard"><img src = "/icons8-dashboard-48.png" className = "w-5 h-5" alt="Dashboard icon" />Dashboard</Link><br></br>
                    <Link className= "ml-5 p-1 flex items-center gap-2" href = "/restaurantadmin/orderhistory"><img src = "/clipboard (1).png" className = "color-white w-5 h-5" alt="Orders icon" />Order history</Link><br></br>
                    <Link className= "ml-5 p-1 flex items-center gap-2" href = "/restaurantadmin/salesreport"><img src = " /revenue.png" className = "w-5 h-5" alt="Report icon" />Revenue</Link><br></br>
                </div>
                <div>
                    <h2 className = "p-4 ml-3">Staff</h2>

    <Link className= "ml-5 p-1 flex items-center gap-2" href = "/restaurantadmin/kitchenstaff"><img src = "/chef.png" className = "w-5 h-5" alt="Report icon" /> Kitchen Staff</Link><br></br>
                                                              
                </div>
                <div>
                    <h2>Setting</h2>
                    <Link className= "ml-5 p-1 flex items-center gap-2" href = "/restaurantadmin/setting"><img src = "/setting.png" className = "w-5 h-5" alt="Report icon" />Settings</Link><br></br>
                                 
                </div>
            </aside>
        )
    )}






