export const ROOT_URL = "/";
export const LOGIN_URL = "/auth/login";

const BASE_API_URL = "/api/v1";
/**
 * Auth related URL
 */
export const POST_USER_LOGIN = BASE_API_URL + "/user/login";

/**
 * Business related URL
 */

export const GET_BUSINESSES = BASE_API_URL + "/businesses/%s?page=%d";
export const POST_REVIEW = BASE_API_URL + "/businesses/profile/%s/review";
