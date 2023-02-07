import { motion } from "framer-motion";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface IInputProps {
  formObj: UseFormReturn;
  label: string;
  name: string;
  type?: "text" | "email";
}

const Input = ({ formObj, label, name, type = "text" }: IInputProps) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <div className="relative w-full" onClick={() => formObj.setFocus(name)}>
      <input
        {...formObj.register(name)}
        className="h-10 w-full rounded border border-gray-400 bg-transparent px-4 outline-orange-300"
        name={name}
        type={type}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
      {isFocus || formObj.getValues(name) ? (
        <motion.span
          layoutId={name}
          className={`absolute -top-[9px] left-2 select-none bg-white px-2 text-xs font-medium ${
            isFocus ? "text-orange-500" : ""
          }`}
        >
          {label}
        </motion.span>
      ) : (
        <motion.span
          layoutId={name}
          className="absolute left-2 top-2 bg-white px-2 text-gray-400"
        >
          {label}
        </motion.span>
      )}
    </div>
  );
};

export default Input;
