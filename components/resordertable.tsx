
"use client";

import React from "react";

type OrderItem = {
  id?: string | number;
  name?: string;
  quantity?: number;
  price?: number;
};

type Order = {
  id?: string;
  orderId?: string;
  email?: string;
  fullName?: string;
  cart?: OrderItem[];
  grandTotal?: number;
  selected?: string;
  phoneNumber?: string;
  address?: string;
};


export default function ResOrderTable({
  orders,
  onSelectOrder,
}: {
  orders?: Order[];
  onSelectOrder: (order: Order) => void;
}) {
  return (
    <div>
      <table className="ml-65 w-200 mt-80">
        <thead className="text-black bg-gray-300 ">
          <tr>
            <th className="p-2">Order Id</th>
             <th className="p-2">Email</th>
            <th className="p-2">Item</th>
            <th className="p-2">Qty</th>
            <th className="p-2">Price</th>
            <th className="p-2">Grand Total</th>
               <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody className="bg-gray-100">
          {orders?.map((order) => (
            <tr className="border-b border-gray-400" key={order.id ?? order.orderId ?? Math.random()}>
              <td
                className="p-2 cursor-pointer text-blue-600 hover:underline"
                onClick={() => onSelectOrder(order)}
              >
                {order.orderId}
              </td>
              <td className = "p-2 cursor-pointer text-blue-600">
                {order.email}
              </td>
             
              <td className="p-2">
                {order.cart?.map((item: OrderItem, index: number) => (
                  <div key={item.id ?? index}>{item.name}</div>
                ))}
              </td>
              <td className="p-2">
                {order.cart?.map((item: OrderItem, index: number) => (
                  <div key={item.id ?? index}>{item.quantity}</div>
                ))}
              </td>
              <td className="p-2">
                {order.cart?.map((item: OrderItem, index: number) => (
                  <div key={item.id ?? index}>${item.price?.toFixed?.(2) ?? item.price}</div>
                ))}
              </td>
              <td className="p-2">${order.grandTotal}</td>
              
              </tr>
            ))}
        </tbody>
      
          
      </table>
    </div>
  );
}
