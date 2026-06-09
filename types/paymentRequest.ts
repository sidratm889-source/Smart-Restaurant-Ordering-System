import type { Timestamp } from "firebase/firestore";

export type PaymentRequest = {
  id: string;
  restaurantName: string;
  email: string;
  fullName: string;
  subscriptionPlan?: "basic" | "pro" 
  plan?: "basic" | "pro";
  status: "pending" | "active" | "suspended" | "expired";
  createdAt?: Timestamp;
  expiredAt?: Timestamp;
};
