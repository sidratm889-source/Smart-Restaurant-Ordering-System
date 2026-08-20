"use client";
import {submitRequest} from "../lib/submitRequest";
import {auth} from "../lib/firebase";
import { useState, useEffect } from "react";
import { defaultPlans, PLANS_STORAGE_KEY } from "../data/plans";
import SubscriptionPlansDetails from "./subscriptionplandetails";
import BasicPlanDetails from "./basicplandetails";
import PremiumPlansDetails from "./premiumplansdetails";
import React from "react";
import { useRouter } from "next/navigation";

export default function ChooseYourPlan() {
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [plans, setPlans] = useState(defaultPlans);
  const [loading, setLoading] = useState(false);
  const[error, setError] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem(PLANS_STORAGE_KEY);
    if (saved) {
      setPlans(JSON.parse(saved));
    }
  }, []);
  const handleFreePlan = async() => {
    const user = auth.currentUser;
    if(!user?.uid || !user.email){
      setError("please sign in before choosing free plan");
      return;
    }
    setLoading(true);
    setError("");
    try{
      await submitRequest({
        uid: user.uid,
        userEmail: user.email,
        restaurantName: user.displayName?.trim() ?? "",
        fullName: user.displayName?.trim() ?? "",
        subscriptionPlan: "free",
        amount: 0,
      });
    
     router.push("/freesubscription");
    }catch(err){
      console.error(err);
      setError("failed to subit request");
    }
    finally{
      setLoading(false);
    }



      
    };
  

  return(
    <main className="bg-gray-100 min-h-screen w-full pt-50">
      <h1 className="text-5xl pb-5 font-style: 'Helvetica Neue' text-center">
        Choose your plan
      </h1>
      <h2 className="text-center pb-20 font-style: 'Helvetica Neue'">
        You can always upgrade later
      </h2>
      <div className="grid grid-cols-3 ml-20 mt-0">
        {Object.values(plans).map((plan) => (
          <div key={plan.id} className="w-80 h-115 rounded-lg bg-white border border-gray-300">
            <h3 className="mt-3 ml-7">{{free: "free", basic: "basic", premium: "pro"}[plan.id]} </h3>

            <h2 className="mt-5 ml-11 text-2xl text-bold"> {plan.title}</h2>
            <p className="mt-2 ml-11 text-gray-800">{plan.headline}</p>
            <h2 className="mt-8 ml-12 text-black text-5xl font-bold">
              {plan.price}<span className=" ml-2 text-gray-800 text-sm">/trial</span>
            </h2>
            <div className="mt-9 ml-10 gap-3">
              {plan.features.map((feature: string, i: number) => (
                <p key={i} className="text-green-600">
                  ✓ <span className="text-gray-800">{feature}</span>
                </p>
              ))}
            </div>
            <div className="mt-6  items-center gap-3">
            {plan.id === "free" ? (
              <button disabled={loading} onClick={handleFreePlan}
               className="ml-5 mt-3 rounded-md bg-red-800 text-white w-35 h-10">
               {loading ? "Continue free" : "Continue free"}
              </button>
            ) : plan.id === "basic" ? (
              <button disabled={loading} onClick={() => router.push("/paymentdetails")} className="mt-5 ml-5 rounded-md bg-red-800 text-white w-35 h-10">
               {loading ? "Choose Growth ➜" : "Choose Growth ➜"}
              </button>
            ) : plan.id === "premium" ? (
              <button disabled = {loading} onClick={() => router.push("/paymentdetails2")} className="mt-5 mb-4 ml-7 rounded-md bg-red-800 text-white w-35 h-10">
                {loading ? "Choose Premium" : "Choose Premium"}
              </button>
            ): null}

            <button
              type="button"
              onClick={() => {
                setSelectedPlan(plan.id);
                setShowDetails(true);
              }}
              className="ml-5  bg-red-800 text-white  w-30 h-10 rounded-md"
            >
              view details
            </button>
          </div>
          </div>
        ))}
        
      </div>

      {showDetails && selectedPlan === "free" && (
        <SubscriptionPlansDetails onClose={() => setShowDetails(false)} />
      )}
      {showDetails && selectedPlan === "basic" && (
        <BasicPlanDetails onClose={() => setShowDetails(false)} />
      )}
      {showDetails && selectedPlan === "premium" && (
        <PremiumPlansDetails onClose={() => setShowDetails(false)} />
      )}
    </main>
  );
}
