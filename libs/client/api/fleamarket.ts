import { FLEAMARKET_API } from "@/constants/urls";
import axios from "axios";

interface PostProduct {}

export const fleamarketAPI = {
  postProduct: (data: PostProduct) =>
    axios.post(FLEAMARKET_API, data).then((response) => response.data),
};
