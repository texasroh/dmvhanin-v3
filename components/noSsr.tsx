import dynamic from "next/dynamic";
import React from "react";

interface NoSsrProps {
  children: React.ReactNode;
}

const NoSsr = ({ children }: NoSsrProps) => (
  <React.Fragment>{children}</React.Fragment>
);

export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false,
});
