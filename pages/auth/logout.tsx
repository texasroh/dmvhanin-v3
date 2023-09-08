import { auth } from "@/fb/auth";
import { useUser } from "@/hooks/useUser";
import { userAPI } from "@/libs/client/api/user";
import { signOut } from "firebase/auth";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

const Logout = () => {
  const loading = useRef(false);
  const { setUser } = useUser();
  const router = useRouter();
  const searchParam = useSearchParams();
  const fromUrl = searchParam.get("from");

  const logout = () =>
    userAPI.postUserLogout().then(() => {
      setUser(null);
      router.push(fromUrl ?? "/", undefined, { shallow: true });
    });

  useEffect(() => {
    if (loading.current) return;
    loading.current = true;
    signOut(auth);
    const timeout = setTimeout(logout, 300);
    return () => {
      loading.current = false;
      clearTimeout(timeout);
    };
  }, [searchParam]);
  return <div>Logging out..</div>;
};
export default Logout;
