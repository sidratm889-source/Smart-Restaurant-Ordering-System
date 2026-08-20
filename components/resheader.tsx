"use client";
import { useRouter } from "next/navigation";
import {useCart} from "./cartcontext";
import {User} from "lucide-react";
import {useState, useEffect} from "react";
import ResSignup from "@/components/ressignup";
import Link from "next/link";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
import { auth } from "@/lib/firebase";
import ResLogin from "./reslogin";


export default function ResHeader(){
    const router = useRouter();
    const { totalQuantity } = useCart();
    const [user, setUser] = useState<FirebaseUser | null>(null);
    
    const [showSignup, setShowSignup] = useState(false);
    const[showLogin, setShowLogin] = useState(false);
    const[loading, setLoading] = useState(true);
    const[isLoggedIn, setIsLoggedIn] = useState(false);
    const[dropDown, setDropDown] = useState(false);


    const [showMenu, setShowMenu] = useState(false);
    useEffect(() => {
        const unsubscribe  = onAuthStateChanged(auth,  (currentUser) => {
            if(currentUser){
                setUser(currentUser);
                setIsLoggedIn(true);
            }else{
                setUser(null);
                setIsLoggedIn(false);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);
  //logout
  const handleLogout = async() => {
    await signOut(auth);
    setDropDown(false);
    setUser(null);
    setIsLoggedIn(false);
  };

    return (
        <header className="h-15 bg-gray-200 flex items-center justify-between px-4">
            <div className="flex items-center">
                <span className="text-red-800 p-3">Bistro</span>
                <span className="text-black">Bliss</span>
            </div>

            <div className="flex items-center gap-4">
                {!isLoggedIn ? (
                    <>
                        <button onClick =  {() => setShowLogin(true)}  className="w-30 text-md bg-red-800 h-10 px-4 text-white rounded-full">
                            Login
                        </button>
                        <button onClick={() => setShowSignup(true)} className="text-md bg-red-800 w-25 h-10 px-4 text-white rounded-full">
                            Signup
                        </button>
                    </>
                ) : (
                    <div className="relative">
                        <button onClick={() => setShowMenu(!showMenu)} className="flex items-center p-2 rounded-full bg-white w-30 h-10">
                            <User size={24} />
                            <span className="gap-2 ml-2">Profile</span>
                            <span className="w-5 text-center text-xl leading-none font-bold">{showMenu ? "⌃" : "⌄"}</span>
                        </button>

                        {showMenu && (
                            <div className="absolute right-0 mt-2 rounded-md w-40 bg-white shadow-md">
                                <button type = "button" onClick={()=> router.push("/app/resdashboard/myorders")}  className="block w-40 px-4 py-3 hover:bg-red-50">
                                    My Orders
                                </button>
                                <button type="button" onClick={handleLogout} className="block w-full text-left px-4 py-3 hover:bg-red-50">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}

                <button type="button" onClick={() => router.push("/app/resdashboard/cart")} className="relative bg-red-800 h-10 px-4 pr-10 text-white rounded-full">
                    🛒cart
                    <span className="absolute -right-1 mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold mr-3">
                        {totalQuantity}
                    </span>
                </button>
            </div>

            {showLogin && <ResLogin onClose={() => setShowLogin(false)} />}
            {showSignup && <ResSignup onClose={() => setShowSignup(false)} />}
        </header>
    );
}
            
          
            
                

             
                

              
        
            

           
                
  

