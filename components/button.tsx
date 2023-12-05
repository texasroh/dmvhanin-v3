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
        className,
        "flex w-full items-center justify-center rounded py-2 text-center font-medium text-white",
        isLoading || disabled ? "bg-orange-300" : "bg-orange-500"
      )}
      disabled={isLoading || disabled}
    >
      {isLoading ? <LoadingSpinner /> : children}
    </button>
  );
};

const WhiteButton = ({
  className,
  children,
  isLoading = false,
  disabled = false,
}: IButtonProps) => {
  return (
    <button
      className={clsx(
        className || "",
        "flex w-full items-center justify-center rounded border border-orange-500 py-2 text-center font-medium text-orange-500",
        { "bg-gray-100 text-orange-300": isLoading || disabled }
      )}
      disabled={isLoading || disabled}
    >
      {isLoading ? <LoadingSpinner /> : children}
    </button>
  );
};

Button.White = WhiteButton;

export default Button;
