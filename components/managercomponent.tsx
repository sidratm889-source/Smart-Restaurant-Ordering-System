

"use client";
import React from "react";
import {useState, useEffect, useMemo} from "react";
import{collection, onSnapshot,  doc, updateDoc, orderBy, query, where} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { serverTimestamp } from "firebase/firestore";

type OrderItem = {
    name?: string;
    quantity: number;
  };
type Order = {
   id?: string,
   orderId: string,
   cart?: OrderItem[],
   createdAt: {seconds: number};
   kitchenStatus?: string 
}



    export default function ManagerComponent(){
        const[orders, setOrders] = useState<Order[]>([]);
        useEffect(() => {
            const q = query(collection(db, "orders"),
        orderBy("createdAt", "desc"));
        const unsub = onSnapshot(q, (snapshot) =>{
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setOrders(data as Order[]);
        });
        return () => unsub();
    }, []);
    const todayOrders = useMemo(() => {
        if (!orders?.length) return [];
    
        const today = new Date().toDateString();
    
        return orders.filter((order) => {
          const orderDate = order.createdAt
            ? new Date(order.createdAt.seconds * 1000)
            : null;
            const statusValue = (order.kitchenStatus || "").toLowerCase();
    const shouldShow = ["preparing", "pickup", "delivered"].includes(statusValue);

    return orderDate?.toDateString() === today && shouldShow;
            
      
        });
      }, [orders]);
        
        return(
          
            <div className = "space-y-4 space-x-4">
            

              
               {todayOrders.length === 0 ? (
                <div  style={{ fontFamily: 'Poppins, sans-serif' }} className = "flex justify-center items-center h-15 w-90 mt-50 ml-70 bg-red-800 rounded-md ">
                  <p className = "text-white text-md font-medium">
                    No orders yet
                  </p>
                  </div>
               ):(
                
                todayOrders.map((order) => (
                    <div key = {order.id}  style={{ fontFamily: 'Poppins, sans-serif' }} className = "border p-4 mb-1 mt-40  w-[1000px]  bg-black text-white rounded-md">
                        <div className="flex justify-between mb-2">
                        <h2 className = "font-bold">{order.orderId}</h2>
                        </div>
                        <div className = "mb-2">
                            {order.cart?.map((item, i) => (
                                <div key = {i} className = "flex justify-between border-b py-1">
                                    <span >{item.name}</span>
                                    <span>Qty: {item.quantity}</span>
               
            <p className="font-semibold mb-1 text-red-800">
  Status: <span className="font-semibold ">{order.kitchenStatus || "Received"}</span>
</p>
          
          
                        </div>
                            ))}
                            </div>
                            
                
        </div>
        
                
                
    ))
  )}
  
    </div>
  
  
    )}
