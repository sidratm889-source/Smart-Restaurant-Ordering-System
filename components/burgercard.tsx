
"use client";
import {useCart} from "./cartcontext";
import { useRouter } from "next/navigation";
import {useState} from "react";
import {useMenu} from "./menucontext";


export default function BurgerCard(){
    const { addToCart } = useCart();
    const router = useRouter();
    const{items} = useMenu();
  
  const burgers = items.filter(
    (item: any) => item.category?.toLowerCase() === "burger"
  );
    return(
        
            <div>
            <h2 className = "text-3xl font-bold mt-20 ml-25">🍔 Burger</h2>
              <div  className = "grid grid-cols-4 gap-4 mt-5 ">
                {burgers.map((item: any) => (
            <div onClick ={() => router.push(`/app/resdashboard/burgerdetail/${item.id}`)}  key = {item.id} className = "w-70 h-85 bg-red-800 rounded-md mt-20 ml-20">
                <img className = "w-70 h-55 bg-black rounded-md" src = {item.image} />
            <h2 className = "text-1xl font-bold mt-2 ml-6 bg-red-800 text-white">{item.name}</h2>
            <p className = "text-sm text-white ml-6 text-gray-300"> {item.description}</p>
            <p className = "text-sm text-white ml-6 text-gray-300">${item.price.toFixed(2)}</p>
            <button onClick  = {(e) => {
                e.stopPropagation();
                addToCart({id: item.id, name: item.name,  price: item.price, image: item.image});
            }}
             className = "bg-black text-white px-4 py-2 rounded-md ml-30 mt-0 w-30 h-10">Add to Cart</button>
            </div>
                ))}
                </div>
                </div>
    )
}
             