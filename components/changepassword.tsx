"use client";
import {useState} from "react";
import {signInWithEmailAndPassword, updatePassword} from "firebase/auth";
import { auth } from "@/lib/firebase";
import {EyeOff, Eye} from "lucide-react";



export default function ChangePassword(){
    const [email, setEmail] = useState("");
    const[oldPassword, setOldPassword] = useState("");
    const[newPassword, setNewPassword] = useState("");
    const[showOldPassword, setShowOldPassword] = useState(false);
    const[showNewPassword, setShowNewPassword] = useState(false);
    const handleChangePassword = async() =>{
        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, oldPassword);
            const user = userCredential.user;
            await updatePassword(user, newPassword);
            alert("password updated");

        }catch(error){
            console.log(error);
        }
    };

    return(
         <div>
           
            
           
        <div style={{ fontFamily: 'Poppins, sans-serif' }} className = "mt-10">
           
            <div className = "flex flex-col">
                <label className = "mb-4">Enter Email</label>
            <input 
            placeholder = "email"
            value = {email}
            onChange={(e) => setEmail(e.target.value)}
            className = "w-80 h-10 rounded-md border p-2"/>
            </div>
            <div className = "flex flex-col ">
                <label className = "mb-4 mt-3">Enter Old Password</label>
            <input 
            type = {showOldPassword ? "text": "password"}
            placeholder = "old password"
            value = {oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className = "w-80 h-10 rounded-md border p-2 rounded-lg px-4 py-3 pr-12 focus:outline-none"/>
            <button type = "button" onClick = {() => setShowOldPassword(!showOldPassword)} className = "absolute mb-0 px-2 py-15 ml-70">
                            {showOldPassword ? <EyeOff size = {20} /> : <Eye size = {20} />}
                            </button>
            </div>
            <div className = "flex flex-col ">
                <label className = "mb-4 mt-2">Enter New Password</label>
            <input 
            type = {showNewPassword ? "text": "password"}
            placeholder = "new password"
            value = {newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className = "w-80 h-10 rounded-md border p-2"/>
             <button type = "button" onClick = {() => setShowNewPassword(!showNewPassword)} className = "absolute mb-0 px-2 py-15 ml-70">
             {showNewPassword ? <EyeOff size = {20} /> : <Eye size = {20} />}</button>

            </div>
            <button onClick={handleChangePassword} className = "bg-red-800 rounded-md w-80 h-10  text-white mt-4 mb-20">Update Password</button>
        </div>
     </div>  
     
    )

}