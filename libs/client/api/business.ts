import {
  GET_BUSINESSES,
  GET_BUSINESS_REVIEWS,
  GET_SUBCATEGORIES,
  POST_BUSINESS,
  POST_BUSINESS_REVIEW,
} from "@/constants/urls";
import { ExtendedBusinessReview } from "@/libs/server/business";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import { sprintf } from "sprintf-js";

export interface PostReviewVariable {
  businessToken: string;
  uid: string;
  rawContent: string;
  rating: number;
}

export interface PostBusinessVariable {}

export interface PostReviewData {
  success: boolean;
}

export interface PostReviewError {
  error: string;
}

interface GetReviews {
  reviews: ExtendedBusinessReview[];
}

interface GetSubcategory {
  id: number;
  name: string;
  businessCategory: {
    key: string;
  };
}

export const businessAPI = {
  getBusinesses: ({ queryKey, pageParam = 2 }: QueryFunctionContext) => {
    return axios
      .get(sprintf(GET_BUSINESSES, queryKey[1], pageParam))
      .then((response) => response.data);
  },
  postReview: ({
    businessToken,
    rawContent,
    uid,
    rating,
  }: PostReviewVariable) => {
    return axios
      .post(sprintf(POST_BUSINESS_REVIEW, businessToken), {
        uid,
        rawContent,
        rating,
      })
      .then((response) => response.data)
      .catch(console.log);
  },
  getReviews: ({ queryKey }: QueryFunctionContext) => {
    return axios
      .get<GetReviews>(sprintf(GET_BUSINESS_REVIEWS, queryKey[1]))
      .then((response) => response.data);
  },
  postBusiness: (data: PostBusinessVariable) => {
    return axios
      .post(POST_BUSINESS, { data })
      .then((response) => response.data);
  },
  getSubcategories: () => {
    return axios
      .get<GetSubcategory[]>(GET_SUBCATEGORIES)
      .then((response) => response.data);
  },
};
