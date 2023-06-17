import { LOGIN_URL, ROOT_URL } from "@/constants/urls";
import { signInWithEmail } from "@/libs/client/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Email = () => {
  const router = useRouter();
  useEffect(() => {
    signInWithEmail(window.location.href)
      .then(() => router.replace(ROOT_URL))
      .catch(() => router.replace(LOGIN_URL));
  }, [router]);
};

export default Email;
