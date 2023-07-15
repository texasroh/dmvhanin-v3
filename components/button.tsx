import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";
import LoadingSpinner from "./loadingSpinner";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}
const Button = ({
  className,
  children,
  isLoading = false,
  disabled = false,
}: IButtonProps) => {
  return (
    <button
      className={clsx(
        className || "",
        "flex w-full items-center justify-center rounded py-2 text-center font-medium text-white",
        isLoading || disabled ? "bg-orange-300" : "bg-orange-500"
      )}
      disabled={isLoading || disabled}
    >
      {isLoading ? <LoadingSpinner /> : children}
    </button>
  );
};

export default Button;
