import {
  GET_USER_INFO,
  POST_USER_LOGIN,
  POST_USER_LOGOUT,
} from "@/constants/urls";
import { UserInfo } from "@/hooks/useUser";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import { User } from "firebase/auth";
import { sprintf } from "sprintf-js";

interface PostUserLoginData {
  success: boolean;
  userInfo: UserInfo;
}

export const userAPI = {
  postUserLogin: (user: User) => {
    return axios
      .post<PostUserLoginData>(POST_USER_LOGIN, { user })
      .then((response) => response.data);
  },
  getUserInfo: ({ queryKey }: QueryFunctionContext) => {
    return axios
      .get(sprintf(GET_USER_INFO, queryKey[1]))
      .then((response) => response.data);
  },
  postUserLogout: () => {
    return axios.post(POST_USER_LOGOUT);
  },
};
