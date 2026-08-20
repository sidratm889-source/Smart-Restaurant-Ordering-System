"use client";
import Link from "next/link";      
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import {db} from "@/lib/firebase";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type OrderItem = {
    id?: string | number;
    name: string;
    quantity: number;
    price: number;
    GrandTotal: number;
    status: string;
  };
  
  type Order = {
    id?: string;
    orderId?: string;
    email: string;
    fullName: string;
    cart?: OrderItem[];
    grandTotal: number;
    status: string;
    createdAt?: { seconds: number };
    selected?: string;
    phoneNumber?: string;
    address: string;
  };
  type Props = {
    orders?: Order[];
    compact?: boolean;
  };
  
export default function SaleChart({compact = false}: Props){
    const [orders, setOrders] = useState<Order[]>([]);
    

    useEffect(() => {
        const unsubOrders = onSnapshot(collection(db, "orders"),
        (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })) as Order[];
            setOrders(data);
    }
);
    return() => {
        unsubOrders();
    };
    
    }, []);
    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
    
      const monthSales = new Array(12).fill(0);
      const currentYear = new Date().getFullYear();
     
    
      orders.forEach((order) => {
        if (!order.createdAt) return;
    
        const date = new Date(order.createdAt.seconds * 1000);
    
        if (date.getFullYear() !== currentYear) return;
    
        monthSales[date.getMonth()] += Number(order.grandTotal || 0);
      });
    
      const chartData = monthNames.map((month, index) => ({
        month,
        sales: monthSales[index],
      }));
    
      return (
        <div className={` mb-20 mt-10   bg-white rounded-md shadow-lg border border-gray-300 ${compact ? "p-6  ": " p-4"}`}>
         
          <h2 className="text-xl font-bold mb-5">
            Monthly Sales ({currentYear})
          </h2>

          <div className={compact ? "h-[250px]" : "h-[300px]" }>
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
    
              <XAxis dataKey="month" />
    
              <YAxis />
    
              <Tooltip />
    
              <Bar
                dataKey="sales"
                fill="#3b82f6"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        
          </div>
       
         
          {compact && ( 
      <div className="mt-4 flex justify-center">
        <Link
          href="/restaurantadmin/salesreport"
          className="bg-red-800 ml-90 mb-0 mt-2 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          View Full →
        </Link>
      </div>
    )}
       

        
         </div>
       
      );
    }
      