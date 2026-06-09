"use client";

import {useState} from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import type { RestaurantTableRow } from "./restaurantTable";


export default function SuspendedForm({row, onClose, onSubmit}: {row: RestaurantTableRow, onClose: () => void, onSubmit: (data: {email: string, reason: string}) => void}){
    const [reason, setReason] = useState("");
    
    const handleSubmit = async () => {
        if(!reason.trim()){
            alert("please enter reason");
            return;
        }
        try{
            await updateDoc(doc(db, "paymentRequests", row.id), {
                status: "suspended",
                suspendedReason: reason,
        });
        alert("Account suspended successfully");
       await onSubmit({email: row?.email ?? "unknown", reason});
       onClose();
    }
    catch(error){
        console.error("Error suspending account:", error);
        alert("failed to suspend account please try again");
    }
};
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 pt-10">
            <div className="w-full max-w-md rounded-md bg-white p-5 shadow-xl">
                <h2 className="mb-3 text-lg font-semibold text-center">Suspend Account</h2>
                <p className = "mb-3 text-sm text-black text-center">please provide a reason for suspending this account</p>
                <p className="mb-3 text-sm text-gray-600">Restaurant Name: {row?.restaurantName}</p>
                <textarea
                    placeholder="Reason for suspension"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="mb-4 min-h-[110px] w-full rounded-md border border-gray-300 p-2"
                />
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700">Cancel</button>
                    <button onClick={handleSubmit} className="rounded-md bg-red-800 px-4 py-2 text-sm text-white" disabled={!reason.trim()}>Suspend</button>
                </div>
            </div>
        </div>
    )

}
