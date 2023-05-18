import { User, userAtom } from "@/atom/auth";
import { useAtom } from "jotai";
import { useCallback } from "react";

export const useUser = () => {
  const [user, setUser] = useAtom(userAtom);
  const updateUser = useCallback(
    (newValue: User | null) => {
      if (newValue === null) {
        setUser(newValue);
      } else {
        setUser((prev) => {
          if (prev) {
            return { ...prev, ...newValue };
          } else {
            return newValue;
          }
        });
      }
    },
    [setUser]
  );
  return { user, setUser: updateUser };
};
