"use client"
import {FormEvent, useState} from "react";
import { signUpUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useCart } from "./cartcontext";
import {collection, addDoc, serverTimestamp, setDoc} from "firebase/firestore";
import { db } from "@/lib/firebase";

type ResSignupProps = {
  onClose?: () => void;
  onSignupSuccess?: () => void;
}
export default function resSignup({ onClose, onSignupSuccess }: ResSignupProps){
   
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
     
      console.log("Starting signup with email:", trimmedEmail);
      
      // Step 1: Create user in Firebase Authentication
      const userCredential = await signUpUser(trimmedEmail, password, {
        fullName: trimmedFullName,
      });
      
      console.log("User created successfully in Firebase Auth:", userCredential.user.uid);
      
      // Step 2: Create order in Firestore
      const order = {
        orderId: "ORD-" + Date.now(),
        fullName: trimmedFullName,
        email: trimmedEmail,
        cart,
        grandTotal,
        status: "Received",
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "orders"), order);
      console.log("Order saved to Firestore");
      
      clearCart();

      if (onSignupSuccess) {
        onSignupSuccess();
      } else {
        onClose?.();
        router.push("/app/resdashboard/order");
      }
      
    }
    catch(error: any){
      console.error("SIGNUP ERROR:", error);
      
      // Firebase specific error handling
      if (error.code === "auth/email-already-in-use") {
        setSignupError("This email is already registered. Please login instead.");
      } else if (error.code === "auth/invalid-email") {
        setSignupError("Invalid email address.");
      }
      else {
        setSignupError(error.message || "Signup failed. Please try again.");
      }
      
      console.error("Full error details:", {
        code: error.code,
        message: error.message,
        errorObject: error
      });
    }
    finally {
      setLoading(false);
    }
  };

  return(

    
      <div className="fixed inset-0 bg-black/40 bg-opacity-20 flex items-center justify-center z-50 p-4">
       <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg">
                  
                        <button
                           type="button"
                           onClick={() => onClose?.()}
                           className="float-right text-2xl font-bold text-gray-600 hover:text-red-800"
                        >
                            ✕
                        </button>
                        
                    
                
       
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
    </div>
  );
}