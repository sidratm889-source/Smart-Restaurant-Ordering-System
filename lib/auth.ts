import { auth, db } from "../lib/firebase";
import { createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

type SignupProfile = {
 
  fullName: string;
  restaurantName: string;
};

export const loginUser = async (email: string, password: string) =>{
 
const userCredential = await  signInWithEmailAndPassword(auth, email, password);
const user = userCredential.user;
}

export const logoutUser  = async(email: string, password: string) => 
  signOut(auth);
     
 
export const signUpUser = async (email: string, password: string, profile: SignupProfile) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
 
  const fullName = profile.fullName.trim();
   const restaurantName = profile.restaurantName?.trim() || fullName;
  
    

    await setDoc(doc(db, "restaurantProfiles", user.uid), {
      uid: user.uid,
      restaurantName: profile.restaurantName,
      email,
      fullName,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  

  return userCredential;
};

export const signOutUser = async () => signOut(auth);




       
       