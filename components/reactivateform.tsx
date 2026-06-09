"use client";

import {useState} from "react";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../lib/firebase";
import type { RestaurantTableRow } from "./restaurantTable";

export default function ReactivateForm({row, onClose, onSubmit}: {row: RestaurantTableRow, onClose(): void, onSubmit(data: {email: string, message: string}): void}){
    const[message, setMessage]  = useState("");
    const handleSubmit = async() => {
        try{
            await updateDoc(doc(db, "paymentRequests", row.id), {
                status: "active",
                reactivationMessage: message,
            });
            alert("Account reactivated successfully");
            await onSubmit({
                email: row?.email ?? "unknown", message});
                onClose();
            }
            catch(error){
                console.error("Error reactivating account:", error);
                alert("failed to reactivate account");
            } 

            };
        
        
    
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-md rounded-md bg-white p-5 shadow-xl">
                <h2 className="mb-3 text-lg font-semibold text-center">Reactivate Account</h2>
                <p className = "mb-3 text-sm text-black text-center">Are you sure you want to reactivate this account?</p>

                <p className="mb-3 text-sm text-gray-600">Restaurant Name:{row.restaurantName}</p>
                <textarea
                    placeholder="Optional reactivation message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mb-4 min-h-[110px] w-full rounded-md border border-gray-300 p-2"
                />
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700">Cancel</button>
                    <button onClick={handleSubmit}  className="rounded-md bg-green-700 px-4 py-2 text-sm text-white">Submit</button>
                </div>
            </div>
        </div>
    )
}