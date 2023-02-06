import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

export const businessAPI = {
  getBusinesses: ({ queryKey, pageParam = 2 }: QueryFunctionContext) => {
    // console.log("inside fetch fn", queryKey[1], pageParam);
    return axios
      .get(`/api/businesses/${queryKey[1]}?page=${pageParam}`)
      .then((response) => response.data);
  },
};
