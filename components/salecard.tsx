"use client";
import {useState, useEffect} from "react";
import { onSnapshot, snapshotEqual, collection, doc,  } from "firebase/firestore";
import { db } from "@/lib/firebase";



type OrderItem = {
    id?: string | number;
    name?: string;
    quantity?: number;
    price?: number;
    grandTotal: number;
    status: string;
}
type Order = {
    id?: string;
    orderId?: string;
    email?: string;
    fullName?: string;
    cart?: OrderItem[];
    grandTotal?: number;
    status?: string;
    createdAt?: { seconds: number };
    selected?: string;
    phoneNumber?: string;
    address?: string;
  }

   export default function SaleCard(){
    const[orders, setOrders] = useState<Order[]>([]);
   
    useEffect(() => {
        const unsubOrders = onSnapshot(collection(db, "orders"),
        (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Order[];
            setOrders(data)
        }
        );
        return () => {
            unsubOrders();
        };
    }, []);
    const deliveredOrders = orders.filter(
        (order) => order.status === "delivered"
    );
  
   
    
    
    const monthlySales = orders.filter((order) => {
        if(!order.createdAt) return false;
        const date = new Date(order.createdAt.seconds * 1000);
        return(
            date.getMonth() === new Date().getMonth() &&
            date.getFullYear() === new Date().getFullYear()
        );
       })
       .reduce((sum, order) => sum + (order.grandTotal || 0),
       0 );
       const currentYear = new Date().getFullYear();
       const yearlySales = orders.filter((order) => {
        if(!order.createdAt) return false;
        const date = new Date(
            order.createdAt.seconds * 1000
        );
        return date.getFullYear() === currentYear;
        
    })
    .reduce(
        (sum, order) => sum + (order.grandTotal || 0),0
    );
    
    const todaySales = deliveredOrders
    .filter((order) => {
      if (!order.createdAt) return false;

      const orderDate = new Date(
        order.createdAt.seconds * 1000
      );

      return (
        orderDate.toDateString() ===
        new Date().toDateString()
      );
    })
    .reduce(
      (sum, order) => sum + (order.grandTotal || 0),
      0
    );

    


     return (

    <div className = "grid grid-cols-3   mt-20 gap-0">
       <div className = "w-60 h-30 rounded-md bg-red-50 bg-white shadow-md shadow-gray-300">
        <h2 className = "text-1xl pt-4 font-bold ml-4">Today Sales</h2>
        <p className = "text-gray-400 mt-3 text-2xl ml-6 font-bold">${todaySales}</p>
       </div>
       <div className = "w-60 h-30 rounded-md bg-white shadow-md shadow-gray-300">
        <h2 className = "text-1xl font-bold ml-4 pt-4">Monthly Sales</h2>
        <p className = "text-gray-400 text-1xl mt-3 ml-6 font-bold">${monthlySales}</p>
       </div>
       <div className = "w-60 h-30 rounded-md bg-white shadow-md shadow-gray-300">
        <h2 className = "text-1xl font-bold ml-4 pt-4">Yearly Sales</h2>
        <p className = "text-gray-400 mt-3 ml-6 text-1xl font-bold">${yearlySales}</p>
       </div>


    </div>
   
       )
    };
    

    


