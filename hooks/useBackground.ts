import { atom, useAtom } from "jotai";

export const bgAtom = atom(false);
export const useBackground = (): [boolean, () => void] => {
  const [bg, setBg] = useAtom(bgAtom);
  const toogleBg = () => {
    setBg((prev) => !prev);
  };
  return [bg, toogleBg];
};
