import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { useCallback } from "react";

type User = {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
};
const USER_ATOM = "userAtom";
export const userAtom = atomWithStorage<User | null>(USER_ATOM, null);

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
