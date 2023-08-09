import clsx from "clsx";

type starSize = "small" | "medium";
export interface StarProps {
  size: starSize;
}

const starSize = (size: starSize) => ({
  "text-2xl": size == "medium",
  "text-md": size == "small",
});

const StarIcon = ({ size }: StarProps) => {
  return <span className={clsx(starSize(size), "text-gray-300")}>☆</span>;
};

const StarFill = ({ size }: StarProps) => {
  return <span className={clsx(starSize(size), "text-orange-400")}>★</span>;
};
StarIcon.Fill = StarFill;

const StarEmpty = ({ size }: StarProps) => {
  return <span className={clsx(starSize(size), "text-orange-400")}>☆</span>;
};
StarIcon.Empty = StarEmpty;

export default StarIcon;
