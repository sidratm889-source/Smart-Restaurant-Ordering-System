
    "use client";
    import React from "react";
    import{collection, onSnapshot,  doc, updateDoc, orderBy, query, where} from "firebase/firestore";
    import{useState, useEffect, useMemo} from "react";
    import { db } from "@/lib/firebase";
    import { serverTimestamp } from "firebase/firestore";
    type OrderItem = {
      name?: string;
      quantity: number;
    };
    
    type Order = {
      id?: string;
      orderId?: string;
      cart?: OrderItem[];
      createdAt: { seconds: number };
      kitchenStatus?: string;
    };
    
    export default function KitchenComponent(){
      const [orders, setOrders] = useState<Order[]>([]);
      const [localStatus, setLocalStatus] = useState<Record<string, string>>({});
      const [pendingRemoval, setPendingRemoval] = useState<Record<string, boolean>>({});
      const [recentlyDelivered, setRecentlyDelivered] = useState<Record<string, boolean>>({});
    
      useEffect(() => {
        console.log("Listener started");
    
        const today = new Date();
        today.setHours(0, 0, 0, 0);
    
        const q = query(
          collection(db, "orders"),
          where("createdAt", ">=", today),
          orderBy("createdAt", "desc")
        );
    
        const unsub = onSnapshot(q, (snapshot) => {
          console.log("orders:", snapshot.docs.map((d) => d.data()));
    
          const data = snapshot.docs.map((doc) => {
            console.log(doc.id, doc.data());
    
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
    
          console.log("Final data:", data);
    
          setOrders(data as Order[]);
        });
    
        return () => unsub();
      }, []);
    
      // ✅ FIXED UPDATE FUNCTION
      const updateStatus = async (
        orderId: string | undefined,
        newStatus: string
      ) => {
        console.log("BUTTON CLICKED", orderId, newStatus);

        if (!orderId) return;

        setLocalStatus((prev) => ({
          ...prev,
          [orderId]: newStatus,
        }));

        if (newStatus === "Delivered") {
          setRecentlyDelivered((prev) => ({
    ...prev,
    [orderId]: true,
  }));
          setTimeout(() => {
            setPendingRemoval((prev) => ({
              ...prev,
              [orderId]: true,
            }));
          }, 3000);
        }

        try {
          const ref = doc(db, "orders", orderId);

          await updateDoc(ref, {
            kitchenStatus: newStatus,
          });
        } catch (err) {
          console.error("updateStatus failed:", err);
        }
      };

      // TODAY FILTER
      const todayOrders = useMemo(() => {
        if (!orders?.length) return [];
    
        const today = new Date().toDateString();
    
        return orders.filter((order) => {
          const orderId = order.id ?? "";
          const orderDate = order.createdAt
            ? new Date(order.createdAt.seconds * 1000)
            : null;
          const isDelivered =
            (order.kitchenStatus || "").toLowerCase() === "delivered";

          return (
            orderDate?.toDateString() === today &&
            !pendingRemoval[orderId] &&
            (!isDelivered || recentlyDelivered[orderId])
          );
        });
      }, [orders, pendingRemoval]);
     
      return (
        <div>
          <h1 className="text-5xl text-red-800 font-bold mb-15 mt-30 text-center">Kitchen Display</h1>
    
          {todayOrders.map((order) => {
            const displayStatus = (
              localStatus[order.id ?? ""] || order.kitchenStatus || "received"
            ).toLowerCase();

            return (
            <div key={order.id} className="border ml-10 p-4 mb-4 mt-10 bg-gray-100 text-black text-xl rounded-md w-[1200px] min-h-[200px]">
    
              {/* ORDER ID */}
              <div className="flex justify-between mb-2">
                <h2 className="font-bold mt-2">
                  Order {order.orderId}
                </h2>
              </div>
    
              {/* ITEMS */}
              <div className="mb-2">
                {order.cart?.map((item, i) => (
                  <div key={i} className="space-x-7 justify-between border-b px-1">
                    <span>{item.name} </span>
                    <span> Qty: {item.quantity}</span>
                  </div>
                ))}
              </div>
      
              {/* STATUS */}
              <p className="font-semibold mb-2">
  Status: {displayStatus.charAt(0).toUpperCase() + displayStatus.slice(1)}
</p>
              {/* BUTTONS */}
             
    
                {/* Received → Preparing */}
               
                {(!order.kitchenStatus ||
                  
                  displayStatus === "received") && (
                  <button
                    onClick={() =>
                      updateStatus(order.id, "Preparing")
                    }
                    className="px-4 py-2 bg-blue-500 rounded-md text-white"
                  >
                    Preparing
                  </button>
                )}
    
                {/* Preparing → Pickup */}
                {displayStatus === "preparing" && (
                  <button
                    onClick={() =>
                      updateStatus(order.id, "Pickup")
                    }
                    className="px-4 py-2 bg-purple-500 rounded-md text-white"
                  >
                    Pickup
                  </button>
                )}
    
                {/* Pickup → Delivered */}
                {displayStatus === "pickup" && (
                  <button
                    onClick={() =>
                      updateStatus(order.id, "Delivered")
                    }
                    className="px-4 py-2 bg-green-600 rounded-md text-white"
                  >
                    Delivered
                  </button>
                )}
    
              </div>
            );
          })}
        </div>
      );
    }
        
              
               
    
              
            
            
    
    
