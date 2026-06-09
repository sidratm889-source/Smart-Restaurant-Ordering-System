"use client";
import { collection, onSnapshot, query, Timestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useState, useEffect } from "react";

type FirestoreInstant = Timestamp | Date | undefined | null;

function toDateObject(value: FirestoreInstant): Date | null {
  if (value == null) return null;
  if (value instanceof Date) return value;
  if (typeof (value as Timestamp).toDate === "function") {
    return (value as Timestamp).toDate();
  }
  return null;
}

function formatFirestoreInstant(value: FirestoreInstant): string {
  const d = toDateObject(value);
  if (!d) return "-";
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

type RevenueRow = {
  id: string;
  fullName: string;
  plan: string;
  amount: number;
  status: string;
  createdAt: Timestamp | null;
  expiredAt: Timestamp | null;
};

export default function RevenueHistoryTable() {
    const [rows, setRows] = useState<RevenueRow[]>([]);
    useEffect(() =>{
        const q = query(collection(db, "paymentRequests"));
        const unsub = onSnapshot(q, (snap) => {
            const rows: RevenueRow[] = snap.docs.map((d) => {
                const data = d.data();
                return {
                    id: d.id,
                    fullName: String(data.fullName ?? ""),
                    plan: String(data.subscriptionPlan ?? ""),
                    amount: Number(data.amount ?? 0),
                    status: String(data.status ?? "pending"),
                    createdAt: data.createdAt ?? null,
                    expiredAt: data.expiredAt ?? null,
                };
        });
        setRows(rows);
    });
    return () => unsub();
}, []);

    return(
        
        <div>
        <h2 className = "text-lg font-bold mb-3">
            Transaction History 
        </h2>
        
            
        <div className = "flex w-[950px] overflow-x-auto rounded-md border bg-white p-4 ">
            
            
            <table className = "w-full table-fixed border-collapse">
             <thead className = "bg-gray-200 rounded-md">
                <tr className = "text-left border-b border-gray-500 ">
                    <th className = "p-2">User</th>
                    <th className = "p-2">Plan</th>
                    <th className = "p-2">Amount</th>
                    <th className = "p-2">Status</th>
                    <th className = "p-2">Created At</th>
                    <th className = "p-2">Expired At</th>
                </tr>
             </thead>
             <tbody>
                {rows.map((row) => (
                    <tr key = {row.id}>
                        
                   
                    <td className = "p-2">{row.fullName}</td>
                    <td className = "p-2">{row.plan}</td>
                    <td className = "p-2">${row.amount}</td>
                    <td className = "p-2">{row.status}</td>
                    <td className="p-2">{formatFirestoreInstant(row.createdAt)}</td>
                    <td className="p-2">{formatFirestoreInstant(row.expiredAt)}</td>
                    </tr>
                ))}
             </tbody>


            </table>
            
        </div>
       </div>
        
    )
}

