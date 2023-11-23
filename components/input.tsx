import clsx from "clsx";
import { motion } from "framer-motion";
import { InputHTMLAttributes, forwardRef, useEffect, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, className, label, onChange, onFocus, onBlur, ...props }, ref) => {
    const [inputId, setInputId] = useState(id);
    useEffect(() => {
      if (!id) {
        setInputId(Math.random().toString(36).substring(2, 7));
      }
    }, []);

    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState<string>((props.value as string) || "");
    return (
      <div className="relative w-full">
        <input
          {...props}
          id={inputId}
          ref={ref}
          className={clsx(
            className,
            "h-10 w-full rounded border border-gray-400 bg-transparent px-4 outline-orange-300"
          )}
          onFocus={(e) => {
            onFocus?.(e);
            setIsFocus(true);
          }}
          onBlur={(e) => {
            onBlur?.(e);
            setIsFocus(false);
          }}
          onChange={(e) => {
            onChange?.(e);
            setValue(e.currentTarget.value);
          }}
          value={value}
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
          <motion.label
            htmlFor={inputId}
            layoutId={label}
            className="absolute left-2 top-2 select-text bg-white px-2 text-gray-400"
          >
            {label}
          </motion.label>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
