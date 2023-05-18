import { atom } from "jotai";

export type User = {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
};
export const userAtom = atom<User | null>(null);
