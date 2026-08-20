import ResOrderTable from "./resordertable";
import { useMemo } from "react";


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

export default function OrderContainer({orders}: {orders?: Order[];}){
    const todayOrders = useMemo(() => {
        if (!orders?.length) return [];
        const today = new Date().toDateString();
        return orders.filter((order) => {
          const orderDate = order.createdAt ? new Date(order.createdAt.seconds * 1000) : null;
          return orderDate?.toDateString() === today;
        });
      }, [orders]);
    
    
    const status = useMemo(() => {
        return{
        todayOrders: todayOrders.length,
        received: todayOrders.filter((order) => order.status?.toLowerCase() === "received").length,
        preparing: todayOrders.filter((order) => order.status?.toLowerCase() === "preparing").length,
        pickup: todayOrders.filter((order) => order.status?.toLowerCase() === "pickup").length,
        delivered: todayOrders.filter((order) => order.status?.toLowerCase() === "delivered").length,


    };
}, [todayOrders]);

    return (
       
        <div className = "flex gap-4 p-4 flex-wrap flex-cols-5 w-full mt-12">
            <div className = "w-45 h-20 bg-white  rounded-md p-3 shadow-md border-l-2 border-orange-500">
                <h2 className = "text-1xl font-semibold pt-0 ml-2 ">Today Orders</h2>
                <p className = "text-2xl  ml-4 text-gray-700 font-semibold">{status.todayOrders}</p>
            </div>
             <div className = "w-45 h-20 bg-white  rounded-md p-3 shadow-md border-l-2 border-blue-600">
                <h2 className = "text-1xl font-semibold text-gray-600 ml-3">Received</h2>
                <p className = "text-2xl ml-4 font-semibold text-gray-700">{status.received}</p>
            </div>
             <div className = "w-45 h-20 bg-white rounded-md p-3 shadow-md border-l-2 border-blue-400">
                <h2 className = "text-1xl font-semibold text-gray-600">Preparing</h2>
                <p className = "text-2xl font-semibold text-gray-700">{status.preparing}</p>
            </div>
             <div className = "w-45 h-20 bg-white rounded-md p-3 shadow-md border-l-2 border-purple-400">
                <h2 className = "text-1xl font-semibold text-gray-600">Pickup</h2>
                <p className = "text-2xl font-semibold  text-gray-700">{status.pickup}</p>
            </div>
            <div className = "w-45 h-20 bg-white rounded-md p-3 shadow-md border-l-2 border-green-700">
                <h2 className = "text-1xl font-semibold text-gray-600">Delivered</h2>
                <p className = "text-2xl font-semibold text-gray-700">{status.delivered}</p>
            </div>
            
        </div>
       
    )
}