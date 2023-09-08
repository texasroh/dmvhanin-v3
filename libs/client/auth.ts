import { actionCodeSettings, auth } from "@/fb/auth";
import {
  GoogleAuthProvider,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInWithPopup,
} from "firebase/auth";
import { userAPI } from "./api/user";

export const sendSignInEmail = async (email: string) => {
  sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => localStorage.setItem("emailForSignIn", email))
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const signInWithEmail = async (emailLink: string) => {
  if (isSignInWithEmailLink(auth, emailLink)) {
    let email = window.localStorage.getItem("emailForSignIn");
    if (!email) {
      email = window.prompt("Please provide your email for confirmation");
    }
    try {
      const userCredential = await signInWithEmailLink(
        auth,
        email || "",
        emailLink
      );
      window.localStorage.removeItem("emailForSignIn");
      return userAPI.postUserLogin(userCredential.user);
    } catch (error) {
      console.log(error);
    }
  }
};

export const signInWithGoogle = async () => {
  const googleAuthProvider = new GoogleAuthProvider();
  try {
    const userCredential = await signInWithPopup(auth, googleAuthProvider);
    return userAPI.postUserLogin(userCredential.user);
  } catch (err) {
    console.log(err);
  }
};
