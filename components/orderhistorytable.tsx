"use client";

import React from "react";
import { doc, updateDoc, snapshotEqual, onSnapshot, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {useState, useMemo, useEffect} from "react";
import * as XLSX  from "xlsx";
import { saveAs } from "file-saver";
import { itemAxisPredicate } from "recharts/types/state/selectors/axisSelectors";

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
  status: string;
};
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
}


     export default function OrderHistoryTable(){
        const[orders, setOrders] = useState<Order[]>([]);
        useEffect(() => {
            const unsub = onSnapshot(collection(db, "orders"),
            (snapshot) => 
            {
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Order[];
                setOrders(data);
            }
        );              
        return () => unsub();
        }, []);
        const deliveredOrders = orders.filter(
            (order) => order.status === "delivered"
        );
           const downloadExcel = () => {
            const report = orders.flatMap((order) => 
              (order.cart?? []).map((item) => ({
              orderId: order.orderId,
              email: order.email,
              name: item.name,
              quantity: item.quantity,
              price: item.price,
              grandTotal: order.grandTotal,


            })));
          
            const worksheet = XLSX.utils.json_to_sheet(report);
            const workbook  = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(
              workbook,
              worksheet,
              "Sales Report"
            );
          const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
          });
          const file = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          saveAs(file, "Sales_Report.xlsx");
        };
          



        return(
        
            <div>
              <div>
              <button onClick = {downloadExcel} className = "bg-red-800 rounded-md w-35 h-10 text-white  mt-10">Download Excel</button>
                 <table className=" w-[900px]  mt-20 border-collapse rounded-md">
                 <thead className = "text-gray-600 bg-gray-200 pr-20  rounded-md">
          <tr>
            <th className="p-2 pr-5">Order Id</th>
             <th className="p-2 ">Email</th>
            <th className="p-2 ">Item</th>
            <th className="p-2 ">Qty</th>
            <th className="p-2 pl-10 ">Price</th>
            <th className="p-2 ">Grand Total</th>
               
          </tr>
        </thead>
        <tbody className="bg-white text-sm">
         
          {deliveredOrders.map((order) => (
            
            
            <tr className="border-b border-gray-400 " key={order.id ?? order.orderId ?? Math.random()}>
              <td
                className="p-2 pr-10  cursor-pointer text-blue-600  hover:underline pl-15"
                
              >
                {order.orderId}
              </td>
              <td className = "p-2 cursor-pointer">
                {order.email}
              </td>
             
              <td className="p-2 pl-10">
                {order.cart?.map((item: OrderItem, index: number) => (
                  <div  key={item.id ?? index}>{item.name} </div>
                ))}
              </td>
              <td className="p-2 pl-5">
                {order.cart?.map((item: OrderItem, index: number) => (
                  <div key={item.id ?? index}>{item.quantity}</div>
                ))}
              </td>
              <td className="p-2 pl-20">
                {order.cart?.map((item: OrderItem, index: number) => (
                  <div key={item.id ?? index}>${item.price?.toFixed?.(2) ?? item.price}</div>
                ))}
              </td>
              <td className="p-2 pl-25">${order.grandTotal}</td>
              
              
              </tr>
          ))}
          </tbody>
                 </table>
                </div>
                </div>
            
        )
     }