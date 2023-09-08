import { LOGIN_URL, ROOT_URL } from "@/constants/urls";
import { useUser } from "@/hooks/useUser";
import { signInWithEmail } from "@/libs/client/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Email = () => {
  const router = useRouter();
  const { setUser } = useUser();
  useEffect(() => {
    signInWithEmail(window.location.href)
      .then((response) => {
        setUser(response.userInfo);
        router.replace(ROOT_URL);
      })
      .catch(() => router.replace(LOGIN_URL));
  }, [router]);
  return <div>Email logging in..</div>;
};

export default Email;
