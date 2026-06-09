"use client"
import {FormEvent, useState} from "react";
import { signUpUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useCart } from "./cartcontext";
import {collection, addDoc, serverTimestamp, setDoc} from "firebase/firestore";
import { db } from "@/lib/firebase";

type ResSignupProps = {
    onSignupSuccess?: () => void;
}
export default function resSignup({onSignupSuccess}: ResSignupProps){
   
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signuperror, setSignupError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
    const { cart, grandTotal, clearCart } = useCart();

  const isSignupValid =
    fullName.trim() !== "" &&
    email.trim() !== "" &&
    password.trim() !== "";

const handleSignup = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSignupError("");
    
    if(!isSignupValid){
      setSignupError("Please fill all fields required");  
      return;  
    }
    
    if(password.trim().length < 8){
      setSignupError("Password must be at least 8 characters");
      return;
    }

    try{
      setLoading(true);
      const trimmedFullName = fullName.trim();
      const trimmedEmail = email.trim();
     
      await  signUpUser(email.trim(), password, {
        
  fullName: trimmedFullName,
  
});
        const order = {
        orderId: "ORD-" + Date.now(),
        fullName: trimmedFullName,
        email: email.trim(),
        cart,
        grandTotal,
        status: "Received",
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "orders"), order);
      clearCart();

      if (onSignupSuccess) {
        onSignupSuccess();
      } else {
        router.push("/app/resdashboard/order");
      }
    }
     
    catch(error: any){
      setSignupError(error.message || "Signup failed");
    }
    finally {
      setLoading(false);
    }
  };

  return(
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg">
       
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Create Account & Place Order
      </h1>
      
      
      <form onSubmit={handleSignup}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
          <input 
            value={fullName} 
            onChange={(e) => setFullName(e.target.value)} 
            type="text" 
            className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:border-red-500"
            placeholder="Enter full name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <input 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}  
            type="email" 
            className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:border-red-500"
            placeholder="Enter email"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Password</label>
          <input 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}  
            type="password" 
            className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:border-red-500"
            placeholder="Enter password (min 8 chars)"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-red-800 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold h-10 rounded-md transition"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
        {signuperror && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
          {signuperror}
        </div>
      )}

      </form>
    </div>
  )
}