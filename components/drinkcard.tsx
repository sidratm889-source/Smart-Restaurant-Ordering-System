"use client";
import {useCart} from "./cartcontext";
import router, {useRouter} from "next/navigation";


export default function drinkCard(){
    const { addToCart } = useCart();
    const router = useRouter();
    const items = [
        {id: "lemonade", name: "Lemonade", price: 2.50, image: "/lemon.png", description: "Refreshing and tangy, perfect for a hot day.", },
        {id: "next-cola", name: "Next Cola",price: 2.00, image: "/coc.png", description: "Classic carbonated drink, perfect for any occasion", },
        {id: "mint-lemonade", name: "Mint Lemonade",price: 3.00, image: "/mint.png", description: "Refreshing and aromatic, perfect for a hot day.", },

    ];
    return(
        <div>
            <h2 className = "text-3xl font-bold mt-20 ml-25">🥤 Drinks</h2>
              <div className = "grid grid-cols-4 gap-4 mt-10 ">
                {items.map((item) => (
            <div onClick = {() => router.push(`/app/resdashboard/drinkdetail/${item.id}`)} key = {item.id} className = "w-70 h-90 bg-red-800 rounded-md mt-20 ml-20">
                <img className = "w-70 h-55 bg-white border rounded-md" src = {item.image}  />
            <h2 className = "text-1xl font-bold mt-2 ml-6 bg-red-800 text-white">{item.name}</h2>
            <p className = "text-sm text-white ml-6 text-gray-300">{item.description}</p>
            <p className = "text-md text-white ml-6 text-gray-300">${item.price.toFixed(2)}</p>
            <button onClick={() => addToCart({id: item.id, name: item.name, price: item.price, image: item.image })}  className = "bg-black text-white px-4 py-2 rounded-md ml-30 mt-0 w-30 h-10">Add to Cart</button>
            </div>
                ))}
                </div>
                </div>
    )
}