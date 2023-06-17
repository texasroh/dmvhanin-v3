const BASE_URL = "/api/v1";

/**
 * Auth related URL
 */
export const GET_OR_CREATE_USER = BASE_URL + "/user/%s";

/**
 * Business related URL
 */

export const GET_BUSINESSES = BASE_URL + "/businesses/%s?page=%d";
export const POST_REVIEW = BASE_URL + "/businesses/profile/%s/review";
