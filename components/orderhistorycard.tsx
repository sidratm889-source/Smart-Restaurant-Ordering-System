   "use client";
import { onSnapshot, snapshotEqual, doc, collection} from "firebase/firestore";
   import ResOrderTable from "./resordertable";
   import {useState, useEffect} from "react";
   import { db } from "@/lib/firebase";
import OrderSummary from "./ordersummary";


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

export default function OrderHistoryCard(){
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
   
   const deliveredOrders = orders.filter((order) => order.status === "delivered");
   const monthlyOrders = deliveredOrders.filter((order) => {
    if(!order.createdAt) return false;
     const date = new Date(order.createdAt.seconds * 1000);
     return(
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear()
     );
   }).length;
   const currentYear = new Date().getFullYear();
   const yearlyOrders = orders.filter((order) => {
       if(!order.createdAt) return false;
       const date = new Date(order.createdAt.seconds * 1000);
       return date.getFullYear() === currentYear;
   }).length;
   const  monthlyCustomers = new Set(deliveredOrders.filter((order) =>{
    if(!order.createdAt) return false;
    const date = new Date(order.createdAt.seconds * 1000);
    return(
        date.getMonth() === new Date().getMonth() && 
        date.getFullYear() === new Date().getFullYear()
    );
   })
   .map((order) => order.email).filter(Boolean)
).size;
console.log("Orders:", orders);
console.log("Delivered Orders:", deliveredOrders);
 return(
<div style = {{fontFamily: 'Poppins, serif'}} className="grid grid-cols-4 w-250  h-20  gap-5  mt-20 mb-20">
<div className="bg-white p-4 rounded-lg shadow h-30 shadow-md shadow-gray-200">
  <h2 className="text-1xl font-semibold mt-2 ml-2">Total Orders</h2>
  <p className="text-2xl font-bold text-gray-500 mt-4 ml-4">
    {yearlyOrders}
  </p>
</div>

<div className="bg-white p-4 rounded-lg shadow shadow-md shadow-gray-200">
  <h2 className="font-semibold text-1xl mt-2 ml-2">Monthly Orders</h2>
  <p className="text-2xl font-bold text-gray-500 mt-4 ml-4">
    {monthlyOrders}
  </p>
</div>

<div className="bg-white p-4 rounded-lg shadow shadow-md shadow-gray-200">
  <h2 className="font-semibold text-1xl mt-2 ml-2">Monthly Customers</h2>
  <p className="text-2xl font-bold text-gray-500 mt-4 ml-4">
    {monthlyCustomers}
  </p>
        

        </div>
        </div>
    

)};