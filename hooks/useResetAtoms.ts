import { bgAtom } from "@/hooks/useBackground";
import { useSetAtom } from "jotai";
import { RESET } from "jotai/utils";
import { useCallback } from "react";
import { userAtom } from "./useUser";

export const useResetAtoms = () => {
  const setBg = useSetAtom(bgAtom);
  const setUser = useSetAtom(userAtom);
  const resetAtoms = useCallback(() => {
    setBg(false);
    setUser(RESET);
  }, [setBg]);
  return resetAtoms;
};
