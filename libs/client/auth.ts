import { auth } from "@/fb/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const signInWithGoogle = () => {
  const googleAuthProvider = new GoogleAuthProvider();
  signInWithPopup(auth, googleAuthProvider);
};

export const signInWithEmail = () => {};
