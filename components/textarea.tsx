import { HTMLAttributes, forwardRef, useState } from "react";
import { twJoin, twMerge } from "tailwind-merge";

interface TextareaProps extends HTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, onBlur, onFocus, ...rest }, ref) => {
    const [isFocus, setIsFocus] = useState(false);
    return (
      <div className="relative">
        <label
          className={twJoin(
            "absolute left-2 top-0 -translate-y-1/2 select-none bg-white p-2 text-xs font-medium",
            isFocus && "text-orange-500"
          )}
        >
          {label}
        </label>
        <textarea
          ref={ref}
          className={twMerge(
            "h-40 w-full rounded border border-gray-400 p-4 outline-orange-300",
            className
          )}
          onFocus={(e) => {
            onFocus?.(e);
            setIsFocus(true);
          }}
          onBlur={(e) => {
            onBlur?.(e);
            setIsFocus(false);
          }}
          {...rest}
        ></textarea>
      </div>
    );
  }
);

export default Textarea;
