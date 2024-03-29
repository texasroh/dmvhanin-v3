import { auth } from "@/fb/auth";
import {
  PostReviewData,
  PostReviewError,
  PostReviewVariable,
  businessAPI,
} from "@/libs/client/api/business";
import { editorStateToString } from "@/libs/client/editor";
import { useMutation } from "@tanstack/react-query";
import { EditorState } from "draft-js";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "../button";
import DraftEditor from "../draftEditor";
// import dynamic from "next/dynamic";
import NoSsr from "../noSsr";
import StarRating from "../starRating";

// const DraftEditor = dynamic(() => import("@/components/draftEditor"), {
//   ssr: false,
// });

export interface ReviewFormData {
  review: EditorState;
  rating: number;
}

interface ReviewFormProps {
  businessToken: string;
  refetch: () => void;
}

const ReviewForm = ({ businessToken, refetch }: ReviewFormProps) => {
  const [emptySwitch, setEmptySwitch] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [hasText, setHasText] = useState(false);
  const { handleSubmit, control, setValue, reset } = useForm<ReviewFormData>({
    defaultValues: { review: EditorState.createEmpty(), rating: 0 },
  });

  const { mutate, isLoading, data, error } = useMutation<
    PostReviewData,
    PostReviewError,
    PostReviewVariable
  >(businessAPI.postReview, {
    onSuccess: () => {
      setEmptySwitch((prev) => !prev);
      setRatingValue(0);
      refetch();
    },
    onError: console.log,
  });

  const onSubmit = ({ review, rating }: ReviewFormData) => {
    if (!auth.currentUser || !review.getCurrentContent().hasText() || !rating)
      return;
    mutate({
      uid: auth.currentUser.uid,
      rawContent: editorStateToString(review),
      businessToken,
      rating,
    });
  };

  const onValueChange = (value: number) => {
    setValue("rating", value);
    setRatingValue(value);
  };

  const onEditorChange = (
    state: EditorState,
    onChange: (...event: any[]) => void
  ) => {
    onChange(state);
    setHasText(state.getCurrentContent().hasText());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2 md:flex-row">
        <div className="shrink-0 md:w-4/5">
          <NoSsr>
            <Controller
              render={({ field: { onChange } }) => (
                <DraftEditor
                  placeholder="Leave your comment here"
                  onChange={(state) => onEditorChange(state, onChange)}
                  readonly={isLoading}
                  emptySwitch={emptySwitch}
                />
              )}
              name="review"
              control={control}
            />
          </NoSsr>
        </div>
        <div className="w-full grow space-y-2 self-end">
          <StarRating
            value={ratingValue}
            onValueChange={onValueChange}
            size="medium"
          />
          <Button isLoading={isLoading} disabled={!hasText || !ratingValue}>
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ReviewForm;
