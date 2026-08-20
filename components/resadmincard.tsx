"use client";
import {useState, useEffect} from "react";
import { onSnapshot, snapshotEqual, collection } from "firebase/firestore";
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
type Employee = {
    id?: string;
}

export default function ResAdminCard() {
    const[orders, setOrders] = useState<Order[]>([]);
    const[employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
          const unsubOrders = onSnapshot(collection(db, "orders"),
          (snapshot) =>{
             const data = snapshot.docs.map((doc) =>({
                id: doc.id,
                ...doc.data(),
             })) as Order[];
             setOrders(data);
          }
        );
        const unsubEmployees = onSnapshot(collection(db, "employees"),
      (snapshot) => {
        console.log("Employee count: ", snapshot.size);
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log(data);
        setEmployees(data as Employee[]);
      }
    );
    return () => {
        unsubOrders();
        unsubEmployees();
    };
}, []);
const deliveredOrders = orders.filter(
    (order) => order.status === "delivered"
);
const currentYear = new Date().getFullYear();
const yearlyOrders = orders.filter((order) => {
    if(!order.createdAt) return false;
    const date = new Date(order.createdAt.seconds * 1000);
    return date.getFullYear() === currentYear;
}).length;
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
const yearlyCustomers = new Set(
    orders.filter((order) => {
        if(!order.createdAt) return false;
        const date = new Date(order.createdAt.seconds * 1000);
        return date.getFullYear() === currentYear;
    })
    .map((order) => order.email).filter(Boolean)
).size;
const totalEmployees = employees.length;
console.log("Orders:", orders);
  console.log("Employees:", employees);
  console.log("Delivered Orders:", deliveredOrders);

    return(
       
        <div className = "grid grid-cols-4 gap-0 mt-18 ">
        <div className = "bg-white rounded-md shadow shadow-md shadow-gray-200 h-25 w-50 ">
            <h2 className = "pt-2 text-1xl font-bold mt-2 ml-3">Total Revenue</h2>
            <p className = "text-1xl text-gray-500 mt-4 ml-4">${yearlySales}</p>

        </div>
         <div className = "bg-white rounded-md h-25 w-50 shadow shadow-md shadow-gray-200">
            <h2 className = "pt-2 text-1xl font-bold mt-2 ml-3">Total Orders</h2>
            <p className = "text-1xl text-gray-500 mt-4 ml-5">{yearlyOrders}</p>
            
        </div>
         <div className = "bg-white rounded-md h-25 w-50 shadow shadow-md shadow-gray-200">
            <h2 className = "pt-2 text-1xl font-bold mt-2 ml-3">Total Customers</h2>
            <p className = "text-1xl text-gray-500 mt-4 ml-5">{yearlyCustomers}</p>
            
        </div>
         <div className = "bg-white rounded-md h-25 w-50 shadow shadow-md shadow-gray-200">
            <h2 className = "pt-2 text-1xl font-bold mt-2 ml-3">Total Staff</h2>
            <p className = "text-1xl text-gray-500 mt-4 ml-5">{totalEmployees}</p>
            
        </div>
        </div>
        
    )
}