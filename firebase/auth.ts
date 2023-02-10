import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { firebaseApp } from "./app";

export const auth = getAuth(firebaseApp);
export const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: "http://localhost:3000/auth/email",
  // This must be true.
  handleCodeInApp: true,
};
