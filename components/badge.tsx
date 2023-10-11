import clsx from "clsx";
import { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {}

const Badge = ({ children, className, ...rest }: BadgeProps) => {
  return (
    <span
      className={clsx(
        className,
        "rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-gray-500"
      )}
      {...rest}
    >
      {children}
    </span>
  );
};

export default Badge;
