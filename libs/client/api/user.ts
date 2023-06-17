import axios from "axios";
import { sprintf } from "sprintf-js";

const getOrCreateUser = async (uid: string) => {
  axios.get(sprintf(GET_OR_CREATE_USER, uid));
};
