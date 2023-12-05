import { PROFILE_API } from "@/constants/urls";
import axios from "axios";

interface PatchProfileVariable {
  displayName: string;
}

export const profileAPI = {
  patchProfile: (data: PatchProfileVariable) =>
    axios.patch(PROFILE_API, data).then((response) => response.data),
};
