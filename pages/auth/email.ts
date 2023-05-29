import { auth } from "@/fb/auth";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Email = () => {
  const router = useRouter();
  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("Please provide your email for confirmation");
      }
      signInWithEmailLink(auth, email || "", window.location.href)
        .then((result) => {
          window.localStorage.removeItem("emailForSignIn");
          router.replace("/");
        })
        .catch((error) => {
          console.log(error);
          router.replace("/auth/login");
        });
    }
  }, [router]);
};

export default Email;
