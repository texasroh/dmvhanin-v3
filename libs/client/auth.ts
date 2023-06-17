import { actionCodeSettings, auth } from "@/fb/auth";
import {
  GoogleAuthProvider,
  sendSignInLinkToEmail,
  signInWithPopup,
} from "firebase/auth";

export const signInWithGoogle = async () => {
  const googleAuthProvider = new GoogleAuthProvider();
  try {
    const userCredential = await signInWithPopup(auth, googleAuthProvider);
  } catch (err) {
    console.log(err);
  }
};

export const signInWithEmail = async (email: string) => {
  sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => localStorage.setItem("emailForSignIn", email))
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};
