import { getDateTimeString } from "@/libs/client/datetime";
import { stringToEditorState } from "@/libs/client/editor";
import { ExtendedBusinessReview } from "@/libs/server/business";
import { Editor } from "draft-js";
import { useState } from "react";
import StarRating from "../starRating";

interface ReviewProps {
  review: ExtendedBusinessReview;
}

const Review = ({
  review: {
    user: { displayName },
    rawContent,
    createdAt,
    rating,
  },
}: ReviewProps) => {
  const [editorState, setEditorState] = useState(() =>
    stringToEditorState(rawContent)
  );
  const [readOnly, setReadOnly] = useState(true);

  return (
    <div className="flex flex-col gap-4 border-t border-gray-300 py-3 md:flex-row">
      <div className="flex items-center justify-between md:w-1/5 md:flex-col md:items-start">
        <div className="text-sm font-bold">{displayName}</div>
        <div className="text-xs text-gray-400">
          {getDateTimeString(createdAt)}
        </div>
      </div>
      <div className="shrink-0">
        <div className="flex">
          <StarRating value={rating} disabled size="small" />
        </div>
        <Editor
          editorState={editorState}
          readOnly={readOnly}
          onChange={setEditorState}
          editorKey="editor"
        />
      </div>
    </div>
  );
};

export default Review;
