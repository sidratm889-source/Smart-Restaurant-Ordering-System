"use client";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import SuspendedForm from "./suspendedform";
import ReactivateForm from "./reactivateform";

type FirestoreDate = Timestamp | Date | undefined | null;

function toDateObject(value: FirestoreDate): Date | null {
  if (value == null) return null;
  if (value instanceof Date) return value;
  if (typeof (value as Timestamp).toDate === "function") {
    return (value as Timestamp).toDate();
  }
  return null;
}

/** Full date + time in the browser’s local timezone (same instant as stored in Firestore). */
function DeviceLocalDateTimeFormat(value: FirestoreDate): string {
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

export type RestaurantTableRow = {
  id: string;
  restaurantName: string;
  email: string;
  fullName: string;
  subscriptionPlan?: string;
  status: string;
  createdAt?: Timestamp;
  expiredAt?: Timestamp;

};

type Props = {
  rows: RestaurantTableRow[];
  compact?: boolean
};


export default function RestaurantTable({ rows, compact = false, }: Props) {
  const [tableRows, setTableRows] = useState<RestaurantTableRow[]>(rows);
  const [processingId, setPorcessingId] = useState<string | null>(null);
  const [showSuspendedForm, setShowSuspendedForm] = useState<string | null>(null);
  const [showReactivateForm, setShowReactivateForm] = useState<string | null>(null);
  const suspendedRow = tableRows.find((r) => r.id === showSuspendedForm) ?? null;
  const reactivatedRow = tableRows.find((r) => r.id === showReactivateForm) ?? null;

   const [selectedFilter, setSelectedFilter] = useState<"all" | "pending" | "active" | "suspended" | "expired">("all");




  const shouldHideFromTable = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    return normalizedStatus === "approved" || normalizedStatus === "rejected";
  };
 


  useEffect(() => {
    setTableRows(rows);
  }, [rows]);

  const filteredRows = tableRows.filter((row) => !shouldHideFromTable(row.status))
.filter((row) => {
  if(selectedFilter === "all") return true;
  return row.status.toLowerCase() === selectedFilter;
});


  const isPending = (status: string) => status == "pending";
  const handleAccept = async (row: RestaurantTableRow) => {
    setTableRows((prev) =>
      prev.map((r) => (r.id === row.id ? { ...r, status: "active" } : r))
    );
    try {
      setPorcessingId(row.id);
      const res = await fetch("/api/admin/requests/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: row.email,
          paymentRequestId: row.id,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        console.error("Approve failed:", data.error ?? res.statusText);
        return;
      }
      setTableRows((prev) =>
        prev.map((r) => (r.id === row.id ? { ...r, status: "active" } : r))
      );
    } catch (e) {
      console.error(e);
    } finally {
      setPorcessingId(null);
    }
  };

  const handleSuspend = (row: RestaurantTableRow) => {
    setShowSuspendedForm(row.id);
    setShowReactivateForm(null);
  };

  const handleReactivate = async (row: RestaurantTableRow) => {
    setShowReactivateForm(row.id);
    setShowSuspendedForm(null);
  };

  const handleReject = async (row: RestaurantTableRow) => {
    try {
      setPorcessingId(row.id);
      const res = await fetch("/api/admin/requests/reject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: row.email,
        }),
      });
      if (!res.ok) {
        console.error("Reject failed:", res.statusText);
        return;
      }
      setTableRows((prev) => prev.filter((r) => r.id !== row.id));
    } catch (e) {
      console.error(e);
    } finally {
      setPorcessingId(null);
    }
  };
 
 const handleExpired = async() => {
  try{
    const now = new Date();
    for(const row of tableRows){
      if(!row.expiredAt) continue;
      const expiredDate = row.expiredAt.toDate();
      if(row.status.toLowerCase() === "active" &&
      expiredDate <= now
    ){
      await updateDoc(doc(db, "paymentRequests", row.id),
      {
        status: "expired",
      }
    );
  }   
 }
  }catch(error){
    console.error("Error updating expired subscriptions:", error);
  }
 };
 useEffect(() => {
  if(tableRows.length > 0){
    handleExpired();
  }
 }, [tableRows]);
 const displayRows = compact ? filteredRows.slice(0,4): filteredRows; 

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }} className= {compact? " w-[445px]  p-3 overflow-x-auto rounded-md border-gray-800 bg-white" : "mt-25 ml-10   overflow-x-auto rounded-md border-gray-800 bg-white"}>
      <table className="w-full text-sm border-collapse border-gray-400">
      <thead className="bg-white   text-gray-500">
          <tr className= {compact ? "": "text-right mr-30 "}>
            <th colSpan={compact ? 4 : 7} className="p-2 bg-white"> 
             <div style={{ fontFamily: 'Poppins, sans-serif' }} className={compact ? "flex flex-wrap  gap-3  items-center mb-1":"flex flex-wrap mt-4 mb-2  gap-3  items-center"}>
              <button className = {compact? "transition-all duration-200 ease-in-out hover:-translate-y-1 text-white  bg-blue-500 rounded-sm w-14 h-8 shadow-md shadow-blue-500/50 cursor-pointer  hover: text-blue-500": " transition-all duration-200 ease-in-out hover:-translate-y-1 text-white  bg-blue-500 rounded-sm w-25 h-10 shadow-md shadow-blue-500/50 cursor-pointer  hover: text-blue-500"} onClick= {() => setSelectedFilter("all")}>All</button>
              
           
    <button className = {compact? " transition-all duration-200 ease-in-out hover:-translate-y-1 text-[12px] text-yellow-600  bg-[#FEF3C7] rounded-sm w-14 h-8 shadow-md shadow-yellow-500/50 cursor-pointer hover: text-yellow-100": "  bg-[#FEF3C7] transition-all duration-200 ease-in-out hover:-translate-y-1 text-yellow-600 rounded-sm w-25 h-10 shadow-md shadow-yellow-500/50 cursor-pointer hover: text-yellow-100"} onClick = {() => setSelectedFilter("pending")}>Pending</button> 
           
              <button className ={compact?"transition-all duration-200 ease-in-out hover:-translate-y-1 text-[13px] text-green-600 bg-[#DCFCE7] rounded-sm w-14 h-8 shadow-md shadow-green-500/50 cursor-pointer hover: text-green-200" : "transition-all duration-200 ease-in-out hover:-translate-y-1 bg-[#DCFCE7] text-green-600 bg-green-100 rounded-sm w-25 h-10 shadow-md shadow-green-500/50 cursor-pointer hover: text-green-200"} onClick = {() => setSelectedFilter("active")}>Active</button>
           
              <button className = {compact ?  "transition-all  duration-200 ease-in-out hover:-translate-y-1 text-[13px] text-red-600 bg-[#FEE2E2] rounded-sm w-19 h-8 shadow-md shadow-red-500/50 cursor-pointer hover: text-red-300" :"transition-all duration-200 ease-in-out hover:-translate-y-1 bg-[#FEE2E2] text-red-600  rounded-sm w-25 h-10 shadow-md shadow-red-500/50 cursor-pointer hover: text-red-300" }onClick = {() => setSelectedFilter("suspended")}>Suspended</button>
            
              <button className = {compact ? "transition-all duration-200 ease-in-out hover:-translate-y-1 text-[12px] text-gray-500 bg-[#F3F4F6] rounded-sm w-14 h-8 shadow-md shadow-gray-500/50 cursor-pointer hover: text-gray-500" :"transition-all duration-200 ease-in-out hover:-translate-y-1 text-gray-500 bg-[#F3F4F6]  bg-gray-200 rounded-sm w-25 h-10 shadow-md shadow-gray-500/50 cursor-pointer hover: text-gray-500"} onClick = {() => setSelectedFilter("expired")}>Expired</button>
              </div>
           </th>
          </tr>
        </thead>
        
        <thead className="bg-gray-200 text-gray-600">
          <tr>
            <th className="p-2 text-left ">Restaurant</th>
            <th className="p-2 pr-12">Owner</th>
            <th className="p-2 pr-6">Plan</th>
           {!compact &&<th className="p-2">Joined</th>}
            {!compact &&<th className="p-2">Expires</th>}
            <th className="p-2">Status</th>
            {!compact &&<th className="p-2">Actions</th>}
          </tr>
        </thead>
        

        <tbody>
   
           
           {displayRows.map((row) => (
            <tr key={row.id} className="border-b border-gray-300">
              <td className="p-2 text-left px-3 py-2">{row.restaurantName}</td>
              <td className="p-2">
                <div className="truncate" title={row.email}>
                  {row.fullName || "—"}
                </div>
                <div className="truncate text-xs text-gray-500">{row.email}</div>
              </td>
              <td className="p-2 capitalize ">{row.subscriptionPlan ?? "—"}</td>
              {!compact &&<td className="p-2 text-sm">
                {DeviceLocalDateTimeFormat(row.createdAt)}
              </td>}
              {!compact &&<td className="p-2 text-sm">
                {DeviceLocalDateTimeFormat(row.expiredAt)}
              </td>}
              <td
                className=  { `p-2 capitalize ${
                  row.status.toLowerCase() === "active" 
                    ? "font-medium text-green-600"
                    : ""
                }`}
              >
                {row.status}
              </td>
                

              {!compact &&<td className="p-2">
                {isPending(row.status) ? (
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleAccept(row)}
                      disabled={processingId === row.id}
                      className="rounded-md bg-emerald-700 px-3 py-2 text-sm text-white disabled:opacity-50"
                    >
                      {processingId === row.id ? "…" : "Approve"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReject(row)}
                      disabled={processingId === row.id}
                      className="rounded-md bg-red-800 px-3 py-2 text-sm text-white disabled:opacity-50"
                    > 
                      {processingId === row.id ? "…" : "Reject"}
                    </button>
                  </div>
                ) : row.status.toLowerCase() === "active" ? (
                  <button
                    type="button"
                    onClick={() => handleSuspend(row)} 
                    disabled={processingId === row.id}
                    className="rounded-md bg-amber-600 px-3 py-2 text-sm text-white"
                  > 
                    {processingId === row.id ? "..." : "Cancel"}
                  </button>
                ) : row.status.toLowerCase() === "suspended" ? (
                  <button
                    type="button"
                    onClick={() => handleReactivate(row)}
                    disabled={processingId === row.id}
                    className="rounded-md bg-green-600 px-3 py-2 text-sm text-white"
                  >
                    {processingId === row.id ? "..." : "Reactivate"}
                  </button>
                ) : (
                  <span className="text-sm text-gray-400">—</span>
                )}
              </td>}
            </tr>
            ))}
        </tbody>
      </table>
      <div>
        {suspendedRow && (
          <SuspendedForm
          row = {suspendedRow}
          onClose = {() =>{
            setShowSuspendedForm(null);
          }}
       onSubmit={async ({email, reason}) =>{
          const res = await fetch("/api/admin/requests/suspend",{
            method: "POST",
            headers:{
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              paymentRequestId: suspendedRow.id,
              reason,
            }),
          });
          if(!res.ok){
            const data = (await res.json().catch(() => ({}))) as {error?: string};
            console.error("Suspend email failed:", data.error ?? res.statusText);
            return;
          }
          setTableRows((prev) => 
            prev.map((r) => 
              r.id === suspendedRow.id 
          ? {...r, status: "suspended", email}
          : r
)
        );
      }}
      />
    )}        
        </div>
      {reactivatedRow && (
        <ReactivateForm
          row={reactivatedRow}
          onClose={() => {
            setShowReactivateForm(null);
          }}
          onSubmit={async ({ email, message }) => {
            const res = await fetch("/api/admin/requests/reactivate", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                paymentRequestId: reactivatedRow.id,
                message,
              }),
            });
            if (!res.ok) {
              const data = (await res.json().catch(() => ({}))) as { error?: string };
              console.error("Reactivate email failed:", data.error ?? res.statusText);
              return;
            }
            setTableRows((prev) =>
              prev.map((r) =>
                r.id === reactivatedRow.id
                  ? { ...r, status: "active", email }
                  : r
              )
            );
          }}
        />
      )}
    </div>
  
  );
}
