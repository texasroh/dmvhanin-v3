import { auth } from "@/fb/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const signInWithGoogle = async () => {
  const googleAuthProvider = new GoogleAuthProvider();
  try {
    const userCredential = await signInWithPopup(auth, googleAuthProvider);
  } catch (err) {
    console.log(err);
  }
};

export const signInWithEmail = () => {};
