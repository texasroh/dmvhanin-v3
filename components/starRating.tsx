import { useState } from "react";
import StarIcon from "./starIcon";

interface StarRatingProps {
  value?: number;
  onValueChange?: (value: number) => void;
}

const StarRating = ({ value = 0, onValueChange }: StarRatingProps) => {
  const [hoveringValue, setHoveringValue] = useState<number>();
  return (
    <div className="flex justify-center">
      {[1, 2, 3, 4, 5].map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => onValueChange?.(v)}
          onMouseEnter={() => setHoveringValue(v)}
          onMouseLeave={() => setHoveringValue(undefined)}
        >
          {hoveringValue ?? value ? (
            v <= (hoveringValue ?? value) ? (
              <StarIcon.Fill />
            ) : (
              <StarIcon.Empty />
            )
          ) : (
            <StarIcon />
          )}
        </button>
      ))}
    </div>
  );
};

export default StarRating;
