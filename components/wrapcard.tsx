
"use client";
import {useCart} from "./cartcontext";
import { useRouter } from "next/navigation";

export default function WrapCard(){
    const {addToCart} = useCart();
    const router = useRouter();

    const items = [
        { id: "wrap-shawarma", name: "Wrap Shawarma", price: 4, image: "/chicken wrap.png" },
        { id: "shawarma-kebab", name: "Shawarma Kebab Pita Wrap", price: 5, image: "/wrap.png" },
        { id: "fajita-burrito", name: "Fajita Burrito", price: 7, image: "/Wrap Fajita Burrito Shawarma.png" },
        { id: "tandoori-wrap", name: "Tandoori Chicken", price: 8, image: "/Tandoori chicken Wrap.png" },
    ];

    return(
        <div>
            <h2 className = "text-3xl font-bold mt-20 ml-20">🌯 Wraps</h2>
              <div className = "grid grid-cols-4 gap-4 mt-10 ">
                {items.map((item) => (
                  <div onClick = {() => router.push(`/app/resdashboard/wrapdetail/${item.id}`)} key={item.id} className = "w-70 h-90 bg-red-800 rounded-md mt-20 ml-20">
                    <img className = "w-70 h-55 bg-black rounded-md" src = {item.image}  />
                    <h2 className = "text-1xl font-bold mt-2 ml-6 bg-red-800 text-white">{item.name}</h2>
                    <p className = "text-sm text-white ml-6 text-gray-300">Delicious and freshly prepared.</p>
                    <p className = "text-sm text-white ml-6 text-gray-300">${item.price.toFixed(2)}</p>
                    <button
                      onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image })}
                      className = "bg-black text-white px-4 py-2 rounded-md ml-30 mt-0 w-30 h-10"
                    >Add to Cart</button>
                  </div>
                ))}
              </div>
        </div>
    )
}
   