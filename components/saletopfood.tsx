"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

type CartItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
};

type OrderHistory = {
  cart: CartItem[];
};

type FoodData = {
  name: string;
  quantity: number;
};
type Props = {
  compact?: boolean;
}
export default function TopSellingFood({compact = false}: Props) {
  const [foods, setFoods] = useState<FoodData[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "orders"), // Change if your collection name is different
      (snapshot) => {
        const foodMap: Record<string, number> = {};

        snapshot.docs.forEach((doc) => {
          const order = doc.data() as OrderHistory;

          order.cart?.forEach((item) => {
            foodMap[item.name] =
              (foodMap[item.name] || 0) + item.quantity;
          });
        });

        const sortedFoods = Object.entries(foodMap)
          .map(([name, quantity]) => ({
            name,
            quantity,
          }))
          .sort((a, b) => b.quantity - a.quantity);

        setFoods(sortedFoods);
      }
    );

    return () => unsub();
  }, []);

  return (
    <div className=" p-6">
      <h2 style={{fontFamily: 'Poppins, serif'}} className= {`font-bold  ml-80 ${compact ? "text-3xl mb-10 ": "text-3xl mb-6"}`}>
        Top Selling Foods
      </h2>

      <table style={{fontFamily: 'Poppins, serif'}} className="w-[900px]  border border-collapse">
      
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-3">Rank</th>
            <th className="border p-3">Food</th>
            <th className="border p-3">Quantity Sold</th>
          </tr>
        </thead>

        <tbody className = "bg-white">
         
        {(compact ? foods.slice(0, 4) : foods).length > 0 ?  (
             (compact? foods.slice(0, 4): foods).map((food, index) => (
              <tr key={food.name}>
                <td className="border p-3 text-center">
                  {index + 1}
                </td>
                <td className="border p-3">
                  {food.name}
                </td>
                <td className="border p-3 text-center">
                  {food.quantity}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={3}
                className="border p-3 text-center"
              >
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}