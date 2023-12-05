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
export const POST_BUSINESS = BASE_API_URL + "/businesses";
export const GET_BUSINESSES = BASE_API_URL + "/businesses/category/%s?page=%d";
export const POST_BUSINESS_REVIEW =
  BASE_API_URL + "/businesses/profile/%s/reviews";
export const GET_BUSINESS_REVIEWS = POST_BUSINESS_REVIEW;
export const GET_CATEGORIES = BASE_API_URL + "/businesses/category";
export const GET_SUBCATEGORIES = GET_CATEGORIES + "?sub=true";

/**
 * Profile related URL
 */

export const PROFILE_API = BASE_API_URL + "/profile";

/**
 * Page URLs
 */

export const MAIN_PAGE = "/";
export const LOGIN_PAGE = "/auth/login";
export const LOGOUT_PAGE = "/auth/logout";
export const PROFILE_PAGE = "/profile";
export const BUSINESS_OWNER_PAGE = "/profile/business";
export const BUSINESS_OWNER_DETAIL_PAGE = "/profile/business/%s";
export const BUSINESS_MAIN_PAGE = "/businesses";
export const BUSINESS_CATEGORY_PAGE = "/businesses/category/%s";
export const BUSINESS_DETAIL_PAGE = "/businesses/profile/%s-%s";
export const BUSINESS_CREATION_PAGE = "/profile/business/new";
