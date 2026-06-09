
"use client";

type Props = {
    plan: "monthly" | "yearly";  
};
export default function OrderSummary({ plan }: Props) {
    const prices = {
        monthly: 75, 
        yearly: 790,
    }; 

    const price = plan === "monthly" ? prices.monthly : prices.yearly;
    const tax = 0;
    const total = price + tax;
    return (
      <div className="space-y-3">
        <div className="bg-white rounded-lg border border-gray-300 w-full h-65 lg:w-90 mt-30">
          <h2 className="mt-5 ml-5 font-medium">Order Summary</h2>
          <div className="border-t my-4 mx-4 border-gray-300" />
          <div className="flex justify-between mb-2 mt-4 space-x-3 space-y-3 mx-4">
            <p className="text-black">Pro Plan</p>
            <p className="font-medium">${price}</p>
          </div>
          <div className="flex justify-between mb-2 space-x-3 space-y-3 mx-4">
            <p className="text-gray-800">Billing</p>
            <p className="text-gray-800">
              {plan === "monthly" ? "Monthly" : "Yearly"}
            </p>
          </div>
          <div className="flex justify-between mb-3 text-gray-600 mx-4">
            <p>Tax</p>
            <p>${tax}</p>
          </div>
          <div className="border-t my-4 mx-4 border-gray-300" />
          <div className="flex justify-between mb-3 text-red-800 mx-4">
            <p>SubTotal</p>
            <p>${total}</p>
          </div>
        </div>

        <div className="bg-white h-40 w-90 rounded-lg border border-gray-300 p-4">
          <h2 className="font-medium">Payment timeline</h2>
         <div className = "flex items-center gap-3">
          <span className = "w-3 h-3 rounded-full bg-red-600"></span>
         <p> Submit payment - today</p>
         </div>
          <div className = "flex items-center gap-3">
          <span className = "w-3 h-3 rounded-full bg-orange-600"></span>
          <p>Admin review - within 24 hours</p>
          </div>
          <div className = "flex items-center gap-3">
          <span className = "w-3 h-3 rounded-full bg-yellow-400"></span>
          <p>Account activated on approval</p>
          </div>
          </div>
        </div>
      
    );
}