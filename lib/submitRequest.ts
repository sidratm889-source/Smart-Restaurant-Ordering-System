
import { db } from "../lib/firebase";
import { addDoc, collection, doc, getDoc, serverTimestamp } from "firebase/firestore";


type SubscriptionPlan = "free"| "basic" | "pro";
type Billing = "monthly" | "yearly";


type SubmitRequestInput = {
  uid: string;
  userEmail: string;
  restaurantName?: string;
  fullName?: string;
  subscriptionPlan: SubscriptionPlan;
  billing?: Billing;
  amount?: number;
};

function defaultAmountForPlan(
  plan: SubscriptionPlan,
  billing: Billing
): number {
  if (plan === "pro") {
    return billing === "yearly" ? 790 : 75;
  }
  return billing === "yearly" ? 290 : 29;
}

export const submitRequest = async (input: SubmitRequestInput) => {
  
  const profileRef = doc(db, "restaurantProfiles", input.uid);
  const profileSnap = await getDoc(profileRef);
  const profile = profileSnap.exists() ? profileSnap.data() : null;

  const restaurantName = (input.restaurantName ?? profile?.restaurantName ?? "").trim();
  const fullName = (input.fullName ?? profile?.fullName ?? "").trim();

  const billing: Billing = input.billing ?? "monthly";
  const amount =
    typeof input.amount === "number" && !Number.isNaN(input.amount)
      ? input.amount
      : defaultAmountForPlan(input.subscriptionPlan, billing);
      const finalAmount=  input.subscriptionPlan === "free"?  0: amount;

      

   //restaurant collection
  const restaurantRef = await addDoc(collection(db, "paymentRequests"), {
    uid: input.uid,
    restaurantName,
    email: input.userEmail ?? "",
    fullName,
    subscriptionPlan: input.subscriptionPlan,
    billing,
    amount: finalAmount,
    status: input.subscriptionPlan === "free" ? "active": "pending",
    isFreeRequest:input.subscriptionPlan === "free",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  //subscription collection
  await addDoc(collection(db, "subscriptions"), {
    paymentRequestId: restaurantRef.id,
    fullName: fullName,
    plan: input.subscriptionPlan,
    amount: finalAmount,
    billing,
    status: input.subscriptionPlan === "free" ? "active": "pending",
    isFreeRequest: input.subscriptionPlan === "free",
    createdAt: serverTimestamp(),
    expiredAt: serverTimestamp(),
  });
};


