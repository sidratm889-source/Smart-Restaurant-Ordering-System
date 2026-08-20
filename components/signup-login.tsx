"use client";

import { FormEvent, useState, useEffect } from "react";
import {useRouter, useSearchParams} from "next/navigation";
import { FirebaseError } from "firebase/app";
import { loginUser, signUpUser } from "@/lib/auth";
import {EyeOff, Eye} from "lucide-react";


export default function SignupLogin() {
    const [activeForm, setActiveForm] = useState<"login" | "signup">("signup");
         const router = useRouter();
         const[loginemail, setLoginEmail] = useState("");
         const[loginpassword, setLoginPassword] = useState("");
         const[loginerror, setLoginError] = useState("");
         const[loading, setLoading] = useState(false);
         
         const[fullName, setFullName] = useState("");
        
         const[restaurant, setRestaurantName] = useState("");
         const[signupemail, setSignupEmail] = useState("");
         const[signuppassword, setSignupPassword] = useState("");
         const[signuperror, setSignupError] = useState("");
         const[showLoginPassword, setShowLoginPassword] = useState(false);
         const[showSignupPassword, setShowSignupPassword] = useState(false);





         const isAdminLoginValid = loginemail.trim() !== "" && loginpassword.trim() !== "";
         const isRestaurantsSignupValid = 
         fullName.trim() !== "" &&
        
         restaurant.trim() !== "" &&
         signupemail.trim() !== "" &&
         signuppassword.trim() !== "";


         const handleLogin = async(e: FormEvent<HTMLFormElement>) => {
            
           
            e.preventDefault();
            setLoginError("");
            if(!isAdminLoginValid){
                setLoginError("All fields are required");
                return;
            }
              try{
                setLoading(true);
                await loginUser(loginemail, loginpassword);
                if(loginemail === "adminsuper@gmail.com"){
                    setTimeout(() => {
                    router.push("/admin");
                }, 3000);}
                else if(loginemail === "restaurantadmin@gmail.com"){
                    setTimeout(() => {
                        router.push("/restaurantadmin");
                    }, 3000);
                }
                else if(loginemail === "manager1@gmail.com"){
                    setTimeout(() => {
                        router.push("/resmanager");
                    }, 3000);
                }
                else if(loginemail === "kitchendisplay@gmail.com"){
                    setTimeout(() => {
                        router.push("/kitchendisplay");
                    }, 3000);
                }
                else{
                    router.push("/chooseyourplan");
                }
              }
              
              catch(error){
                setLoginError("invalid email or password");
                console.error(error);
              } finally {
                setLoading(false);
         }

        };
 const handleSignup = async (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setSignupError("");
    if(!isRestaurantsSignupValid){
        setSignupError("All fields are required");
        return;
    }
    if (signuppassword.trim().length < 6) {
        setSignupError("Password must be at least 6 characters.");
        return;
    }
    try {
        setLoading(true);
        const trimmedFullName = fullName.trim();
       

        await signUpUser(signupemail.trim(), signuppassword, {
           
            fullName: trimmedFullName,
            restaurantName: restaurant.trim(),
        });
        router.push(`/chooseyourplan?email=${encodeURIComponent(signupemail.trim())}`);
    } catch (error: unknown) {
        const firebaseError = error as FirebaseError;
        if (error instanceof FirebaseError) {
            if (firebaseError.code === "auth/email-already-in-use") {
                setSignupError("This email is already in use. Please log in or use another email.");
            } else if (firebaseError.code === "auth/invalid-email") {
                setSignupError("Please enter a valid email address.");
            } else if (firebaseError.code === "auth/weak-password") {
                setSignupError("Password is too weak. Use at least 6 characters.");
            } else if (firebaseError.code === "permission-denied") {
                setSignupError("Database permission denied. Check Firestore rules.");
            } else {
                setSignupError(`Signup failed: ${firebaseError.code}`);
            }
            console.error("Signup Firebase error:", firebaseError.code, firebaseError.message);
        } else {
            setSignupError("Could not create account. Please try again.");
            console.error("Signup unknown error:", error);
        }
    } finally {
        setLoading(false);
    }
 };

 

    return (
        <>
              <div>
                <h1 className =  "lg-h1" > Power Your Restaurant </h1>
            </div>
        <main className="bg-white min-h-[900px] p-14 rounded-s mt-20">
           
             
            <div className="flex flex-col lg:flex-row items-start justify-between gap-8  ">
                <div className="flex-1 max-w-2xl">
                    <h1 className =  "h1J" >Join 2,400+ restaurants</h1>
                    <h2 className = "text-red-800 text-4xl mt-6">Start your free 7-day trial today</h2>
                    <p className = "pa1">You don&apos;t need a credit card. complete access to every feature.<br></br><span> You can cancel at any moment.</span></p>
                    <p className = "pa">✓ Free onboarding and setup assistance</p>
                    <p className= "pa">✓ Unlimited menu items and orders</p>
                    <p className="pa">✓ Unlimited menu items and orders</p>
                    <p className = "pa">✓ Staff scheduling and management </p>
                    <p className = "pa">✓ Round-the-clock client service </p>
                     <p className = "pa">✓ Live Order Tracking </p>
                </div>

                <div className="w-full max-w-[500px] px-5 pt-3 pb-6 bg-[#231e1e] rounded-md" id="signup-login">
                    <h2 className = "login-h2">{activeForm === "signup"? "Create Free Account": "Sign in"}</h2>
                    <div className="flex w-full gap-4">
                     
                    <button
                        type="button"
                        onClick={() => setActiveForm("signup")} 
                        className={`rounded-md mt-10 w-150 h-10 px-6 ${activeForm === "signup" ? "bg-red-800 text-white" : "bg-gray-300 text-black"}`}
                    >
                        Sign Up
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveForm("login")}
                        className={`rounded-md mt-10 w-150 h-10 px-6 ${activeForm === "login" ? "bg-red-800 text-white" : "bg-gray-300 text-black"}`}
                    >
                        Login
                    </button>
                </div>

                {activeForm === "signup" ? (
                    <section id = "signup">
                    <form onSubmit={handleSignup} className="mt-8">
                        <div className="flex w-full gap-4">
                            <div className="flex flex-col">
                               
                                <label className="mt-1 mb-4 text-white">Full Name</label>
                                <input onChange={(e) => setFullName(e.target.value)} type="text" placeholder="Amir" className="text-black bg-white
w-110 h-10 rounded-md pl-3 border-1 border-gray-400 mb-4" />
                            </div>
                            
                        </div>
                        <div className="flex flex-col">
                            <label className="mt-6 mb-2 text-white">Restaurant Name</label>
                            <input onChange={(e) => setRestaurantName(e.target.value)} type="text" placeholder="Fork Knife" className="w-110 text-black bg-white h-10 rounded-md pl-3 border-1 border-gray-400 mb-4" />
                        </div>
                        <div className="flex flex-col">
                            <label className="mt-1 mb-3 text-white" >Email Address</label>
                            <input onChange={(e) => setSignupEmail(e.target.value)} type="text" placeholder="Email Address" className="w-110 h-10 text-black bg-white rounded-md border-1 border-gray-400 px-3" />
                        </div>
                        <div className="flex  flex-col">
                            <label className="mt-3 mb-3 text-white">Password</label>
                            <div className = "relative">
                            <input onChange={(e) => setSignupPassword(e.target.value)} type={showSignupPassword ? "text" : "password"} placeholder="Create a strong password" className="w-110 h-10 text-black bg-white rounded-md border-1 border-black px-3"/>
             
                            <button type = "button" onClick = {() => setShowSignupPassword(!showSignupPassword)} className = "absolute  right-10 top-1 translate-y-1/2">
                                 {showSignupPassword ? <EyeOff size = {20}/>: <Eye size = {20}/>}</button>
                            </div>
                            
                        </div>

                        <button disabled={loading}   type = "submit" className="bg-red-800 text-white mt-7 mb-3 rounded-md w-110 h-10 disabled:opacity-70">
                            {loading ? "...Creating Account" : "Create my Free Account"}
                        </button>
                        {signuperror && <p className="text-red-600 text-sm font-medium">{signuperror}</p>}
                    </form>
                    </section>
                    
                ) : (

                    <section id = "login">
                    <form onSubmit = {handleLogin} className="mt-8">
                        <div className="flex flex-col">
                            <label className = "text-white"> Email address</label>
                            <input onChange= {(e) => setLoginEmail(e.target.value)} type="text" placeholder="ahmed@restaurant.com" className="w-110 h-10 bg-white text-black rounded-md mt-3 border-1 border-gray-200 px-3" />
                           
                        </div>
                        <div className="flex flex-col">
                            <label className="mt-3 text-white">Password</label>
                            <div className = "relative">
                            <input onChange = {(e) => setLoginPassword(e.target.value)} type={showLoginPassword? "text" : "password"} placeholder="Strong password" className="w-110 h-10 text-black bg-white rounded-md mt-3 border-1 border-gray-200 px-3" />
                           <button type = "button" onClick = {() => setShowLoginPassword(!showLoginPassword)} className = "absolute right-10 top-3 translate-y-1/2">
                            {showLoginPassword ? <EyeOff size = {20} /> : <Eye size = {20} />}
                            </button>
                        </div>
                        </div>

                            <button type="submit" className="bg-red-800 text-white mt-4 mb-3 rounded-md w-110 h-10">
                            {loading ? "...Logging In" : "login"}
                        </button>
                        {loginerror && <p className="text-red-600 text-sm font-medium">{loginerror}</p>}
                    
                    </form>
                   </section>
                
                )}
            
                </div>
            </div>
            
        </main>
        </>

        
       
        
    );
}