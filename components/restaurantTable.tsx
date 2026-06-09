"use client";

import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import SuspendedForm from "./suspendedform";
import ReactivateForm from "./reactivateform";

type FirestoreInstant = Timestamp | Date | undefined | null;

function toDateObject(value: FirestoreInstant): Date | null {
  if (value == null) return null;
  if (value instanceof Date) return value;
  if (typeof (value as Timestamp).toDate === "function") {
    return (value as Timestamp).toDate();
  }
  return null;
}

/** Full date + time in the browser’s local timezone (same instant as stored in Firestore). */
function DeviceLocalDateTimeFormat(value: FirestoreInstant): string {
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
};

export default function RestaurantTable({ rows }: Props) {
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

  return (
    <div className="mt-10 ml-10 w-[900px] overflow-x-auto rounded-md border-1 bg-white">
      <table className="w-auto table-fixed border-collapse">
      <thead className="bg-white  text-gray-500 ">
          <tr className= "text-right mr-30">
            <th className="p-2 text-left ">
              <button className = "text-white  bg-blue-400 rounded-sm w-25 h-10 shadow-md shadow-blue-500/50 cursor-pointer  hover: text-blue-500" onClick= {() => setSelectedFilter("all")}>All</button>
              </th>
            <th className="p-2 ">
    <button className = "text-yellow-500 bg-yellow-100 rounded-sm w-25 h-10 shadow-md shadow-yellow-500/50 cursor-pointer hover: text-yellow-100" onClick = {() => setSelectedFilter("pending")}>Pending</button> </th>
            <th className="p-2">
              <button className = "text-green-500 bg-green-100 rounded-sm w-25 h-10 shadow-md shadow-green-500/50 cursor-pointer hover: text-green-200"onClick = {() => setSelectedFilter("active")}>Active</button></th>
            <th className="p-2">
              <button className = "text-red-800 bg-red-200 rounded-sm w-25 h-10 shadow-md shadow-red-500/50 cursor-pointer hover: text-red-300" onClick = {() => setSelectedFilter("suspended")}>Suspended</button></th>
            <th className="p-2">
              <button className = "text-black bg-gray-200 rounded-sm w-25 h-10 shadow-md shadow-gray-500/50 cursor-pointer hover: text-gray-500" onClick = {() => setSelectedFilter("expired")}>Expired</button>
              </th>
           
          </tr>
        </thead>
        <thead className="bg-gray-200 text-black">
          <tr>
            <th className="p-2 text-left">Restaurant</th>
            <th className="p-2">Owner</th>
            <th className="p-2">Plan</th>
            <th className="p-2">Joined</th>
            <th className="p-2">Expires</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        

        <tbody>
   
           
           {filteredRows.map((row) => (
            <tr key={row.id} className="border-b border-gray-100">
              <td className="p-2 text-left">{row.restaurantName}</td>
              <td className="p-2">
                <div className="truncate" title={row.email}>
                  {row.fullName || "—"}
                </div>
                <div className="truncate text-xs text-gray-500">{row.email}</div>
              </td>
              <td className="p-2 capitalize ">{row.subscriptionPlan ?? "—"}</td>
              <td className="p-2 text-sm">
                {DeviceLocalDateTimeFormat(row.createdAt)}
              </td>
              <td className="p-2 text-sm">
                {DeviceLocalDateTimeFormat(row.expiredAt)}
              </td>
              <td
                className={`p-2 capitalize ${
                  row.status.toLowerCase() === "active"
                    ? "font-medium text-green-600"
                    : ""
                }`}
              >
                {row.status}
              </td>
              <td className="p-2">
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
              </td>
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
