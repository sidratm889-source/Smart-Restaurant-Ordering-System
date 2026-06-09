export const defaultPlans = {
  free: {
    id: "free",
    title: "label free",
    headline: "Basic access",
    price: "$0",
    features: ["1 user", "limited access"],
  },
  basic: {
    id: "basic",
    title: "Basic Plan",
    headline: "Standard access",
    price: "$10",
    features: ["5 users", "standard support"],
  },
  premium: {
    id: "premium",
    title: "Premium Plan",
    headline: "Full access",
    price: "$20",
    features: ["Unlimited users", "priority support"],
  },
};

export const PLANS_STORAGE_KEY = "subscription-plans";
