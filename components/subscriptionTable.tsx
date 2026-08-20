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
   compact?: boolean
}
function fomratDate(value?: Timestamp): string{
    if(!value) return "-";
    const d = value.toDate?.();
    if(!d) return "-";
    return d.toLocaleString();
}



export default function SubscriptionTable({rows, compact = false,}: props){
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
    const displayRows = compact ? filteredRows.slice(0,4): filteredRows;
    return(
        <div style={{ fontFamily: 'Poppins, sans-serif' }}  className = {compact?  "w-[450px] p-1 overflow-x-auto rounded-md border-1 bg-white": "mt-10 ml-10 w-[900px] overflow-x-auto rounded-md border-gray-800 bg-white "}>
            <table className = "w-full table-fixed text-sm border-collapse">
                <thead  className = "bg-white  text-gray-500">
                    <tr className = "text-right mr-10">
                   <th colSpan={compact ? 4 : 7} className="p-2 bg-white"> 
                       <div style={{ fontFamily: 'Poppins, sans-serif' }}  className={compact ? "flex ml-2  pt-3 pb-2 gap-3 items-center whitespace-nowrap overflow-x-auto": "flex ml-2  pt-4 pb-2 gap-3 items-center whitespace-nowrap overflow-x-auto"}>
                        <button className= {compact? "transition-all duration-200 ease-in-out hover:-translate-y-1  text-[13px] text-white  bg-blue-500 rounded-sm w-18 h-8 shadow-md shadow-blue-500/50 cursor-pointer  hover: text-blue-500":"transition-all duration-200 ease-in-out hover:-translate-y-1  text-[15px] text-white  bg-blue-500 rounded-sm w-25 h-10 shadow-md shadow-blue-500/50 cursor-pointer  hover: text-blue"} onClick = {() => setSelectedFilter("all")}>
                            All
                        </button>
                    
                  
                        <button className= {compact ? "transition-all duration-200 ease-in-out hover:-translate-y-1  text-[12px]  text-yellow-600  bg-[#FEF3C7] rounded-sm w-18 h-8 shadow-md shadow-yellow-500/50 cursor-pointer hover: text-yellow-100":"transition-all duration-200 ease-in-out hover:-translate-y-1  text-[14px]  text-yellow-600  bg-[#FEF3C7] rounded-sm w-25 h-10 shadow-md shadow-yellow-500/50 cursor-pointer hover: text-yellow-100"} onClick = {() => setSelectedFilter("pending")}>
                            Pending
                            </button>  
                    
                   
                        <button className= {compact ?"transition-all duration-200 ease-in-out hover:-translate-y-1  text-[13px] text-green-600 bg-[#DCFCE7] rounded-sm w-18 h-8 shadow-md shadow-green-500/50 cursor-pointer hover: text-green-200": "transition-all duration-200 ease-in-out hover:-translate-y-1  text-[14px] text-green-600 bg-[#DCFCE7] rounded-sm w-25 h-10 shadow-md shadow-green-500/50 cursor-pointer hover: text-green-200"} onClick = {() => setSelectedFilter("active")}>
                            Active
                            </button>  
                   
                    
                        <button className= {compact ? "transition-all duration-200 ease-in-out hover:-translate-y-1  text-[12px] text-red-600 bg-[#FEE2E2] rounded-md w-25 h-8 shadow-md  shadow-red-500/50 cursor-pointer hover: text-red-300":"transition-all duration-200 ease-in-out hover:-translate-y-1  text-[14px] text-red-600 bg-[#FEE2E2] rounded-sm w-25 h-10 shadow-md shadow-red-500/50 cursor-pointer hover: text-red-300"} onClick = {() => setSelectedFilter("suspended")}>
                            Suspended
                            </button>  
                    
                    
                        <button className= {compact ? "transition-all duration-200 ease-in-out hover:-translate-y-1  text-[12px] text-gray-500 bg-[#F3F4F6] rounded-sm w-18 h-8 shadow-md shadow-gray-500/50 cursor-pointer hover: text-gray-500":"transition-all duration-200 ease-in-out hover:-translate-y-1  text-[14px] text-gray-500 bg-[#F3F4F6] rounded-sm w-25 h-10 shadow-md shadow-gray-500/50 cursor-pointer hover: text-gray-500"} onClick = {() => setSelectedFilter("expired")}>
                            Expired
                            </button> 
                             </div>
                   </th>
</tr>

                </thead> 
               
                <thead className = "text-gray-600  bg-gray-100">
                    <tr className = "pr-20">
                    <th className = {compact ? "px-0 py-2": "p-2"}>Owner</th>
                    <th className = "p-2 pr-8">plan</th>
                    <th className = "p-2 pr-4">Amount</th>
                    <th className = "p-2 pr-5">Billing</th>
                    <th className = "p-2 pr-5">Status</th>
                    {!compact && <th className =  "p-2">Joined At</th>}
                    {!compact && <th className = "p-2">expired At</th>}
                    {!compact && <th className = "p-2">Actions</th>}
                    </tr>
                </thead>
    <tbody>
       
    {displayRows.map((row) =>(
       <tr key = {row.id} className = "border-b border-gray-100">
     <td className = {compact ? "px-4 py-3 " : "px-2"}>{row.fullName}</td>
     <td className = "p-2 pl-6">{row.subscriptionPlan}</td>
     <td className = "p-2 pl-5">${row.amount}</td>
     <td className = "p-2 ">{row.billing}</td>
     <td className = "p-2">{row.status}</td>
     {!compact && <td className = "p-2">{fomratDate(row.createdAt)}</td>}
     {!compact && <td className = "p-2">{fomratDate(row.expiredAt)}</td>}
     {!compact && <td className = "p-2">
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
     </td>}
       </tr>
    ))}
    </tbody>




            </table>
        </div>
    );
}