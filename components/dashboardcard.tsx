"use client";
import ResOrderTable from "./resordertable";
import EmployeeForm from "@/components/employeeform";
import {useState, useEffect} from "react";
import { doc, updateDoc, onSnapshot, snapshotEqual, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";



type OrderItem = {
    id?: string | number;
    name?: string;
    quantity?: number;
    price?: number;
    grandTotal: number;
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
  }
  type Employee={
    id?: string;
  }



    
 
export default function DashboardCard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const unsubOrders = onSnapshot(
      collection(db, "orders"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Order[];

        setOrders(data);
      }
    );

    const unsubEmployees = onSnapshot(
      collection(db, "employees"),
      (snapshot) => {
        console.log("Employee Count:", snapshot.size);
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

const monthlyOrders = deliveredOrders.filter((order) => {
    if(!order.createdAt) return false;
    const date = new Date(order.createdAt.seconds * 1000);
    return(
      date.getMonth() === new Date().getMonth() &&
      date.getFullYear() === new Date().getFullYear()
  );
}).length;
  
   const monthlySales = deliveredOrders.filter((order) => {
    if(!order.createdAt) return false;
    const date = new Date(order.createdAt.seconds * 1000);
   return(
    date.getMonth() === new Date().getMonth() &&
      date.getFullYear() === new Date().getFullYear()
    );
  })
     .reduce(
    (sum, order) => sum + (order.grandTotal || 0),
    0
  );

  const monthlyCustomers = new Set(
    deliveredOrders.filter((order) => {
      if(!order.createdAt) return false;
      const date = new Date(order.createdAt.seconds * 1000);
      return(
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear()

      );
    })
      .map((order) => order.email).filter(Boolean)
  ).size;

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

  const totalEmployees = employees.length;
  console.log("Orders:", orders);
  console.log("Employees:", employees);
  console.log("Delivered Orders:", deliveredOrders);
  return (
    <div  style={{ fontFamily: 'Poppins, sans-serif' }} className="grid grid-cols-4 w-240  h-30  gap-3 ml-5 ">
      <div className="bg-white p-4 rounded-lg shadow h-30 shadow-md shadow-gray-200">
        <h2 className="font-semibold pl-2 text-1xl">Total Sales</h2>
        <p className="text-2xl font-bold text-red-800 mt-2 pl-4">
          ${monthlySales}
        </p>
        <p className="text-sm font-bold text-gray-500 mt-1 pl-3">
       all-time revenue
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow shadow-md shadow-gray-200">
        <h2 className="font-semibold">Total Orders</h2>
        <p className="text-2xl font-bold text-gray-500 mt-4">
          {monthlyOrders}
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow shadow-md shadow-gray-200">
        <h2 className="font-semibold">Today's Sales</h2>
        <p className="text-2xl font-bold text-gray-500 mt-4">
          ${todaySales}
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow shadow-md shadow-gray-200">
        <h2 className="font-semibold">Total Customers</h2>
        <p className="text-2xl font-bold text-gray-500 mt-4">
          {monthlyCustomers}
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow  shadow-md shadow-gray-200 h-30">
        <h2 className="font-semibold">Total Employees</h2>
        <p className="text-2xl font-bold text-gray-500 mt-4">
          {totalEmployees}
        </p>
      </div>
    </div>
  );
}