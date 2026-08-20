"use client";

import {useCart} from "./cartcontext";
import router, { useRouter } from "next/navigation";
import {useMenu} from "./menucontext";
export default function Deals(){
    const { addToCart } = useCart();
    const router = useRouter();
    const{items} = useMenu();

    const deals = items.filter(
      (item: any) => item.category?.toLowerCase() === "deals"
    );
    return(
        
     <div>
            <h2 className = "text-4xl font-bold mt-16 ml-20"> Deals</h2>
              <div className = "grid grid-cols-4 gap-4 mt-10">
                {deals.map((item: any) => (

            <div onClick = {()=> router.push(`/app/resdashboard/dealdetails/${item.id}`)} key = {item.id} className = "w-70 h-90 bg-red-800 rounded-md mt-20 ml-20">
                <img className = "w-70 h-55 bg-black rounded-md" src = {item.image} />
            <h2 className = "text-1xl font-bold mt-2 ml-6 bg-red-800 text-white">{item.name}</h2>
            <p className = "text-sm text-white ml-6 text-gray-300">{item.description}</p>
            <p className = "text-sm text-white ml-6 text-gray-300">${item.price.toFixed(2)}</p>
            <button onClick={(e) => {e.stopPropagation();   addToCart({id: item.id, name: item.name, price: item.price, image: item.image })}} className = "bg-black text-white px-4 py-2 rounded-md ml-30 mt-0 w-30 h-10" >Add to Cart</button>
            </div>
                ))}
                </div>
                </div>
    )
}