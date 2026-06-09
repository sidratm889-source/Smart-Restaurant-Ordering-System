"use client";

import { submitRequest } from "../lib/submitRequest";
import {auth} from "../lib/firebase";


export default function FunctionPage() {
  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (!user?.email) {
      alert("Please sign in first");
      return;
    }

    await submitRequest({
      uid: user.uid,
      userEmail: user.email,
      restaurantName: user.displayName?.trim(),
      fullName: "",
      subscriptionPlan: "basic",
       billing: "monthly",
       amount: 29,
       });
    alert("Request sent to admin for approval");
  };

  return (
    <div className="p-6">
      <button
        type="button"
        onClick={handleSubmit}
        className="rounded-md bg-red-800 px-4 py-2 text-white"
      >
        Submit Monthly Request
      </button>
    </div>
  );
};