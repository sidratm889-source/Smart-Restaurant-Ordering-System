"use client";

import {useCart} from "./cartcontext";
import router, { useRouter } from "next/navigation";
export default function Deals(){
    const { addToCart } = useCart();
    const router = useRouter();
    const items = [
        {id: "1", name: "Burger with Wrap Deal", price: 8.99, image: "/burger with wrap deal.png", description: "Juicy burger with a side of fries and a drink.", },
        {id: "2", name: "Four Burger Deal",price: 15.99, image: "/four burger.png", description:"Get four delicious burgers at a discounted price.", },
        {id: "3", name: "Wrap deal",price: 15.00,image: "/wrap deal.png", description: "Delicious wrap with chicken and vegetable with cold drink", },
        {id: "4", name: "Two Pizza Deal", price: 15.99, image: "/two pizza deal.png", description:"Get two delicious pizzas at a discounted price.",},
        {id: "5", name: "Single Peetie Burger with Fries",price: 8.99, image: "/single peetie burger with fries.png", description: "Juicy peetie burger with a side of fries and a drink.",  },
        {id: "6", name: "Burger Fries Deal", price: 8.99, image: "/burger fries deal.png", description: "Juicy burger with a side of fries and a drink.", },



    ]
    return(
        
     <div>
            <h2 className = "text-4xl font-bold mt-16 ml-20"> Deals</h2>
              <div className = "grid grid-cols-4 gap-4 mt-10">
                {items.map((item) => (

            <div onClick = {()=> router.push(`/app/resdashboard/dealdetails/${item.id}`)} key = {item.id} className = "w-70 h-90 bg-red-800 rounded-md mt-20 ml-20">
                <img className = "w-70 h-55 bg-black rounded-md" src = {item.image} />
            <h2 className = "text-1xl font-bold mt-2 ml-6 bg-red-800 text-white">{item.name}</h2>
            <p className = "text-sm text-white ml-6 text-gray-300">{item.description}</p>
            <p className = "text-sm text-white ml-6 text-gray-300">${item.price.toFixed(2)}</p>
            <button onClick={() => addToCart({id: item.id, name: item.name, price: item.price, image: item.image })} className = "bg-black text-white px-4 py-2 rounded-md ml-30 mt-0 w-30 h-10" >Add to Cart</button>
            </div>
                ))}
                </div>
                </div>
    )
}