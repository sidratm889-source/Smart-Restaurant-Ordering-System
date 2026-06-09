import react from "react";

export default function Container(){
    return(   
<div className = "mt-20 grid grid-cols-4 gap-10">
    <div className = "bg-white text-red-800 rounded-md w-50 h-20 ml-10">
        <h2 className = "text-black text-1xl"> Total Restaurants</h2>
        <p>24</p>
        <p className = "text-green-500 text-sm">+2 this 3 week</p>
    </div>
    <div className = "bg-white text-red-800 rounded-md w-50 h-20 ml-10">
        <h2 className = "text-black text-1xl"> Active Restaurants</h2>
        <p>18</p>
        <p className = "text-green-500 text-sm">5 suspended</p>
    </div>
    <div className = "bg-white text-red-800 rounded-md w-50 h-20 ml-10">
        <h2 className = "text-black text-1xl"> Orders Today</h2>
        <p>212</p>
        <p className = "text-green-500 text-sm">+18% vs yesterday</p>
    </div> 
    <div className = "bg-white text-red-800 rounded-md w-50 h-20  ml-5">
        <h2 className = "text-black text-1xl">Platform Revenue</h2>
        <p>$1,840</p>
        <p className = "text-green-500 text-sm">+12% this month</p>
    </div>   
    </div>

    )
}

