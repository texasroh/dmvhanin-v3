import { atomWithStorage, createJSONStorage } from "jotai/utils";

const storage = createJSONStorage<User | null>(() => sessionStorage);

const USER_ATOM = "userAtom";
type User = {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
};
export const userAtom = atomWithStorage<User | null>(USER_ATOM, null, storage);
