"use client";

import EditPlanModal, { SavedPlan } from "./editplanmodal";
import AddPlanModal from "./addplanmodal";
import { useEffect, useState } from "react";
import { defaultPlans, PLANS_STORAGE_KEY } from "../data/plans";

export default function SubscriptionPlans() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [plans, setPlans] = useState(defaultPlans);
  const [showEditPlanModal, setShowEditPlanModal] = useState(false);
  const[showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(PLANS_STORAGE_KEY);
    if (!saved) return;
    try {
      setPlans(JSON.parse(saved));
    } catch {
      // ignore bad saved data
    }
  }, []);

  const handleEdit = (plan: (typeof defaultPlans)[keyof typeof defaultPlans]) => {
    setSelectedPlan(plan.id);
    setShowEditPlanModal(true);
  };
  const handleAddPlan = (newPlan: SavedPlan) => {
    const updatedPlans = {
      ...plans,
      [newPlan.id]: newPlan,
    };
    setPlans(updatedPlans);
    localStorage.setItem(PLANS_STORAGE_KEY, JSON.stringify(updatedPlans));
    setShowAddModal(false);
  };
    const handleDelete = (planId: string) =>{
    const updatedPlans = {...plans};
    delete updatedPlans[planId as keyof typeof updatedPlans];
    setPlans(updatedPlans);
    localStorage.setItem(PLANS_STORAGE_KEY, JSON.stringify(updatedPlans));
    };

  const handleSavePlan = (updatedPlan: SavedPlan) => {
    const updatedPlans = {
      ...plans,
      [updatedPlan.id]: updatedPlan,
    };

    setPlans(updatedPlans);
    localStorage.setItem(PLANS_STORAGE_KEY, JSON.stringify(updatedPlans));
    setShowEditPlanModal(false);
    setSelectedPlan(null);
  };

  const currentPlan = selectedPlan ? plans[selectedPlan as keyof typeof plans] : null;

  return (
    <div>
      <button type = "button" onClick = {() => setShowAddModal(true)}  className = "sticky mt-20  bg-red-800   w-25 h-10 rounded-md ml-215  text-white">+ Add Plan</button>
      <h2 className="sticky   text-2xl mt-0 ml-15">Subscription Plans</h2>

      <div className="grid grid-cols-1 grid-cols-3 gap-10 mt-10">
        {Object.values(plans).map((plan) => (
          <div
          key={plan.id}
            className="w-70 h-110 rounded-lg bg-white border border-gray-300"
          >
            <h3   className="mt-2 ml-5">
              {{free: "free", basic: "basic", premium: "pro"} [plan.id]}
            </h3>
            <h2 className="mt-6 ml-11 text-2xl text-bold">{plan.title}</h2>
            <p className="mt-2 ml-11 text-gray-800">{plan.headline}</p>
            <h2 className="mt-8 ml-12 text-black text-5xl font-bold">
              {plan.price}
              <span className="ml-2 text-gray-800 text-sm">/trial</span>
            </h2>
            <div className="mt-9 ml-10 gap-3">
              {plan.features.map((feature: string, i: number) => (
                <p key={i} className="text-green-600">
                  ✓ <span className="text-gray-800">{feature}</span>
                </p>
              ))}
            </div>
            <button
              type="button"
              onClick={() => handleEdit(plan)}
              className="bg-red-800 text-white rounded-md w-30 h-10 ml-10 mt-4"
            >
              Edit Plan
            </button>
            <button type = "button" onClick = {() => handleDelete(plan.id)}
             className="bg-red-800 text-white rounded-md w-20 h-10 ml-2 mt-2"
             >Delete </button>

          </div>
        ))}
      </div>

      {showEditPlanModal && selectedPlan && currentPlan && (
        <EditPlanModal
          plan={selectedPlan}
          initialValues={{
            title: currentPlan.title,
            headline: currentPlan.headline,
            price: currentPlan.price,
            features: currentPlan.features.join("\n"),
          }}
          onSave={handleSavePlan}
          onClose={() => {
            setShowEditPlanModal(false);
            setSelectedPlan(null);
          }}
        />
      )}
      {showAddModal && (
        <AddPlanModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddPlan}
        />
      )}
      
    </div>
  );
}
