"use client";
import {useState} from "react";
import {FormEvent} from "react";
import {collection, addDoc, serverTimestamp, setDoc} from "firebase/firestore";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { db } from "@/lib/firebase";
import {useRouter} from "next/navigation";
import {auth} from "@/lib/firebase";
import{loginUser} from "@/lib/auth";
import { FirebaseError } from "firebase/app";

type ResLoginProps = {
    onClose?: () => void;
}

export default function ResLogin({onClose}: ResLoginProps){
     const[email, setEmail] = useState("");
     const[password, setPassword] = useState("");
     const[loading, setLoading] = useState(false);
     const[loginError, setLoginError] = useState("");
     const router = useRouter();

     const isLoginValid =
       email.trim() !== "" &&
       password.trim() !== "";

     const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
       e.preventDefault();
       setLoginError("");

       if (!isLoginValid) {
         setLoginError("Please fill all fields required");
         return;
       }

       try {
         setLoading(true);
         const userCredential = await signInWithEmailAndPassword(
           auth,
           email.trim(),
           password.trim()
         );

         console.log("login successful:", userCredential.user.uid);
         onClose?.();
        
       } catch (error: any) {
         console.error(error);
         if (error.code === "auth/user-not-found") {
           setLoginError("No account found. Please signup first");
         } else if (error.code === "auth/wrong-password") {
           setLoginError("Wrong password");
         } else if (error.code === "auth/invalid-email") {
           setLoginError("Invalid email address");
         } else {
           setLoginError(error.message || "Login failed");
         }
       } finally {
         setLoading(false);
       }
     };

    return(
        <div className = "fixed inset-0 bg-black/40 bg-opacity-20 flex items-center justify-center z-50 p-4">
        <div className = "max-w-md mx-auto mt-8 bg-white rounded-lg w-250 h-80">
            <button 
            type = "button"
            onClick = {() => onClose?.()}
            className = "float-right mr-5 text-3xl m text-gray-600 hover:text-red-800">x</button>
               <h1 className = "text-2xl mb-4 font-bold mt-6 ml-5">Login</h1>

               <form onSubmit = {handleLogin}>
                <div className = "mb-4 ml-4">
                <label className = "block text-gray-700 font-sembold mb-2">
                Email
                </label>
                <input type = "email" value = {email}
                onChange={(e) => setEmail(e.target.value)}
                 className= "w-100 h-10 rounded-md border border-gray-300"
                placeholder = " enter email"/>
                    </div>
                    <div className = "mb-4 ml-4">
                    <label className = "block text-gray-700 font-sembold mb-2">
                Password
                </label>
                <input value = {password}
                onChange={(e) => setPassword(e.target.value)}
                type = "password" className= "w-100 h-10 rounded-md border border-gray-300"
                placeholder = "enter Password"/>
                    </div>
                    <button type = "submit" 
                    disabled = {loading}
                     className = "mt-4 ml-4 w-100 h-10 rounded-md bg-red-800 text-white">
                        {loading?  "Logging In": "Login" }
                    </button>
{loginError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
          {loginError}
          </div>
)}



           </form>
            </div>
            </div>
            
    )
}