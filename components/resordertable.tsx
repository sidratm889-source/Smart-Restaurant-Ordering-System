
"use client";

import React from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {useState, useMemo} from "react";

type OrderItem = {
  id?: string | number;
  name?: string;
  quantity?: number;
  price?: number;
  GrandTotal: number;
  status: string;
};

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
};

export default function ResOrderTable({ orders, onSelectOrder, }: { orders?: Order[]; onSelectOrder: (order: Order) => void; }) {
  // Debug: log order statuses to help diagnose missing buttons
  const [selectedStatus, setSelectedStatus] = useState<"all" | "received" | "preparing" | "pickup" | "delivered">("all");
 
  if (process.env.NODE_ENV !== "production") {
    console.log(
      "ResOrderTable statuses:",
      orders?.map((order) => ({ id: order.id ?? order.orderId, status: order.status }))
    );
  }
  const updateStatus  = async(orderId: string | undefined, newStatus: string) => {
    if(!orderId) return;
    try{
      const ref = doc(db, "orders", orderId);
      await updateDoc(ref,{
        status: String(newStatus).toLowerCase(),
      });
    }catch(err){
      console.error("updatemanagerStatus failed:", err);
    }
  };


  const todayOrders = useMemo(() => {
    if (!orders?.length) return [];
    const today = new Date().toDateString();
    return orders.filter((order) => {
      const orderDate = order.createdAt ? new Date(order.createdAt.seconds * 1000) : null;
      return orderDate?.toDateString() === today;
    });
  }, [orders]);

  const todayActiveOrders = useMemo(() => {
    return todayOrders.filter(
      (order) => order.status?.toLowerCase() !== "delivered"
    );
  }, [todayOrders]);

  const todayDeliveredOrders = useMemo(() => {
    return todayOrders.filter(
      (order) => order.status?.toLowerCase() === "delivered"
    );
  }, [todayOrders]);

  const deliveredOrders = useMemo(() => {
    return orders?.filter((order) => order.status?.toLowerCase() === "delivered") ?? [];
  }, [orders]);

  const tableData = useMemo(() => {
    if (selectedStatus === "all") return todayActiveOrders;
    if (selectedStatus === "delivered") return deliveredOrders;
    return todayActiveOrders.filter(
      (order) => order.status?.toLowerCase() === selectedStatus
    );
  }, [selectedStatus, todayActiveOrders, deliveredOrders]);

      
  return (
        
                   
      
      
               
        <div style={{ fontFamily: 'Poppins, sans-serif' }}  className=" mt-25 mb-5    rounded-md border-gray-800 ">
        
            <div style={{ fontFamily: 'Poppins, sans-serif' }} className= "flex   mt-5  mb-2  gap-2 bg-gray-100 items-center w-[770px] h-[60px] rounded-md">
            <button  onClick = {() => setSelectedStatus("all")} className =  { `rounded-sm w-25 h-10 ml-5  border border-gray-300 cursor-pointer ${selectedStatus === "all" ? " hover: transition-all duration-200 ease-in-out hover:-translate-y-1  bg-sky-600 text-white" : "text-gray-500 bg-white"}`}>All</button>
            <button onClick = {() => setSelectedStatus("received")} className = {`rounded-sm  border border-gray-300 w-30 h-10 cursor-pointer ${selectedStatus === "received" ? "text-white cursor-pointer hover: tr ansition-all duration-200 ease-in-out hover:-translate-y-1 bg-sky-600": " text-gray-500 bg-white"}`}>Received</button> 
          
           
            <button onClick = {() => setSelectedStatus("preparing")} className = {`rounded-sm w-30 h-10  border border-gray-300 cursor-pointer ${selectedStatus === "preparing"? "text-white cursor-pointer hover:transition-all duration-200 ease-in-out hover:-translate-y-1  bg-sky-600": "text-gray-500 bg-white"}`}>Preparing</button> 
            
           
            <button onClick = {() => setSelectedStatus("pickup")} className = {`rounded-sm w-30 h-10  border border-gray-300 cursor-pointer ${selectedStatus === "pickup" ? "text-white  hover:transition-all duration-200 ease-in-out hover:-translate-y-1  bg-sky-600": "text-gray-500 bg-white"}`}>Pickup</button> 
           
            
            <button onClick = {() => setSelectedStatus("delivered")} className = {`rounded-sm w-30 h-10  border border-gray-300 cursor-pointer ${selectedStatus === "delivered" ? "text-white hover: transition-all duration-200 ease-in-out hover:-translate-y-1  bg-sky-600": "text-gray-500 bg-white"}`}>Delivered</button> 
         </div>
        
           <table className = " text-sm border-collapse  w-[700px]  border-gray-400">
           <thead className = "text-black bg-gray-50">
          <tr className = "text-gray-500">
            <th className="px-4 py-3 text-left font-semibold">Order Id</th>
             <th className="px-3 py-3 text-left">Email</th>
            <th className="px-3 py-3 text-left">Item</th>
            <th className="px-3 py-3 text-center pl-9">Qty</th>
            <th className="px-3 py-3 text-center pl-13">Price</th>
            <th className="px-2 py-2 text-center">Grand Total</th>
               <th className="px-3 py-3 text-center">Status</th>
               
          </tr>
        </thead>
        <tbody  style={{ fontFamily: 'Poppins, sans-serif' }} className="bg-white text-sm">
         
          {tableData?.map((order) => {
            const status = String(order.status ?? "received").toLowerCase();
            return (
            <tr className="border-b  h-8 border-gray-400" key={order.id ?? order.orderId }>
              <td
                className="px-2 py-2 text-left pr-10 cursor-pointer text-blue-600 hover:underline"
                onClick={() => onSelectOrder(order)}
              >
                {order.orderId}
              </td>
              <td className="px-2 py-2 text-left cursor-pointer">
                {order.email}
              </td>
             
              <td className="px-2 py-2 text-left ">
                {order.cart?.map((item: OrderItem, index: number) => (
                  <div  key={item.id ?? index}>{item.name} </div>
                ))}
              </td>
              <td className="px-2 py-2 text-left pl-10">
                {order.cart?.map((item: OrderItem, index: number) => (
                  <div key={item.id ?? index}>{item.quantity}</div>
                ))}
              </td>
              <td className="px-2 py-2 text-left pl-15">
                {order.cart?.map((item: OrderItem, index: number) => (
                  <div key={item.id ?? index}>${item.price?.toFixed?.(2) ?? item.price}</div>
                ))}
              </td>
              <td className="px-2 py-2 text-right pr-10">${order.grandTotal}</td>
              
              <td className="px-2 py-2 text-left">{status}</td>

              <td className="px-2 py-2 text-left">
                {status === "received" && (
                  <button
                    onClick={() => updateStatus(order.id ?? order.orderId, "preparing")}
                    className = "w-20 h-10 bg-blue-500 rounded-md text-white"
                  >
                    Preparing
                  </button>
                )}

                {status === "preparing" && (
                  <button
                    onClick={() => updateStatus(order.id ?? order.orderId, "pickup")}
                    className="w-20 h-10 bg-purple-500 rounded-md text-white"
                  >
                    Pickup
                  </button>
                )}

                {status=== "pickup" && (
                  <button
                    onClick={() => updateStatus(order.id ?? order.orderId, "delivered")}
                    className="w-20 h-10 bg-green-800 rounded-md text-white"
                  >
                    Delivered
                  </button>
                )}

                
              </td>
           
              </tr>
            )
            })}
          
        </tbody>
      
        
      </table>
      </div>
  
  
   
  );
}
