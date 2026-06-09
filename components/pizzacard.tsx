"use client";
import { Router } from "lucide-react";
import {useCart} from "./cartcontext";
import { useRouter } from "next/navigation";


export default function PizzaCard(){
    const{addToCart} = useCart();
    const router = useRouter();
    const items = [
        {id: "1", name: "Margherita ",price: 8, image: "/margehrita pizza.png", description: "A classic favorite with tomato sauce, mozzarella, and basil", ingredient: "Tomato Sauce,Mozzarella Cheese,Fresh Basil,Extra-Virgin Olive Oi",},
        {id: "2", name: "Pepperoni",  price: 9, image: "/pepperoni pizza.png",description: "Cheesy, smoky, slightly spicy",},
        {id: "3", name: "Sausage",price: 10, image: "/sausage pizza.png", description: "Meaty, juicy, flavorful", },
        {id: "4", name: "Tandoori Chicken,", price: 11, image: "/tandoori chicken.png",description: "Smoky, spicy, creamy, and rich.", },
        {id: "5", name: "Catupiry", price: 12, image: "/catupiry pizza.png",description: "Creamy, cheesy, smooth, and savory", },
         {id: "6", name: "Italian Margherita",price: 13, image: "/pizza margherita italian.png", description: "Fresh, light, cheesy, Italian taste", },
        

    ]

    return(
        <div>
            <h2 className = "text-3xl font-bold mt-20 ml-20">🍕 Pizza</h2>
              <div  className = "grid grid-cols-4 gap-4 mt-10 ">
                {items.map((item) =>(
            <div onClick = {() => router.push(`/app/resdashboard/pizzadetail/${item.id}`)} key = {item.id} className = "w-70 h-85 bg-red-800 rounded-md mt-20 ml-20">
                <img className = "w-70 h-55 bg-black rounded-md" src = {item.image} />
            <h2 className = "text-1xl font-bold mt-2 ml-6 bg-red-800 text-white">{item.name}</h2>
            <p className = "text-sm text-white ml-6 text-gray-300">{item.description}</p>
                      
            <button 
              onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image })}
              className = "bg-black text-white px-4 py-2 rounded-md ml-30 mt-0 w-30 h-10"
            >
              Add to Cart
            </button>
          </div>
        ))}
</div>
</div>
    )
}