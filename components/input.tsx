import clsx from "clsx";
import { motion } from "framer-motion";
import { InputHTMLAttributes, forwardRef, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, type = "text", ...props }, ref) => {
    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState<string>((props.value as string) || "");
    return (
      <div className="relative w-full">
        <input
          {...props}
          ref={ref}
          className={clsx(
            "h-10 w-full rounded border border-gray-400 bg-transparent px-4 outline-orange-300",
            className
          )}
          type={type}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(e) => {
            if (props.onChange) props.onChange(e);
            setValue(e.currentTarget.value);
          }}
        />
        {isFocus || value ? (
          <motion.span
            layoutId={label}
            className={clsx(
              "absolute -top-[9px] left-2 select-none bg-white px-2 text-xs font-medium",
              { "text-orange-500": isFocus }
            )}
          >
            {label}
          </motion.span>
        ) : (
          <motion.span
            layoutId={label}
            className="absolute left-2 top-2 bg-white px-2 text-gray-400"
          >
            {label}
          </motion.span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
