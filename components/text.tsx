import clsx from "clsx";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {}

export const Title = ({ children, className }: Props) => {
  return <div className={clsx("text-lg font-bold", className)}>{children}</div>;
};

export const Subtitle = ({ children, className }: Props) => {
  return (
    <div className={clsx("text-md font-bold text-gray-500", className)}>
      {children}
    </div>
  );
};
