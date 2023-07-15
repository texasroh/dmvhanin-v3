import clsx from "clsx";
import { useState } from "react";
import StarIcon, { StarProps } from "./starIcon";

interface StarRatingProps extends StarProps {
  value?: number;
  onValueChange?: (value: number) => void;
  disabled?: boolean;
}

const StarRating = ({
  value = 0,
  onValueChange,
  size,
  disabled = false,
}: StarRatingProps) => {
  const [hoveringValue, setHoveringValue] = useState<number>();
  return (
    <div className="flex justify-center">
      {[1, 2, 3, 4, 5].map((v) => (
        <div
          key={v}
          className={clsx(disabled ? "select-none" : "cursor-pointer")}
          onClick={() => onValueChange?.(v)}
          onMouseEnter={disabled ? undefined : () => setHoveringValue(v)}
          onMouseLeave={
            disabled ? undefined : () => setHoveringValue(undefined)
          }
        >
          {hoveringValue ?? value ? (
            v <= (hoveringValue ?? value) ? (
              <StarIcon.Fill size={size} />
            ) : (
              <StarIcon.Empty size={size} />
            )
          ) : (
            <StarIcon size={size} />
          )}
        </div>
      ))}
    </div>
  );
};

export default StarRating;
