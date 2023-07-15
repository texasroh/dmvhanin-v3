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

export default StarIcon;

StarIcon.Fill = ({ size }: StarProps) => {
  return <span className={clsx(starSize(size), "text-orange-400")}>★</span>;
};

StarIcon.Empty = ({ size }: StarProps) => {
  return <span className={clsx(starSize(size), "text-orange-400")}>☆</span>;
};
