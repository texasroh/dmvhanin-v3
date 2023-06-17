import { POST_USER_LOGIN } from "@/constants/urls";
import axios from "axios";
import { User } from "firebase/auth";

export const userAPI = {
  postUserLogin: async (user: User) => {
    return axios.post(POST_USER_LOGIN, { user });
  },
};
