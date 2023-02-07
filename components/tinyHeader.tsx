import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "../images/short-logo.png";
import MainMenu from "./mainMenu";
import SubMenu from "./subMenu";

const TinyHeader = () => {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest >= 140) {
      setShow(true);
    } else {
      setShow(false);
    }
  });

  return (
    <AnimatePresence>
      {show && (
        <motion.header
          className="fixed top-0 z-10 h-16 w-full border-b bg-white"
          initial={{ y: -100 }}
          animate={{ y: 0, transition: { ease: "linear" } }}
          exit={{ y: -100 }}
        >
          <div className="container mx-auto flex h-full items-center justify-between px-4">
            <div className="flex items-center space-x-10">
              <Link href="/">
                <Image src={logo} alt="DMV hanin logo" height={30} />
              </Link>
              <ul className="flex space-x-6 text-lg font-bold text-gray-600">
                <MainMenu />
              </ul>
            </div>
            <ul className="flex space-x-6 text-lg font-bold text-gray-600">
              <SubMenu />
            </ul>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default TinyHeader;
