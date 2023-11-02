import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export interface UserInfo {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  businessOwner: boolean;
}
const USER_ATOM = "userAtom";
export const userAtom = atomWithStorage<UserInfo | null>(USER_ATOM, null);

export const useUser = () => {
  const [user, setUser] = useAtom(userAtom);
  return { user, setUser };
};
