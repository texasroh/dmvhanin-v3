import { useBackground } from "@/hooks/useBackground";
import { useUser } from "@/hooks/useUser";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import Avatar from "./avatar";

const SubMenu = () => {
  const { user } = useUser();
  const [bg, toggleBg] = useBackground();
  const router = useRouter();

  const signOutAction = async () => {
    toggleBg();
    router.push("/auth/logout");
  };
  return (
    <li>
      {user ? (
        <div className="relative z-20">
          <div className="cursor-pointer" onClick={toggleBg}>
            <Avatar
              photoURL={user.photoURL || ""}
              alt={user.displayName || ""}
            />
          </div>
          <AnimatePresence>
            {bg && (
              <motion.div
                className="absolute right-0 top-10 rounded border bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ul className="text-base font-normal">
                  <li
                    className="cursor-pointer px-4 py-2"
                    onClick={() => router.push("/auth/profile")}
                  >
                    Profile
                  </li>
                  {user.businessOwner && (
                    <li
                      className="cursor-pointer px-4 py-2"
                      onClick={() => router.push("/profile/business")}
                    >
                      Businesses
                    </li>
                  )}
                  <li
                    className="cursor-pointer px-4 py-2"
                    onClick={signOutAction}
                  >
                    Logout
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <Link href={"/auth/login"}>로그인</Link>
      )}
    </li>
  );
};
export default SubMenu;
