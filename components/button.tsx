import clsx from "clsx";
import { ReactNode } from "react";
import LoadingSpinner from "./loadingSpinner";

interface IButtonProps {
  isLoading?: boolean;
  children?: ReactNode;
  className?: string;
}
const Button = ({ className, children, isLoading = false }: IButtonProps) => {
  return (
    <button
      className={clsx(
        className || "",
        "flex w-full items-center justify-center rounded py-2 text-center font-medium text-white",
        isLoading ? "bg-orange-300" : "bg-orange-500"
      )}
      disabled={isLoading}
    >
      {isLoading ? <LoadingSpinner /> : children}
    </button>
  );
};

export default Button;
