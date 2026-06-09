"use client";
import {useState} from "react";
import {signInWithEmailAndPassword, updatePassword} from "firebase/auth";
import { auth } from "@/lib/firebase";



export default function ChangePassword(){
    const [email, setEmail] = useState("");
    const[oldPassword, setOldPassword] = useState("");
    const[newPassword, setNewPassword] = useState("");
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
            <h2 className = "text-5xl mt-15 mb-2 flex ml-30">Setting</h2>
            <p className = "text-2xl mt-25 ml-40">Reset Your Password</p>
        <div className = "mt-10">
           
            <div className = "flex flex-col ml-55">
                <label className = "mb-4">Enter Email</label>
            <input 
            placeholder = "email"
            value = {email}
            onChange={(e) => setEmail(e.target.value)}
            className = "w-80 h-10 rounded-md border p-2"/>
            </div>
            <div className = "flex flex-col ml-55">
                <label className = "mb-4 mt-3">Enter Old Password</label>
            <input 
            type = "password"
            placeholder = "old password"
            value = {oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className = "w-80 h-10 rounded-md border p-2"/>
            </div>
            <div className = "flex flex-col ml-55">
                <label className = "mb-4 mt-2">Enter New Password</label>
            <input 
            type = "password"
            placeholder = "new password"
            value = {newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className = "w-80 h-10 rounded-md border p-2"/>
            </div>
            <button onClick={handleChangePassword} className = "bg-red-800 rounded-md w-80 h-10 ml-55 text-white mt-4">Update Password</button>
        </div>
        </div>
    )

}