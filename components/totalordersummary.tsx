  "use client";
  import {useEffect, useState} from "react";
  import { db } from "@/lib/firebase";
 import { onSnapshot, collection, snapshotEqual } from "firebase/firestore";
 import Link from "next/link";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
  } from "recharts";
import { trackAllowedDynamicAccess } from "next/dist/server/app-render/dynamic-rendering";
import OrderSummary from "./ordersummary";
 
  
  type Order = {
    id?: string;
    orderId?: string;
   
    grandTotal?: number;
    status?: string;
    createdAt?: { seconds: number };
  };
  type ChartData = {
    label: string;
    orders: number;
  }  
  type Props = {
    orders?: Order[];
    compact?: boolean;
  }
       export default function TotalOrderSummary({compact = false,}: Props){
        const[orders, setOrder] = useState<Order[]>([]);
        const[selected, setSelected] = useState<"Today" | "Monthly">("Today");
        const[chartData, setChartData] = useState<ChartData[]>([]);
        useEffect(() => {
            const unsubscribe = onSnapshot(collection(db, "orders"),(snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                })) as Order[];
                setOrder(data);
            }
            );
            return () => unsubscribe();

       }, []);
       useEffect(() =>{
    const deliveredOrders = orders.filter((order) => order.status?.toLowerCase() === "delivered");
    const currentDate = new Date();
    if(selected === "Today"){
        const hours = new Array(24).fill(0);
   deliveredOrders.forEach((order) => {
        if (!order.createdAt) return;
       
        const date = new Date(order.createdAt.seconds * 1000);
        if (date.toDateString() !== currentDate.toDateString()) return;
          hours[date.getHours()]++;
   });
       setChartData(
        hours.map((count, index) => ({
       label: `${index}: 00`,
       orders: count,
            
    }))


       );
    
    }

    else if (selected === "Monthly") {
        const daysInMonth = new Date(
            currentDate.getFullYear(),
             currentDate.getMonth() + 1,
             0).getDate();
        
        const monthly = new Array(daysInMonth).fill(0);
     deliveredOrders.forEach((order) => {
        if(!order.createdAt) return;
         const date = new Date(order.createdAt.seconds * 1000);
         const isCurrentMonth = 
            date.getMonth() === new Date().getMonth() &&
            date.getFullYear() === new Date().getFullYear()
            if(!isCurrentMonth)return;
            monthly[date.getDate() - 1]++;
    });

       
    setChartData(
        monthly.map((count, index) => ({
          label: `${index + 1}`,
          orders: count,
        }))
      );
    }
      }, [orders, selected]);
return (
    <div className={`bg-white rounded-md   shadow-lg border border-gray-200 p-6 mt-8 ${compact ? "p-6": "p-4"}` }>

    {/* Header */}
    <div className="flex items-center justify-between mb-6">

      <h2 className="text-2xl font-bold text-gray-800">
        Order Summary
      </h2>

      <div className="flex gap-2">
        <button onClick = {() => setSelected("Today")}
        className = {`px-4 py-2 rounded-md text-white ${
            selected === "Today"
            ? "bg-red-800 text-white"
            : "bg-red-800  text-white bg-red-700"
        }`}
>Today</button>
<button onClick = {() => setSelected("Monthly")}
        className = {`px-4 py-2 rounded-md text-white ${
            selected === "Monthly"
            ? "bg-red-800 text-white"
            : "bg-red-800  text-white bg-red-700"
        }`}
>Monthly</button>
</div>
</div>
<div className = {compact ? "h-[200px]" : "h-[350px]"}>
    <ResponsiveContainer width = "100%" height = "100%">
        <BarChart data = {chartData}
        margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 10,
          }}
        >
        <CartesianGrid 
        strokeDasharray="3 3"
        stroke="#E5E7EB"/>
        <XAxis
        dataKey = "label"
        tick={{
        fontSize: 12,
        fill: "#6B7280",
      }}
    />

    <YAxis
      allowDecimals={false}
      tick={{
        fontSize: 12,
        fill: "#6B7280",
      }}
    />
    <Tooltip cursor = {{fill: "#F3F4F6"}}
    contentStyle={{
        borderRadius: "12px",
        border: "1px solid #E5E7EB",
      }}
    />
    <Bar dataKey = "orders"
    fill= "#3B82F6"
    radius = {[8, 8, 0, 0]}
    barSize={28}
    />
    </BarChart>

    </ResponsiveContainer>
</div>
{compact && (
    <div className = "mt-1 flex justify-center">
        <Link href = "/restaurantadmin/orderhistory"
        className = "bg-red-800 text-white h-10 w-30 text-center mt-2 pt-2 font-semibold  rounded-md ml-65">View Full →</Link>
</div>
)}
</div>
);
       }