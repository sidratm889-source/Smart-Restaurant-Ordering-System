"use client";
import Link from "next/link";

type Props ={
    isOpen: boolean;
    toggleMenu: () => void;
}


export default function ManagerSidePanel({isOpen, toggleMenu}: Props){
    return(
        
        isOpen&&(
            <aside className = "bottom: 0 z-index bg-black text-white h-full h-screen w-60 ">
                <div>
                    <h2 className = "p-8 mt-20 ml-6">OVERVIEW</h2>
                    <Link  className = "ml-5 p-1 flex items-center gap-2" href = "/resmanager/dashboard"><img src = "/icons8-dashboard-48.png" className = "w-5 h-5" alt="Dashboard icon" />Dashboard</Link><br></br>
                    <Link className= "ml-5 p-1 flex items-center gap-2" href = "/resmanager/resorders"><img src = "/clipboard (1).png" className = "color-white w-5 h-5" alt="Orders icon" />Orders</Link><br></br>

                </div>
                <div>
                    <h2 className = "p-4 ml-3">Menu</h2>
                    <Link className = "ml-5 p-1 flex items-center gap-2" href = "/resmanager/menumanagement" ><img src = "/skills.png" className = "w-5 h-5" alt="Report icon" />Menu Management</Link>
                </div>
                <div>
                    <h2 className = "p-4 ml-3">Staff</h2>
                    <Link className= "ml-5 p-1 flex items-center gap-2" href = "/resmanager/employee"><img src = "/chef.png" className = "w-5 h-5" alt="Report icon" /> Kitchen Staff</Link><br></br>
                                                              
                </div>
                <div>
                    <h2>Setting</h2>
                    <Link className= "ml-5 p-1 flex items-center gap-2" href = "/resmanager/setting"><img src = "/setting.png" className = "w-5 h-5" alt="Report icon" />Settings</Link><br></br>
                                 
                </div>
            </aside>
            
        )
        
    )

}



