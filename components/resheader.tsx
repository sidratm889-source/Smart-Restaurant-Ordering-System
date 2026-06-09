"use client";
import { useRouter } from "next/navigation";
import {useCart} from "./cartcontext";

export default function ResHeader(){
    const router = useRouter();
    const { totalQuantity } = useCart();
    return(
        <div className = "flex flex-col">
            <header className = " bg-gray-200 p-4 h-18 text-left text-2xl">
                <span className = "text-red-800 p-3">Bistro</span><span className = "text-black ">Bliss</span>
                <button type = "button" onClick = {() => router.push("/app/resdashboard/cart")} className = "relative bg-red-800  pr-10 text-white rounded-full w-30 h-10 ml-275 mb-3 ">🛒cart
                 <span className = "relative -right-14 -top-8 inline-flex h-6 w-6  items-center justify-center rounded-full bg-red-600 px-2 text-xs font-bold">
                    {totalQuantity}
                </span>
                </button>
            </header>
        </div>
    )
}
