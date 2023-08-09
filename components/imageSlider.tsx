import { BusinessImage } from "@prisma/client";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import {
  AiOutlineArrowsAlt,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";

interface IImageSliderProps {
  imgSrcs: BusinessImage[];
}

const ImageSlider = ({ imgSrcs }: IImageSliderProps) => {
  const [index, setIndex] = useState(0);
  const animation = useAnimation();
  return (
    <div className="slider-wrapper relative -m-2 aspect-square overflow-hidden bg-gray-200 sm:m-0 sm:aspect-video sm:rounded-lg">
      <motion.div className="flex h-full" animate={{ x: `-${index * 100}%` }}>
        {[1, 2, 3].map((ele, idx) => (
          <div
            className="relative aspect-square h-full sm:aspect-video"
            key={idx}
          >
            <div className="h-full w-full bg-blue-200"></div>
            <span className="magnifier absolute top-4 right-4 hidden rounded-lg bg-gray-700 p-1 opacity-50">
              <AiOutlineArrowsAlt color="white" size={24} />
            </span>
          </div>
        ))}
      </motion.div>
      <div className="absolute bottom-3 left-0 w-full">
        <ul className="flex justify-center space-x-2">
          {[1, 2, 3].map((ele, idx) => (
            <li
              key={idx}
              className={`h-2 w-2 rounded-full ${
                index === idx ? "bg-white" : "bg-gray-400"
              }`}
              onClick={() => setIndex(idx)}
            />
          ))}
        </ul>
      </div>
      <div className="absolute top-0 flex h-full w-full items-center">
        <div className="relative flex w-full justify-between px-4">
          <div className="rounded-full p-4 font-bold opacity-50">
            {index > 0 && (
              <AiOutlineLeft
                color="white"
                size={60}
                onClick={() => setIndex((prev) => prev - 1)}
              />
            )}
          </div>
          <div className="rounded-full p-4 font-bold opacity-50">
            {index < 2 && (
              <AiOutlineRight
                color="white"
                size={60}
                onClick={() => setIndex((prev) => prev + 1)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
