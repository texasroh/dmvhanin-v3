import { auth } from "@/fb/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const signInWithGoogle = () => {
  const googleAuthProvider = new GoogleAuthProvider();
  try {
    signInWithPopup(auth, googleAuthProvider);
  } catch (err) {
    console.log(err);
  }
};

export const signInWithEmail = () => {};
