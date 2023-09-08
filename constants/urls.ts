export const ROOT_URL = "/";
export const LOGIN_URL = "/auth/login";

const BASE_API_URL = "/api/v1";
/**
 * Auth related URL
 */
export const POST_USER_LOGIN = BASE_API_URL + "/user/login";
export const POST_USER_LOGOUT = BASE_API_URL + "/user/logout";
export const GET_USER_INFO = BASE_API_URL + "/user/%s";

/**
 * Business related URL
 */

export const GET_BUSINESSES = BASE_API_URL + "/businesses/%s?page=%d";
export const POST_BUSINESS_REVIEW =
  BASE_API_URL + "/businesses/profile/%s/reviews";
export const GET_BUSINESS_REVIEWS = POST_BUSINESS_REVIEW;
