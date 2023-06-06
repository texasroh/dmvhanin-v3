import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import dynamic from "next/dynamic";
import { Controller, useForm } from "react-hook-form";

const DraftEditor = dynamic(() => import("@/components/draftEditor"), {
  ssr: false,
});

interface ReviewFormData {
  review: EditorState;
}

const ReviewForm = () => {
  const { handleSubmit, register, control } = useForm<ReviewFormData>({
    defaultValues: { review: EditorState.createEmpty() },
  });

  const onSubmit = (data: ReviewFormData) => {
    const rawContentState = convertToRaw(data.review.getCurrentContent());
    const markup = draftToHtml(rawContentState);
    console.log(markup);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <button>Submit</button>
    </form>
  );
};

export default ReviewForm;
