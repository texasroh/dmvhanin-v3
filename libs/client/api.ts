import { ReviewFormData } from "@/components/business/reviewForm";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import { editorStateToHTML, editorStateToString } from "./editor";

export interface PostReviewVariable extends ReviewFormData {
  businessToken: string;
  uid: string;
}

export interface PostReviewData {
  success: boolean;
}

export interface PostReviewError {
  error: string;
}

export const businessAPI = {
  getBusinesses: ({ queryKey, pageParam = 2 }: QueryFunctionContext) => {
    // console.log("inside fetch fn", queryKey[1], pageParam);
    return axios
      .get(`/api/businesses/${queryKey[1]}?page=${pageParam}`)
      .then((response) => response.data);
  },
  postReview: ({ businessToken, review, uid }: PostReviewVariable) => {
    return axios
      .post(`/api/businesses/profile/${businessToken}/review`, {
        uid,
        rawContent: editorStateToString(review),
        reviewHTML: editorStateToHTML(review),
      })
      .then((response) => response.data);
  },
};
