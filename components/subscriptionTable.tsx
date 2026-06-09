"use client";
import { Timestamp } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
export type subscriptionTableRow = {
    id: string;
    email: string;
    fullName: string;
    subscriptionPlan?: string;
    amount: number;
    billing: string;
    status: string;
    createdAt?: Timestamp;
    expiredAt?: Timestamp;  
};
type props = {
   rows:  subscriptionTableRow[];
}
function fomratDate(value?: Timestamp): string{
    if(!value) return "-";
    const d = value.toDate?.();
    if(!d) return "-";
    return d.toLocaleString();
}



export default function SubscriptionTable({rows}: props){
    const [tableRows, setTableRows] = useState<subscriptionTableRow[]>(rows);
    const [selectedFilter, setSelectedFilter] = useState<"all" | "pending" | "active" | "suspended" | "expired">("all");
    const [processingSubscriptionId, setProcessingSubscriptionId] = useState<string | null>(null);
    useEffect(() => {
        setTableRows(rows);
    }, [rows]);

    const shouldHideFromTable = (status: string) => {
        const normalizedStatus = status.toLowerCase();
        return normalizedStatus === "approved" || normalizedStatus === "rejected";
    }
    const filteredRows = useMemo(
        () =>
            tableRows
                .filter((row) => !shouldHideFromTable(row.status))
                .filter((row) => {
                    if (selectedFilter === "all") return true;
                    return row.status.toLowerCase() === selectedFilter.toLowerCase();
                }),
        [tableRows, selectedFilter]
    );
    const handleSubscriptionAction = async (row: subscriptionTableRow) => {
        const currentStatus = row.status.toLowerCase();
        if (currentStatus !== "active" && currentStatus !== "suspended") return;

        setProcessingSubscriptionId(row.id);
        try {
            if (currentStatus === "active") {
                const res = await fetch("/api/admin/requests/suspend", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: row.email,
                        paymentRequestId: row.id,
                        reason: "Suspended by admin",
                    }),
                });

                if (!res.ok) {
                    const data = (await res.json().catch(() => ({}))) as { error?: string };
                    console.error("Suspend failed:", data.error ?? res.statusText);
                    return;
                }

                setTableRows((prev) =>
                    prev.map((r) => (r.id === row.id ? { ...r, status: "suspended" } : r))
                );
                return;
            }

           
            const res = await fetch("/api/admin/requests/reactivate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: row.email,
                    paymentRequestId: row.id,
                   
                }),
            });

            if (!res.ok) {
                const data = (await res.json().catch(() => ({}))) as { error?: string };
                console.error("Reactivate failed:", data.error ?? res.statusText);
                return;
            }

            setTableRows((prev) =>
                prev.map((r) => (r.id === row.id ? { ...r, status: "active" } : r))
            );
        } catch (error) {
            console.error(error);
        } finally {
            setProcessingSubscriptionId(null);
        }
    };
    return(
        <div className = "mt-10 ml-10 w-[900px] overflow-x-auto rounded-md border-1 bg-white">
            <table className = "w-full  table-fixed border-collapse">
                <thead className = "bg-white text-gray-500  h-6">
                    <tr className = "text-right mr-10">
                    <th className = "p-2 text-left">
                        <button className= "w-20 h-10 rounded-sm  shadow-md shadow-blue-500/50 cursor-pointer hover: text-blue-500" onClick = {() => setSelectedFilter("all")}>
                            All
                        </button>
                    </th>
                    <th className = "p-2 text-left">
                        <button className= "w-20 h-10 rounded-md shadow-md shadow-yellow-500/50 cursor-pointer hover: text-yellow-500" onClick = {() => setSelectedFilter("pending")}>
                            Pending
                            </button>  
                    </th>
                    <th className = "p-2 text-left">
                        <button className= "w-20 h-10 rounded-sm  shadow-md shadow-green-500/50 cursor-pointer hover: text-green-500" onClick = {() => setSelectedFilter("active")}>
                            Active
                            </button>  
                    </th>
                    <th className = "p-2 text-left">
                        <button className= "w-20 h-10 rounded-sm  shadow-md shadow-red-500/50 cursor-pointer hover: text-red-800" onClick = {() => setSelectedFilter("suspended")}>
                            Suspended
                            </button>  
                    </th>
                    <th className = "p-2 text-left">
                        <button className= "w-20 h-10 rounded-sm  shadow-md shadow-black-500/50  cursor-pointer hover: text-black" onClick = {() => setSelectedFilter("expired")}>
                            Expired
                            </button>  
                    </th>
</tr>

                </thead> 
                <thead className = "text-black bg-gray-100">
                    <tr>
                    <th className = "p-2">Owner</th>
                    <th className = "p-2">plan</th>
                    <th className = "p-2">Amount</th>
                    <th className = "p-2">Billing</th>
                    <th className = "p-2">Status</th>
                    <th className = "p-2">Joined At</th>
                    <th className = "p-2">expired At</th>
                    <th className = "p-2">Actions</th>
                    </tr>
                </thead>
    <tbody>
       
    {filteredRows.map((row) =>(
       <tr key = {row.id} className = "border-b border-gray-100">
     <td className = "p-2">{row.fullName}</td>
     <td className = "p-2">{row.subscriptionPlan}</td>
     <td className = "p-2">${row.amount}</td>
     <td className = "p-2">{row.billing}</td>
     <td className = "p-2">{row.status}</td>
     <td className = "p-2">{fomratDate(row.createdAt)}</td>
     <td className = "p-2">{fomratDate(row.expiredAt)}</td>
     <td className = "p-2">
        {row.status.toLowerCase() === "active" || row.status.toLowerCase() === "suspended" ? (
            <button
                type="button"
                disabled={processingSubscriptionId === row.id}
                className={`rounded-md w-24 h-10 px-3 py-2 text-sm text-white disabled:opacity-50 ${
                    row.status.toLowerCase() === "active" ? "bg-red-800" : "bg-green-700"
                }`}
                onClick={() => handleSubscriptionAction(row)}
            >
                {processingSubscriptionId === row.id
                    ? "..."
                    : row.status.toLowerCase() === "active"
                    ? "Cancel"
                    : "Reactivate"}
            </button>
        ) : (
            <span className="text-sm text-gray-400">-</span>
        )}
     </td>
       </tr>
    ))}
    </tbody>




            </table>
        </div>
    );
}