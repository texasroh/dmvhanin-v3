import { useBackground } from "@/hooks/useBackground";
import { useEffect } from "react";

const Background = () => {
  const [bg, toggleBg] = useBackground();
  useEffect(() => {
    if (bg) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [bg]);
  return bg ? (
    <div
      onClick={toggleBg}
      className="fixed top-0 left-0 z-10 h-screen w-screen bg-gray-700 opacity-20"
    ></div>
  ) : null;
};

export default Background;
