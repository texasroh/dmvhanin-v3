import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import React, { useState } from "react";
import Background from "./background";
import Footer from "./footer";
import Header from "./header";
import TinyHeader from "./tinyHeader";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest >= 200) {
      setShow(true);
    } else {
      setShow(false);
    }
  });
  return (
    <div className="relative min-h-screen pb-40">
      <Header />
      <AnimatePresence>
        {show && (
          <motion.div
            className="fixed top-0 z-20 h-16 w-full border-b bg-white"
            initial={{ y: -100 }}
            animate={{ y: 0, transition: { ease: "linear" } }}
            exit={{ y: -100 }}
          >
            <TinyHeader />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="px-2">
        <div className="mx-auto max-w-[770px]">{children}</div>
      </div>
      <Footer />
      <Background />
    </div>
  );
};

export default Layout;
