import { auth } from "@/fb/auth";
import { useUser } from "@/hooks/useUser";
import {
  PostReviewData,
  PostReviewError,
  PostReviewVariable,
  businessAPI,
} from "@/libs/client/api/business";
import { useMutation } from "@tanstack/react-query";
import { EditorState } from "draft-js";
import dynamic from "next/dynamic";
import { Controller, useForm } from "react-hook-form";
import Button from "../button";

const DraftEditor = dynamic(() => import("@/components/draftEditor"), {
  ssr: false,
});

export interface ReviewFormData {
  review: EditorState;
}

interface ReviewFormProps {
  businessToken: string;
}

const ReviewForm = ({ businessToken }: ReviewFormProps) => {
  const { user } = useUser();

  const { mutate, isLoading, data, error } = useMutation<
    PostReviewData,
    PostReviewError,
    PostReviewVariable
  >(businessAPI.postReview);
  const { handleSubmit, register, control } = useForm<ReviewFormData>({
    defaultValues: { review: EditorState.createEmpty() },
  });

  const onSubmit = ({ review }: ReviewFormData) => {
    if (!auth.currentUser || !review.getCurrentContent().hasText()) return;
    mutate({ uid: auth.currentUser.uid, review, businessToken });
    console.log("data", data);
    console.log("error", error);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2 md:flex-row">
        <div className="shrink-0 md:w-4/5">
          <Controller
            render={({ field: { onChange } }) => (
              <DraftEditor
                placeholder="Leave your comment here"
                onChange={onChange}
              />
            )}
            name="review"
            control={control}
          />
        </div>
        <div className="w-full grow self-end">
          <Button isLoading={isLoading}>Submit</Button>
        </div>
      </div>
    </form>
  );
};

export default ReviewForm;
