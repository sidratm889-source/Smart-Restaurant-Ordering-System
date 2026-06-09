"use client";
import type { Dispatch, FormEvent, SetStateAction } from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {useState} from "react";
import {submitRequest} from "../lib/submitRequest";
import { auth } from "../lib/firebase";
type Props = {
    selectedPlan: "monthly" | "yearly";
    setSelectedPlan: Dispatch<SetStateAction<"monthly" | "yearly">>;
};

export default function PaymentForm({ selectedPlan, setSelectedPlan }: Props){
     const router = useRouter();
     const searchParams = useSearchParams();
     const [nameOnCard, setNameOnCard] = useState("");
     const [cardNumber, setCardNumber] = useState("");
     const[expiryDate, setExpiryDate] = useState("");
     const[cvv, setCvv] = useState("");
     const[error, setError] = useState("");
     const[loading, setLoading] = useState(false);
     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nameOnCard.trim() || !cardNumber.trim() || !expiryDate.trim() || !cvv.trim()) {
        setError("All fields are required");
        return;
    }
    const user = auth.currentUser;
    const emailFromQuery = searchParams.get("email")?.trim() ?? "";
    const email = user?.email?.trim() ?? emailFromQuery;
    if(!user || !email){
        setError("Please sign in before submitting a payment request.");
        return;
    }
    try{
      setLoading(true);
      setError("");
      const amount = selectedPlan === "monthly"? 29: 290;
      await submitRequest({
        uid: user.uid,
        userEmail: email,
        restaurantName: user.displayName?.trim(),
        subscriptionPlan: "basic",
        billing: selectedPlan,
        amount,
       
      });
      router.push("/underreview1");
    }catch(error){
      console.error(error);
      setError("Failed to submit payment request. Please try again.");
    } finally {
      setLoading(false);
    }
     }
    return(
        
        <main className = "bg-gray-100 min-h-screen w-full">
        <h2 className = "text-5xl ml-30 mt-30">Payment Details</h2>
        <div className = "max-w-3xl ml-30 pt-8">
        <h2 className = "text-xl font-semibold mb-4">Billing Cycle</h2>
             
        <div onClick={() => setSelectedPlan("monthly")} className = {`w-150 h-20 border rounded-lg relative p-4 cursor-pointer transition ${selectedPlan === "monthly" ? "border-red-500 bg-red-50": "border-gray-300 bg-gray-100"}`}>
            
       
            <div className = "flex items-start gap-3">
                <div className = {`w-3 h-3 rounded-full border flex items-center justify-center mt-5 ${selectedPlan === "monthly" ? "border-red-500" : "border-gray-300"}`} >
                    {selectedPlan === "monthly" &&
                        <div className = "w-2 h-2 bg-red-500 rounded-full"/>}
                </div>
                
                
                <div>
                    <h2 className = "text-lg font-semibold">Monthly</h2>
                    <p className = "text-gray-500">Billed every month, cancel anytime</p>
                    <span className = "absolute right-4 bottom-4 text-black font-bold">$29/month</span>
                </div>
            </div>
        </div>
        <div onClick = {() => setSelectedPlan("yearly")} className = {`mt-5 w-150 h-20 border rounded-lg relative p-4 cursor-pointer transition ${selectedPlan === "yearly" ? "bg-red-50 border-red-500": "border-gray-300 bg-gray-100"}`}>
            <div className = "flex items-start gap-3">
                <div className = {`w-3 h-3 rounded-full border flex items-center justify-center mt-5 ${selectedPlan === "yearly" ? "border-red-500": "border-gray-300"}`}>
                    {selectedPlan === "yearly" &&
                    <div className = "w-2 h-2 bg-red-500 rounded-full"/>}
                </div>
                <div>
                    <h2 className = "text-lg font-semibold">Yearly</h2>
                    <p className = "text-gray-500">Billed once a year</p>
                    <span className = "absolute right-4 bottom-4 text-black font-bold">$290/year</span>
                </div>
            </div>
        </div>

       <form onSubmit = {handleSubmit} className = "mt-10 space-y-4">
       <div className = "flex flex-col gap-2">
        <label className = "font-medium text-sm">Name on Card</label>
           <input type = "text" placeholder = "Cardholder Name" value={nameOnCard} onChange={ (e)=> setNameOnCard(e.target.value)} className = "w-150 border rounded-md p-3 h-11 transition hover:border-red-500 focus:border-red-500 outline-none"/>
           </div>
           <div className = "flex flex-col gap-2">
           <label className = "font-medium text-sm">Card Number</label>
           <input type = "text" placeholder = "**** **** **** ****"value = {cardNumber} onChange={(e) => setCardNumber(e.target.value)} className = "w-150 border rounded-md p-3 h-11 focus:border-red-500 outline-none"/>
           </div>
           <div className= "grid grid-cols-1 md:grid-cols-2 gap-x-60 gap-y-60 max-w-sm">
            <div className = "flex flex-col gap-2">
              <label className = "font-medium text-sm">Expiry Date</label>
              <input type = "text" placeholder = "MM/YY" value = {expiryDate} onChange={(e) => setExpiryDate(e.target.value)}className = "w-75 border rounded-md p-3 h-11 focus:border-red-500 outline-none"/>
            </div>
            <div className = "flex flex-col gap-2 mt-5">
              <label className = "font-medium text-sm">CVV</label>
              <input type = "text" placeholder = "***" value = {cvv} onChange={(e) => setCvv(e.target.value)} className = " w-75 border rounded-md p-3 h-11 focus:border-red-500 outline-none"/>
            </div>
           </div>
           <button type = "submit" className = "mt-4 w-160 h-12 bg-red-800 hover:bg-red-900 text-white rounded-md transition">Pay & submit for approval ➜</button>

           <p className = "text-gray-700">
             This request only sends your account and plan details to admin for approval.
           </p>
           {error && <p className = "text-red-600 text-sm">{error}</p>}
           </form>
        </div>
       
        </main>
       
    )
   }